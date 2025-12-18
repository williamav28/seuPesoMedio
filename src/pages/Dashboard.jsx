import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Dashboard() {
  const [weight, setWeight] = useState("");
  const [history, setHistory] = useState([]);
  const [average, setAverage] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 1. MONITOR DE AUTENTICAÇÃO E DADOS
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      setUser(currentUser);

      // ESCUTA FIREBASE EM TEMPO REAL
      const q = query(
        collection(db, "weights"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(7)
      );

      const unsubscribeSnapshot = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setHistory(data);

          if (data.length > 0) {
            const sum = data.reduce(
              (acc, curr) => acc + Number(curr.weight),
              0
            );
            setAverage((sum / data.length).toFixed(2));
          } else {
            setAverage(0);
          }
        },
        (error) => {
          console.error("Erro no Firestore. Verifique os índices:", error);
        }
      );

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  // 2. FUNÇÃO PARA ADICIONAR PESO
  const handleAddWeight = async (e) => {
    e.preventDefault();
    if (!weight || isNaN(weight) || !user) return;

    try {
      await addDoc(collection(db, "weights"), {
        userId: user.uid,
        weight: Number(weight),
        createdAt: serverTimestamp(),
      });
      setWeight("");
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  // 3. FUNÇÃO PARA REMOVER PESO
  const handleDeleteWeight = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este registro?")) {
      try {
        await deleteDoc(doc(db, "weights", id));
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  // 4. FUNÇÃO PARA LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6 min-h-screen">
      {/* BARRA SUPERIOR (HEADER) */}
      <div className="flex justify-between items-center px-2 py-4">
        <div className="flex flex-col">
          <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
            Painel
          </span>
          <span className="text-yellow-500 text-[11px] font-bold">
            {user?.email}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 px-4 py-2 rounded-full transition-all"
        >
          <span className="text-zinc-400 group-hover:text-red-400 text-[10px] font-black uppercase tracking-widest">
            Sair
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-zinc-500 group-hover:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>

      {/* CARD DE MÉDIA */}
      <div className="bg-black/70 p-10 rounded-[3rem] text-center border border-yellow-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-2 font-black">
          Média dos últimos 7 registros
        </p>
        <h2 className="text-8xl font-black text-white tracking-tighter italic">
          {average}{" "}
          <span className="text-2xl text-yellow-500 not-italic">kg</span>
        </h2>
      </div>

      {/* FORMULÁRIO DE ENTRADA */}
      <form
        onSubmit={handleAddWeight}
        className="flex gap-2 bg-black/40 p-2 rounded-3xl border border-white/5"
      >
        <input
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Registrar peso (kg)"
          className="flex-1 bg-transparent px-6 py-4 text-white outline-none font-bold text-lg"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-8 rounded-2xl transition-all shadow-lg shadow-yellow-500/20"
        >
          SALVAR
        </button>
      </form>

      {/* LISTA DE HISTÓRICO */}
      <div className="bg-black/30 rounded-[2rem] p-6 border border-white/5">
        <h3 className="text-white/30 font-black text-[10px] uppercase tracking-widest mb-4 px-2">
          Histórico Recente
        </h3>
        <div className="flex flex-col gap-2">
          {history.length === 0 ? (
            <p className="text-zinc-600 italic text-sm text-center py-10 uppercase font-black tracking-tighter">
              Nenhum registro encontrado.
            </p>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-colors group"
              >
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase">
                    {item.createdAt?.toDate
                      ? item.createdAt.toDate().toLocaleDateString("pt-BR")
                      : "Processando..."}
                  </span>
                  <span className="text-white font-black text-xl italic">
                    {item.weight} kg
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteWeight(item.id)}
                  className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-zinc-500 hover:text-red-500 transition-all"
                  title="Excluir registro"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
