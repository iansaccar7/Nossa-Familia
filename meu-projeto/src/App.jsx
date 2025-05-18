import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FiArrowRight } from "react-icons/fi";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./components/AdminDashboard";
import MenuSection from "./components/MenuSection";
import CartIcon from "./components/CartIcon";
import ProtectedRoute from "./components/ProtectedRoute";

const categories = [
  {
    id: "acai",
    name: "Açaí",
    items: [
      {
        name: "200 ML",
        price: "10,00",
        ingredients: ["200ml de açaí ou cupuaçu"],
        freeToppings: 2,
      },
      {
        name: "300 ML",
        price: "14,00",
        ingredients: ["300ml de açaí ou cupuaçu"],
        freeToppings: 2,
      },
      {
        name: "400 ML",
        price: "17,00",
        ingredients: ["400ml de açaí ou cupuaçu"],
        freeToppings: 2,
      },
      {
        name: "500 ML",
        price: "19,00",
        ingredients: ["500ml de açaí ou cupuaçu"],
        freeToppings: 2,
      },
      {
        name: "750 ML (FAMILIA)",
        price: "29,00",
        ingredients: ["750ml de açaí ou cupuaçu"],
        freeToppings: 2,
      },
      {
        name: "1KG (BIG)",
        price: "47,00",
        ingredients: ["1KG de açaí ou cupuaçu"],
        freeToppings: 4,
      },
    ],
  },
  {
    id: "batatas",
    name: "Batatas no Cone",
    items: [
      {
        name: "Batata Tradicional",
        price: "12,00",
        ingredients: ["Batata frita crocante", "Sal", "Ketchup e Maionese"],
      },
      {
        name: "Batata Cheddar",
        price: "15,00",
        ingredients: ["Batata frita crocante", "Cheddar cremoso", "Bacon"],
      },
      {
        name: "Batata Ranch",
        price: "15,00",
        ingredients: [
          "Batata frita crocante",
          "Molho ranch",
          "Bacon",
          "Cebolinha",
        ],
      },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    items: [
      {
        name: "Água Mineral",
        price: "3,00",
        ingredients: ["500ml"],
      },
      {
        name: "Refrigerante Lata",
        price: "5,00",
        ingredients: ["350ml", "Diversas opções"],
      },
      {
        name: "Suco Natural",
        price: "8,00",
        ingredients: ["400ml", "Laranja, Limão ou Abacaxi"],
      },
    ],
  },
  {
    id: "milkshakes",
    name: "Milkshakes",
    items: [
      {
        name: "Milkshake Chocolate",
        price: "16,00",
        ingredients: ["400ml", "Calda de chocolate", "Chantilly"],
      },
      {
        name: "Milkshake Morango",
        price: "16,00",
        ingredients: ["400ml", "Calda de morango", "Chantilly"],
      },
      {
        name: "Milkshake Ovomaltine",
        price: "18,00",
        ingredients: [
          "400ml",
          "Ovomaltine crocante",
          "Calda de chocolate",
          "Chantilly",
        ],
      },
    ],
  },
];

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
              <a href="#menu" className="btn btn-light btn-lg">
                Ver Cardápio
                <FiArrowRight className="ms-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5 text-purple">
            Por que escolher nossa loja?
          </h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="display-4 mb-3">🍇</div>
                  <h3 className="h4 mb-3">Açaí Natural</h3>
                  <p className="text-muted">
                    Feito com açaí puro da Amazônia, sem conservantes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="display-4 mb-3">🥔</div>
                  <h3 className="h4 mb-3">Batatas Crocantes</h3>
                  <p className="text-muted">
                    Batatas sempre fresquinhas e super crocantes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="display-4 mb-3">🥤</div>
                  <h3 className="h4 mb-3">Milkshakes Cremosos</h3>
                  <p className="text-muted">
                    Preparados com sorvete de primeira qualidade.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="display-4 mb-3">⚡</div>
                  <h3 className="h4 mb-3">Delivery Rápido</h3>
                  <p className="text-muted">
                    Entrega em até 30 minutos para sua casa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div id="menu" className="py-5">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5">Nosso Cardápio</h2>
          {categories.map((category) => (
            <MenuSection key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <h4 className="h5 mb-3">Sobre nós</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Nossa história
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Localização
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Cardápio</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Açaí
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Batatas
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Milkshakes
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Atendimento</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Delivery
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Contato
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Horários
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Redes Sociais</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Instagram
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    Facebook
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-top border-secondary mt-4 pt-4 text-center">
            <p className="mb-0">
              © 2024 Nossa Família Açai. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <CartIcon />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
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
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
