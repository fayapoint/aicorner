import { Sparkles, Facebook, Instagram, Linkedin, Twitter, Youtube, Dribbble } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 px-6 pt-16 pb-8 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ricardo Faya
              </h3>
              <p className="text-sm text-gray-400">Consultor Digital &amp; Estrategista de Crescimento</p>
            </div>
          </div>
          <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
            Mais de 15 anos ajudando marcas a crescer com tecnologia, marketing e automação.
            Fale direto comigo para soluções sob medida para o seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <a href="mailto:ricardofaya@gmail.com" className="hover:text-purple-300 transition-colors">
                ricardofaya@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>📱</span>
              <a href="https://wa.me/5521971908530" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
                +55 (21) 97190-8530
              </a>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">AI Solutions</h4>
          <ul className="space-y-2">
            <li><Link href="/tools" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Free AI Tools</Link></li>
            <li><Link href="/solutions" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Business Solutions</Link></li>
            <li><Link href="/integrations" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Integrations</Link></li>
            <li><Link href="/api" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">API Access</Link></li>
            <li><Link href="/learn" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Learn AI</Link></li>
            <li><Link href="/support" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Support 24/7</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">About Us</Link></li>
            <li><Link href="/pricing" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Pricing</Link></li>
            <li><Link href="/news" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Blog</Link></li>
            <li><Link href="/careers" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Careers</Link></li>
            <li><Link href="/partners" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Partners</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Contact</Link></li>
          </ul>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center mt-8">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Ricardo Faya. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="/politica" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Privacidade</Link>
            <Link href="/termos" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Termos</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Follow us:</span>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/rfaya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors"
            >
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a
              href="https://www.instagram.com/ricardofaya/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors"
            >
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a
              href="https://twitter.com/ricardofaya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors"
            >
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/ricardo-faya-04555a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a
              href="https://www.youtube.com/ricardofaya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors"
            >
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a
              href="https://dribbble.com/rfaya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble"
              className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors"
            >
              <Dribbble className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
