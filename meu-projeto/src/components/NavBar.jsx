import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, setUser } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#4c1d95" }}
    >
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          Nossa Família Açaí
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ borderColor: "rgba(255,255,255,0.5)" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="#menu">
                Cardápio
              </a>
            </li>
            {user ? (
              <>
                {user.isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/admin">
                      Painel Admin
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="nav-link text-white btn btn-link"
                    onClick={handleSignOut}
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    Criar Conta
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
