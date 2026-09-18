"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
      setMessage("Enviamos um link de acesso para seu e-mail.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o link agora.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-3xl bg-white p-7 shadow-[0_18px_50px_-28px_rgba(23,35,29,0.35)] sm:p-10">
        <p className="text-2xl font-black tracking-[-0.08em] text-[var(--forest)]">
          FOCO
        </p>
        <h1 className="mt-10 text-3xl font-bold tracking-[-0.04em]">
          Bem-vindo 👋
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#526158]">
          Entre com seu e-mail. Sem senha para lembrar.
        </p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-bold" htmlFor="email">
            Seu e-mail
          </label>
          <input
            className="min-h-12 w-full rounded-xl border border-[var(--line)] px-4 outline-none ring-[var(--forest)] focus:ring-2"
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button
            className="min-h-12 w-full rounded-xl bg-[var(--forest)] px-5 font-bold text-white disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Enviando…" : "Enviar link de acesso"}
          </button>
        </form>
        {message && (
          <p aria-live="polite" className="mt-5 text-sm text-[#526158]">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}
