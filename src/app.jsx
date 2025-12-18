import { Outlet } from "react-router-dom";

function App() {
  return (
    // O degradê fica aqui, fixo para todas as páginas
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-yellow-400 via-black to-yellow-600 p-4">
      {/* O Outlet será substituído pelo Signup ou pelo Login */}
      <Outlet />
    </div>
  );
}

export default App;
