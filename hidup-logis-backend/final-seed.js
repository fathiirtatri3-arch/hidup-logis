
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seed() {
    console.log('🚀 Seeding database...');
    
    try {
        // 1. Delete semua data lama
        await prisma.audit.deleteMany({});
        await prisma.user.deleteMany({});
        console.log('✅ Cleared old data');
        
        // 2. Buat user dengan ID YANG SAMA seperti di token kamu
        // ID ini dari log sebelumnya: "cmky29xgb0000y9nnd8ikkd9s"
        const userId = 'cmky29xgb0000y9nnd8ikkd9s';
        const passwordHash = await bcrypt.hash('password123', 10);
        
        const user = await prisma.user.create({
            data: {
                id: userId, // ⚠️ PAKAI ID YANG SAMA!
                email: 'fathiirtatri.3@gmail.com',
                name: 'Fathir',
                passwordHash: passwordHash,
                isPremium: true,
                auditCount: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        
        console.log('✅ Created user:', user.email);
        console.log('📋 User ID:', user.id);
        
        // 3. Buat 3 audit records DENGAN userId YANG SAMA
        const auditsData = [
            {
                salary: 8500000,
                livingCost: 3500000,
                totalScore: 88,
                zone: 'Hijau',
                remainingMoney: 3200000
            },
            {
                salary: 6500000,
                livingCost: 4200000,
                totalScore: 72,
                zone: 'Hijau',
                remainingMoney: 1000000
            },
            {
                salary: 4500000,
                livingCost: 3800000,
                totalScore: 58,
                zone: 'Kuning',
                remainingMoney: -300000
            }
        ];
        
        for (const data of auditsData) {
            await prisma.audit.create({
                data: {
                    userId: userId, // ⚠️ INI PENTING: harus sama dengan user.id!
                    salary: data.salary,
                    livingCost: data.livingCost,
                    foodCost: 1000000,
                    transportCost: 500000,
                    workingHours: 40,
                    savingsTarget: 20,
                    totalScore: data.totalScore,
                    finalScore: data.totalScore,
                    zone: data.zone,
                    remainingMoney: data.remainingMoney,
                    timeCost: 50000,
                    savingsAmount: 100000,
                    realityCheck: 'Keputusan finansial yang baik.',
                    breakdown: JSON.stringify({financialScore: 80, timeScore: 85, sustainabilityScore: 82, goalScore: 88}),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
        }
        
        console.log('✅ Created 3 audit records');
        console.log('📊 Verification:');
        
        // 4. Verifikasi
        const auditCount = await prisma.audit.count({
            where: { userId: userId }
        });
        
        console.log(`   User ${user.email} has ${auditCount} audits`);
        
        // 5. Update user auditCount (safety check)
        await prisma.user.update({
            where: { id: userId },
            data: { auditCount: auditCount }
        });
        
        console.log('🎉 Seeding completed successfully!');
        console.log('\n📋 IMPORTANT:');
        console.log('1. User ID:', userId);
        console.log('2. Make sure your JWT token contains this same user ID');
        console.log('3. Restart server and login again');
        
    } catch (error) {
        console.error('❌ Seeding error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
