import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FloatingLines from './FloatingLines';
import MobileMenu from './MobileMenu';
import Footer from './Footer';

export default function Layout({ children }) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-white selection:bg-primary/30">
      
      {/* FloatingLines Background - SAMA PERSIS seperti di App.jsx */}
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 0,
        pointerEvents: 'auto'
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
        {/* HEADER - SAMA PERSIS seperti di App.jsx */}
        <header className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">analytics</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-white uppercase italic">HIDUP LOGIS</h2>
            </Link>
            
            <nav className="hidden md:flex items-center gap-10">
              <Link className="text-sm font-medium text-white/70 hover:text-white transition-colors" to="/metodologi">
                Metodologi
              </Link>
              <Link className="text-sm font-medium text-white/70 hover:text-white transition-colors" to="/faq">
                FAQ
              </Link>
              <Link className="text-sm font-medium text-white/70 hover:text-white transition-colors" to="/pricing">
                Premium
              </Link>
              <Link className="text-sm font-medium text-white hover:text-white transition-colors" to="/about">
                Tentang
              </Link>
            </nav>
            
            <div className="flex items-center gap-4">
              {/* Bagian profil/status login - SAMA PERSIS */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3">
                  <div className="size-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">person</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {user?.name || user?.email?.split('@')[0]}
                    </span>
                    <Link to="/dashboard" className="text-xs text-white/60 hover:text-white">
                      Lihat Profil →
                    </Link>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hidden md:block text-sm font-bold text-white/80 hover:text-white px-4 py-2 transition-colors">
                  Login
                </Link>
              )}
              
              <MobileMenu />
            </div>
          </div>
        </header>

        {/* Konten halaman masing-masing */}
        <main className="relative min-h-screen pt-20 overflow-hidden">
          {children}
        </main>
        

      </div>
    </div>
  );
}