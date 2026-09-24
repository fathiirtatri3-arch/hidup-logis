import { useNavigate } from 'react-router-dom'
import FloatingLines from '../components/FloatingLines'
import Footer from '../components/Footer'

function NotFound() {
  const navigate = useNavigate()

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
          </div>
        </header>

        <main className="flex items-center justify-center min-h-[calc(100vh-200px)] px-6 py-16">
          <div className="max-w-2xl text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="text-9xl md:text-[12rem] font-black text-gradient opacity-20 select-none">
                  404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-32 md:size-40 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-6xl md:text-7xl">
                      question_mark
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-xl text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
              Sepertinya kamu nyasar ke halaman yang tidak ada. Mari kembali ke jalur yang benar!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Kembali</span>
              </button>
              
                <a href="/"
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl transition-all cta-glow"
              >
                <span className="material-symbols-outlined">home</span>
                <span>Ke Beranda</span>
              </a>
            </div>

            {/* Quick Links */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-4">Atau coba halaman ini:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                
                  <a href="/audit"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all group"
                >
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                    analytics
                  </span>
                  <span className="text-sm font-medium">Mulai Audit</span>
                </a>
                
                  <a href="/metodologi"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all group"
                >
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                    science
                  </span>
                  <span className="text-sm font-medium">Metodologi</span>
                </a>
                
                  <a href="/pricing"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all group"
                >
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                    workspace_premium
                  </span>
                  <span className="text-sm font-medium">Harga</span>
                </a>
                
                  <a href="/faq"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all group"
                >
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                    help_center
                  </span>
                  <span className="text-sm font-medium">FAQ</span>
                </a>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/40">
              <span className="material-symbols-outlined text-base">lightbulb</span>
              <p>Fun fact: Halaman 404 mendapatkan namanya dari kode error HTTP 404 "Not Found"</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default NotFound