import FloatingLines from '../components/FloatingLines'
import Footer from '../components/Footer'
import MobileMenu from '../components/MobileMenu'

function PrivacyPolicy() {
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
              <span className="material-symbols-outlined text-primary text-sm">shield</span>
              <span className="text-sm font-semibold text-white/80">Privacy & Data Protection</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Kebijakan Privasi
            </h1>
            <p className="text-white/60">Terakhir diperbarui: 30 Januari 2026</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-8">
              <p className="text-white/80 leading-relaxed">
                Di HIDUP LOGIS, privasi Anda adalah prioritas kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">1</span>
                </span>
                Informasi yang Kami Kumpulkan
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">Informasi Akun:</strong>
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Nama (opsional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Password (terenkripsi)</span>
                  </li>
                </ul>
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">Data Audit:</strong>
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Data finansial (gaji, pengeluaran) yang Anda masukkan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Jam kerja dan target tabungan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Hasil audit dan scoring</span>
                  </li>
                </ul>
                <p className="text-white/70 leading-relaxed">
                  <strong className="text-white">Data Teknis:</strong> IP address, browser type, device information, dan timestamp untuk keamanan dan analitik.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">2</span>
                </span>
                Bagaimana Kami Menggunakan Data Anda
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Kami menggunakan informasi yang dikumpulkan untuk:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Menyediakan layanan decision audit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Menyimpan history audit Anda (untuk user Premium)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Mengelola akun dan pembayaran Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Meningkatkan kualitas layanan kami</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Mengirim update dan notifikasi terkait akun Anda</span>
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
                Penyimpanan dan Keamanan Data
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">Keamanan:</strong>
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Password di-hash menggunakan bcrypt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Data disimpan di database terenkripsi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>HTTPS/SSL untuk semua komunikasi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Access control ketat untuk data sensitif</span>
                  </li>
                </ul>
                <p className="text-white/70 leading-relaxed">
                  <strong className="text-white">Durasi Penyimpanan:</strong> Data akun dan audit disimpan selama akun Anda aktif. Setelah penghapusan akun, data akan dihapus dalam 30 hari.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">4</span>
                </span>
                Berbagi Data dengan Pihak Ketiga
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  <strong className="text-white">Kami TIDAK pernah menjual data Anda.</strong>
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  Kami hanya berbagi data dengan pihak ketiga dalam kondisi berikut:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-white">Payment processors:</strong> Untuk memproses pembayaran Premium (Midtrans, Xendit, dll)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-white">Cloud hosting:</strong> Data disimpan di server cloud yang aman</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-white">Kewajiban hukum:</strong> Jika diwajibkan oleh hukum atau proses legal</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">5</span>
                </span>
                Hak Anda atas Data
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Anda memiliki hak untuk:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-white">Akses:</strong> Melihat data pribadi yang kami simpan tentang Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-white">Koreksi:</strong> Meminta perbaikan data yang tidak akurat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-white">Penghapusan:</strong> Menghapus akun dan semua data terkait</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-white">Portabilitas:</strong> Mengekspor data Anda dalam format yang dapat dibaca mesin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-white">Keberatan:</strong> Menolak pemrosesan data tertentu</span>
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
                Cookies dan Tracking
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Kami menggunakan cookies dan teknologi tracking serupa untuk:
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Menjaga sesi login Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Mengingat preferensi Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Analitik penggunaan platform (anonymous)</span>
                  </li>
                </ul>
                <p className="text-white/70 leading-relaxed">
                  Anda dapat mengatur browser Anda untuk menolak cookies, namun beberapa fitur platform mungkin tidak berfungsi dengan baik.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">7</span>
                </span>
                Privasi Anak-anak
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed">
                  HIDUP LOGIS tidak ditujukan untuk anak-anak di bawah 18 tahun. Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak. Jika Anda adalah orang tua/wali dan mengetahui bahwa anak Anda memberikan informasi pribadi kepada kami, silakan hubungi kami.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">8</span>
                </span>
                Perubahan Kebijakan
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed">
                  Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diposting di halaman ini dengan tanggal "Terakhir diperbarui" yang baru. Kami akan memberi tahu Anda tentang perubahan signifikan melalui email atau notifikasi di platform.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black">9</span>
                </span>
                Kontak
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 leading-relaxed mb-4">
                  Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda atas data, silakan hubungi:
                </p>
                <div className="space-y-2">
                  <p className="text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">email</span>
                    <a href="mailto:privacy@hiduplogis.com" className="hover:text-primary transition-colors">
                      privacy@hiduplogis.com
                    </a>
                  </p>
                  <p className="text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">shield</span>
                    <span>Data Protection Officer: HIDUP LOGIS</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl flex-shrink-0">verified_user</span>
              <div>
                <p className="text-white font-bold mb-2">Komitmen Kami terhadap Privasi Anda</p>
                <p className="text-sm text-white/80">
                  Kami memahami pentingnya privasi data finansial Anda. HIDUP LOGIS dibangun dengan prinsip privacy-by-design dan kami berkomitmen untuk melindungi informasi Anda.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default PrivacyPolicy