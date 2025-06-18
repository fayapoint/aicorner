export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Bem-vindo de volta!</h1>
      <p className="text-lg text-gray-400 mb-6">Acesse sua conta para aproveitar todos os recursos do Portal Tech.</p>
      <form className="w-full max-w-sm bg-white/5 rounded-2xl shadow-lg border border-slate-700/40 p-8 flex flex-col gap-4">
        <input type="email" placeholder="E-mail" className="rounded px-4 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400/60" />
        <input type="password" placeholder="Senha" className="rounded px-4 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400/60" />
        <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded mt-4 hover:from-purple-600 hover:to-pink-600 transition">Entrar</button>
        <a href="/signup" className="text-purple-400 hover:underline text-sm text-center">Não possui conta? Cadastre-se</a>
      </form>
    </div>
  );
}
