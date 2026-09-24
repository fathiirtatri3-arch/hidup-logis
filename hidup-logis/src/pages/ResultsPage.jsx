import { useLocation, useNavigate } from 'react-router-dom'
import FloatingLines from '../components/FloatingLines'
import { useEffect, useState } from 'react'
import MobileMenu from '../components/MobileMenu'
import Footer from '../components/Footer'

function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Data dari AuditForm (melalui state navigation)
  const formData = location.state?.formData
  const auditResult = location.state?.auditResult
  const limitInfo = location.state?.limitInfo // ✅ TAMBAH LIMIT INFO
  
  // State untuk error handling
  const [error, setError] = useState('')

  useEffect(() => {
    // Jika tidak ada data auditResult, redirect ke form
    if (!auditResult) {
      console.log('❌ Tidak ada data hasil audit, redirect ke form...')
      navigate('/audit')
    } else {
      console.log('✅ Data hasil audit diterima:', auditResult)
      if (limitInfo) {
        console.log('📊 Limit info:', limitInfo)
      }
    }
  }, [auditResult, limitInfo, navigate])

  // Jika tidak ada data atau loading
  if (!auditResult) {
    return (
      <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Memuat hasil audit...</p>
        </div>
      </div>
    )
  }

  // Format zona dari backend ke format yang digunakan di frontend
  const formatZone = (zone) => {
    const zoneMap = {
      'Hijau': { 
        key: 'green', 
        label: 'Zona Hijau: Logis & Layak',
        color: { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' }
      },
      'Kuning': { 
        key: 'yellow', 
        label: 'Zona Kuning: Perlu Penyesuaian',
        color: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' }
      },
      'Merah': { 
        key: 'red', 
        label: 'Zona Merah: Berisiko Tinggi',
        color: { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' }
      }
    }
    
    return zoneMap[zone] || zoneMap['Merah']
  }

  const zoneInfo = formatZone(auditResult.zone)
  const zoneColors = zoneInfo.color

  // Hitung monthly time invested (jika tidak ada di backend)
  const workHours = formData?.workHours || 40
  const monthlyTimeInvested = Math.round(workHours * 4.33)

  return (
    <div className="min-h-screen bg-background-dark text-white">
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={6}
          lineDistance={5}
          interactive={true}
          linesGradient={['#5b13ec', '#8b5cf6', '#a78bfa']}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-red-400">error</span>
              <div>
                <p className="text-red-300 font-medium">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
      <MobileMenu />

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black mb-4">Decision Score</h1>
            
            {/* Score dari backend */}
            <div className="text-9xl font-black text-gradient">{auditResult.score}</div>
            
            <div className={`mt-6 inline-block px-8 py-4 rounded-2xl ${zoneColors.bg} border ${zoneColors.border}`}>
              <p className={`text-xl font-bold ${zoneColors.text}`}>{zoneInfo.label}</p>
            </div>
            
            {/* ✅ TAMBAH: Limit Info Banner */}
            {limitInfo && !limitInfo.isPremium && (
              <div className={`mt-6 mx-auto max-w-md rounded-xl p-4 ${
                limitInfo.remaining > 0 
                  ? 'bg-blue-500/10 border-blue-500/30' 
                  : 'bg-yellow-500/10 border-yellow-500/30'
              } border`}>
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined ${
                    limitInfo.remaining > 0 ? 'text-blue-400' : 'text-yellow-400'
                  }`}>
                    {limitInfo.remaining > 0 ? 'info' : 'warning'}
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-white">
                      {limitInfo.remaining > 0 ? 'Audit Gratis Tersisa' : 'Limit Gratis Habis'}
                    </p>
                    <p className="text-sm text-white/70">
                      Kamu telah menggunakan {limitInfo.used}/{limitInfo.limit} audit gratis bulan ini.
                      {limitInfo.remaining > 0 
                        ? ` Masih ada ${limitInfo.remaining} audit tersisa.`
                        : ' Limit akan reset bulan depan.'
                      }
                    </p>
                    {limitInfo.remaining === 0 && (
                      <a 
                        href="/pricing" 
                        className="text-yellow-300 underline text-sm mt-1 inline-block"
                      >
                        Upgrade ke Premium untuk audit tanpa batas →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Breakdown scores dari backend */}
            {auditResult.breakdown && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-sm text-white/60">Finansial</p>
                  <p className="text-xl font-bold">{auditResult.breakdown.financialScore || 0}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-sm text-white/60">Waktu</p>
                  <p className="text-xl font-bold">{auditResult.breakdown.timeScore || 0}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-sm text-white/60">Keberlanjutan</p>
                  <p className="text-xl font-bold">{auditResult.breakdown.sustainabilityScore || 0}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-sm text-white/60">Target</p>
                  <p className="text-xl font-bold">{auditResult.breakdown.goalScore || 0}</p>
                </div>
              </div>
            )}
          </div>

          {/* Reality Check dari backend */}
          <div className={`mb-12 p-8 rounded-2xl ${zoneColors.bg} border ${zoneColors.border}`}>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">visibility</span>
              Reality Check
            </h3>
            <p className="text-lg text-white italic">"{auditResult.realityCheck}"</p>
          </div>

          {/* Detail Hasil */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">payments</span>
                Sisa Uang Bulanan
              </h3>
              <p className="text-4xl font-black">Rp {auditResult.remainingMoney?.toLocaleString('id-ID') || '0'}</p>
              <p className="text-sm text-white/60 mt-2">Setelah dikurangi semua biaya hidup</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">schedule</span>
                Nilai Waktu per Jam
              </h3>
              <p className="text-4xl font-black">Rp {auditResult.timeCost?.toLocaleString('id-ID') || '0'}</p>
              <p className="text-sm text-white/60 mt-2">Gaji per jam kerja</p>
            </div>
          </div>

          {/* Waktu Terdedikasi (jika diperlukan) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">timer</span>
              Waktu Terdedikasi per Bulan
            </h3>
            <p className="text-4xl font-black">{monthlyTimeInvested} jam</p>
            <p className="text-sm text-white/60 mt-2">
              Berdasarkan {workHours} jam kerja per minggu
              {auditResult.savingsAmount > 0 && (
                <span className="block mt-2">
                  Potensi tabungan: <span className="text-green-400 font-bold">
                    Rp {auditResult.savingsAmount?.toLocaleString('id-ID') || '0'}
                  </span> ({formData?.savingsTarget || 0}% dari gaji)
                </span>
              )}
            </p>
          </div>

          {/* ✅ TAMBAH: Premium Upsell Contextual */}
          {limitInfo && !limitInfo.isPremium && limitInfo.remaining === 0 && (
            <div className="mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-yellow-400 text-2xl">lock_open</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Buka Akses Tanpa Batas!</h3>
                  <p className="text-white/80">
                    Limit audit gratis kamu sudah habis. Upgrade ke Premium untuk:
                  </p>
                  <ul className="text-sm text-white/70 mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-base">check_circle</span>
                      <span>Audit tanpa batas setiap bulan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-base">check_circle</span>
                      <span>Simulasi 6-12 bulan ke depan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-base">check_circle</span>
                      <span>Export laporan PDF lengkap</span>
                    </li>
                  </ul>
                  <a 
                    href="/pricing" 
                    className="mt-4 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    <span>Upgrade Sekarang</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Premium CTA */}
          <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent-violet/20 border-2 border-primary/50 p-8 md:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white text-3xl">workspace_premium</span>
                </div>
                <div>
                  <div className="inline-block px-3 py-1 bg-primary/20 rounded-full mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Premium Feature</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                    Ingin Analisis Lebih Mendalam?
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {limitInfo?.isPremium 
                      ? 'Selamat! Kamu sudah menikmati semua fitur Premium.'
                      : 'Upgrade ke Premium dan dapatkan insight yang lebih powerful untuk keputusan hidupmu.'
                    }
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary text-xl">picture_as_pdf</span>
                    <h4 className="font-bold text-white">Laporan PDF</h4>
                  </div>
                  <p className="text-sm text-white/60">Export hasil lengkap dengan visualisasi grafik profesional</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary text-xl">query_stats</span>
                    <h4 className="font-bold text-white">Simulasi 6-12 Bulan</h4>
                  </div>
                  <p className="text-sm text-white/60">Lihat proyeksi finansial dan time cost jangka panjang</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary text-xl">compare</span>
                    <h4 className="font-bold text-white">Bandingkan Keputusan</h4>
                  </div>
                  <p className="text-sm text-white/60">Compare hingga 5 job offers side-by-side</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-background-dark flex items-center justify-center text-xs font-bold">
                      👤
                    </div>
                    <div className="size-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 border-2 border-background-dark flex items-center justify-center text-xs font-bold">
                      👤
                    </div>
                    <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-background-dark flex items-center justify-center text-xs font-bold">
                      👤
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-white font-semibold">500+ pengguna Premium</p>
                    <p className="text-white/60">sudah membuat keputusan lebih baik</p>
                  </div>
                </div>

                {limitInfo?.isPremium ? (
                  <div className="px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <span className="text-green-400 font-bold">✅ Premium Aktif</span>
                  </div>
                ) : (
                  <a 
                    href="/pricing"
                    className="group flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl transition-all cta-glow hover:scale-105 active:scale-95"
                  >
                    <span>Lihat Paket Premium</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-400 text-base">check_circle</span>
                    <span>Mulai dari Rp 49.000/bulan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-400 text-base">check_circle</span>
                    <span>Cancel kapan saja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-400 text-base">check_circle</span>
                    <span>14 hari money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/audit" 
              className={`px-8 py-4 rounded-xl font-bold text-center transition-colors ${
                limitInfo?.remaining === 0 && !limitInfo?.isPremium
                  ? 'bg-white/5 border border-white/20 text-white/50 cursor-not-allowed'
                  : 'bg-white/5 border border-white/20 hover:bg-white/10 text-white'
              }`}
              onClick={(e) => {
                if (limitInfo?.remaining === 0 && !limitInfo?.isPremium) {
                  e.preventDefault()
                  navigate('/pricing')
                }
              }}
            >
              {limitInfo?.remaining === 0 && !limitInfo?.isPremium 
                ? 'Upgrade untuk Audit Lagi' 
                : 'Audit Lagi'
              }
            </a>
            <a 
              href="/" 
              className="px-8 py-4 bg-primary rounded-xl font-bold text-center cta-glow hover:bg-primary/90 transition-colors"
            >
              Kembali ke Beranda
            </a>
          </div>

          {/* Data Source Info */}
          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-primary">database</span>
              <h4 className="font-bold text-white">Sumber Data</h4>
            </div>
            <p className="text-sm text-white/70">
              Hasil analisis ini dihitung oleh <span className="font-bold text-primary">HIDUP LOGIS Scoring Engine v1.0</span> 
              berdasarkan input data yang kamu berikan. Skor dihitung dengan formula: Financial (40%), Time (25%), 
              Sustainability (20%), Goal Alignment (15%).
            </p>
            <div className="mt-3 text-xs text-white/50">
              <p>💡 <strong>Catatan:</strong> Hasil ini adalah simulasi berdasarkan data yang dimasukkan.</p>
              {limitInfo && !limitInfo.isPremium && limitInfo.remaining === 0 && (
                <p className="mt-2">
                  🔒 <strong>Free Tier:</strong> Kamu telah menggunakan {limitInfo.used}/{limitInfo.limit} audit gratis bulan ini.
                  <a href="/pricing" className="text-primary underline ml-1">
                    Upgrade ke Premium
                  </a> untuk akses tanpa batas.
                </p>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default ResultsPage