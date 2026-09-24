import FloatingLines from '../components/FloatingLines'
import Footer from '../components/Footer'
import MobileMenu from '../components/MobileMenu'

function TermsOfService() {
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
        <header className="glass-header border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">analytics</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-white uppercase italic">HIDUP LOGIS</h2>
            </a>
            <nav className="hidden md:flex items-center gap-10">
              <a className="text-sm font-medium text-white/70 hover:text-white transition-colors" href="/metodologi">Metodologi</a>
              <a className="text-sm font-medium text-white/70 hover:text-white transition-colors" href="/faq">FAQ</a>
              <a className="text-sm font-medium text-white/70 hover:text-white transition-colors" href="/pricing">Harga</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="hidden md:block text-sm font-bold text-white/80 hover:text-white px-4 py-2 transition-colors">Login</button>
              <a href="/audit" className="hidden md:block bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all cta-glow">
                Mulai Sekarang
              </a>
              <MobileMenu />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <span className="material-symbols-outlined text-primary text-sm">gavel</span>
              <span className="text-sm font-semibold text-white/80">Legal Document</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Syarat & Ketentuan
            </h1>
            <p className="text-white/60">Terakhir diperbarui: 30 Januari 2026</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-8">
              <p className="text-white/80 leading-relaxed">
                Dengan mengakses dan menggunakan platform HIDUP LOGIS, Anda menyetujui untuk terikat dengan syarat dan ketentuan berikut. Mohon baca dengan seksama sebelum menggunakan layanan kami.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">1</span>
                </span>
                Penerimaan Ketentuan
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Dengan menggunakan platform HIDUP LOGIS, Anda secara otomatis menyetujui syarat dan ketentuan ini. Jika Anda tidak setuju dengan salah satu bagian dari ketentuan ini, Anda tidak diperkenankan untuk menggunakan layanan kami.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Kami berhak untuk mengubah, memodifikasi, atau mengganti bagian dari Syarat & Ketentuan ini kapan saja. Tanggung jawab Anda untuk memeriksa halaman ini secara berkala untuk melihat perubahan.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">2</span>
                </span>
                Layanan yang Disediakan
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  HIDUP LOGIS menyediakan platform decision intelligence untuk membantu pengguna mengevaluasi keputusan hidup (khususnya keputusan karir/pekerjaan) berdasarkan data finansial, waktu, dan keberlanjutan.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">Kami BUKAN:</strong>
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Konsultan karir atau financial advisor profesional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Platform coaching atau terapi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Penjamin hasil atau keputusan yang "benar"</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">3</span>
                </span>
                Akun Pengguna
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Untuk mengakses fitur tertentu, Anda mungkin diminta untuk membuat akun. Anda bertanggung jawab untuk:
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Menjaga kerahasiaan kredensial akun Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Semua aktivitas yang terjadi di bawah akun Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Memberikan informasi yang akurat dan terkini</span>
                  </li>
                </ul>
                <p className="text-white/70 leading-relaxed">
                  Kami berhak untuk menangguhkan atau menghentikan akun Anda jika kami mencurigai adanya pelanggaran terhadap ketentuan ini.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">4</span>
                </span>
                Paket Gratis vs Premium
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">Paket Gratis:</strong>
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>3 audit per bulan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Hasil audit basic</span>
                  </li>
                </ul>
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">Paket Premium:</strong>
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Unlimited audit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Laporan PDF lengkap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Simulasi 6-12 bulan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>History audit tersimpan</span>
                  </li>
                </ul>
                <p className="text-white/70 leading-relaxed">
                  Pembayaran untuk paket Premium bersifat berlangganan dan akan diperpanjang secara otomatis kecuali Anda membatalkannya.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">5</span>
                </span>
                Disclaimer & Batasan Tanggung Jawab
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">PENTING:</strong> HIDUP LOGIS menyediakan alat analisis berdasarkan data yang Anda masukkan. Kami TIDAK memberikan saran profesional dalam bidang keuangan, hukum, atau karir.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  Keputusan akhir sepenuhnya ada di tangan Anda. Kami tidak bertanggung jawab atas:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Kerugian finansial atau non-finansial yang timbul dari keputusan Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Akurasi data yang Anda masukkan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Hasil atau konsekuensi dari implementasi rekomendasi kami</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">6</span>
                </span>
                Pembayaran & Refund
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Semua pembayaran untuk paket Premium diproses melalui payment gateway pihak ketiga yang aman.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">Kebijakan Refund:</strong>
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>14 hari money-back guarantee untuk pembayaran pertama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Refund 100% tanpa pertanyaan jika request dalam 14 hari pertama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Setelah 14 hari, tidak ada refund untuk periode yang sudah berjalan</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">7</span>
                </span>
                Hak Kekayaan Intelektual
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Semua konten, fitur, dan fungsionalitas platform HIDUP LOGIS (termasuk tapi tidak terbatas pada teks, grafik, logo, ikon, gambar, audio, video, software, dan code) adalah milik eksklusif HIDUP LOGIS dan dilindungi oleh hukum hak cipta internasional.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Anda tidak diperbolehkan untuk mereproduksi, mendistribusikan, memodifikasi, atau menggunakan konten kami tanpa izin tertulis.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">8</span>
                </span>
                Kontak
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami:
                </p>
                <div className="space-y-2">
                  <p className="text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">email</span>
                    <a href="mailto:legal@hiduplogis.com" className="hover:text-primary transition-colors">
                      legal@hiduplogis.com
                    </a>
                  </p>
                  <p className="text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">support</span>
                    <a href="mailto:support@hiduplogis.com" className="hover:text-primary transition-colors">
                      support@hiduplogis.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-sm text-white/80 text-center">
              Dengan menggunakan HIDUP LOGIS, Anda mengonfirmasi bahwa Anda telah membaca, memahami, dan menyetujui Syarat & Ketentuan ini.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default TermsOfService