"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
      // If redirect is blocked, handle result
      if (res && res.error) setError(res.error);
    } catch (err: any) {
      setError(err?.message || "Falha ao entrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Bem-vindo de volta!</h1>
      <p className="text-lg text-gray-400 mb-6">Acesse sua conta para aproveitar todos os recursos do Portal Tech.</p>
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white/5 rounded-2xl shadow-lg border border-slate-700/40 p-8 flex flex-col gap-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded px-4 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded px-4 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          required
        />
        {error && (
          <div className="text-sm text-red-400 bg-red-900/20 border border-red-800/50 rounded px-3 py-2">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded mt-2 hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-400">ou</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center gap-2 border border-slate-700 text-gray-200 hover:bg-white/10 rounded py-2 transition"
        >
          Entrar com Google
        </button>
        <a href="/trial" className="text-purple-400 hover:underline text-sm text-center">Não possui conta? Cadastre-se</a>
      </form>
    </div>
  );
}
