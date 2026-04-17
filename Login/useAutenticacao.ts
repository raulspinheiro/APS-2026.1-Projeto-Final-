import { useState, useEffect } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Usuario } from '../types/database';

interface EstadoAutenticacao {
  sessao: Session | null;
  usuario: User | null;
  dadosUsuario: Usuario | null;
  carregando: boolean;
  erro: string | null;
}

export function useAutenticacao() {
  const [estado, setEstado] = useState<EstadoAutenticacao>({
    sessao: null,
    usuario: null,
    dadosUsuario: null,
    carregando: true,
    erro: null,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setEstado((prev) => ({
        ...prev,
        sessao: session,
        usuario: session?.user ?? null,
        carregando: false,
      }));
      if (session?.user) {
        sincronizarUsuario(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((evento, sessao) => {
      (async () => {
        setEstado((prev) => ({
          ...prev,
          sessao,
          usuario: sessao?.user ?? null,
          carregando: false,
        }));
        if (sessao?.user) {
          await sincronizarUsuario(sessao.user);
        } else {
          setEstado((prev) => ({ ...prev, dadosUsuario: null }));
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function sincronizarUsuario(user: User) {
    const nome = user.user_metadata?.full_name ?? user.user_metadata?.name ?? '';
    const email = user.email ?? '';
    const avatarUrl = user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null;

    const { data: existente } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', user.id)
      .maybeSingle();

    if (existente) {
      const { data: atualizado } = await supabase
        .from('usuarios')
        .update({ nome, avatar_url: avatarUrl, ultimo_acesso: new Date().toISOString() })
        .eq('auth_id', user.id)
        .select()
        .maybeSingle();
      setEstado((prev) => ({ ...prev, dadosUsuario: atualizado }));
    } else {
      const { data: criado } = await supabase
        .from('usuarios')
        .insert({ auth_id: user.id, nome, email, avatar_url: avatarUrl })
        .select()
        .maybeSingle();
      setEstado((prev) => ({ ...prev, dadosUsuario: criado }));
    }
  }

  async function entrarComGoogle() {
    setEstado((prev) => ({ ...prev, erro: null }));
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setEstado((prev) => ({ ...prev, erro: 'Erro ao autenticar com o Google. Tente novamente.' }));
    }
  }

  async function sair() {
    await supabase.auth.signOut();
  }

  return {
    ...estado,
    entrarComGoogle,
    sair,
  };
}
