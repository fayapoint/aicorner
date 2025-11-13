import Link from "next/link";
import {
  Sparkles,
  Mail,
  Phone,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Dribbble
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-slate-950/90 py-16 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-64 bg-gradient-to-r from-purple-500/30 via-transparent to-pink-500/30 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight text-white">Ricardo Faya</h3>
                <p className="text-sm text-white/70">Design estratégico, workshops e ativações digitais que conectam pessoas e marcas.</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/65">
              Conversas profundas, dados e estética refinada para marcas que desejam experiências com impacto real. Vamos construir a próxima jornada do seu negócio?
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="mailto:ricardofaya@gmail.com" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10">
                <Mail className="h-4 w-4 text-purple-200" />
                ricardofaya@gmail.com
              </a>
              <a href="tel:+5521971908530" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10">
                <Phone className="h-4 w-4 text-purple-200" />
                +55 (21) 97190-8530
              </a>
              <a
                href="https://ricardofaya9.wixsite.com/ricardo-faya/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10"
              >
                <Globe className="h-4 w-4 text-purple-200" />
                Portfólio e projetos
              </a>
            </div>
          </div>

          <div className="grid gap-6 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h4 className="text-lg font-semibold text-white">Experiência</h4>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                  Consultorias em branding e produto digital
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                  Workshops de inovação e conteúdo
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                  Lançamentos full funnel orientados a dados
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h4 className="text-lg font-semibold text-white">Conquistas</h4>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-pink-400" />
                  Destaque no Web Summit Rio 2024
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-pink-400" />
                  +500 projetos entregues com alta satisfação
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-pink-400" />
                  Mentorias e talks para líderes criativos
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Conecte-se</h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { href: "https://www.facebook.com/rfaya", label: "Facebook", icon: Facebook },
                { href: "https://www.instagram.com/ricardofaya/", label: "Instagram", icon: Instagram },
                { href: "https://twitter.com/ricardofaya", label: "Twitter", icon: Twitter },
                { href: "https://www.linkedin.com/in/ricardo-faya-04555a/", label: "LinkedIn", icon: Linkedin },
                { href: "https://www.youtube.com/channel/UCK6067oss263F0lOX252f1g", label: "YouTube Canal", icon: Youtube },
                { href: "https://www.youtube.com/ricardofaya", label: "YouTube", icon: Youtube },
                { href: "https://ricardofaya9.wixsite.com/ricardo-faya/", label: "Site Pessoal", icon: Globe },
                { href: "https://dribbble.com/rfaya", label: "Dribbble", icon: Dribbble }
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-medium text-white/75 transition-colors hover:bg-white/15"
                >
                  <Icon className="h-4 w-4 text-purple-200 transition-transform duration-300 group-hover:scale-110" />
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 text-sm text-white/70 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-white">Pronto para a próxima conversa?</p>
            <p>Entre em contato e vamos desenhar a jornada ideal para o seu projeto.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contato" className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20">
              Falar agora
            </Link>
            <Link href="/sobre" className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10">
              Ver jornada
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Ricardo Faya. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <Link href="/politica" className="hover:text-white/80">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-white/80">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
