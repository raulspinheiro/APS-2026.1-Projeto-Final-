export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string;
          auth_id: string;
          nome: string;
          email: string;
          avatar_url: string | null;
          ultimo_acesso: string;
          criado_em: string;
          atualizado_em: string;
        };
        Insert: {
          id?: string;
          auth_id: string;
          nome: string;
          email: string;
          avatar_url?: string | null;
          ultimo_acesso?: string;
          criado_em?: string;
          atualizado_em?: string;
        };
        Update: {
          id?: string;
          auth_id?: string;
          nome?: string;
          email?: string;
          avatar_url?: string | null;
          ultimo_acesso?: string;
          criado_em?: string;
          atualizado_em?: string;
        };
      };
    };
  };
}

export interface Usuario {
  id: string;
  auth_id: string;
  nome: string;
  email: string;
  avatar_url: string | null;
  ultimo_acesso: string;
  criado_em: string;
  atualizado_em: string;
}
