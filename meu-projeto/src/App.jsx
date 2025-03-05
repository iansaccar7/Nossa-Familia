import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { signOut } from './lib/supabase';
import { toast } from 'react-toastify';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AdminDashboard from './components/AdminDashboard';

function NavBar() {
  const { user, profile } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Erro ao sair');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100">
      <div className="container">
        <Link className="navbar-brand" to="/">Nossa Família Açaí</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {profile?.is_admin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Painel Admin</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleSignOut}>Sair</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Criar Conta</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, profile, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !profile?.is_admin) {
    return <Navigate to="/" />;
  }

  return children;
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-gradient">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center hero-content">
              <h1 className="display-4 fw-bold mb-4">
                O melhor açaí da cidade
              </h1>
              <p className="fs-4 mb-4">
                Sabor incomparável com ingredientes frescos e de qualidade
              </p>
              <button className="btn btn-light btn-lg">
                Fazer pedido
                <FiArrowRight className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5 text-purple">
            Por que escolher nosso açaí?
          </h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">{feature.icon}</div>
                    <h3 className="h4 mb-3">{feature.title}</h3>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="py-5">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5">
            Nossas Opções
          </h2>
          <div className="row g-4 justify-content-center">
            {menuItems.map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="h4 mb-3">{item.name}</h3>
                    <div className="h2 mb-4 text-primary">
                      R$ {item.price}
                    </div>
                    <ul className="list-unstyled mb-4">
                      {item.ingredients.map((ingredient, i) => (
                        <li key={i} className="d-flex align-items-center mb-2">
                          <FiCheck className="text-success me-2" />
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="btn btn-primary w-100">
                      Pedir agora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-purple">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <h4 className="h5 mb-3">Sobre nós</h4>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">Nossa história</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Localização</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Blog</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Cardápio</h4>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">Bowls</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Complementos</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Bebidas</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Atendimento</h4>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">Delivery</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Contato</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Horários</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Redes Sociais</h4>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">Instagram</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Facebook</a></li>
                <li className="mb-2"><a href="#" className="footer-link">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright">
            © 2024 Nossa Família Açai. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}

const features = [
  {
    icon: "🍇",
    title: "Açaí Natural",
    description: "Feito com açaí puro da Amazônia, sem conservantes ou aditivos."
  },
  {
    icon: "🥝",
    title: "Frutas Frescas",
    description: "Complementos frescos selecionados diariamente para você."
  },
  {
    icon: "⚡",
    title: "Delivery Rápido",
    description: "Entrega em até 30 minutos para sua casa manter o açaí cremoso."
  }
];

const menuItems = [
  {
    name: "200 ML",
    price: "10,00",
    ingredients: [
      "200ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ]
  },
  {
    name: "300 ML",
    price: "14,00",
    ingredients: [
      "300ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ]
  },
  {
    name: "400 ML",
    price: "17,00",
    ingredients: [
      "400ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ]
  },
  {
    name: "500 ML",
    price: "19,00",
    ingredients: [
      "500ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ]
  },
  {
    name: "750 ML (FAMILIA)",
    price: "29,00",
    ingredients: [
      "750ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ]
  },
  {
    name: "1KG (BIG)",
    price: "47,00",
    ingredients: [
      "1KG de açaí ou cupuaçu",
      "4 acompanhamentos"
    ]
  }
];

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-vh-100 bg-white">
          <NavBar />
          
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<HomePage />} />
          </Routes>

          <ToastContainer position="bottom-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;