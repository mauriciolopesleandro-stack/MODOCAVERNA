# FOCO

Aplicativo pessoal, mobile-first, para mostrar com clareza **o que fazer agora**.

## Fundação implementada

- Next.js com TypeScript e Tailwind CSS;
- layout responsivo com as cinco áreas principais;
- tela inicial “Hoje” limpa e focada;
- login por link mágico via Supabase Auth;
- schema PostgreSQL com usuários, tarefas, subtarefas e histórico, com RLS.

## Executar localmente

1. Copie `.env.example` para `.env.local` e preencha as credenciais do projeto Supabase.
2. No Supabase, execute `supabase/migrations/20260918183000_initial_schema.sql` no SQL Editor (ou use a Supabase CLI).
3. Em **Authentication > URL Configuration**, adicione `http://localhost:3000/auth/callback` como URL de redirecionamento.
4. Instale as dependências e execute o projeto:

```bash
npm install
npm run dev
```

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

As funções de criação e gestão de tarefas serão adicionadas na fase 2; os links correspondentes permanecem como placeholders intencionais nesta fundação.
