import { useState, useEffect, memo, useRef } from 'react'; // 🔥 TAMBAH useRef
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import FloatingLines from '../components/FloatingLines';
import Footer from '../components/Footer';

// Memoize FloatingLines
const MemoizedFloatingLines = memo(() => (
  <FloatingLines
    enabledWaves={["top", "middle", "bottom"]}
    lineCount={6}
    lineDistance={5}
    bendRadius={5}
    bendStrength={-0.5}
    interactive={true}
    parallax={true}
    linesGradient={['#5b13ec', '#8b5cf6', '#a78bfa']}
    mixBlendMode="screen"
  />
));

MemoizedFloatingLines.displayName = 'MemoizedFloatingLines';

function Dashboard() {
  const { user, logout, isPremium, auditHistory, auditStats, refreshAuditHistory } = useAuth();
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [floatingLinesReady, setFloatingLinesReady] = useState(false);
  const containerRef = useRef(null); // 🔥 TAMBAH useRef untuk FloatingLines

  // 🔥 PERHATIKAN: Variabel HARUS di sini (sebelum if (!user))
  const totalAudits = auditStats?.totalAudits || audits.length || 0;
  const recentAudits = audits.slice(0, 3);
  const avgScore = auditStats?.averageScore || 
    (audits.length > 0 
      ? Math.round(audits.reduce((acc, audit) => acc + (audit.finalScore || audit.totalScore || 0), 0) / audits.length)
      : 0);

  // 🔥 FIX: useEffect untuk FloatingLines harus di sini
  useEffect(() => {
    const timer = setTimeout(() => {
      setFloatingLinesReady(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // 🔥 FIX: useEffect untuk fetch data
  useEffect(() => {
    if (user) {
      if (auditHistory && auditHistory.length > 0) {
        setAudits(auditHistory);
        setLoading(false);
      } else {
        fetchUserAudits();
        refreshAuditHistory && refreshAuditHistory();
      }
    } else {
      setLoading(false);
    }
  }, [user, auditHistory]);

  const fetchUserAudits = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/audits/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAudits(result.data);
      } else {
        console.error('Failed to fetch audits:', result.message);
        setAudits([]);
      }
    } catch (error) {
      console.error('Failed to fetch audits:', error);
      setAudits([]);
    } finally {
      setLoading(false);
    }
  };

  // Format tanggal bergabung
  const getJoinDate = () => {
    if (!user?.createdAt) return 'Invalid Date';
    const joinDate = new Date(user.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Hari Bergabung`;
  };

  // 🔥 INI BARU if (!user) RETURN
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="size-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-6xl text-white/20">lock</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">Akses Terbatas</h2>
          <p className="text-white/60 mb-8">Silakan login terlebih dahulu</p>
          <Link to="/login" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary/30">
            Login Sekarang
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-primary/30 overflow-x-hidden">
      {/* 🔥 FIX: FloatingLines Background dengan conditional rendering */}
      <div 
        ref={containerRef}
        style={{ 
          width: '100vw', 
          height: '100vh', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          zIndex: 0,
          pointerEvents: 'auto'
        }}
      >
        {floatingLinesReady && containerRef.current && <MemoizedFloatingLines />}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <main className="relative">
          
          {/* TOP BAR - Horizontal Profile Header */}
          <section className="relative px-6 pt-28 pb-8">
            <div className="max-w-7xl mx-auto">
              
              {/* Profile Banner Card - Horizontal Layout */}
              <div 
                className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl animate-fade-in-up"
                style={{
                  background: isPremium 
                    ? 'linear-gradient(90deg, rgba(91, 19, 236, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(10, 10, 12, 0.9) 100%)'
                    : 'linear-gradient(90deg, rgba(91, 19, 236, 0.1) 0%, rgba(10, 10, 12, 0.95) 100%)'
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 p-8 md:p-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    
                    {/* Avatar - Large Circle */}
                    <div className="relative flex-shrink-0">
                      <div className={`size-32 rounded-full flex items-center justify-center border-4 ${
                        isPremium 
                          ? 'bg-gradient-to-br from-primary to-purple-500 border-primary/50' 
                          : 'bg-white/10 border-white/20'
                      } shadow-xl`}>
                        <span className="material-symbols-outlined text-white text-6xl">person</span>
                      </div>
                      {isPremium && (
                        <div className="absolute -bottom-2 -right-2 size-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center border-4 border-[#0a0a0c]">
                          <span className="material-symbols-outlined text-white text-xl">workspace_premium</span>
                        </div>
                      )}
                    </div>

                    {/* User Info - Center */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h1 className="text-4xl md:text-5xl font-black text-white">
                          {user.name || user.email?.split('@')[0] || 'User'}
                        </h1>
                        {isPremium && (
                          <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full text-sm font-black uppercase tracking-wider">
                            <span className="material-symbols-outlined text-base">stars</span>
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-lg text-white/60 mb-4">{user.email}</p>
                      
                      {/* Quick Stats - Inline */}
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">description</span>
                          <span className="text-white/80"><span className="font-bold text-white">{totalAudits}</span> Audit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-green-400">trending_up</span>
                          <span className="text-white/80">Avg Score: <span className="font-bold text-white">{avgScore}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-blue-400">calendar_today</span>
                          <span className="text-white/80">Sejak {new Date(user.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions - Right */}
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                      <Link 
                        to="/audit"
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary/30 whitespace-nowrap"
                      >
                        <span className="material-symbols-outlined">add</span>
                        <span>Buat Audit</span>
                      </Link>
                      {!isPremium && (
                        <Link 
                          to="/pricing"
                          className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
                        >
                          <span className="material-symbols-outlined">workspace_premium</span>
                          <span>Upgrade</span>
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-medium px-6 py-3 rounded-xl transition-all whitespace-nowrap"
                      >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TAB NAVIGATION - Unique to Dashboard */}
          <section className="relative px-6 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 w-fit animate-fade-in-up stagger-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">dashboard</span>
                    Overview
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    activeTab === 'history'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">history</span>
                    Riwayat
                    {audits.length > 0 && (
                      <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">{audits.length}</span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* CONTENT AREA - Changes based on active tab */}
          <section className="relative px-6 pb-24">
            <div className="max-w-7xl mx-auto">
              
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  
                  {/* Stats Grid - 4 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
                    
                    {/* Card 1 */}
                    <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-primary/50 transition-all shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-2xl">description</span>
                        </div>
                      </div>
                      <p className="text-3xl font-black text-white mb-1">{totalAudits}</p>
                      <p className="text-sm text-white/60">Total Audit</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-green-500/50 transition-all shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="size-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-green-400 text-2xl">trending_up</span>
                        </div>
                      </div>
                      <p className="text-3xl font-black text-white mb-1">{avgScore}</p>
                      <p className="text-sm text-white/60">Rata-rata Score</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`size-12 rounded-xl flex items-center justify-center ${
                          isPremium ? 'bg-gradient-to-br from-primary to-purple-500' : 'bg-purple-500/20'
                        }`}>
                          <span className={`material-symbols-outlined text-2xl ${
                            isPremium ? 'text-white' : 'text-purple-400'
                          }`}>workspace_premium</span>
                        </div>
                      </div>
                      <p className="text-2xl font-black text-white mb-1">{isPremium ? 'Premium' : 'Free'}</p>
                      <p className="text-sm text-white/60">Status Akun</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-blue-500/50 transition-all shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="size-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-blue-400 text-2xl">timer</span>
                        </div>
                      </div>
                      <p className="text-2xl font-black text-white mb-1">
                        {Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))}
                      </p>
                      <p className="text-sm text-white/60">Hari Bergabung</p>
                    </div>
                  </div>

                  {/* Recent Audits - Card Grid */}
                  <div className="animate-fade-in-up stagger-1">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-black">Audit Terbaru</h2>
                      {audits.length > 3 && (
                        <button
                          onClick={() => setActiveTab('history')}
                          className="text-primary hover:underline font-medium text-sm"
                        >
                          Lihat Semua →
                        </button>
                      )}
                    </div>

                    {loading ? (
                      <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-12 text-center">
                        <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/60">Memuat data...</p>
                      </div>
                    ) : recentAudits.length === 0 ? (
                      <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-12 text-center">
                        <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                          <span className="material-symbols-outlined text-white/30 text-4xl">description</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Belum Ada Audit</h3>
                        <p className="text-white/60 mb-6">Buat audit pertama untuk melihat hasilnya di sini</p>
                        <Link 
                          to="/audit"
                          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl transition-all"
                        >
                          <span className="material-symbols-outlined">add</span>
                          Buat Audit Pertama
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentAudits.map((audit, index) => {
                          const auditScore = audit.finalScore || audit.totalScore || 0;
                          const auditSalary = audit.salary || audit.answers?.[0]?.salary || 0;
                          const remainingMoney = audit.remainingMoney || 0;
                          
                          const getZone = (score) => {
                            if (score >= 70) return 'Hijau';
                            if (score >= 40) return 'Kuning';
                            return 'Merah';
                          };
                          
                          const zone = audit.zone || getZone(auditScore);
                          
                          return (
                            <Link
                              key={audit.id}
                              to={`/results?auditId=${audit.id}`}
                              className="group bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-primary/50 transition-all hover:scale-105 shadow-xl"
                              style={{animationDelay: `${index * 0.1}s`}}
                            >
                              {/* Date */}
                              <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                {new Date(audit.createdAt || audit.created_at || Date.now()).toLocaleDateString('id-ID', { 
                                  day: 'numeric', 
                                  month: 'short' 
                                })}
                              </div>

                              {/* Score Circle */}
                              <div className="flex items-center justify-center mb-6">
                                <div className={`relative size-24 rounded-full flex items-center justify-center border-4 ${
                                  auditScore >= 70 ? 'border-green-500/30 bg-green-500/10' :
                                  auditScore >= 40 ? 'border-yellow-500/30 bg-yellow-500/10' :
                                  'border-red-500/30 bg-red-500/10'
                                }`}>
                                  <span className={`text-3xl font-black ${
                                    auditScore >= 70 ? 'text-green-400' :
                                    auditScore >= 40 ? 'text-yellow-400' :
                                    'text-red-400'
                                  }`}>
                                    {auditScore}
                                  </span>
                                </div>
                              </div>

                              {/* Details */}
                              <div className="space-y-2 mb-4">
                                {auditSalary > 0 && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-white/60">Gaji:</span>
                                    <span className="font-semibold text-white">
                                      Rp {auditSalary.toLocaleString('id-ID')}
                                    </span>
                                  </div>
                                )}
                                <div className="flex justify-between text-sm">
                                  <span className="text-white/60">Sisa:</span>
                                  <span className={`font-semibold ${
                                    remainingMoney > 0 ? 'text-green-400' : 'text-red-400'
                                  }`}>
                                    Rp {remainingMoney.toLocaleString('id-ID')}
                                  </span>
                                </div>
                              </div>

                              {/* Zona Badge */}
                              <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                                zone === 'Hijau' ? 'bg-green-500/20 text-green-400' :
                                zone === 'Kuning' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                Zona {zone}
                              </div>

                              {/* Hover Indicator */}
                              <div className="flex items-center gap-2 text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-sm font-medium">Lihat Detail</span>
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Premium Upsell */}
                  {!isPremium && (
                    <div 
                      className="relative overflow-hidden rounded-3xl p-10 border-2 border-primary/50 shadow-2xl animate-fade-in-up stagger-2"
                      style={{
                        background: 'linear-gradient(135deg, rgba(91, 19, 236, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(10, 10, 12, 0.9) 100%)'
                      }}
                    >
                      <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/30 rounded-full blur-3xl"></div>
                      
                      <div className="relative z-10 text-center max-w-2xl mx-auto">
                        <div className="size-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
                          <span className="material-symbols-outlined text-white text-3xl">workspace_premium</span>
                        </div>
                        <h3 className="text-3xl font-black mb-3">Unlock Premium Features</h3>
                        <p className="text-lg text-white/70 mb-8">
                          Dapatkan akses unlimited audit, simulasi jangka panjang, dan laporan PDF profesional
                        </p>
                        <Link
                          to="/pricing"
                          className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#0a0a0c] font-black px-10 py-4 rounded-xl transition-all hover:scale-105 shadow-xl"
                        >
                          Lihat Paket Premium
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* HISTORY TAB */}
              {activeTab === 'history' && (
                <div className="animate-fade-in-up">
                  <div className="bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                    
                    {loading ? (
                      <div className="p-20 text-center">
                        <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/60">Memuat riwayat...</p>
                      </div>
                    ) : audits.length === 0 ? (
                      <div className="p-20 text-center">
                        <div className="size-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                          <span className="material-symbols-outlined text-white/30 text-5xl">history</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Belum Ada Riwayat</h3>
                        <p className="text-white/60 mb-8">Mulai buat audit untuk melihat history di sini</p>
                        <Link 
                          to="/audit"
                          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl transition-all"
                        >
                          <span className="material-symbols-outlined">add</span>
                          Buat Audit
                        </Link>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                              <th className="text-left py-4 px-6 text-sm font-bold text-white/80 uppercase">Tanggal</th>
                              <th className="text-left py-4 px-6 text-sm font-bold text-white/80 uppercase">Gaji</th>
                              <th className="text-center py-4 px-6 text-sm font-bold text-white/80 uppercase">Score</th>
                              <th className="text-center py-4 px-6 text-sm font-bold text-white/80 uppercase">Zona</th>
                              <th className="text-right py-4 px-6 text-sm font-bold text-white/80 uppercase">Sisa</th>
                              <th className="text-center py-4 px-6 text-sm font-bold text-white/80 uppercase">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {audits.map((audit) => {
                              const auditScore = audit.finalScore || audit.totalScore || 0;
                              const auditSalary = audit.salary || audit.answers?.[0]?.salary || 0;
                              const remainingMoney = audit.remainingMoney || 0;
                              const getZone = (score) => {
                                if (score >= 70) return 'Hijau';
                                if (score >= 40) return 'Kuning';
                                return 'Merah';
                              };
                              const zone = audit.zone || getZone(auditScore);
                              
                              return (
                                <tr key={audit.id} className="hover:bg-white/5 transition-colors group">
                                  <td className="py-4 px-6 text-white/80">
                                    {new Date(audit.createdAt || audit.created_at || Date.now()).toLocaleDateString('id-ID')}
                                  </td>
                                  <td className="py-4 px-6 font-semibold text-white">
                                    {auditSalary > 0 ? `Rp ${auditSalary.toLocaleString('id-ID')}` : 'N/A'}
                                  </td>
                                  <td className="py-4 px-6 text-center">
                                    <span className={`text-xl font-black ${
                                      auditScore >= 70 ? 'text-green-400' :
                                      auditScore >= 40 ? 'text-yellow-400' : 'text-red-400'
                                    }`}>
                                      {auditScore}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6 text-center">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                                      zone === 'Hijau' ? 'bg-green-500/20 text-green-400' :
                                      zone === 'Kuning' ? 'bg-yellow-500/20 text-yellow-400' :
                                      'bg-red-500/20 text-red-400'
                                    }`}>
                                      {zone}
                                    </span>
                                  </td>
                                  <td className={`py-4 px-6 text-right font-semibold ${
                                    remainingMoney > 0 ? 'text-green-400' : 'text-red-400'
                                  }`}>
                                    Rp {remainingMoney.toLocaleString('id-ID')}
                                  </td>
                                  <td className="py-4 px-6 text-center">
                                    <Link
                                      to={`/results?auditId=${audit.id}`}
                                      className="inline-flex items-center gap-1 text-primary hover:underline font-medium text-sm"
                                    >
                                      Detail
                                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;