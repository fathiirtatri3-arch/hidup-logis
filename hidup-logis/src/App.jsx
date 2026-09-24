import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { memo, useMemo } from 'react';
import FloatingLines from './components/FloatingLines'
import MobileMenu from './components/MobileMenu'
import Footer from './components/Footer'
import Layout from './components/Layout';
import './custom-animations.css';

// ✅ MEMOIZE FloatingLines agar tidak re-render setiap kali
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

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    
    <div className="min-h-screen bg-[#0a0a0c] font-display text-white selection:bg-primary/30 overflow-x-hidden">
      
      {/* FloatingLines Background - MEMOIZED, tidak akan re-render */}
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 0,
        pointerEvents: 'auto'
      }}>
        <MemoizedFloatingLines />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Sticky Glassmorphism Header */}
        <header className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-white/10 animate-slide-down">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-2xl">analytics</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-white uppercase italic">HIDUP LOGIS</h2>
            </div>
            <nav className="hidden md:flex items-center gap-10">
              <a className="text-sm font-medium text-white/70 hover:text-white transition-colors" href="/metodologi">Metodologi</a>
              <a className="text-sm font-medium text-white/70 hover:text-white transition-colors" href="/faq">FAQ</a>
              <a className="text-sm font-medium text-white/70 hover:text-white transition-colors" href="/pricing">Premium</a>
              <a className="text-sm font-medium text-white hover:text-white transition-colors" href="/about">Tentang</a>
            </nav>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3">
                  <div className="size-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">person</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {user?.name || user?.email?.split('@')[0]}
                    </span>
                    <a href="/dashboard" className="text-xs text-white/60 hover:text-white">
                      Lihat Profil →
                    </a>
                  </div>
                </div>
              ) : (
                <a href="/login" className="hidden md:block text-sm font-bold text-white/80 hover:text-white px-4 py-2 transition-colors">
                  Login
                </a>
              )}
              
              <MobileMenu />
            </div>
          </div>
        </header>

        <main className="relative min-h-screen pt-20">
          
          {/* Hero Section - Asymmetric Layout */}
          <section className="relative px-6 py-16 lg:py-24 min-h-[90vh] flex items-center">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Side - Main Content */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Trust Badges - Floating Style */}
                  <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-1">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <span className="material-symbols-outlined text-primary text-base">database</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90">Data-Driven</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <span className="material-symbols-outlined text-primary text-base">balance</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90">100% Objektif</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <span className="material-symbols-outlined text-primary text-base">speed</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90">2 Menit</span>
                    </div>
                  </div>
                  
                  {/* Main Headline */}
                  <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight animate-fade-in-up stagger-2">
                      <span className="block text-white">Cek apakah</span>
                      <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">keputusan hidupmu</span>
                      <span className="block text-white">masuk akal.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed animate-fade-in-up stagger-3">
                      Audit keputusan kerja dan hidup berbasis data, bukan asumsi atau emosi. Bergabunglah dengan ribuan orang yang mulai hidup lebih logis.
                    </p>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up stagger-4">
                    <a href="/audit" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-5 text-lg font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60">
                      <span>Cek Realita Sekarang</span>
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-xl">arrow_forward</span>
                    </a>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-white/40">Mulai gratis, tanpa kartu kredit</p>
                      <div className="flex items-center gap-2 text-white/50">
                        <div className="flex -space-x-2">
                          <div className="size-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 ring-2 ring-[#0a0a0c]"></div>
                          <div className="size-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-[#0a0a0c]"></div>
                          <div className="size-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 ring-2 ring-[#0a0a0c]"></div>
                        </div>
                        <span className="text-xs font-medium">2,847+ pengguna aktif</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Floating Stats Cards */}
                <div className="lg:col-span-5 relative h-[500px] hidden lg:block">
                  
                  {/* Card 1 - Decision Score */}
                    <div className="absolute top-0 right-0 w-64 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300 animate-float"
                      style={{
                        animation: 'fadeInCard 0.8s ease-out 0.5s forwards',
                        opacity: 0
                      }}
                    >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-white/60 uppercase tracking-wider">Decision Score</span>
                      <span className="material-symbols-outlined text-green-400">trending_up</span>
                    </div>
                    <div className="text-5xl font-black text-white mb-2">87</div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                      <div className="h-full w-[87%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full animate-slide-in-left"></div>
                    </div>
                    <p className="text-xs text-white/50">Keputusan tergolong logis secara finansial</p>
                  </div>
                  
                  {/* Card 2 - Financial Breakdown */}
                  <div className="absolute top-32 right-12 w-56 p-5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 shadow-2xl hover:scale-105 transition-transform duration-300 animate-float"
                    style={{
                      animation: 'fadeInCard 0.8s ease-out 0.6s forwards',
                      opacity: 0
                    }}
                    >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-purple-400 text-xl">savings</span>
                      <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Sisa Uang</span>
                    </div>
                    <div className="text-3xl font-black text-white mb-1">Rp 2.4jt</div>
                    <p className="text-xs text-white/50">Per bulan setelah semua pengeluaran</p>
                  </div>
                  
                  {/* Card 3 - Time Cost */}
                  <div className="absolute top-64 right-4 w-52 p-5 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/10 backdrop-blur-xl border border-orange-500/30 shadow-2xl hover:scale-105 transition-transform duration-300 animate-float"
                    style={{
                      animation: 'fadeInCard 0.8s ease-out 0.7s forwards',
                      opacity: 0
                    }}
                    >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-orange-400 text-xl">schedule</span>
                      <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Time Cost</span>
                    </div>
                    <div className="text-3xl font-black text-white mb-1">52h/week</div>
                    <p className="text-xs text-white/50">Waktu kerja + commute</p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
                  <div className="absolute bottom-12 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 animate-pulse-slow"></div>
          </section>

          {/* Stats Bar - Full Width */}
          <section className="py-12 border-y border-white/10 bg-white/[0.02] backdrop-blur-sm animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center animate-scale-in stagger-1">
                  <div className="text-4xl font-black text-white mb-2">2,847+</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">Pengguna Aktif</div>
                </div>
                <div className="text-center animate-scale-in stagger-2">
                  <div className="text-4xl font-black text-white mb-2">15,392</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">Audit Selesai</div>
                </div>
                <div className="text-center animate-scale-in stagger-3">
                  <div className="text-4xl font-black text-white mb-2">92%</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">Satisfaction Rate</div>
                </div>
                <div className="text-center animate-scale-in stagger-4">
                  <div className="text-4xl font-black text-white mb-2">±2 min</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">Avg. Completion</div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Section - Asymmetric Grid */}
          <section className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16 max-w-2xl animate-fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Kenapa Hidup Logis?</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  Mengapa Audit<br/>Keputusan Penting?
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  Kami membantu Anda menghilangkan bias kognitif dan emosi sesaat dalam mengambil langkah besar melalui framework analytical yang teruji.
                </p>
              </div>
              
              {/* Asymmetric Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Large Feature Card - Spans 7 columns */}
                <div className="md:col-span-7 group relative overflow-hidden p-10 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent border border-white/10 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] animate-fade-in-up stagger-1">
                  <div className="relative z-10">
                    <div className="size-16 rounded-2xl bg-primary/30 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <span className="material-symbols-outlined text-4xl">verified_user</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4">Objektivitas Mutlak</h3>
                    <p className="text-white/60 leading-relaxed text-lg mb-6">
                      Algoritma kami dirancang untuk mengidentifikasi dan memitigasi bias konfirmasi yang seringkali mengaburkan visi Anda.
                    </p>
                    <a href="/metodologi" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                      Pelajari Metodologi
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </a>
                  </div>
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-transform duration-700"></div>
                </div>
                
                {/* Small Feature Card - Spans 5 columns */}
                <div className="md:col-span-5 group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up stagger-2">
                  <div className="size-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl">query_stats</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Analisis Data Historis</h3>
                  <p className="text-white/50 leading-relaxed">
                    Keputusan Anda diuji terhadap ribuan titik data pasar, tren karir, dan statistik probabilitas kesuksesan real-time.
                  </p>
                </div>
                
                {/* Medium Feature Card - Spans 5 columns */}
                <div className="md:col-span-5 group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up stagger-3">
                  <div className="size-14 rounded-xl bg-green-500/20 flex items-center justify-center mb-6 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl">psychology</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Rekomendasi Logis</h3>
                  <p className="text-white/50 leading-relaxed">
                    Bukan sekadar skor, Anda mendapatkan langkah-langkah mitigasi risiko yang bisa langsung diimplementasikan.
                  </p>
                </div>
                
                {/* Large Feature Card - Spans 7 columns */}
                <div className="md:col-span-7 group relative overflow-hidden p-10 rounded-3xl bg-gradient-to-br from-orange-500/20 via-red-500/10 to-transparent border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] animate-fade-in-up stagger-4">
                  <div className="relative z-10">
                    <div className="size-16 rounded-2xl bg-orange-500/30 flex items-center justify-center mb-6 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <span className="material-symbols-outlined text-4xl">insights</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4">Reality Check Berbasis Fakta</h3>
                    <p className="text-white/60 leading-relaxed text-lg mb-6">
                      Kami tidak memberikan motivasi palsu. Kami memberikan realitas yang Anda butuhkan untuk membuat keputusan terbaik.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold">No BS</span>
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold">Data-First</span>
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold">Honest</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works - Timeline Style */}
          <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-black mb-6">Cara Kerjanya</h2>
                <p className="text-lg text-white/60">Sederhana, cepat, dan langsung ke inti</p>
              </div>
              
              {/* Timeline Steps */}
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500 hidden md:block"></div>
                
                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="relative flex items-center gap-8 md:justify-end md:pr-[calc(50%+3rem)] animate-slide-in-right stagger-1">
                    <div className="flex-1 p-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-2xl">edit_note</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">Step 01</div>
                          <h3 className="text-xl font-bold mb-2">Input Data Keputusan</h3>
                          <p className="text-white/50 text-sm">Masukkan detail gaji, biaya hidup, dan target Anda dalam 2 menit</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 size-6 rounded-full bg-primary border-4 border-[#0a0a0c] z-10"></div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative flex items-center gap-8 md:pl-[calc(50%+3rem)] animate-slide-in-left stagger-2">
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 size-6 rounded-full bg-purple-500 border-4 border-[#0a0a0c] z-10"></div>
                    <div className="flex-1 p-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="size-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-2xl">analytics</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wider">Step 02</div>
                          <h3 className="text-xl font-bold mb-2">Analisis Otomatis</h3>
                          <p className="text-white/50 text-sm">Algoritma kami menghitung skor berdasarkan 20+ parameter finansial dan waktu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative flex items-center gap-8 md:justify-end md:pr-[calc(50%+3rem)] animate-slide-in-right stagger-3">
                    <div className="flex-1 p-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="size-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-2xl">assessment</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-pink-400 mb-2 uppercase tracking-wider">Step 03</div>
                          <h3 className="text-xl font-bold mb-2">Terima Hasil</h3>
                          <p className="text-white/50 text-sm">Dapatkan decision score, zona keputusan, dan reality check yang jujur</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 size-6 rounded-full bg-pink-500 border-4 border-[#0a0a0c] z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section - Bold & Centered */}
          <section className="py-32 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                Siap melihat realita dari<br/>
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">keputusan Anda?</span>
              </h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                Jangan biarkan emosi mengambil alih masa depan Anda. Dapatkan audit pertama Anda secara gratis dalam hitungan menit.
              </p>
              <a href="/audit" className="inline-flex items-center justify-center gap-3 bg-white text-[#0a0a0c] hover:bg-white/90 text-xl font-black px-12 py-6 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/20 group">
                <span>Cek Realita Sekarang</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-2xl">arrow_forward</span>
              </a>
              <p className="text-sm text-white/40 mt-6">Gratis selamanya • Tidak perlu kartu kredit • 2 menit saja</p>
            </div>
            
            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/30 via-purple-500/20 to-pink-500/30 rounded-full blur-[120px] animate-pulse-slow"></div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default App