create type public.task_context as enum ('HOME', 'WORK', 'ANYWHERE');
create type public.task_priority as enum ('HIGH', 'MEDIUM', 'LOW');
create type public.task_status as enum ('TODO', 'IN_PROGRESS', 'WAITING', 'COMPLETED', 'CANCELLED');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 500),
  description text,
  context public.task_context not null default 'ANYWHERE',
  priority public.task_priority not null default 'MEDIUM',
  status public.task_status not null default 'TODO',
  due_date date,
  due_time time,
  estimated_minutes integer check (estimated_minutes > 0),
  is_recurring boolean not null default false,
  recurrence_rule text,
  waiting_reason text,
  waiting_review_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.subtasks (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 500),
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.task_history (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  event_type text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index tasks_user_status_due_date_idx on public.tasks (user_id, status, due_date);
create index subtasks_task_id_idx on public.subtasks (task_id);
create index task_history_task_id_idx on public.task_history (task_id, created_at desc);

alter table public.users enable row level security;
alter table public.tasks enable row level security;
alter table public.subtasks enable row level security;
alter table public.task_history enable row level security;

create policy "Users manage their profile" on public.users for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users manage their own tasks" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage subtasks of their tasks" on public.subtasks for all using (exists (select 1 from public.tasks where tasks.id = subtasks.task_id and tasks.user_id = auth.uid())) with check (exists (select 1 from public.tasks where tasks.id = subtasks.task_id and tasks.user_id = auth.uid()));
create policy "Users view their task history" on public.task_history for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email) values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
