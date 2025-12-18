import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // 1. Importar o hook

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 2. Inicializar o navigate
  // ... seus estados

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Opcional: console.log("Bem-vindo!")
      navigate("/dashboard"); // 3. Redirecionar para a Dashboard
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="w-full max-w-md bg-black/70 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white uppercase">Login</h1>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <input
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:border-yellow-500 outline-none"
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:border-yellow-500 outline-none"
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl uppercase hover:scale-105 transition-all"
        >
          Entrar
        </button>
      </form>

      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <p className="text-zinc-500 text-sm">
          Ainda não tem conta?{" "}
          <Link
            to="/signup"
            className="text-yellow-500 font-bold hover:underline"
          >
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
