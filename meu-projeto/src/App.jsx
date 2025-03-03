import { FiArrowRight, FiCheck } from 'react-icons/fi';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="hero-gradient">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              O melhor açaí da cidade
            </h1>
            <p className="text-xl mb-8">
              Sabor incomparável com ingredientes frescos e de qualidade
            </p>
            <button className="bg-white text-purple-800 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center mx-auto">
              Fazer pedido
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">
            Por que escolher nosso açaí?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-purple-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">
            Nossas Opções
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {menuItems.map((item, index) => (
              <div key={index} className="border border-purple-100 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4 text-purple-900">{item.name}</h3>
                <div className="text-3xl font-bold mb-6 text-purple-800">
                  R$ {item.price}<span className="text-base font-normal text-gray-600"></span>
                </div>
                <ul className="space-y-3 mb-8">
                  {item.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <FiCheck className="text-purple-500 mr-2" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2 rounded-lg font-semibold bg-purple-700 text-white hover:bg-purple-500">
                  Pedir agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Sobre nós</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200">Nossa história</a></li>
                <li><a href="#" className="hover:text-purple-200">Localização</a></li>
                <li><a href="#" className="hover:text-purple-200">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Cardápio</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200">Bowls</a></li>
                <li><a href="#" className="hover:text-purple-200">Complementos</a></li>
                <li><a href="#" className="hover:text-purple-200">Bebidas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Atendimento</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200">Delivery</a></li>
                <li><a href="#" className="hover:text-purple-200">Contato</a></li>
                <li><a href="#" className="hover:text-purple-200">Horários</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Redes Sociais</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200">Instagram</a></li>
                <li><a href="#" className="hover:text-purple-200">Facebook</a></li>
                <li><a href="#" className="hover:text-purple-200">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-12 pt-8 text-center text-purple-200">
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
  },
];

export default App;