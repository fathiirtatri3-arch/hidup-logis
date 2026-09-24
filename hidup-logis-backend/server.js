const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT Config
const JWT_SECRET = process.env.JWT_SECRET || 'hidup-logis-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// FIX WORKING DIRECTORY - LINE PERTAMA DI SERVER.JS
const path = require('path');

console.log('='.repeat(60));
console.log('🔍 DEBUG INFO:');
console.log('Current directory:', process.cwd());
console.log('File location:', __dirname);
console.log('='.repeat(60));

// Force working directory ke root project
if (!process.cwd().endsWith('hidup-logis-backend')) {
  const targetDir = path.resolve(__dirname);
  process.chdir(targetDir);
  console.log('Changed working directory to:', process.cwd());
}

// ==================== PRISMA INITIALIZATION (UNTUK 7.3.0+) ====================
let prisma = null;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
  
  console.log('🔗 Testing database connection...');
  
  // PAKAI .then() BUKAN await
  prisma.$connect()
    .then(() => {
      console.log('✅ Database connected successfully');
    })
    .catch(err => {
      console.log('❌ Database connection failed:', err.message);
      console.log('⚠️  Running in development mode (no database)');
      prisma = null;
    });
    
} catch (error) {
  console.log('❌ Prisma Client not available:', error.message);
  console.log('⚠️  Running in development mode (no database)');
  prisma = null;
}

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// ==================== FREE LIMIT SYSTEM ====================
const freeAudits = new Map(); // Simpan data limit per user
const MONTHLY_LIMIT = 3; // Sesuai PRD: 3 audit per bulan

// Helper untuk get user identifier (sementara pakai IP)
function getUserIdentifier(req) {
  return req.ip || req.headers['x-forwarded-for'] || req.headers['user-agent'] || 'anonymous';
}

// Helper untuk reset bulanan (sederhana)
function isNewMonth(lastAuditDate) {
  if (!lastAuditDate) return true;
  const now = new Date();
  const last = new Date(lastAuditDate);
  return now.getMonth() !== last.getMonth() || now.getFullYear() !== last.getFullYear();
}

// ==================== SCORING ENGINE ====================

function calculateScore(inputs) {
  const {
    salary,
    livingCost,
    foodCost = 0,
    transportCost = 0,
    workingHours = 40,
    savingsTarget = 20
  } = inputs;

  // 1. FINANCIAL SCORE (40%)
  const totalMonthlyCost = livingCost + foodCost + transportCost;
  const remainingMoney = salary - totalMonthlyCost;
  const savingsAmount = remainingMoney * (savingsTarget / 100);
  const financialScore = Math.min(100, (remainingMoney / salary) * 100 * 2);
  
  // 2. TIME SCORE (25%)
  const monthlyHours = workingHours * 4;
  const hourlyWage = monthlyHours > 0 ? salary / monthlyHours : 0;
  const timeScore = Math.min(100, (hourlyWage / 50000) * 100);
  
  // 3. SUSTAINABILITY SCORE (20%)
  const sustainabilityScore = savingsAmount > 0 ? 80 : 30;
  
  // 4. GOAL ALIGNMENT (15%)
  let goalScore;
  if (savingsTarget >= 20) {
    goalScore = 90;
  } else if (savingsTarget >= 10) {
    goalScore = 70;
  } else {
    goalScore = 40;
  }
  
  // TOTAL SCORE
  const totalScore = 
    financialScore * 0.4 +
    timeScore * 0.25 +
    sustainabilityScore * 0.2 +
    goalScore * 0.15;
  
  // ZONA
  let zone = 'Merah';
  if (totalScore >= 70) zone = 'Hijau';
  else if (totalScore >= 50) zone = 'Kuning';
  
  // REALITY CHECK
  const realityChecks = {
    Hijau: 'Keputusan ini secara finansial dan waktu cukup logis untuk diterima.',
    Kuning: 'Ada beberapa aspek yang perlu dipertimbangkan ulang sebelum mengambil keputusan.',
    Merah: 'Keputusan ini berisiko tinggi dan mungkin tidak berkelanjutan dalam jangka panjang.'
  };
  
  return {
    score: Math.round(totalScore),
    zone,
    remainingMoney: Math.round(remainingMoney),
    timeCost: Math.round(hourlyWage),
    savingsAmount: Math.round(savingsAmount),
    realityCheck: realityChecks[zone],
    breakdown: {
      financialScore: Math.round(financialScore),
      timeScore: Math.round(timeScore),
      sustainabilityScore: Math.round(sustainabilityScore),
      goalScore: Math.round(goalScore)
    }
  };
}

// ==================== AUTH MIDDLEWARE ====================

// 🔥 GANTI middleware authenticateToken dengan yang lebih toleran:
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  console.log('🔐 AuthenticateToken - Token present:', !!token);
  console.log('🔐 AuthenticateToken - Auth header:', authHeader);
  
  if (!token) {
    console.log('⚠️  No token provided, continuing as guest');
    req.user = null;
    return next();
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('✅ Token valid for user:', decoded.email);
    
    if (prisma) {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true, email: true, name: true,
          isPremium: true, auditCount: true, createdAt: true
        }
      });
      
      if (user) {
        req.user = user;
        console.log('✅ User found in database:', user.email);
      } else {
        console.log('⚠️  User not found in database, using decoded data');
        req.user = {
          id: decoded.userId,
          email: decoded.email,
          name: decoded.email.split('@')[0],
          isPremium: true,
          auditCount: 0,
          createdAt: new Date()
        };
      }
    } else {
      // 🔥 DEVELOPMENT MODE: Auto create user from token
      console.log('✅ DEVELOPMENT MODE: Creating dummy user from token');
      req.user = {
        id: decoded.userId || 'dev-user-' + Date.now(),
        email: decoded.email || 'dev@example.com',
        name: (decoded.email || 'dev').split('@')[0],
        isPremium: true,
        auditCount: 3,
        createdAt: new Date()
      };
    }
    
    next();
  } catch (error) {
    console.log('⚠️  Token error (continuing as guest):', error.message);
    req.user = null;
    next(); // 🔥 LANJUTKAN BUKAN RETURN ERROR
  }
};

// 🔥 PERBAIKI endpoint login (sekitar baris 200):
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Email dan password diperlukan'
      });
    }
    
    let user = null;
    
    if (prisma) {
      // PRODUCTION: Cari user di database
      user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true, email: true, name: true,
          passwordHash: true, isPremium: true,
          auditCount: true, createdAt: true
        }
      });
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'INVALID_CREDENTIALS',
          message: 'Email atau password salah'
        });
      }
      
      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          error: 'INVALID_CREDENTIALS',
          message: 'Email atau password salah'
        });
      }
      
    } else {
      // 🔥 DEVELOPMENT MODE: Auto approve semua login
      console.log('✅ DEVELOPMENT MODE: Auto-login for', email);
      
      user = {
        id: 'dev-user-' + Date.now(),
        email: email,
        name: email.split('@')[0] || 'User',
        passwordHash: 'dev-hash',
        isPremium: true,
        auditCount: 5,
        createdAt: new Date()
      };
    }
    
    // Generate token
    const { passwordHash, ...userWithoutPassword } = user;
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        user: userWithoutPassword,
        token
      }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Gagal login'
    });
  }
});

// Middleware untuk require auth (protected routes)
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Anda harus login untuk mengakses ini'
    });
  }
  next();
};

// Middleware untuk require premium
const requirePremium = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Anda harus login'
    });
  }
  
  if (!req.user.isPremium) {
    return res.status(403).json({
      success: false,
      error: 'PREMIUM_REQUIRED',
      message: 'Fitur ini membutuhkan akun Premium'
    });
  }
  
  next();
};

// ==================== AUTH ROUTES ====================

// Register - PERBAIKAN UNTUK PRISMA 7.3.0
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Validasi
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Email dan password diperlukan'
      });
    }
    
    let existingUser = null;
    let user = null;
    
    if (prisma) {
      // Cek apakah email sudah terdaftar
      existingUser = await prisma.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'EMAIL_EXISTS',
          message: 'Email sudah terdaftar'
        });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      // Buat user
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          passwordHash,
          isVerified: false
        },
        select: {
          id: true,
          email: true,
          name: true,
          isPremium: true,
          isVerified: true,
          auditCount: true,
          createdAt: true
        }
      });
      
      console.log('✅ User created in database:', email);
    } else {
      // Development mode tanpa database
      user = {
        id: 'dev-user-' + Date.now(),
        email,
        name: name || email.split('@')[0],
        isPremium: false,
        isVerified: false,
        auditCount: 0,
        createdAt: new Date()
      };
      console.log('✅ User registered (DEV MODE):', email);
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    res.status(201).json({
      success: true,
      message: prisma ? 'Registrasi berhasil' : 'Registrasi berhasil (DEV MODE)',
      data: {
        user,
        token
      }
    });
    
  } catch (error) {
    console.error('❌ Registration error:', error);
    
    // Error handling untuk Prisma errors
    let errorMessage = 'Gagal membuat akun';
    if (error.code === 'P2002') {
      errorMessage = 'Email sudah terdaftar';
    } else if (error.code === 'P1001') {
      errorMessage = 'Database tidak dapat dihubungi';
    }
    
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: errorMessage,
      detail: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login - PERBAIKAN UNTUK PRISMA 7.3.0
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Email dan password diperlukan'
      });
    }
    
    let user = null;
    
    if (prisma) {
      // Cari user di database
      user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          passwordHash: true,
          isPremium: true,
          auditCount: true,
          createdAt: true
        }
      });
    }
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'Email atau password salah'
      });
    }
    
    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'Email atau password salah'
      });
    }
    
    // Generate token (hilangkan passwordHash dari response)
    const { passwordHash, ...userWithoutPassword } = user;
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        user: userWithoutPassword,
        token
      }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Gagal login'
    });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  if (!req.user) {
    return res.json({
      success: true,
      data: null,
      isAuthenticated: false
    });
  }
  
  res.json({
    success: true,
    data: req.user,
    isAuthenticated: true
  });
});

// Get user's audit history
app.get('/api/auth/audits', authenticateToken, requireAuth, async (req, res) => {
  try {
    const audits = await prisma.audit.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    
    res.json({
      success: true,
      data: audits
    });
  } catch (error) {
    console.error('❌ Get audits error:', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Gagal mengambil riwayat audit'
    });
  }
});

// ==================== ROUTES ====================

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di HIDUP LOGIS API',
    description: 'Decision Audit & Reality Check Platform',
    version: '1.1.0',
    database: prisma ? 'Connected' : 'Development mode (no database)',
    endpoints: {
      health: 'GET /api/health',
      audit: 'POST /api/audit',
      'check-limit': 'GET /api/check-limit',
      'admin-stats': 'GET /api/admin/stats',
      'about-stats': 'GET /api/about/stats',
      'about-feedback': 'POST /api/about/feedback'
    },
    limitSystem: 'Active (3 audit/month free)'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'HIDUP LOGIS BACKEND',
    database: prisma ? 'Connected' : 'Development mode',
    limitSystem: 'Active',
    timestamp: new Date().toISOString()
  });
});

// Route untuk cek limit
app.get('/api/check-limit', (req, res) => {
  const userIdentifier = getUserIdentifier(req);
  const userData = freeAudits.get(userIdentifier) || {
    count: 0,
    lastAudit: null,
    isPremium: false
  };
  
  // Reset jika bulan baru
  if (isNewMonth(userData.lastAudit)) {
    userData.count = 0;
    freeAudits.set(userIdentifier, userData);
  }
  
  res.json({
    success: true,
    data: {
      used: userData.count,
      limit: MONTHLY_LIMIT,
      remaining: Math.max(0, MONTHLY_LIMIT - userData.count),
      isPremium: userData.isPremium,
      nextReset: 'Bulan depan',
      canAudit: userData.isPremium || userData.count < MONTHLY_LIMIT,
      userIdentifier: userIdentifier.substring(0, 8) + '...'
    }
  });
});

// Audit endpoint dengan auth support
app.post('/api/audit', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    console.log(`👤 User: ${user ? user.email : 'Guest'}`);
    
    let canAudit = true;
    let limitInfo = {};
    
    if (user) {
      // User terautentikasi
      if (!user.isPremium) {
        // Cek limit untuk free user
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const monthlyAudits = await prisma.audit.count({
          where: {
            userId: user.id,
            createdAt: {
              gte: startOfMonth
            }
          }
        });
        
        limitInfo = {
          used: monthlyAudits,
          limit: MONTHLY_LIMIT,
          remaining: Math.max(0, MONTHLY_LIMIT - monthlyAudits),
          isPremium: user.isPremium
        };
        
        if (monthlyAudits >= MONTHLY_LIMIT) {
          canAudit = false;
        }
      } else {
        limitInfo = {
          used: 0,
          limit: 'unlimited',
          remaining: 'unlimited',
          isPremium: true
        };
      }
    } else {
      // Guest: gunakan IP-based limit
      const userIdentifier = getUserIdentifier(req);
      const userData = freeAudits.get(userIdentifier) || {
        count: 0,
        lastAudit: null
      };
      
      if (isNewMonth(userData.lastAudit)) {
        userData.count = 0;
      }
      
      limitInfo = {
        used: userData.count,
        limit: MONTHLY_LIMIT,
        remaining: Math.max(0, MONTHLY_LIMIT - userData.count),
        isPremium: false
      };
      
      if (userData.count >= MONTHLY_LIMIT) {
        canAudit = false;
      }
    }
    
    if (!canAudit) {
      return res.status(429).json({
        success: false,
        error: 'LIMIT_EXCEEDED',
        message: 'Limit audit gratis bulan ini sudah habis.',
        limitInfo: limitInfo,
        upgradeUrl: '/pricing',
        userMessage: user 
          ? `Kamu sudah menggunakan ${limitInfo.used}/${limitInfo.limit} audit gratis bulan ini. Upgrade ke Premium untuk audit tanpa batas.`
          : `Limit audit gratis sudah habis. Daftar akun untuk mendapatkan ${MONTHLY_LIMIT} audit gratis per bulan.`
      });
    }
    
    const { salary, livingCost, foodCost, transportCost, workingHours, savingsTarget } = req.body;
    
    if (!salary || !livingCost) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_DATA',
        message: 'Data tidak lengkap. Salary dan livingCost diperlukan.'
      });
    }
    
    const result = calculateScore({
      salary: parseFloat(salary),
      livingCost: parseFloat(livingCost),
      foodCost: parseFloat(foodCost || 0),
      transportCost: parseFloat(transportCost || 0),
      workingHours: parseFloat(workingHours || 40),
      savingsTarget: parseFloat(savingsTarget || 20)
    });
    
    const auditData = {
      salary: parseFloat(salary),
      livingCost: parseFloat(livingCost),
      foodCost: parseFloat(foodCost || 0),
      transportCost: parseFloat(transportCost || 0),
      workingHours: parseFloat(workingHours || 40),
      savingsTarget: parseFloat(savingsTarget || 20),
      totalScore: result.score,
      zone: result.zone,
      remainingMoney: result.remainingMoney,
      timeCost: result.timeCost,
      savingsAmount: result.savingsAmount,
      realityCheck: result.realityCheck,
      breakdown: JSON.stringify(result.breakdown) 
    };
    
    if (user) {
      auditData.userId = user.id;
    } else {
      auditData.userIdentifier = getUserIdentifier(req);
    }
    
    let savedAudit = null;
    
    if (prisma) {
      try {
        savedAudit = await prisma.audit.create({
          data: auditData
        });
        
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { auditCount: { increment: 1 } }
          });
        }
      } catch (dbError) {
        console.log('⚠️  Database error:', dbError.message);
      }
    }
    
    if (!user) {
      const userIdentifier = getUserIdentifier(req);
      const userData = freeAudits.get(userIdentifier) || {
        count: 0,
        lastAudit: null
      };
      userData.count += 1;
      userData.lastAudit = new Date().toISOString();
      freeAudits.set(userIdentifier, userData);
    }
    
    res.json({
      success: true,
      message: user ? 'Audit berhasil disimpan' : 'Audit berhasil diproses',
      data: result,
      auditId: savedAudit?.id || `dev-${Date.now()}`,
      limitInfo: {
        ...limitInfo,
        used: user ? limitInfo.used + 1 : limitInfo.used + 1,
        remaining: limitInfo.remaining === 'unlimited' ? 'unlimited' : Math.max(0, limitInfo.remaining - 1),
        canAudit: limitInfo.isPremium || (limitInfo.remaining - 1) > 0
      },
      isAuthenticated: !!user
    });
    
  } catch (error) {
    console.error('❌ Error processing audit:', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Terjadi kesalahan server'
    });
  }
});

// Admin stats endpoint
app.get('/api/admin/stats', (req, res) => {
  const totalUsers = freeAudits.size;
  const totalAudits = Array.from(freeAudits.values())
    .reduce((sum, user) => sum + user.count, 0);
  
  const premiumUsers = Array.from(freeAudits.values())
    .filter(user => user.isPremium).length;
  
  res.json({
    success: true,
    data: {
      totalUsers,
      totalAudits,
      premiumUsers,
      freeUsers: totalUsers - premiumUsers,
      monthlyLimit: MONTHLY_LIMIT,
      systemStatus: 'Active'
    }
  });
});

// ==================== ABOUT US STATS ====================

// Get platform statistics untuk About Us page
app.get('/api/about/stats', async (req, res) => {
  try {
    let stats = {
      totalAudits: 0,
      totalUsers: 0,
      premiumUsers: 0,
      satisfactionRate: 87,
      foundedYear: 2024
    };
    
    if (prisma) {
      const [totalAudits, totalUsers, premiumUsers] = await Promise.all([
        prisma.audit.count(),
        prisma.user.count(),
        prisma.user.count({ where: { isPremium: true } })
      ]);
      
      stats.totalAudits = totalAudits;
      stats.totalUsers = totalUsers;
      stats.premiumUsers = premiumUsers;
    } else {
      stats.totalUsers = freeAudits.size;
      stats.totalAudits = Array.from(freeAudits.values())
        .reduce((sum, user) => sum + user.count, 0);
      stats.premiumUsers = Array.from(freeAudits.values())
        .filter(user => user.isPremium).length;
    }
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('❌ Error getting about stats:', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Gagal mengambil statistik'
    });
  }
});

// Submit feedback dari About Us page
app.post('/api/about/feedback', async (req, res) => {
  try {
    const { name, email, message, type } = req.body;
    
    if (!email || !message) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Email dan message diperlukan'
      });
    }
    
    console.log('📧 Feedback received:', { name, email, message, type });
    
    res.json({
      success: true,
      message: 'Terima kasih atas feedback Anda!'
    });
    
  } catch (error) {
    console.error('❌ Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Gagal mengirim feedback'
    });
  }
});

// Admin reset endpoint
app.post('/api/admin/reset-limit', (req, res) => {
  const { userIdentifier, all } = req.body;
  
  if (userIdentifier) {
    freeAudits.delete(userIdentifier);
    console.log(`♻️ Reset limit untuk user: ${userIdentifier}`);
    res.json({
      success: true,
      message: `Limit untuk user ${userIdentifier} berhasil direset`
    });
  } else if (all) {
    freeAudits.clear();
    console.log('♻️ Reset semua limit');
    res.json({
      success: true,
      message: 'Semua limit berhasil direset'
    });
  } else {
    res.status(400).json({
      success: false,
      error: 'Parameter tidak valid'
    });
  }
});

// Simulate premium user
app.post('/api/admin/simulate-premium', (req, res) => {
  const { userIdentifier, premium } = req.body;
  
  if (!userIdentifier) {
    return res.status(400).json({
      success: false,
      error: 'userIdentifier diperlukan'
    });
  }
  
  let userData = freeAudits.get(userIdentifier) || {
    count: 0,
    lastAudit: null,
    isPremium: false
  };
  
  userData.isPremium = premium !== false;
  freeAudits.set(userIdentifier, userData);
  
  console.log(`⭐ User ${userIdentifier} set to ${userData.isPremium ? 'PREMIUM' : 'FREE'}`);
  
  res.json({
    success: true,
    data: {
      userIdentifier,
      isPremium: userData.isPremium,
      count: userData.count
    }
  });
});

app.get('/api/audits/history', authenticateToken, async (req, res) => {
  try {
    console.log('📊 /api/audits/history - User:', req.user?.email || 'Guest');
    
    // Jika tidak ada user, tetap return data dummy (untuk debugging)
    if (!req.user) {
      console.log('⚠️  No user, but returning dummy data for testing');
      const dummyAudits = [
        {
          id: 'dummy-1',
          salary: 5000000,
          livingCost: 2000000,
          totalScore: 75,
          zone: 'Hijau',
          remainingMoney: 2000000,
          createdAt: new Date().toISOString()
        },
        {
          id: 'dummy-2',
          salary: 7000000,
          livingCost: 4000000,
          totalScore: 65,
          zone: 'Kuning',
          remainingMoney: 1500000,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      
      return res.json({
        success: true,
        data: dummyAudits,
        count: dummyAudits.length,
        message: 'Development mode: Dummy data (no user)'
      });
    }
    
    let audits = [];
    
    if (prisma) {
      audits = await prisma.audit.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        take: 50
      });
    } else {
      // DEVELOPMENT MODE
      audits = [
        {
          id: 'dev-audit-1',
          userId: req.user.id,
          salary: 8000000,
          livingCost: 3000000,
          totalScore: 85,
          zone: 'Hijau',
          remainingMoney: 3500000,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'dev-audit-2',
          userId: req.user.id,
          salary: 6000000,
          livingCost: 4000000,
          totalScore: 65,
          zone: 'Kuning',
          remainingMoney: 1000000,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'dev-audit-3',
          userId: req.user.id,
          salary: 4000000,
          livingCost: 3500000,
          totalScore: 45,
          zone: 'Merah',
          remainingMoney: -500000,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];
    }
    
    console.log(`✅ Returning ${audits.length} audits for user: ${req.user.email}`);
    
    res.json({
      success: true,
      data: audits,
      count: audits.length,
      stats: {
        totalAudits: audits.length,
        averageScore: audits.length > 0 
          ? Math.round(audits.reduce((acc, a) => acc + (a.totalScore || 0), 0) / audits.length)
          : 0
      }
    });
    
  } catch (error) {
    console.error('❌ Error in /api/audits/history:', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Gagal mengambil riwayat audit: ' + error.message
    });
  }
});

// ==================== 404 HANDLER ====================

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Route ${req.originalUrl} tidak ditemukan`,
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'GET /api/check-limit',
      'POST /api/audit',
      'GET /api/admin/stats',
      'GET /api/about/stats',
      'POST /api/about/feedback',
      'POST /api/admin/reset-limit',
      'POST /api/admin/simulate-premium'
    ]
  });
});


// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log(`🚀 HIDUP LOGIS BACKEND v1.1`);
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🔗 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🗄️  Database: ${prisma ? 'SQLite (Prisma 7.3.0)' : 'DEVELOPMENT MODE'}`);
  console.log(`🎯 Free Limit: ${MONTHLY_LIMIT} audit per bulan`);
  console.log('='.repeat(60));
  console.log('✅ Ready to accept audit requests!');
  console.log('🔧 Admin tools available at /api/admin/*');
  console.log('📊 About stats available at /api/about/stats');
  console.log('='.repeat(60));
});