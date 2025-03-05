import { FiArrowRight, FiCheck } from 'react-icons/fi';

function App() {
  return (
    <div className="min-vh-100 bg-white">
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
              <button className="primary-button">
                Fazer pedido
                <FiArrowRight className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5 text-purple">
            Por que escolher nosso açaí?
          </h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="h4 mb-3">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
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
                <div className="menu-card">
                  <h3 className="h4 mb-3">{item.name}</h3>
                  <div className="menu-price mb-4">
                    R$ {item.price}
                  </div>
                  <ul className="list-unstyled mb-4">
                    {item.ingredients.map((ingredient, i) => (
                      <li key={i} className="d-flex align-items-center mb-2">
                        <FiCheck className="text-success me-2" />
                        <span className="menu-ingredients">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="order-button">
                    Pedir agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <h4 className="h5 mb-3">Sobre nós</h4>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#">Nossa história</a></li>
                <li className="mb-2"><a href="#">Localização</a></li>
                <li className="mb-2"><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Cardápio</h4>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#">Bowls</a></li>
                <li className="mb-2"><a href="#">Complementos</a></li>
                <li className="mb-2"><a href="#">Bebidas</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Atendimento</h4>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#">Delivery</a></li>
                <li className="mb-2"><a href="#">Contato</a></li>
                <li className="mb-2"><a href="#">Horários</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Redes Sociais</h4>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#">Instagram</a></li>
                <li className="mb-2"><a href="#">Facebook</a></li>
                <li className="mb-2"><a href="#">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright text-center">
            © 2024 Nossa Família Açai. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
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

export default App;