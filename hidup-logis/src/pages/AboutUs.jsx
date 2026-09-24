import FloatingLines from '../components/FloatingLines'
import Footer from '../components/Footer'
import MobileMenu from '../components/MobileMenu'
import { useState, useEffect } from 'react'

function AboutUs() {
  const [stats, setStats] = useState({
    totalAudits: 2500,
    premiumUsers: 500,
    satisfactionRate: 87,
    foundedYear: 2024
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch stats dari backend
    fetch('http://localhost:5000/api/about/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching stats:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-background-dark font-display text-white selection:bg-primary/30">
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 0
      }}>
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
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <MobileMenu />

        <main className="max-w-4xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <span className="material-symbols-outlined text-primary text-sm">info</span>
              <span className="text-sm font-semibold text-white/80">Tentang Kami</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient">
              Keputusan Penting<br/>Butuh Data, Bukan Motivasi
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              HIDUP LOGIS lahir dari frustrasi melihat terlalu banyak orang menyesali keputusan hidup yang diambil berdasarkan emosi sesaat.
            </p>
          </div>

          {/* Origin Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Kenapa HIDUP LOGIS Ada?</h2>
            
            <div className="space-y-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">lightbulb</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Masalah yang Kami Lihat</h3>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Terlalu banyak fresh graduate dan early career professional yang menerima job offer hanya karena "gajinya keliatan gede" atau "nama perusahaannya keren", tanpa menghitung dampak nyata terhadap kehidupan mereka. Hasilnya? Penyesalan muncul 3-6 bulan kemudian ketika uang habis, waktu terkuras, dan hidup tidak berjalan seperti yang dibayangkan.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">psychology</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Solusi yang Kami Tawarkan</h3>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">
                  HIDUP LOGIS memberikan audit objektif berbasis data sebelum kamu mengambil keputusan. Bukan motivasi. Bukan janji manis. Hanya matematis murni yang menunjukkan konsekuensi riil dari pilihanmu. Kami percaya bahwa keputusan yang baik dimulai dari pemahaman yang jujur tentang realita, bukan harapan.
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Visi & Misi Kami</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/20 to-accent-violet/20 border border-primary/30 rounded-2xl p-8">
                <div className="size-14 rounded-xl bg-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-white text-3xl">visibility</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Visi</h3>
                <p className="text-white/80 leading-relaxed">
                  Menjadi platform decision intelligence terdepan di Indonesia yang membantu jutaan orang membuat keputusan hidup berbasis data, bukan emosi.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/20 to-accent-violet/20 border border-primary/30 rounded-2xl p-8">
                <div className="size-14 rounded-xl bg-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-white text-3xl">flag</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Misi</h3>
                <p className="text-white/80 leading-relaxed">
                  Menghilangkan penyesalan dari keputusan hidup dengan memberikan audit objektif, transparan, dan berbasis data yang bisa diakses oleh siapa saja.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Prinsip Kami</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-2xl">balance</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Objektif Total</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Kami tidak punya kepentingan terhadap keputusanmu. Tidak ada komisi, tidak ada afiliasi. Pure matematis.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-2xl">lock_open</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Transparan 100%</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Semua formula scoring kami terbuka. Tidak ada black box. Kamu bisa verifikasi sendiri.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-2xl">sentiment_neutral</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Tanpa Judgement</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Kami tidak menilai keputusanmu benar atau salah. Kami hanya menunjukkan konsekuensinya.
                </p>
              </div>
            </div>
          </div>

          {/* What We're NOT */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Yang BUKAN Kami</h2>
            
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-red-400 flex-shrink-0 mt-1">close</span>
                  <p className="text-white/80">
                    <strong className="text-white">Bukan konsultan karir.</strong> Kami tidak memberikan saran karir atau coaching personal. Kami adalah alat analisis.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-red-400 flex-shrink-0 mt-1">close</span>
                  <p className="text-white/80">
                    <strong className="text-white">Bukan platform motivasi.</strong> Kami tidak menjual mimpi atau janji sukses. Kami menampilkan realita.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-red-400 flex-shrink-0 mt-1">close</span>
                  <p className="text-white/80">
                    <strong className="text-white">Bukan peramal.</strong> Kami tidak bisa memprediksi masa depan. Kami hanya menghitung probabilitas berdasarkan data.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-red-400 flex-shrink-0 mt-1">close</span>
                  <p className="text-white/80">
                    <strong className="text-white">Bukan AI ajaib.</strong> Kami menggunakan rumus matematis sederhana yang transparan, bukan machine learning misterius.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats/Numbers */}
<div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">HIDUP LOGIS dalam Angka</h2>
            
            {loading ? (
              <div className="text-center text-white/60">Loading statistics...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {stats.totalAudits >= 1000 ? `${(stats.totalAudits / 1000).toFixed(1)}K+` : `${stats.totalAudits}+`}
                  </div>
                  <p className="text-white/60 text-sm">Total Audit</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {stats.premiumUsers}+
                  </div>
                  <p className="text-white/60 text-sm">User Premium</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {stats.satisfactionRate}%
                  </div>
                  <p className="text-white/60 text-sm">Satisfaction Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {stats.foundedYear}
                  </div>
                  <p className="text-white/60 text-sm">Didirikan</p>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-primary/20 to-accent-violet/20 border border-primary/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Siap Membuat Keputusan Lebih Baik?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Bergabunglah dengan ribuan orang yang sudah membuat keputusan hidup berbasis data, bukan emosi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/audit" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-10 py-5 rounded-xl transition-all cta-glow hover:scale-105">
                <span>Mulai Audit Gratis</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a href="/metodologi" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-10 py-5 rounded-xl transition-all">
                <span>Pelajari Metodologi</span>
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default AboutUs