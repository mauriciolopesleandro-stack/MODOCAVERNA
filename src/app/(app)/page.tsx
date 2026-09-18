const laterTasks = [
  "Responder Carlos",
  "Conferir documento",
  "Verificar estoque",
];

export default function TodayPage() {
  const today = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="mx-auto max-w-2xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-10">
        <p className="mb-4 text-2xl font-black tracking-[-0.08em] text-[var(--forest)] md:hidden">
          FOCO
        </p>
        <p className="text-lg font-semibold">
          Bom dia{" "}
          <span aria-label="aceno" role="img">
            👋
          </span>
        </p>
        <p className="mt-1 capitalize text-sm font-semibold tracking-[0.12em] text-[#68766d]">
          {today}
        </p>
      </header>

      <section
        aria-labelledby="faca-agora"
        className="rounded-3xl bg-[var(--forest)] p-6 text-white shadow-[0_18px_45px_-24px_rgba(33,76,60,0.8)] sm:p-8"
      >
        <p
          id="faca-agora"
          className="text-sm font-bold tracking-[0.15em] text-[#cfe1cd]"
        >
          🎯 FAÇA AGORA
        </p>
        <h1 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">
          Sua próxima atividade aparecerá aqui.
        </h1>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-[#dce9d9]">
          Quando você criar atividades, o FOCO vai destacar uma de cada vez para
          ajudar a decidir o que fazer agora.
        </p>
        <a
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-[var(--forest)] transition hover:bg-[#e8f0e6]"
          href="/atividades/nova"
        >
          + Nova atividade
        </a>
      </section>

      <section aria-labelledby="depois" className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="depois"
            className="text-sm font-bold tracking-[0.14em] text-[#526158]"
          >
            📋 DEPOIS
          </h2>
          <a
            className="text-sm font-bold text-[var(--forest)]"
            href="/atividades"
          >
            Ver atividades
          </a>
        </div>
        <ul className="divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-white px-5">
          {laterTasks.map((task) => (
            <li className="py-4 text-base font-semibold" key={task}>
              {task}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="aguardando" className="mt-10">
        <h2
          id="aguardando"
          className="mb-4 text-sm font-bold tracking-[0.14em] text-[#526158]"
        >
          ⏳ AGUARDANDO
        </h2>
        <div className="rounded-2xl border border-[var(--line)] bg-[#eef3ec] p-5 text-base font-semibold text-[#526158]">
          Ainda não há nada aguardando.
        </div>
      </section>
    </div>
  );
}
