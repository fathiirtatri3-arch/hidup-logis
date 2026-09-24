import { memo } from 'react';
import FloatingLines from '../components/FloatingLines'
import Footer from '../components/Footer'

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

function Metodologi() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] font-display text-white selection:bg-primary/30 overflow-x-hidden">
      {/* FloatingLines Background */}
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
        <main className="relative">
          
          {/* Hero Section - Asymmetric */}
          <section className="relative px-6 pt-32 pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full animate-fade-in-up stagger-1">
                    <span className="material-symbols-outlined text-primary text-sm">science</span>
                    <span className="text-sm font-semibold text-white/80">Transparent by Design</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] animate-fade-in-up stagger-2">
                    <span className="block text-white">Bagaimana Kami</span>
                    <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Menganalisis</span>
                    <span className="block text-white">Keputusanmu?</span>
                  </h1>
                  
                  <p className="text-xl text-white/60 max-w-2xl leading-relaxed animate-fade-in-up stagger-3">
                    HIDUP LOGIS menggunakan framework scoring transparan yang bisa kamu verifikasi sendiri. Tidak ada algoritma rahasia atau manipulasi angka.
                  </p>
                </div>

                {/* Right Side - Floating Formula Card */}
                <div className="lg:col-span-5 relative h-[400px] hidden lg:block">
                  <div 
                    className="absolute top-0 right-0 w-full p-8 rounded-3xl bg-[#0a0a0c]/80 backdrop-blur-xl border border-primary/40 shadow-2xl"
                    style={{
                      animation: 'fadeInCard 0.8s ease-out 0.5s forwards',
                      opacity: 0,
                      background: 'linear-gradient(135deg, rgba(91, 19, 236, 0.15) 0%, rgba(10, 10, 12, 0.9) 100%)'
                    }}
                  >
                    <div className="text-center mb-6">
                      <div className="size-16 rounded-2xl bg-primary/30 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-4xl text-primary">calculate</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Formula Utama</h3>
                    </div>
                    <div className="bg-background-dark/50 rounded-xl p-6 mb-4">
                      <p className="text-center font-mono text-sm text-primary mb-2">
                        Decision Score =
                      </p>
                      <p className="text-center font-mono text-xs text-white/80">
                        (FS × 40%) + (TS × 25%) +
                      </p>
                      <p className="text-center font-mono text-xs text-white/80">
                        (SS × 20%) + (GAS × 15%)
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-bold">
                        Max: 100 poin
                      </span>
                    </div>
                  </div>

                  {/* Decorative blur */}
                  <div className="absolute top-20 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>

            {/* Background accent */}
            <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
          </section>

          {/* Prinsip Utama - Grid Asymmetric */}
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 animate-fade-in-up">
                <h2 className="text-4xl font-black mb-4">Prinsip Utama</h2>
                <p className="text-lg text-white/60">Tiga pilar yang menjadi fondasi analisis kami</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.06] hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up stagger-1">
                  <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">balance</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Netral dan Objektif</h3>
                  <p className="text-white/60 leading-relaxed">
                    Kami tidak punya kepentingan apapun terhadap keputusanmu. Angka bicara, bukan opini.
                  </p>
                </div>

                <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.06] hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up stagger-2">
                  <div className="size-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">visibility</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Transparan 100%</h3>
                  <p className="text-white/60 leading-relaxed">
                    Semua formula scoring kami terbuka. Kamu bisa hitung ulang sendiri jika mau.
                  </p>
                </div>

                <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.06] hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up stagger-3">
                  <div className="size-14 rounded-xl bg-green-500/20 flex items-center justify-center mb-6 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">database</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Berbasis Data</h3>
                  <p className="text-white/60 leading-relaxed">
                    Input kamu diproses dengan rumus matematis sederhana, bukan AI atau machine learning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Formula Section - Two Column Layout */}
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Header */}
              <div className="mb-16 max-w-3xl animate-fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">The Math Behind It</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">Formula Decision Score</h2>
                <p className="text-lg text-white/60">
                  Empat komponen utama yang membentuk skor keputusanmu
                </p>
              </div>

              {/* Main Formula Display */}
              <div className="bg-[#0a0a0c]/90 backdrop-blur-xl border border-primary/40 rounded-3xl p-12 mb-16 text-center animate-fade-in-up shadow-2xl" style={{
                background: 'linear-gradient(135deg, rgba(91, 19, 236, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(10, 10, 12, 0.95) 100%)'
              }}>
                <p className="text-3xl md:text-4xl font-mono font-bold text-primary mb-4">
                  Decision Score = <br className="md:hidden" />
                  (FS × 40%) + (TS × 25%) + <br className="md:hidden" />
                  (SS × 20%) + (GAS × 15%)
                </p>
                <p className="text-sm text-white/50">Total maksimal: 100 poin</p>
              </div>

              {/* Formula Components - Asymmetric Grid */}
              <div className="space-y-8">
                
                {/* FS - Large Left */}
                <div className="grid md:grid-cols-12 gap-6 animate-fade-in-up stagger-1">
                  <div className="md:col-span-8 bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-primary/50 transition-all shadow-xl">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Financial Score (FS)</h3>
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">Bobot 40%</span>
                      </div>
                    </div>
                    
                    <p className="text-white/60 mb-6 leading-relaxed">
                      Mengukur kemampuan finansial kamu untuk memenuhi target tabungan.
                    </p>
                    
                    <div className="bg-background-dark/50 rounded-xl p-6 space-y-3">
                      <p className="font-mono text-sm text-white/80">
                        Sisa Uang = Gaji Bersih - (Tempat Tinggal + Makan + Transport)
                      </p>
                      <p className="font-mono text-sm text-white/80">
                        Target Tabungan = Gaji Bersih × (Target % / 100)
                      </p>
                      <p className="font-mono text-sm text-primary font-bold">
                        FS = min(100, (Sisa Uang / Target Tabungan) × 100)
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-gradient-to-br from-primary/10 to-purple-500/5 border border-primary/20 rounded-2xl p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-black text-primary mb-2">40%</div>
                      <p className="text-sm text-white/60">Kontribusi Tertinggi</p>
                    </div>
                  </div>
                </div>

                {/* TS - Small Right */}
                <div className="grid md:grid-cols-12 gap-6 animate-fade-in-up stagger-2">
                  <div className="md:col-span-4 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-2xl p-6 flex items-center justify-center order-2 md:order-1">
                    <div className="text-center">
                      <div className="text-6xl font-black text-purple-400 mb-2">25%</div>
                      <p className="text-sm text-white/60">Bobot Time Score</p>
                    </div>
                  </div>

                  <div className="md:col-span-8 bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-purple-500/50 transition-all shadow-xl order-1 md:order-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="size-14 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                        <span className="material-symbols-outlined text-3xl">schedule</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Time Score (TS)</h3>
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">Bobot 25%</span>
                      </div>
                    </div>
                    
                    <p className="text-white/60 mb-6 leading-relaxed">
                      Mengukur rasionalitas jam kerja vs standar industri (40 jam/minggu).
                    </p>
                    
                    <div className="bg-background-dark/50 rounded-xl p-6">
                      <p className="font-mono text-sm text-purple-400 font-bold">
                        TS = max(0, 100 - ((Jam Kerja - 40) × 2))
                      </p>
                      <p className="text-xs text-white/50 mt-3">
                        Setiap jam kerja di atas 40 jam mengurangi 2 poin
                      </p>
                    </div>
                  </div>
                </div>

                {/* SS & GAS - Two Columns */}
                <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up stagger-3">
                  <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-green-500/50 transition-all shadow-xl">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="size-14 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                        <span className="material-symbols-outlined text-3xl">eco</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Sustainability Score</h3>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">Bobot 20%</span>
                      </div>
                    </div>
                    
                    <p className="text-white/60 mb-4 text-sm">
                      Mengukur ketahanan finansial jangka panjang.
                    </p>
                    
                    <div className="bg-background-dark/50 rounded-xl p-4">
                      <p className="font-mono text-xs text-white/80 mb-2">
                        IF Sisa Uang &gt; 0:
                      </p>
                      <p className="font-mono text-sm text-green-400 ml-4 mb-2">
                        SS = 80
                      </p>
                      <p className="font-mono text-xs text-white/80 mb-2">
                        ELSE:
                      </p>
                      <p className="font-mono text-sm text-red-400 ml-4">
                        SS = 20
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-orange-500/50 transition-all shadow-xl">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="size-14 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                        <span className="material-symbols-outlined text-3xl">flag</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Goal Alignment Score</h3>
                        <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">Bobot 15%</span>
                      </div>
                    </div>
                    
                    <p className="text-white/60 mb-4 text-sm">
                      Mengukur kesesuaian dengan target pribadi kamu.
                    </p>
                    
                    <div className="bg-background-dark/50 rounded-xl p-4">
                      <p className="font-mono text-xs text-white/80 mb-2">
                        IF Sisa ≥ Target:
                      </p>
                      <p className="font-mono text-sm text-orange-400 ml-4 mb-2">
                        GAS = 90
                      </p>
                      <p className="font-mono text-xs text-white/80 mb-2">
                        ELSE:
                      </p>
                      <p className="font-mono text-sm text-yellow-400 ml-4">
                        GAS = 50
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Zona Keputusan - Cards with Icons */}
          <section className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
              
              <div className="mb-16 text-center animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-black mb-6">Interpretasi Zona Keputusan</h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  Tiga kategori yang menentukan tingkat kelayakan keputusanmu
                </p>
              </div>

              <div className="space-y-6">
                {/* Hijau */}
                <div className="grid md:grid-cols-12 gap-6 items-center animate-fade-in-up stagger-1">
                  <div className="md:col-span-3 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
                    <div className="size-20 mx-auto rounded-2xl bg-green-500/30 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-5xl text-green-400">check_circle</span>
                    </div>
                    <div className="text-4xl font-black text-green-400 mb-2">70-100</div>
                    <p className="text-sm text-white/60">Zona Hijau</p>
                  </div>

                  <div className="md:col-span-9 bg-[#0a0a0c]/85 backdrop-blur-xl border border-green-500/40 rounded-2xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-green-400 mb-3">Logis dan Layak Dijalani</h3>
                    <p className="text-white/80 leading-relaxed">
                      Keputusan ini masuk akal secara finansial dan waktu. Kamu punya margin yang cukup untuk menabung dan menjalani hidup dengan nyaman.
                    </p>
                  </div>
                </div>

                {/* Kuning */}
                <div className="grid md:grid-cols-12 gap-6 items-center animate-fade-in-up stagger-2">
                  <div className="md:col-span-9 bg-[#0a0a0c]/85 backdrop-blur-xl border border-yellow-500/40 rounded-2xl p-8 shadow-xl order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-3">Perlu Penyesuaian</h3>
                    <p className="text-white/80 leading-relaxed">
                      Keputusan ini bisa dijalani, tapi dengan risiko finansial menengah. Pertimbangkan untuk negosiasi gaji, kurangi pengeluaran, atau cari sumber penghasilan tambahan.
                    </p>
                  </div>

                  <div className="md:col-span-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center order-1 md:order-2">
                    <div className="size-20 mx-auto rounded-2xl bg-yellow-500/30 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-5xl text-yellow-400">warning</span>
                    </div>
                    <div className="text-4xl font-black text-yellow-400 mb-2">40-69</div>
                    <p className="text-sm text-white/60">Zona Kuning</p>
                  </div>
                </div>

                {/* Merah */}
                <div className="grid md:grid-cols-12 gap-6 items-center animate-fade-in-up stagger-3">
                  <div className="md:col-span-3 bg-gradient-to-br from-red-500/20 to-pink-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
                    <div className="size-20 mx-auto rounded-2xl bg-red-500/30 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-5xl text-red-400">cancel</span>
                    </div>
                    <div className="text-4xl font-black text-red-400 mb-2">0-39</div>
                    <p className="text-sm text-white/60">Zona Merah</p>
                  </div>

                  <div className="md:col-span-9 bg-[#0a0a0c]/85 backdrop-blur-xl border border-red-500/40 rounded-2xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-red-400 mb-3">Berisiko Tinggi</h3>
                    <p className="text-white/80 leading-relaxed">
                      Keputusan ini berpotensi menyulitkan keuanganmu dalam 3 bulan ke depan. Sangat disarankan untuk mencari alternatif atau melakukan penyesuaian signifikan sebelum menerima.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Yang TIDAK Kami Lakukan */}
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
              
              <div className="mb-12 animate-fade-in-up">
                <h2 className="text-4xl font-black mb-4">Yang TIDAK Kami Lakukan</h2>
                <p className="text-lg text-white/60">Kami tidak melakukan hal-hal berikut dalam proses analisis</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all animate-fade-in-up stagger-1">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-red-400 flex-shrink-0 text-2xl">close</span>
                    <p className="text-white/80 leading-relaxed">
                      Kami tidak menggunakan AI atau machine learning untuk scoring. Semua kalkulasi menggunakan rumus matematis sederhana.
                    </p>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all animate-fade-in-up stagger-2">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-red-400 flex-shrink-0 text-2xl">close</span>
                    <p className="text-white/80 leading-relaxed">
                      Kami tidak menyimpan data pribadi kamu di server. Semua proses terjadi di browser kamu sendiri.
                    </p>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all animate-fade-in-up stagger-3">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-red-400 flex-shrink-0 text-2xl">close</span>
                    <p className="text-white/80 leading-relaxed">
                      Kami tidak memberi saran emosional atau motivasi. Ini bukan konseling karir, ini audit angka.
                    </p>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all animate-fade-in-up stagger-4">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-red-400 flex-shrink-0 text-2xl">close</span>
                    <p className="text-white/80 leading-relaxed">
                      Kami tidak menentukan keputusan benar atau salah. Kami hanya menunjukkan konsekuensi matematis dari pilihan kamu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 px-6 relative">
            <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
              <h2 className="text-5xl font-black mb-6">
                Siap untuk <span className="text-gradient">Audit Pertama?</span>
              </h2>
              <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                Sekarang kamu sudah paham cara kerjanya. Saatnya cek apakah keputusan hidupmu masuk akal secara matematis.
              </p>
              <a href="/audit" className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white text-lg font-bold px-12 py-6 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/30 group">
                <span>Mulai Audit Sekarang</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </a>
            </div>

            {/* Decorative background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 via-purple-500/10 to-pink-500/20 rounded-full blur-[100px]"></div>
            </div>
          </section>

          <Footer />
        </main>
      </div>

      {/* Add fadeInCard animation */}
      <style jsx>{`
        @keyframes fadeInCard {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Metodologi