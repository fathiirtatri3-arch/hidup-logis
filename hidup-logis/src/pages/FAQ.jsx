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

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      category: "Umum",
      icon: "info",
      color: "primary",
      questions: [
        {
          question: "Apa itu HIDUP LOGIS?",
          answer: "HIDUP LOGIS adalah platform decision intelligence yang membantu kamu mengevaluasi keputusan hidup (khususnya karir/pekerjaan) secara objektif berdasarkan data finansial, waktu, dan keberlanjutan. Kami memberikan skor dan analisis berbasis matematis, bukan opini atau motivasi."
        },
        {
          question: "Siapa yang sebaiknya menggunakan HIDUP LOGIS?",
          answer: "HIDUP LOGIS cocok untuk fresh graduate, early career professional, atau siapa saja yang sedang mempertimbangkan keputusan pekerjaan penting seperti menerima job offer, pindah kerja, atau negosiasi gaji. Terutama untuk mereka yang ingin membuat keputusan berbasis data, bukan emosi sesaat."
        },
        {
          question: "Apakah HIDUP LOGIS adalah konsultan karir?",
          answer: "Bukan. Kami bukan konsultan karir dan tidak memberikan saran emosional atau coaching. HIDUP LOGIS adalah alat audit keputusan yang menunjukkan konsekuensi matematis dari pilihan kamu. Keputusan akhir tetap di tangan kamu."
        }
      ]
    },
    {
      category: "Cara Kerja",
      icon: "settings",
      color: "purple",
      questions: [
        {
          question: "Bagaimana cara kerja sistem scoring?",
          answer: "Kami menggunakan 4 komponen scoring: Financial Score (40%), Time Score (25%), Sustainability Score (20%), dan Goal Alignment Score (15%). Semua formula transparan dan bisa kamu lihat di halaman Metodologi. Tidak ada AI atau 'algoritma rahasia' - semua perhitungan menggunakan rumus matematis sederhana."
        },
        {
          question: "Apakah data saya aman?",
          answer: "Ya, 100% aman. Semua kalkulasi dilakukan di browser kamu sendiri (client-side). Kami TIDAK menyimpan data finansial pribadi kamu di server. Untuk user Free, data tidak tersimpan sama sekali. Untuk user Premium, data tersimpan terenkripsi hanya untuk fitur history dan comparison."
        },
        {
          question: "Kenapa skor saya rendah padahal gaji saya cukup besar?",
          answer: "Skor rendah bisa terjadi karena beberapa faktor: (1) Pengeluaran terlalu tinggi dibanding gaji, (2) Jam kerja berlebihan (>50 jam/minggu), (3) Target tabungan tidak tercapai, atau (4) Sisa uang setelah pengeluaran wajib terlalu kecil. Cek breakdown skor untuk detail spesifik."
        },
        {
          question: "Apakah hasil audit ini pasti akurat?",
          answer: "Hasil audit akurat berdasarkan data yang KAMU masukkan. Jika input kamu realistis (gaji bersih sebenarnya, estimasi pengeluaran yang jujur), maka hasilnya akan akurat. HIDUP LOGIS tidak bisa membaca pikiran - akurasi tergantung kejujuran input kamu."
        }
      ]
    },
    {
      category: "Paket & Pembayaran",
      icon: "payments",
      color: "green",
      questions: [
        {
          question: "Apa perbedaan paket Free dan Premium?",
          answer: "Free: 1 audit/bulan, hasil basic, tidak ada laporan PDF. Premium: Unlimited audit, laporan PDF lengkap, simulasi 6-12 bulan, perbandingan hingga 5 keputusan, history tersimpan selamanya, dan priority support."
        },
        {
          question: "Bagaimana cara upgrade ke Premium?",
          answer: "Klik tombol 'Upgrade ke Premium' di halaman Pricing, pilih paket (bulanan/tahunan), lakukan pembayaran via transfer bank, e-wallet, atau kartu kredit. Akun kamu akan langsung ter-upgrade setelah pembayaran terverifikasi."
        },
        {
          question: "Apakah saya bisa downgrade dari Premium ke Free?",
          answer: "Ya, kamu bisa downgrade kapan saja tanpa penalty. History audit yang sudah dibuat saat Premium akan tetap tersimpan (read-only), tapi kamu tidak bisa membuat audit baru lebih dari 1x per bulan."
        },
        {
          question: "Apakah ada refund jika tidak puas?",
          answer: "Ya, kami memberikan 14 hari money-back guarantee untuk pembayaran pertama. Jika dalam 14 hari kamu tidak puas dengan Premium, kami akan refund 100% tanpa pertanyaan. Email ke support@hiduplogis.com untuk request refund."
        },
        {
          question: "Apakah ada diskon untuk mahasiswa atau corporate?",
          answer: "Ya! Mahasiswa dengan email kampus aktif dapat diskon 50%. Untuk corporate/kampus yang ingin akses untuk tim (10+ user), hubungi kami untuk harga khusus."
        }
      ]
    },
    {
      category: "Teknis & Troubleshooting",
      icon: "build",
      color: "orange",
      questions: [
        {
          question: "Apakah bisa digunakan di mobile?",
          answer: "Ya, HIDUP LOGIS fully responsive dan bisa diakses dari smartphone, tablet, atau desktop. Pengalaman terbaik di layar >5 inch."
        },
        {
          question: "Browser apa yang didukung?",
          answer: "Kami mendukung Chrome, Firefox, Safari, dan Edge versi terbaru. Untuk hasil terbaik, gunakan browser yang up-to-date."
        },
        {
          question: "Kenapa hasil audit saya tidak muncul?",
          answer: "Pastikan kamu sudah mengisi SEMUA field di form dengan angka yang valid. Jika masih bermasalah, coba refresh halaman (Ctrl+F5) atau gunakan browser berbeda. Jika masih error, hubungi support."
        },
        {
          question: "Bagaimana cara menghubungi support?",
          answer: "User Premium bisa email ke support@hiduplogis.com dengan response time <24 jam (hari kerja). User Free bisa gunakan form kontak di website atau DM social media kami."
        }
      ]
    },
    {
      category: "Privasi & Keamanan",
      icon: "shield",
      color: "blue",
      questions: [
        {
          question: "Apakah data saya dijual ke pihak ketiga?",
          answer: "TIDAK. Kami tidak pernah menjual, menyewakan, atau membagikan data pribadi kamu ke pihak ketiga untuk tujuan marketing atau apapun. Data kamu adalah milik kamu."
        },
        {
          question: "Apakah saya bisa menghapus akun dan data saya?",
          answer: "Ya, kamu bisa request penghapusan akun dan semua data terkait kapan saja dengan email ke privacy@hiduplogis.com. Kami akan proses dalam 7 hari kerja sesuai regulasi perlindungan data."
        },
        {
          question: "Bagaimana keamanan data pembayaran?",
          answer: "Kami tidak menyimpan informasi kartu kredit atau data pembayaran kamu. Semua transaksi diproses melalui payment gateway terenkripsi (Midtrans/Xendit) yang sudah tersertifikasi PCI-DSS."
        }
      ]
    }
  ]

  const getColorClass = (color, type = 'text') => {
    const colors = {
      primary: type === 'text' ? 'text-primary' : type === 'bg' ? 'bg-primary/20' : 'border-primary/30',
      purple: type === 'text' ? 'text-purple-400' : type === 'bg' ? 'bg-purple-500/20' : 'border-purple-500/30',
      green: type === 'text' ? 'text-green-400' : type === 'bg' ? 'bg-green-500/20' : 'border-green-500/30',
      orange: type === 'text' ? 'text-orange-400' : type === 'bg' ? 'bg-orange-500/20' : 'border-orange-500/30',
      blue: type === 'text' ? 'text-blue-400' : type === 'bg' ? 'bg-blue-500/20' : 'border-blue-500/30'
    }
    return colors[color] || colors.primary
  }

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
                    <span className="material-symbols-outlined text-primary text-sm">help_center</span>
                    <span className="text-sm font-semibold text-white/80">Frequently Asked Questions</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] animate-fade-in-up stagger-2">
                    <span className="block text-white">Pertanyaan yang</span>
                    <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Sering Diajukan</span>
                  </h1>
                  
                  <p className="text-xl text-white/60 max-w-2xl leading-relaxed animate-fade-in-up stagger-3">
                    Temukan jawaban untuk pertanyaan umum tentang HIDUP LOGIS. Tidak menemukan jawaban? Hubungi kami.
                  </p>
                </div>

                {/* Right Side - Quick Stats */}
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
                        <span className="material-symbols-outlined text-4xl text-primary">contact_support</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Butuh Bantuan?</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-background-dark/50 rounded-xl p-4">
                        <div className="text-3xl font-black text-primary mb-1">5</div>
                        <p className="text-sm text-white/60">Kategori FAQ</p>
                      </div>
                      <div className="bg-background-dark/50 rounded-xl p-4">
                        <div className="text-3xl font-black text-purple-400 mb-1">&lt;24h</div>
                        <p className="text-sm text-white/60">Response Time</p>
                      </div>
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

          {/* FAQ Content */}
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-16 animate-fade-in-up" style={{animationDelay: `${categoryIndex * 0.1}s`}}>
                  
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`size-14 rounded-xl ${getColorClass(category.color, 'bg')} flex items-center justify-center ${getColorClass(category.color, 'text')}`}>
                      <span className="material-symbols-outlined text-3xl">{category.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black">{category.category}</h2>
                      <p className="text-sm text-white/50">{category.questions.length} pertanyaan</p>
                    </div>
                  </div>
                  
                  {/* Questions Grid - Asymmetric */}
                  <div className="grid lg:grid-cols-12 gap-6">
                    
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex
                      const isOpen = openIndex === globalIndex
                      
                      // Alternating layout: first question full width, then others
                      const colSpan = faqIndex === 0 ? 'lg:col-span-12' : 
                                     faqIndex % 2 === 1 ? 'lg:col-span-7' : 'lg:col-span-5'
                      
                      return (
                        <div
                          key={faqIndex}
                          className={`${colSpan} bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all hover:border-${category.color === 'primary' ? 'primary' : category.color + '-500'}/50 hover:shadow-xl`}
                        >
                          <button
                            onClick={() => toggleAccordion(globalIndex)}
                            className="w-full flex items-center justify-between p-6 text-left group"
                          >
                            <span className="text-lg font-bold text-white pr-4 group-hover:text-primary transition-colors">
                              {faq.question}
                            </span>
                            <span className={`material-symbols-outlined ${getColorClass(category.color, 'text')} flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                              expand_more
                            </span>
                          </button>
                          
                          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                            <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/10 pt-4">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section - Contact Support */}
          <section className="py-24 px-6 relative">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                
                {/* Left - Text Content */}
                <div className="space-y-6 animate-fade-in-up">
                  <div className="size-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-5xl">contact_support</span>
                  </div>
                  <h2 className="text-4xl font-black">Masih ada pertanyaan?</h2>
                  <p className="text-lg text-white/60 leading-relaxed">
                    Tidak menemukan jawaban yang kamu cari? Tim kami siap membantu. Premium user mendapat priority support dengan response time &lt;24 jam.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="mailto:support@hiduplogis.com" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-4 rounded-xl transition-all hover:scale-105">
                      <span className="material-symbols-outlined">email</span>
                      <span>Email Support</span>
                    </a>
                    <a href="/pricing" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-4 rounded-xl transition-all hover:scale-105">
                      <span>Lihat Premium</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                  </div>
                </div>

                {/* Right - Contact Options Cards */}
                <div className="space-y-4 animate-fade-in-up stagger-1">
                  <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-primary/50 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Response Time</h3>
                        <p className="text-sm text-white/60">Premium: &lt;24 jam (hari kerja)</p>
                        <p className="text-sm text-white/60">Free: 3-5 hari kerja</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-purple-400 text-2xl">support_agent</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Support Channel</h3>
                        <p className="text-sm text-white/60">Email, Live Chat (Premium)</p>
                        <p className="text-sm text-white/60">Social Media DM</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-green-500/50 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-green-400 text-2xl">language</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Bahasa Support</h3>
                        <p className="text-sm text-white/60">Bahasa Indonesia</p>
                        <p className="text-sm text-white/60">English (Limited)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-primary/20 to-transparent rounded-full blur-[100px]"></div>
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

export default FAQ