import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout, isPremium } = useAuth()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  return (
    <>
      {/* Hamburger Button - Visible on Mobile Only */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-center size-10 text-white hover:text-primary transition-colors"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-background-dark border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">analytics</span>
              </div>
              <h2 className="text-lg font-black text-white uppercase italic">HIDUP LOGIS</h2>
            </div>
            <button
              onClick={closeMenu}
              className="text-white/60 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* User Info (Jika Login) */}
          {isAuthenticated && (
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">
                    {user?.name ? 'person' : 'account_circle'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">
                    {user?.name || user?.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {isPremium ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold">
                        <span className="material-symbols-outlined text-xs">workspace_premium</span>
                        PREMIUM
                      </span>
                    ) : (
                      <span className="text-xs text-white/60">Free User</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-2">
              {/* Beranda */}
              <Link
                to="/"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">home</span>
                <span className="font-medium">Beranda</span>
              </Link>

              {/* Dashboard (Jika Login) */}
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">dashboard</span>
                  <span className="font-medium">Dashboard</span>
                  {!isPremium && user?.auditCount > 0 && (
                    <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {user.auditCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Metodologi */}
              <Link
                to="/metodologi"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">science</span>
                <span className="font-medium">Metodologi</span>
              </Link>

              {/* FAQ */}
              <Link
                to="/faq"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">help_center</span>
                <span className="font-medium">FAQ</span>
              </Link>

              {/* Pricing */}
              <Link
                to="/pricing"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">workspace_premium</span>
                <span className="font-medium">Harga</span>
                {!isPremium && (
                  <span className="ml-auto text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                    Upgrade
                  </span>
                )}
              </Link>

              {/* Tentang Kami - TAMBAHKAN INI */}
              <Link
                to="/about"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">info</span>
                <span className="font-medium">Tentang Kami</span>
              </Link>

              <div className="border-t border-white/10 my-4"></div>

              {/* Auth Links */}
              {isAuthenticated ? (
                <>
                  {/* Buat Audit Baru */}
                  <Link
                    to="/audit"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-4 rounded-xl transition-all cta-glow"
                  >
                    <span className="material-symbols-outlined">analytics</span>
                    <span>Audit Baru</span>
                  </Link>

                  {/* Upgrade Premium (Jika Belum Premium) */}
                  {!isPremium && (
                    <Link
                      to="/pricing"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl transition-all mt-2"
                    >
                      <span className="material-symbols-outlined text-lg">workspace_premium</span>
                      <span>Upgrade Premium</span>
                    </Link>
                  )}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 font-medium px-4 py-3 rounded-lg transition-colors mt-2"
                  >
                    <span className="material-symbols-outlined">logout</span>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Mulai Audit (Guest) */}
                  <Link
                    to="/audit"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-4 rounded-xl transition-all cta-glow"
                  >
                    <span className="material-symbols-outlined">analytics</span>
                    <span>Mulai Audit Gratis</span>
                  </Link>

                  {/* Login & Register */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="text-center bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-3 rounded-lg transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="text-center bg-primary/20 hover:bg-primary/30 text-primary font-medium px-4 py-3 rounded-lg transition-colors"
                    >
                      Daftar
                    </Link>
                  </div>

                  {/* Info Akun Gratis */}
                  <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-xs text-white/80">
                      Dengan akun gratis, kamu dapat:
                    </p>
                    <ul className="text-xs text-white/60 mt-1 space-y-1">
                      <li className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-green-400 text-xs">check_circle</span>
                        <span>3 audit per bulan</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-green-400 text-xs">check_circle</span>
                        <span>Simpan riwayat audit</span>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <p className="text-xs text-white/40 text-center mb-4">
              © 2024 HIDUP LOGIS
            </p>
            <div className="flex justify-center gap-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <span className="material-symbols-outlined">share</span>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <span className="material-symbols-outlined">help_center</span>
              </a>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">dashboard</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu