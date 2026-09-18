import { AppNavigation } from "@/components/app-navigation";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto min-h-dvh max-w-6xl md:grid md:grid-cols-[11rem_1fr] md:gap-12 md:px-8 md:py-8">
      <aside className="hidden md:block">
        <div className="mb-8 px-3 text-2xl font-black tracking-[-0.08em] text-[var(--forest)]">
          FOCO
        </div>
        <AppNavigation />
      </aside>
      <main className="min-w-0 pb-24 md:pb-0">{children}</main>
      <div className="fixed inset-x-0 bottom-0 z-10 md:hidden">
        <AppNavigation />
      </div>
    </div>
  );
}
