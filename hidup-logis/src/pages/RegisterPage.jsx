import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import FloatingLines from '../components/FloatingLines'
import MobileMenu from '../components/MobileMenu'
import Footer from '../components/Footer'

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    const { name, email, password, confirmPassword } = formData
    
    // Validasi
    if (!name || !email || !password) {
      setError('Semua field harus diisi')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok')
      return
    }
    
    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }
    
    setLoading(true)
    
    try {
      const result = await register(email, password, name)
      
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.message || 'Registrasi gagal')
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi nanti.')
      console.error('Register error:', err)
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
            <h1 className="text-4xl font-black mb-2">Buat Akun Baru</h1>
            <p className="text-white/60">Mulai perjalanan keputusan finansial yang lebih logis</p>
          </div>

          {/* Register Card */}
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
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Nama kamu"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <p className="text-xs text-white/40 mt-1">Minimal 6 karakter</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                {loading ? 'Memproses...' : 'Daftar Sekarang'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/60">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Login di sini
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <p className="text-xs text-white/50 text-center">
                Dengan mendaftar, kamu menyetujui{' '}
                <a href="#" className="text-primary/80 hover:text-primary">
                  Syarat & Ketentuan
                </a>{' '}
                dan{' '}
                <a href="#" className="text-primary/80 hover:text-primary">
                  Kebijakan Privasi
                </a>{' '}
                HIDUP LOGIS.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default RegisterPage