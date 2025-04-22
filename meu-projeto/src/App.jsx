import React from "react";
import { useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { signOut } from "./lib/supabase";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./components/AdminDashboard";

// Cart Context
const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const addToCart = (item, selectedToppings) => {
    const cartItem = {
      id: Date.now().toString(),
      product: item.name,
      basePrice: parseFloat(item.price.replace(",", ".")),
      toppings: selectedToppings.map((id) => {
        const topping = toppings.find((t) => t.id === id);
        return {
          id,
          name: topping.name,
          price: parseFloat(topping.price.replace(",", ".")),
        };
      }),
      totalPrice: calculateItemTotal(item, selectedToppings),
    };

    setCart((prevCart) => ({
      items: [...prevCart.items, cartItem],
      total: prevCart.total + cartItem.totalPrice,
    }));
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((i) => i.id === itemId);
      return {
        items: prevCart.items.filter((i) => i.id !== itemId),
        total: prevCart.total - item.totalPrice,
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

function CartIcon() {
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <div id="cart-icon-container">
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          🛒
          <span className={`cart-count ${cart.items.length > 0 ? "show" : ""}`}>
            {cart.items.length}
          </span>
        </div>
      </div>

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </>
  );
}

function CartModal({ onClose }) {
  const { cart, removeFromCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return (
      <CheckoutModal onBack={() => setShowCheckout(false)} onClose={onClose} />
    );
  }

  return (
    <div id="cart-modal-container">
      <div className="cart-modal">
        <div className="modal-header">
          <h3>Seu Carrinho</h3>
          <button className="close-modal" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {cart.items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Seu carrinho está vazio</p>
              <button className="continue-shopping-button" onClick={onClose}>
                Continuar comprando
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.product}</div>
                      {item.toppings.length > 0 && (
                        <div className="cart-item-toppings">
                          Com: {item.toppings.map((t) => t.name).join(", ")}
                        </div>
                      )}
                    </div>
                    <div className="cart-item-price">
                      R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                    </div>
                    <button
                      className="remove-item-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>R$ {cart.total.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            </>
          )}
        </div>
        {cart.items.length > 0 && (
          <div className="modal-footer">
            <button className="continue-shopping-button" onClick={onClose}>
              Continuar comprando
            </button>
            <button
              className="checkout-button"
              onClick={() => setShowCheckout(true)}
            >
              Finalizar pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutModal({ onBack, onClose }) {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    onClose();
    toast.success("Pedido realizado com sucesso!");
  };

  return (
    <div id="checkout-modal-container">
      <div className="checkout-modal">
        <div className="modal-header">
          <h3>Finalizar Pedido</h3>
          <button className="close-modal" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="checkout-section">
              <h4>Informações de Entrega</h4>
              <div className="form-group">
                <label htmlFor="name">Nome completo</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Endereço</label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="number">Número</label>
                  <input
                    type="text"
                    id="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="complement">Complemento</label>
                  <input
                    type="text"
                    id="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="neighborhood">Bairro</label>
                <input
                  type="text"
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="checkout-section">
              <h4>Forma de Pagamento</h4>
              <div className="payment-methods">
                <div className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    id="credit-card"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="credit-card">Cartão de Crédito</label>
                </div>
                <div className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    id="debit-card"
                    value="debit-card"
                    checked={paymentMethod === "debit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="debit-card">Cartão de Débito</label>
                </div>
                <div className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    id="pix"
                    value="pix"
                    checked={paymentMethod === "pix"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="pix">PIX</label>
                </div>
                <div className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    id="cash"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cash">Dinheiro</label>
                </div>
              </div>

              {paymentMethod === "credit-card" ||
              paymentMethod === "debit-card" ? (
                <div className="payment-form">
                  <div className="form-group">
                    <label htmlFor="card-number">Número do cartão</label>
                    <input type="text" id="card-number" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="card-expiry">Validade</label>
                      <input type="text" id="card-expiry" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card-cvv">CVV</label>
                      <input type="text" id="card-cvv" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="card-name">Nome no cartão</label>
                    <input type="text" id="card-name" required />
                  </div>
                </div>
              ) : paymentMethod === "cash" ? (
                <div className="payment-form">
                  <div className="form-group">
                    <label htmlFor="cash-change">Troco para</label>
                    <input type="text" id="cash-change" required />
                  </div>
                </div>
              ) : (
                <div className="payment-form">
                  <div className="pix-info">
                    <p>
                      Você receberá um QR Code para pagamento após finalizar o
                      pedido.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-section">
              <h4>Resumo do Pedido</h4>
              <div className="order-summary">
                {cart.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-name">
                      {item.product}
                      {item.toppings.length > 0 && (
                        <small className="text-muted d-block">
                          Com: {item.toppings.map((t) => t.name).join(", ")}
                        </small>
                      )}
                    </div>
                    <div className="order-item-price">
                      R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                ))}
                <div className="order-total">
                  <span>Total:</span>
                  <span>R$ {cart.total.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="back-button" onClick={onBack}>
            Voltar
          </button>
          <button
            type="submit"
            className="place-order-button"
            onClick={handleSubmit}
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  const { user, profile } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Erro ao sair");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Nossa Família Açaí
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {profile?.is_admin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Painel Admin
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleSignOut}
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
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

const toppings = [
  { id: "banana", name: "Banana", price: "2,00" },
  { id: "morango", name: "Morango", price: "3,00" },
  { id: "kiwi", name: "Kiwi", price: "3,50" },
  { id: "granola", name: "Granola", price: "2,00" },
  { id: "leite-condensado", name: "Leite Condensado", price: "2,50" },
  { id: "nutella", name: "Nutella", price: "4,00" },
  { id: "mel", name: "Mel", price: "2,00" },
  { id: "chocolate", name: "Calda de Chocolate", price: "2,50" },
  { id: "amendoim", name: "Amendoim", price: "2,00" },
];

function calculateItemTotal(item, selectedToppings) {
  const basePrice = parseFloat(item.price.replace(",", "."));
  let toppingsTotal = 0;

  if (selectedToppings.length > item.freeToppings) {
    const extraToppings = selectedToppings.length - item.freeToppings;
    const toppingPrices = selectedToppings
      .map((id) =>
        parseFloat(toppings.find((t) => t.id === id).price.replace(",", "."))
      )
      .sort((a, b) => a - b);

    for (let i = 0; i < extraToppings; i++) {
      toppingsTotal += toppingPrices[i];
    }
  }

  return basePrice + toppingsTotal;
}

function OrderModal({ item, onClose }) {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const { addToCart } = useCart();

  const handleToppingChange = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const calculateTotal = () => {
    return calculateItemTotal(item, selectedToppings)
      .toFixed(2)
      .replace(".", ",");
  };

  const handleAddToCart = () => {
    addToCart(item, selectedToppings);
    toast.success(`${item.name} adicionado ao carrinho!`);
    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Personalize seu {item.name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="section">
              <h4>Escolha até {item.freeToppings} acompanhamentos grátis:</h4>
              <p className="text-gray-600 mb-4">
                Acompanhamentos adicionais serão cobrados conforme o valor de
                cada um.
              </p>
              <div className="topping-options">
                {toppings.map((topping) => (
                  <div key={topping.id} className="topping-option">
                    <input
                      type="checkbox"
                      id={topping.id}
                      checked={selectedToppings.includes(topping.id)}
                      onChange={() => handleToppingChange(topping.id)}
                    />
                    <label htmlFor={topping.id}>
                      <div className="topping-name">{topping.name}</div>
                      <div className="topping-price">+ R$ {topping.price}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="total-price">
              <span>Total:</span>
              <span id="total-price">R$ {calculateTotal()}</span>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOrderClick = (item) => {
    setSelectedItem(item);
  };

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
          <h2 className="text-center display-5 fw-bold mb-5">Nossas Opções</h2>
          <div className="row g-4 justify-content-center">
            {menuItems.map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="h4 mb-3">{item.name}</h3>
                    <div className="h2 mb-4 text-primary">R$ {item.price}</div>
                    <ul className="list-unstyled mb-4">
                      {item.ingredients.map((ingredient, i) => (
                        <li key={i} className="d-flex align-items-center mb-2">
                          <FiCheck className="text-success me-2" />
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleOrderClick(item)}
                    >
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
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Nossa história
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Localização
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Cardápio</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Bowls
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Complementos
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Bebidas
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Atendimento</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Delivery
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Contato
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Horários
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Redes Sociais</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Instagram
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    Facebook
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright">
            © 2024 Nossa Família Açai. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      {selectedItem && (
        <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {/* Cart Icon */}
      <CartIcon />
    </>
  );
}

const features = [
  {
    icon: "🍇",
    title: "Açaí Natural",
    description:
      "Feito com açaí puro da Amazônia, sem conservantes ou aditivos.",
  },
  {
    icon: "🥝",
    title: "Frutas Frescas",
    description: "Complementos frescos selecionados diariamente para você.",
  },
  {
    icon: "⚡",
    title: "Delivery Rápido",
    description:
      "Entrega em até 30 minutos para sua casa manter o açaí cremoso.",
  },
];

const menuItems = [
  {
    name: "200 ML",
    price: "10,00",
    ingredients: ["200ml de açaí ou cupuaçu", "2 acompanhamentos"],
    freeToppings: 2,
  },
  {
    name: "300 ML",
    price: "14,00",
    ingredients: ["300ml de açaí ou cupuaçu", "2 acompanhamentos"],
    freeToppings: 2,
  },
  {
    name: "400 ML",
    price: "17,00",
    ingredients: ["400ml de açaí ou cupuaçu", "2 acompanhamentos"],
    freeToppings: 2,
  },
  {
    name: "500 ML",
    price: "19,00",
    ingredients: ["500ml de açaí ou cupuaçu", "2 acompanhamentos"],
    freeToppings: 2,
  },
  {
    name: "750 ML (FAMILIA)",
    price: "29,00",
    ingredients: ["750ml de açaí ou cupuaçu", "2 acompanhamentos"],
    freeToppings: 2,
  },
  {
    name: "1KG (BIG)",
    price: "47,00",
    ingredients: ["1KG de açaí ou cupuaçu", "4 acompanhamentos"],
    freeToppings: 4,
  },
];

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
