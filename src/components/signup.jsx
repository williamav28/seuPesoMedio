import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // 1. Importar o hook

function Signup() {
  // aqui vão os estados, sempre no começo do componente
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 2. Inicializar o navigate
  // ... seus estados

  // Função para lidar com o cadastro, precisa ser async porque o createUserWithEmailAndPassword retorna uma Promise e precisamos esperar ela resolver
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Tentar criar o usuário com email e senha
    try {
      // Chamar a função do Firebase para criar o usuário com email e senha
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuário cadastrado com sucesso!");
      navigate("/login"); // 3. Redirecionar após o sucesso, redirecionamento feito no arquivo main.jsx
    } catch (error) {
      alert("Erro ao cadastrar usuário: " + error.message);
      // exibir mensagem de erro caso algo dê errado empre que der erro, o catch captura o erro e podemos mostrar uma mensagem
    }
  };

  return (
    // esse return que será renderizado na tela do usuário pela tag outlet do App.jsx
    <div className="w-full max-w-md bg-black/70 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          Calculadora <span className="text-yellow-500">Peso</span>
        </h1>
        <p className="text-zinc-400 mt-2 font-medium">
          Crie sua conta para começar
        </p>
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-6">
        <input
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-all"
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-all"
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-xl uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-yellow-500/20 mt-4"
        >
          Cadastrar
        </button>
      </form>
      {/* A PARTE QUE TINHA SUMIDO ESTÁ AQUI EMBAIXO: */}
      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <p className="text-zinc-500 text-sm">
          Já tem cadastro?{" "}
          <Link
            to="/login"
            className="text-yellow-500 hover:text-yellow-400 hover:underline font-bold transition-colors"
          >
            Entrar agora
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
