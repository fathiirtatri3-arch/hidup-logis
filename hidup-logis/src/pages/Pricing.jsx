import { useState, memo } from 'react'
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

function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly')

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
          
          {/* Hero Section */}
          <section className="relative px-6 pt-32 pb-16">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in-up stagger-1">
                <span className="material-symbols-outlined text-primary text-sm">workspace_premium</span>
                <span className="text-sm font-semibold text-white/80">Pricing Plans</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 animate-fade-in-up stagger-2">
                <span className="block text-white">Pilih Paket</span>
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">yang Sesuai</span>
              </h1>
              
              <p className="text-xl text-white/60 mb-12 animate-fade-in-up stagger-3">
                Mulai gratis tanpa kartu kredit, upgrade kapan saja
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex gap-2 bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/20 rounded-full p-1.5 shadow-xl animate-fade-in-up stagger-4">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                    billingCycle === 'monthly' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Bulanan
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                    billingCycle === 'yearly' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Tahunan 
                  <span className="ml-2 text-xs font-bold text-green-400">Hemat 16%</span>
                </button>
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Free Plan Card */}
                <div className="group relative bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:border-white/30 transition-all duration-300 animate-fade-in-up stagger-1 shadow-2xl">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-2xl">rocket_launch</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black">Free</h3>
                        <p className="text-sm text-white/50">Untuk mencoba</p>
                      </div>
                    </div>
                    <p className="text-white/60 leading-relaxed">
                      Eksplorasi awal untuk mengenal HIDUP LOGIS tanpa komitmen
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black">Rp 0</span>
                      <span className="text-white/40 text-lg">/bulan</span>
                    </div>
                    <p className="text-sm text-white/50 mt-2">Gratis selamanya</p>
                  </div>

                  <a 
                    href="/audit" 
                    className="block w-full text-center bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-xl mb-8 transition-all hover:scale-105"
                  >
                    Mulai Gratis
                  </a>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-400 flex-shrink-0">check_circle</span>
                      <span className="text-white/80">1 audit per bulan</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-400 flex-shrink-0">check_circle</span>
                      <span className="text-white/80">Decision Score lengkap</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-400 flex-shrink-0">check_circle</span>
                      <span className="text-white/80">Breakdown skor basic</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-400 flex-shrink-0">check_circle</span>
                      <span className="text-white/80">Zona keputusan (Hijau/Kuning/Merah)</span>
                    </div>
                    
                    <div className="h-px bg-white/10 my-6"></div>
                    
                    <div className="flex items-start gap-3 opacity-40">
                      <span className="material-symbols-outlined text-white/30 flex-shrink-0">cancel</span>
                      <span className="text-white/40 line-through">Laporan PDF</span>
                    </div>
                    <div className="flex items-start gap-3 opacity-40">
                      <span className="material-symbols-outlined text-white/30 flex-shrink-0">cancel</span>
                      <span className="text-white/40 line-through">Simulasi 6-12 bulan</span>
                    </div>
                    <div className="flex items-start gap-3 opacity-40">
                      <span className="material-symbols-outlined text-white/30 flex-shrink-0">cancel</span>
                      <span className="text-white/40 line-through">Perbandingan keputusan</span>
                    </div>
                    <div className="flex items-start gap-3 opacity-40">
                      <span className="material-symbols-outlined text-white/30 flex-shrink-0">cancel</span>
                      <span className="text-white/40 line-through">History tersimpan</span>
                    </div>
                  </div>
                </div>

                {/* Premium Plan Card */}
                <div className="relative group animate-fade-in-up stagger-2">
                  {/* Popular Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-primary to-purple-500 px-6 py-2 rounded-full shadow-lg">
                      <span className="text-sm font-black uppercase tracking-wider">⭐ Paling Populer</span>
                    </div>
                  </div>

                  <div 
                    className="relative overflow-hidden bg-[#0a0a0c]/95 backdrop-blur-xl border-2 border-primary rounded-3xl p-10 shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(91, 19, 236, 0.15) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(10, 10, 12, 0.95) 100%)'
                    }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="relative z-10">
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="size-12 rounded-xl bg-primary/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-2xl">stars</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-black">Premium</h3>
                            <p className="text-sm text-primary">Recommended</p>
                          </div>
                        </div>
                        <p className="text-white/70 leading-relaxed">
                          Untuk pengambilan keputusan serius dengan insight mendalam
                        </p>
                      </div>

                      <div className="mb-8">
                        <div className="flex items-baseline gap-2">
                          <span className="text-6xl font-black text-primary">
                            Rp {billingCycle === 'yearly' ? '41' : '49'}.000
                          </span>
                          <span className="text-white/40 text-lg">/bulan</span>
                        </div>
                        {billingCycle === 'yearly' && (
                          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                            <span className="text-xs font-bold text-green-400">💰 Hemat Rp 96.000/tahun</span>
                          </div>
                        )}
                      </div>

                      <button className="w-full bg-primary hover:bg-primary/90 text-white font-black px-8 py-5 rounded-xl mb-8 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/50 group">
                        <span className="flex items-center justify-center gap-2">
                          Upgrade ke Premium
                          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </span>
                      </button>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary flex-shrink-0">verified</span>
                          <div>
                            <span className="text-white font-semibold block">Unlimited audit</span>
                            <span className="text-xs text-white/50">Audit sebanyak yang kamu mau</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary flex-shrink-0">verified</span>
                          <div>
                            <span className="text-white font-semibold block">Laporan PDF lengkap</span>
                            <span className="text-xs text-white/50">Download & simpan hasil audit</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary flex-shrink-0">verified</span>
                          <div>
                            <span className="text-white font-semibold block">Simulasi 6 dan 12 bulan</span>
                            <span className="text-xs text-white/50">Proyeksi jangka menengah & panjang</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary flex-shrink-0">verified</span>
                          <div>
                            <span className="text-white font-semibold block">Perbandingan 5 keputusan</span>
                            <span className="text-xs text-white/50">Side-by-side comparison</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary flex-shrink-0">verified</span>
                          <div>
                            <span className="text-white font-semibold block">History tersimpan selamanya</span>
                            <span className="text-xs text-white/50">Akses audit lama kapan saja</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary flex-shrink-0">verified</span>
                          <div>
                            <span className="text-white font-semibold block">Priority support</span>
                            <span className="text-xs text-white/50">Response &lt;24 jam (hari kerja)</span>
                          </div>
                        </div>
                      </div>

                      {/* Money Back Guarantee */}
                      <div className="mt-8 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-green-400">verified_user</span>
                          <div>
                            <p className="text-sm font-bold text-green-400">14 Hari Money-Back Guarantee</p>
                            <p className="text-xs text-white/60">100% refund jika tidak puas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Comparison Table */}
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-4xl font-black mb-4">Perbandingan Fitur</h2>
                <p className="text-lg text-white/60">Detail lengkap apa yang kamu dapatkan</p>
              </div>

              <div className="bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="text-left p-6 font-bold">Fitur</th>
                        <th className="text-center p-6 font-bold">Free</th>
                        <th className="text-center p-6 font-bold text-primary">Premium</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 text-white/80">Jumlah Audit</td>
                        <td className="p-6 text-center text-white/60">1/bulan</td>
                        <td className="p-6 text-center font-bold text-primary">Unlimited</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 text-white/80">Decision Score</td>
                        <td className="p-6 text-center"><span className="material-symbols-outlined text-green-400">check</span></td>
                        <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check</span></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 text-white/80">Laporan PDF</td>
                        <td className="p-6 text-center"><span className="material-symbols-outlined text-white/20">close</span></td>
                        <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check</span></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 text-white/80">Simulasi 6-12 bulan</td>
                        <td className="p-6 text-center"><span className="material-symbols-outlined text-white/20">close</span></td>
                        <td className="p-6 text-center"><span className="material-symbols-outlined text-primary">check</span></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 text-white/80">Perbandingan Keputusan</td>
                        <td className="p-6 text-center"><span className="material-symbols-outlined text-white/20">close</span></td>
                        <td className="p-6 text-center font-bold text-primary">Hingga 5</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 text-white/80">History Tersimpan</td>
                        <td className="p-6 text-center"><span className="material-symbols-outlined text-white/20">close</span></td>
                        <td className="p-6 text-center font-bold text-primary">Selamanya</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 text-white/80">Priority Support</td>
                        <td className="p-6 text-center text-white/40">3-5 hari</td>
                        <td className="p-6 text-center font-bold text-primary">&lt;24 jam</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-4xl font-black mb-4">Pertanyaan Seputar Pricing</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-primary/50 transition-all animate-fade-in-up stagger-1">
                  <h3 className="font-bold mb-2">Apakah bisa upgrade/downgrade kapan saja?</h3>
                  <p className="text-white/60 text-sm">Ya, kamu bisa upgrade atau downgrade paket kapan saja tanpa penalty. Perubahan akan berlaku di billing cycle berikutnya.</p>
                </div>

                <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-primary/50 transition-all animate-fade-in-up stagger-2">
                  <h3 className="font-bold mb-2">Bagaimana sistem pembayaran?</h3>
                  <p className="text-white/60 text-sm">Kami menerima transfer bank, e-wallet (GoPay, OVO, Dana), dan kartu kredit. Semua transaksi diproses aman melalui payment gateway terenkripsi.</p>
                </div>

                <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-primary/50 transition-all animate-fade-in-up stagger-3">
                  <h3 className="font-bold mb-2">Apakah ada diskon untuk mahasiswa?</h3>
                  <p className="text-white/60 text-sm">Ya! Mahasiswa dengan email kampus aktif mendapat diskon 50%. Hubungi support untuk verifikasi.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-6 relative">
            <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
              <h2 className="text-5xl font-black mb-6">
                Masih <span className="text-gradient">Ragu?</span>
              </h2>
              <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                Coba dulu dengan paket Free tanpa komitmen. Tidak perlu kartu kredit.
              </p>
              <a href="/audit" className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white text-xl font-black px-12 py-6 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/30 group">
                <span>Mulai Audit Sekarang</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </a>
            </div>

            {/* Decorative background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 via-purple-500/10 to-pink-500/20 rounded-full blur-[120px]"></div>
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

export default Pricing