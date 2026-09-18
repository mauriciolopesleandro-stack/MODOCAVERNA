import Link from "next/link";

const navigation = [
  { href: "/", label: "Hoje", icon: "◉" },
  { href: "/entrada", label: "Entrada", icon: "↓" },
  { href: "/atividades", label: "Atividades", icon: "□" },
  { href: "/calendario", label: "Calendário", icon: "◷" },
  { href: "/configuracoes", label: "Configurações", icon: "⚙" },
];

export function AppNavigation() {
  return (
    <nav
      aria-label="Navegação principal"
      className="border-t border-[var(--line)] bg-[var(--background)] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 md:sticky md:top-8 md:rounded-2xl md:border md:px-2 md:py-3"
    >
      <div className="mx-auto flex max-w-md justify-between gap-1 md:flex-col md:items-stretch">
        {navigation.map(({ href, label, icon }) => (
          <Link
            className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium text-[#526158] transition hover:bg-[var(--mint)] hover:text-[var(--forest)] md:flex-row md:gap-3 md:px-3 md:text-sm"
            href={href}
            key={href}
          >
            <span aria-hidden="true" className="text-base">
              {icon}
            </span>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
