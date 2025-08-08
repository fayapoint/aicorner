import { Sparkles } from "lucide-react";

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
                AInSeconds
              </h3>
              <p className="text-sm text-gray-400">AI Solutions in Seconds</p>
            </div>
          </div>
          <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
            Transform your business with AI solutions implemented in seconds. From beginners to experts, we provide comprehensive AI tools and support to accelerate your success.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>📧</span>
              <span>hello@ainseconds.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>🌐</span>
              <span>Global Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>⚡</span>
              <span>24/7 AI Ready</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">AI Solutions</h4>
          <ul className="space-y-2">
            <li><a href="/tools" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Free AI Tools</a></li>
            <li><a href="/solutions" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Business Solutions</a></li>
            <li><a href="/integrations" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Integrations</a></li>
            <li><a href="/api" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">API Access</a></li>
            <li><a href="/learn" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Learn AI</a></li>
            <li><a href="/support" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Support 24/7</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">About Us</a></li>
            <li><a href="/pricing" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Pricing</a></li>
            <li><a href="/news" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Blog</a></li>
            <li><a href="/careers" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Careers</a></li>
            <li><a href="/partners" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Partners</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Contact</a></li>
          </ul>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center mt-8">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Portal Tech. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="/politica" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Privacidade</a>
            <a href="/termos" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Termos</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Follow us:</span>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/company/ainseconds" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 8a6 6 0 016 6v5h-4v-5a2 2 0 00-4 0v5h-4v-9h4v1.5a4 4 0 014-1.5z"/><rect width="4" height="4" x="2" y="9" rx="2"/><rect width="4" height="12" x="2" y="9" rx="2"/></svg>
            </a>
            <a href="https://github.com/ainseconds" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.091.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.34-2.221-.253-4.555-1.111-4.555-4.945 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.563 9.563 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.688-4.566 4.936.359.309.678.919.678 1.853 0 1.336-.012 2.417-.012 2.747 0 .268.18.577.688.48C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="https://twitter.com/ainseconds" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1.64a9.1 9.1 0 01-2.89 1.1A4.52 4.52 0 0012 6.29c0 .35.04.69.1 1.02A12.94 12.94 0 013 4.1a4.48 4.48 0 00-.61 2.27c0 1.57.8 2.96 2.02 3.77A4.52 4.52 0 012 9.71v.05c0 2.2 1.56 4.03 3.64 4.45-.38.1-.78.16-1.19.16-.29 0-.57-.03-.85-.08.58 1.81 2.26 3.13 4.25 3.17A9.05 9.05 0 012 19.54a12.91 12.91 0 007 2.05c8.39 0 12.98-6.95 12.98-12.98 0-.2 0-.41-.02-.61A9.18 9.18 0 0023 3z"/></svg>
            </a>
            <a href="https://instagram.com/ainseconds" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-slate-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
