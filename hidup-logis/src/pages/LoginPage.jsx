import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import FloatingLines from '../components/FloatingLines'
import MobileMenu from '../components/MobileMenu'
import Footer from '../components/Footer'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Email dan password harus diisi')
      return
    }
    
    setLoading(true)
    
    try {
      const result = await login(email, password)
      
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.message || 'Login gagal')
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi nanti.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-dark font-display text-white">
      {/* FloatingLines Background */}
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
          interactive={true}
          linesGradient={['#5b13ec', '#8b5cf6', '#a78bfa']}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header className="glass-header border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">analytics</span>
              </div>
              <h2 className="text-xl font-black text-white uppercase italic">HIDUP LOGIS</h2>
            </Link>
            <MobileMenu />
          </div>
        </header>

        <main className="max-w-md mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-2">Masuk ke Akun</h1>
            <p className="text-white/60">Akses riwayat audit dan fitur Premium</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-400">error</span>
                  <p className="text-red-300 font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="nama@email.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/60">
                Belum punya akun?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Daftar di sini
                </Link>
              </p>
            </div>

            {/* Benefits Card */}
            <div className="mt-6 bg-primary/10 border border-primary/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">info</span>
                <div>
                  <p className="text-sm text-white/80">
                    Dengan akun HIDUP LOGIS, kamu bisa:
                  </p>
                  <ul className="text-sm text-white/60 mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-base">check</span>
                      <span>Simpan riwayat audit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-base">check</span>
                      <span>3 audit gratis per bulan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-base">check</span>
                      <span>Upgrade ke Premium kapan saja</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default LoginPage