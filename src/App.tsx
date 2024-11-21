import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"; import './App.css';
import { Login } from "./views/admin/Login";
import { useAuth } from "./contexts/Autenticacao";
import { Home } from "./views/home/Home";

function App() {
  const { logado, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-slate-800">
      <Router>
        <Routes>
          <Route path="/" element={ logado ? <Navigate to="/home" /> : <Login />} />
          <Route
            path="/home"
            element={logado ? <Home /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
