import { CloudRain, Shield, AlertTriangle, BarChart3, Zap } from 'lucide-react';

interface PaginaLoginProps {
  aoEntrar: () => void;
  carregando: boolean;
  erro: string | null;
}

export function PaginaLogin({ aoEntrar, carregando, erro }: PaginaLoginProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden">
      {/* Painel esquerdo - Informações do sistema */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Fundo animado com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="chuva-container">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="gota"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${0.6 + Math.random() * 0.8}s`,
                  opacity: 0.15 + Math.random() * 0.25,
                }}
              />
            ))}
          </div>
          <div
            className="absolute w-96 h-96 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
              top: '10%',
              left: '20%',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute w-72 h-72 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #0284c7 0%, transparent 70%)',
              bottom: '20%',
              right: '10%',
              filter: 'blur(50px)',
            }}
          />
        </div>

        {/* Logo e título */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <CloudRain className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">
                Sistema Metropolitano
              </span>
              <div className="text-white font-bold text-lg leading-tight">F-PluvIA</div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Previsão Inteligente
            <br />
            <span className="text-cyan-400">de Precipitação</span>
            <br />
            e Alertas de Cheias
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-md">
            Plataforma avançada de monitoramento hidrológico com inteligência artificial
            para proteção da população metropolitana.
          </p>
        </div>

        {/* Recursos do sistema */}
        <div className="relative z-10 space-y-4">
          {[
            {
              icone: <BarChart3 className="w-5 h-5 text-cyan-400" />,
              titulo: 'Previsão em Tempo Real',
              descricao: 'Análise contínua de dados pluviométricos e hidrológicos',
            },
            {
              icone: <AlertTriangle className="w-5 h-5 text-amber-400" />,
              titulo: 'Alertas de Risco de Cheias',
              descricao: 'Notificações antecipadas para áreas de vulnerabilidade',
            },
            {
              icone: <Shield className="w-5 h-5 text-emerald-400" />,
              titulo: 'Gestão de Emergências',
              descricao: 'Coordenação integrada com defesa civil e serviços essenciais',
            },
            {
              icone: <Zap className="w-5 h-5 text-sky-400" />,
              titulo: 'IA Avançada',
              descricao: 'Modelos preditivos com aprendizado de máquina e dados históricos',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.icone}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{item.titulo}</div>
                <div className="text-slate-500 text-xs">{item.descricao}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé informativo */}
        <div className="relative z-10 pt-6 border-t border-slate-800">
          <p className="text-slate-600 text-xs">
            Desenvolvido com Java Web &amp; Spring Boot &bull; API Google &bull; PostgreSQL
          </p>
        </div>
      </div>

      {/* Painel direito - Formulário de login */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 bg-slate-950">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <CloudRain className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-slate-400 text-xs font-semibold tracking-widest uppercase">
                Sistema Metropolitano
              </div>
              <div className="text-white font-bold text-lg">F-PluvIA</div>
            </div>
          </div>

          {/* Cabeçalho do formulário */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo</h2>
            <p className="text-slate-400 text-sm">
              Acesse o sistema com sua conta Google institucional para continuar.
            </p>
          </div>

          {/* Cartão de status do sistema */}
          <div className="mb-8 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute inset-0 animate-ping opacity-50" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">Sistema Operacional</div>
              <div className="text-slate-500 text-xs">
                Todos os sensores e modelos ativos &bull; Última atualização: agora
              </div>
            </div>
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800/50 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{erro}</p>
            </div>
          )}

          {/* Botão de login com Google */}
          <button
            onClick={aoEntrar}
            disabled={carregando}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            {carregando ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            {carregando ? 'Autenticando...' : 'Entrar com o Google'}
          </button>

          {/* Separador */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs">acesso seguro</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Informações de segurança */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icone: <Shield className="w-4 h-4 text-cyan-500" />, texto: 'OAuth 2.0' },
              { icone: <Zap className="w-4 h-4 text-cyan-500" />, texto: 'Criptografado' },
              { icone: <CloudRain className="w-4 h-4 text-cyan-500" />, texto: 'Monitorado' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-slate-900 border border-slate-800"
              >
                {item.icone}
                <span className="text-slate-400 text-xs">{item.texto}</span>
              </div>
            ))}
          </div>

          {/* Aviso de uso */}
          <p className="mt-8 text-slate-600 text-xs text-center leading-relaxed">
            Ao acessar o sistema, você concorda com os termos de uso e política de privacidade
            do F-PluvIA Metropolitan. O acesso é restrito a usuários autorizados.
          </p>
        </div>
      </div>
    </div>
  );
}
