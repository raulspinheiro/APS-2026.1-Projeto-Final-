import { useAutenticacao } from './hooks/useAutenticacao';
import { PaginaLogin } from './components/PaginaLogin';
import { PainelPrincipal } from './components/PainelPrincipal';

function TelaCarregando() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-slate-700 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Carregando F-PluvIA...</p>
      </div>
    </div>
  );
}

function App() {
  const { sessao, dadosUsuario, carregando, erro, entrarComGoogle, sair } = useAutenticacao();

  if (carregando) {
    return <TelaCarregando />;
  }

  if (!sessao) {
    return (
      <PaginaLogin
        aoEntrar={entrarComGoogle}
        carregando={carregando}
        erro={erro}
      />
    );
  }

  return (
    <PainelPrincipal
      dadosUsuario={dadosUsuario}
      aoSair={sair}
    />
  );
}

export default App;
