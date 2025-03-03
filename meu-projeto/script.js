// Data for features
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

// Data for menu items
const menuItems = [
  {
    name: "200 ML",
    price: "10,00",
    ingredients: [
      "200ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ],
    freeTopppings: 2
  },
  {
    name: "300 ML",
    price: "14,00",
    ingredients: [
      "300ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ],
    freeTopppings: 2
  },
  {
    name: "400 ML",
    price: "17,00",
    ingredients: [
      "400ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ],
    freeTopppings: 2
  },
  {
    name: "500 ML",
    price: "19,00",
    ingredients: [
      "500ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ],
    freeTopppings: 2
  },
  {
    name: "750 ML (FAMILIA)",
    price: "29,00",
    ingredients: [
      "750ml de açaí ou cupuaçu",
      "2 acompanhamentos"
    ],
    freeTopppings: 2
  },
  {
    name: "1KG (BIG)",
    price: "47,00",
    ingredients: [
      "1KG de açaí ou cupuaçu",
      "4 acompanhamentos"
    ],
    freeTopppings: 4
  },
];

// Data for toppings
const toppings = [
  { id: 'banana', name: 'Banana', price: '2,00' },
  { id: 'morango', name: 'Morango', price: '3,00' },
  { id: 'kiwi', name: 'Kiwi', price: '3,50' },
  { id: 'granola', name: 'Granola', price: '2,00' },
  { id: 'leite-condensado', name: 'Leite Condensado', price: '2,50' },
  { id: 'nutella', name: 'Nutella', price: '4,00' },
  { id: 'mel', name: 'Mel', price: '2,00' },
  { id: 'chocolate', name: 'Calda de Chocolate', price: '2,50' },
  { id: 'amendoim', name: 'Amendoim', price: '2,00' }
];

// Render features
function renderFeatures() {
  const featuresContainer = document.getElementById('features-container');
  
  features.forEach(feature => {
    const featureCard = document.createElement('div');
    featureCard.className = 'feature-card';
    
    featureCard.innerHTML = `
      <div class="feature-icon">${feature.icon}</div>
      <h3 class="feature-title">${feature.title}</h3>
      <p class="feature-description">${feature.description}</p>
    `;
    
    featuresContainer.appendChild(featureCard);
  });
}

// Render menu items
function renderMenuItems() {
  const menuContainer = document.getElementById('menu-container');
  
  menuItems.forEach(item => {
    const menuCard = document.createElement('div');
    menuCard.className = 'menu-card';
    
    let ingredientsList = '';
    item.ingredients.forEach(ingredient => {
      ingredientsList += `
        <div class="menu-ingredient">
          <span class="check-icon">✓</span>
          ${ingredient}
        </div>
      `;
    });
    
    menuCard.innerHTML = `
      <h3 class="menu-title">${item.name}</h3>
      <div class="menu-price">R$ ${item.price}</div>
      <div class="menu-ingredients">
        ${ingredientsList}
      </div>
      <button class="order-button" data-product="${item.name}">Pedir agora</button>
    `;
    
    menuContainer.appendChild(menuCard);
  });
}

// Create and show the order modal
function showOrderModal(productName) {
  // Create modal container if it doesn't exist
  let modalContainer = document.getElementById('order-modal-container');
  
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'order-modal-container';
    document.body.appendChild(modalContainer);
  }
  
  // Find the selected product
  const selectedProduct = menuItems.find(item => item.name === productName);
  if (!selectedProduct) return;
  
  const freeTopppings = selectedProduct.freeTopppings || 2;
  const basePrice = parseFloat(selectedProduct.price.replace(',', '.'));
  
  // Render toppings
  let toppingsHTML = '';
  toppings.forEach(topping => {
    toppingsHTML += `
      <div class="topping-option">
        <input type="checkbox" name="toppings" id="${topping.id}" value="${topping.id}" data-price="${topping.price}">
        <label for="${topping.id}">
          <div class="topping-name">${topping.name}</div>
          <div class="topping-price">+ R$ ${topping.price}</div>
        </label>
      </div>
    `;
  });
  
  // Set modal content
  modalContainer.innerHTML = `
    <div class="order-modal">
      <div class="modal-header">
        <h3>Personalize seu ${productName}</h3>
        <button class="close-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="section">
          <h4>Escolha até ${freeTopppings} acompanhamentos grátis:</h4>
          <p class="text-gray-600 mb-4">Acompanhamentos adicionais serão cobrados conforme o valor de cada um.</p>
          <div class="topping-options">
            ${toppingsHTML}
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="total-price">
          <span>Total:</span>
          <span id="total-price">R$ ${selectedProduct.price}</span>
        </div>
        <button class="add-to-cart-button">Adicionar ao carrinho</button>
      </div>
    </div>
  `;
  
  // Show modal
  document.body.classList.add('modal-open');
  
  // Add event listeners
  const closeButton = modalContainer.querySelector('.close-modal');
  closeButton.addEventListener('click', closeOrderModal);
  
  const addToCartButton = modalContainer.querySelector('.add-to-cart-button');
  addToCartButton.addEventListener('click', () => {
    addToCart(productName);
    closeOrderModal();
  });
  
  // Add event listeners for price calculation and topping limit
  const toppingInputs = modalContainer.querySelectorAll('input[name="toppings"]');
  
  toppingInputs.forEach(input => {
    input.addEventListener('change', () => {
      updateTotalPrice(productName, freeTopppings);
    });
  });
  
  // Initial price calculation
  updateTotalPrice(productName, freeTopppings);
}

// Close the order modal
function closeOrderModal() {
  const modalContainer = document.getElementById('order-modal-container');
  if (modalContainer) {
    document.body.classList.remove('modal-open');
    modalContainer.innerHTML = '';
  }
}

// Update the total price based on selections
function updateTotalPrice(productName, freeTopppings) {
  const selectedToppingInputs = document.querySelectorAll('input[name="toppings"]:checked');
  const totalPriceElement = document.getElementById('total-price');
  
  if (!totalPriceElement) return;
  
  // Find the selected product
  const selectedProduct = menuItems.find(item => item.name === productName);
  if (!selectedProduct) return;
  
  // Get base price
  let basePrice = parseFloat(selectedProduct.price.replace(',', '.'));
  
  // Calculate extra toppings cost
  let toppingsTotal = 0;
  
  // If we have more toppings than free ones
  if (selectedToppingInputs.length > freeTopppings) {
    // Get all selected toppings with their prices
    const selectedToppingsWithPrices = Array.from(selectedToppingInputs).map(input => {
      const toppingId = input.value;
      const topping = toppings.find(t => t.id === toppingId);
      return {
        id: toppingId,
        price: parseFloat(topping.price.replace(',', '.'))
      };
    });
    
    // Count how many extra toppings we have
    const extraToppingsCount = selectedToppingInputs.length - freeTopppings;
    
    // Add the price of each selected topping beyond the free limit
    for (let i = 0; i < extraToppingsCount; i++) {
      toppingsTotal += selectedToppingsWithPrices[i].price;
    }
  }
  
  // Calculate and display total
  const total = basePrice + toppingsTotal;
  totalPriceElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Add the selected product to cart
function addToCart(productName) {
  const selectedToppings = document.querySelectorAll('input[name="toppings"]:checked');
  
  // Find the selected product
  const selectedProduct = menuItems.find(item => item.name === productName);
  if (!selectedProduct) return;
  
  let toppingsSelected = [];
  selectedToppings.forEach(toppingInput => {
    const toppingId = toppingInput.value;
    const topping = toppings.find(t => t.id === toppingId);
    toppingsSelected.push(topping.name);
  });
  
  // For now, just show an alert with the order details
  const toppingsText = toppingsSelected.length > 0 
    ? `com ${toppingsSelected.join(', ')}` 
    : 'sem acompanhamentos';
  
  alert(`Adicionado ao carrinho: ${selectedProduct.name} ${toppingsText}`);
  
  // Here you would typically add the item to a cart object and update the UI
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderFeatures();
  renderMenuItems();
  
  // Add event listeners to order buttons
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('order-button')) {
      const productName = event.target.getAttribute('data-product');
      showOrderModal(productName);
    }
  });
  
  // Add event listener to hero button
  const heroButton = document.querySelector('.primary-button');
  if (heroButton) {
    heroButton.addEventListener('click', () => {
      // Scroll to menu section
      const menuSection = document.querySelector('.menu-section');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});