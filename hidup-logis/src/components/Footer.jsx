function Footer() {
  return (
    <footer className="bg-background-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">analytics</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-white uppercase italic">HIDUP LOGIS</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Platform decision intelligence untuk keputusan kerja dan hidup berbasis data, bukan emosi.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="size-10 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 flex items-center justify-center text-white/60 hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a 
                href="#" 
                className="size-10 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 flex items-center justify-center text-white/60 hover:text-primary transition-all"
                aria-label="Twitter"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a 
                href="#" 
                className="size-10 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 flex items-center justify-center text-white/60 hover:text-primary transition-all"
                aria-label="LinkedIn"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a 
                href="mailto:support@hiduplogis.com" 
                className="size-10 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 flex items-center justify-center text-white/60 hover:text-primary transition-all"
                aria-label="Email"
              >
                <span className="material-symbols-outlined text-xl">email</span>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Produk</h3>
            <ul className="space-y-3">
              <li>
                <a href="/audit" className="text-white/60 hover:text-white text-sm transition-colors">
                  Mulai Audit
                </a>
              </li>
              <li>
                <a href="/metodologi" className="text-white/60 hover:text-white text-sm transition-colors">
                  Metodologi
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-white/60 hover:text-white text-sm transition-colors">
                  Harga
                </a>
              </li>
              <li>
                <a href="/faq" className="text-white/60 hover:text-white text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Perusahaan</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-white/60 hover:text-white text-sm transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="mailto:support@hiduplogis.com" className="text-white/60 hover:text-white text-sm transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © 2024 HIDUP LOGIS. All rights reserved. Keputusan yang baik dimulai dengan data.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <span>Bahasa: Indonesia</span>
              <span>•</span>
              <span>IDR (Rp)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer