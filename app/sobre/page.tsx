import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Compass, Sparkles, Target, Users } from "lucide-react";

const stats = [
  { icon: Sparkles, label: "Experiências cocriadas", value: "+280" },
  { icon: Users, label: "Pessoas impactadas", value: "+18k" },
  { icon: Target, label: "Projetos guiados por estratégia", value: "97%" },
];

const milestones = [
  {
    year: "2024",
    title: "Web Summit Rio",
    description:
      "Apresentei metodologias de design e conteúdo que aproximam marcas de pessoas, com foco em experiências imersivas e resultados medíveis.",
    image: "/images/rwx4.jpg",
  },
  {
    year: "2023",
    title: "Comunidades & Workshops",
    description:
      "Mais de 1.200 horas de mentorias e workshops ajudando times a construir jornadas digitais encantadoras e baseadas em dados.",
    image: "/images/rwx5.jpg",
  },
];

export default function Sobre() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-purple-500/20 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-pink-500/20 blur-[140px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-32">
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_45px_120px_-45px_rgba(124,58,237,0.65)] backdrop-blur-3xl md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/15 opacity-40" />
          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <Badge className="w-fit bg-white/15 text-purple-100 backdrop-blur">
                Ricardo Faya • Experiências com impacto
              </Badge>
              <h1 className="text-4xl font-black drop-shadow-2xl md:text-6xl">
                Design estratégico para conectar pessoas, marcas e histórias reais
              </h1>
              <p className="text-lg leading-relaxed text-slate-200/85">
                Trago 15 anos construindo narrativas digitais que combinam branding, conteúdo e tecnologia. Cada projeto nasce de conversas profundas para descobrir o que emociona, resolve problemas e gera valor sustentável.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex flex-col gap-2 text-left">
                      <item.icon className="h-5 w-5 text-purple-200" />
                      <span className="text-2xl font-semibold text-white">{item.value}</span>
                      <span className="text-xs uppercase tracking-wide text-white/60">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative grid gap-6">
                <div className="relative h-72 w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 shadow-[0_25px_80px_-45px_rgba(168,85,247,0.9)]">
                  <Image
                    src="/images/rwx1.jpg"
                    alt="Ricardo Faya apresentando experiências digitais"
                    fill
                    sizes="(min-width: 1024px) 32vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm text-white backdrop-blur">
                    <span>Web Summit Rio • Demonstrando soluções</span>
                    <Compass className="h-4 w-4 text-white/70" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="relative h-56 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5">
                    <Image
                      src="/images/rwx2.jpg"
                      alt="Ricardo Faya em networking estratégico"
                      fill
                      sizes="(min-width: 1024px) 15vw, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wide text-white/70">
                      Networking estratégico
                    </div>
                  </div>

                  <div className="relative h-56 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5">
                    <Image
                      src="/images/rwx6.jpg"
                      alt="Equipe celebrando destaque no Web Summit"
                      fill
                      sizes="(min-width: 1024px) 15vw, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wide text-white/70">
                      Experiências memoráveis
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative space-y-10 rounded-[3rem] border border-white/10 bg-slate-900/60 p-10 shadow-[0_25px_90px_-45px_rgba(236,72,153,0.55)] backdrop-blur-3xl">
          <div className="space-y-4 text-center">
            <Badge className="mx-auto w-fit bg-white/10 text-pink-100">Propósito</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Pessoas no centro, tecnologia como ponte
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-200/80 md:text-lg">
              Cada projeto é desenhado para criar conexões significativas. Da identidade visual à jornada multicanal, cada detalhe é pensado para encantar, resolver dores reais e gerar valor constante.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {milestones.map((item) => (
              <div
                key={item.year}
                className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/15 opacity-0 transition-opacity duration-500 hover:opacity-100" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-white/60">
                    <span>{item.year}</span>
                    <span>Impacto real</span>
                  </div>
                  <div className="relative h-48 overflow-hidden rounded-[1.5rem] border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/75">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/15" />
          <div className="relative grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
            <div className="space-y-6">
              <Badge className="w-fit bg-white/10 text-purple-100">Parcerias humanas</Badge>
              <h2 className="text-3xl font-bold md:text-4xl">
                Conversas que viram impacto
              </h2>
              <p className="text-base leading-relaxed text-slate-200/80">
                Acredito em processos colaborativos. Começo com escuta ativa, co-crio com o time e garanto que cada entrega tenha indicadores claros de sucesso. A tecnologia só faz sentido quando traduz a visão das pessoas que ela toca.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                "Design System & Identidade",
                "Jornadas de Conteúdo Multicanal",
                "Lançamentos e Ativações Imersivas",
                "Workshops de Inovação",
                "Mentorias para líderes criativos",
                "Estratégias orientadas por dados",
              ].map((skill) => (
                <div
                  key={skill}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:bg-white/10"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
