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

// Shopping cart
let cart = {
  items: [],
  total: 0
};

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

    // Sort toppings by price (descending) to use the free toppings for the most expensive ones
    selectedToppingsWithPrices.sort((a, b) => b.price - a.price);

    // Count how many extra toppings we have
    const extraToppingsCount = selectedToppingInputs.length - freeTopppings;

    // Add the price of each selected topping beyond the free limit
    // Start from the cheapest ones (at the end of the sorted array)
    for (let i = selectedToppingsWithPrices.length - 1; i >= selectedToppingsWithPrices.length - extraToppingsCount; i--) {
      toppingsTotal += selectedToppingsWithPrices[i].price;
    }
  }

  // Calculate and display total
  const total = basePrice + toppingsTotal;
  totalPriceElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Add the selected product to cart
function addToCart(productName) {
  const selectedToppingInputs = document.querySelectorAll('input[name="toppings"]:checked');

  // Find the selected product
  const selectedProduct = menuItems.find(item => item.name === productName);
  if (!selectedProduct) return;

  // Get base price
  let basePrice = parseFloat(selectedProduct.price.replace(',', '.'));

  // Get free toppings count
  const freeTopppings = selectedProduct.freeTopppings || 2;

  // Get all selected toppings
  let selectedToppings = [];
  selectedToppingInputs.forEach(input => {
    const toppingId = input.value;
    const topping = toppings.find(t => t.id === toppingId);
    selectedToppings.push({
      id: toppingId,
      name: topping.name,
      price: parseFloat(topping.price.replace(',', '.'))
    });
  });

  // Sort toppings by price (descending) to use the free toppings for the most expensive ones
  selectedToppings.sort((a, b) => b.price - a.price);

  // Calculate extra toppings cost
  let extraToppingsTotal = 0;
  if (selectedToppings.length > freeTopppings) {
    const extraToppingsCount = selectedToppings.length - freeTopppings;
    // Start from the cheapest ones (at the end of the sorted array)
    for (let i = selectedToppings.length - 1; i >= selectedToppings.length - extraToppingsCount; i--) {
      extraToppingsTotal += selectedToppings[i].price;
    }
  }

  // Calculate total price for this item
  const totalPrice = basePrice + extraToppingsTotal;

  // Create cart item
  const cartItem = {
    id: Date.now().toString(),
    product: selectedProduct.name,
    basePrice: basePrice,
    toppings: selectedToppings,
    extraToppingsTotal: extraToppingsTotal,
    totalPrice: totalPrice
  };

  // Add to cart
  cart.items.push(cartItem);

  // Update cart total
  updateCartTotal();

  // Update cart UI
  updateCartUI();

  // Show cart notification
  showCartNotification(selectedProduct.name);
}

// Update cart total
function updateCartTotal() {
  cart.total = cart.items.reduce((total, item) => total + item.totalPrice, 0);
}

// Show cart notification
function showCartNotification(productName) {
  // Create notification if it doesn't exist
  let notification = document.getElementById('cart-notification');

  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cart-notification';
    document.body.appendChild(notification);
  }

  // Set notification content
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">✓</div>
      <div class="notification-text">${productName} adicionado ao carrinho</div>
    </div>
  `;

  // Show notification
  notification.classList.add('show');

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);

  // Update cart icon count
  updateCartIconCount();
}

// Update cart icon count
function updateCartIconCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.items.length;

    if (cart.items.length > 0) {
      cartCount.classList.add('show');
    } else {
      cartCount.classList.remove('show');
    }
  }
}

// Update cart UI
function updateCartUI() {
  // Create cart icon if it doesn't exist
  let cartIcon = document.getElementById('cart-icon-container');

  if (!cartIcon) {
    cartIcon = document.createElement('div');
    cartIcon.id = 'cart-icon-container';
    cartIcon.innerHTML = `
      <div class="cart-icon" id="cart-icon">
        🛒
        <span class="cart-count" id="cart-count">0</span>
      </div>
    `;
    document.body.appendChild(cartIcon);

    // Add event listener to cart icon
    cartIcon.addEventListener('click', showCartModal);
  }

  // Update cart icon count
  updateCartIconCount();
}

// Show cart modal
function showCartModal() {
  // Create modal container if it doesn't exist
  let modalContainer = document.getElementById('cart-modal-container');

  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'cart-modal-container';
    document.body.appendChild(modalContainer);
  }

  // Generate cart items HTML
  let cartItemsHTML = '';

  if (cart.items.length === 0) {
    cartItemsHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p>Seu carrinho está vazio</p>
        <button class="continue-shopping-button">Continuar comprando</button>
      </div>
    `;
  } else {
    cartItemsHTML = `
      <div class="cart-items">
        ${cart.items.map(item => {
      const toppingsText = item.toppings.length > 0
        ? `<div class="cart-item-toppings">Com: ${item.toppings.map(t => t.name).join(', ')}</div>`
        : '';

      return `
            <div class="cart-item" data-id="${item.id}">
              <div class="cart-item-info">
                <div class="cart-item-name">${item.product}</div>
                ${toppingsText}
              </div>
              <div class="cart-item-price">R$ ${item.totalPrice.toFixed(2).replace('.', ',')}</div>
              <button class="remove-item-button" data-id="${item.id}">×</button>
            </div>
          `;
    }).join('')}
      </div>
      <div class="cart-summary">
        <div class="cart-total">
          <span>Total:</span>
          <span>R$ ${cart.total.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
    `;
  }

  // Set modal content
  modalContainer.innerHTML = `
    <div class="cart-modal">
      <div class="modal-header">
        <h3>Seu Carrinho</h3>
        <button class="close-modal">×</button>
      </div>
      <div class="modal-body">
        ${cartItemsHTML}
      </div>
      ${cart.items.length > 0 ? `
        <div class="modal-footer">
          <button class="continue-shopping-button">Continuar comprando</button>
          <button class="checkout-button">Finalizar pedido</button>
        </div>
      ` : ''}
    </div>
  `;

  // Show modal
  document.body.classList.add('modal-open');

  // Add event listeners
  const closeButton = modalContainer.querySelector('.close-modal');
  closeButton.addEventListener('click', closeCartModal);

  const continueShoppingButton = modalContainer.querySelector('.continue-shopping-button');
  if (continueShoppingButton) {
    continueShoppingButton.addEventListener('click', closeCartModal);
  }

  const checkoutButton = modalContainer.querySelector('.checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', showCheckoutModal);
  }

  // Add event listeners to remove buttons
  const removeButtons = modalContainer.querySelectorAll('.remove-item-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const itemId = event.target.getAttribute('data-id');
      removeCartItem(itemId);
      showCartModal(); // Refresh the cart modal
    });
  });
}

// Close cart modal
function closeCartModal() {
  const modalContainer = document.getElementById('cart-modal-container');
  if (modalContainer) {
    document.body.classList.remove('modal-open');
    modalContainer.innerHTML = '';
  }
}

// Remove cart item
function removeCartItem(itemId) {
  cart.items = cart.items.filter(item => item.id !== itemId);
  updateCartTotal();
  updateCartIconCount();
}

// Show checkout modal
function showCheckoutModal() {
  // Close cart modal first
  closeCartModal();

  // Create modal container if it doesn't exist
  let modalContainer = document.getElementById('checkout-modal-container');

  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'checkout-modal-container';
    document.body.appendChild(modalContainer);
  }

  // Set modal content
  modalContainer.innerHTML = `
    <div class="checkout-modal">
      <div class="modal-header">
        <h3>Finalizar Pedido</h3>
        <button class="close-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="checkout-section">
          <h4>Informações de Entrega</h4>
          <form id="delivery-form">
            <div class="form-group">
              <label for="name">Nome completo</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="phone">Telefone</label>
              <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
              <label for="address">Endereço</label>
              <input type="text" id="address" name="address" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="number">Número</label>
                <input type="text" id="number" name="number" required>
              </div>
              <div class="form-group">
                <label for="complement">Complemento</label>
                <input type="text" id="complement" name="complement">
              </div>
            </div>
            <div class="form-group">
              <label for="neighborhood">Bairro</label>
              <input type="text" id="neighborhood" name="neighborhood" required>
            </div>
          </form>
        </div>
        
        <div class="checkout-section">
          <h4>Forma de Pagamento</h4>
          <div class="payment-methods">
            <div class="payment-method">
              <input type="radio" name="payment-method" id="credit-card" value="credit-card" checked>
              <label for="credit-card">Cartão de Crédito</label>
            </div>
            <div class="payment-method">
              <input type="radio" name="payment-method" id="debit-card" value="debit-card">
              <label for="debit-card">Cartão de Débito</label>
            </div>
            <div class="payment-method">
              <input type="radio" name="payment-method" id="pix" value="pix">
              <label for="pix">PIX</label>
            </div>
            <div class="payment-method">
              <input type="radio" name="payment-method" id="cash" value="cash">
              <label for="cash">Dinheiro</label>
            </div>
          </div>
          
          <div id="credit-card-form" class="payment-form">
            <div class="form-group">
              <label for="card-number">Número do cartão</label>
              <input type="text" id="card-number" name="card-number" placeholder="0000 0000 0000 0000">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="card-expiry">Validade</label>
                <input type="text" id="card-expiry" name="card-expiry" placeholder="MM/AA">
              </div>
              <div class="form-group">
                <label for="card-cvv">CVV</label>
                <input type="text" id="card-cvv" name="card-cvv" placeholder="123">
              </div>
            </div>
            <div class="form-group">
              <label for="card-name">Nome no cartão</label>
              <input type="text" id="card-name" name="card-name">
            </div>
          </div>
          
          <div id="pix-form" class="payment-form" style="display: none;">
            <div class="pix-info">
              <p>Ao finalizar o pedido, você receberá um QR Code para pagamento via PIX.</p>
            </div>
          </div>
          
          <div id="cash-form" class="payment-form" style="display: none;">
            <div class="form-group">
              <label for="cash-change">Troco para</label>
              <input type="text" id="cash-change" name="cash-change" placeholder="R$ 0,00">
            </div>
          </div>
        </div>
        
        <div class="checkout-section">
          <h4>Resumo do Pedido</h4>
          <div class="order-summary">
            ${cart.items.map(item => {
    return `
                <div class="order-item">
                  <div class="order-item-name">${item.product}</div>
                  <div class="order-item-price">R$ ${item.totalPrice.toFixed(2).replace('.', ',')}</div>
                </div>
              `;
  }).join('')}
            <div class="order-total">
              <span>Total:</span>
              <span>R$ ${cart.total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="back-button">Voltar</button>
        <button class="place-order-button">Finalizar pedido</button>
      </div>
    </div>
  `;

  // Show modal
  document.body.classList.add('modal-open');

  // Add event listeners
  const closeButton = modalContainer.querySelector('.close-modal');
  closeButton.addEventListener('click', closeCheckoutModal);

  const backButton = modalContainer.querySelector('.back-button');
  backButton.addEventListener('click', () => {
    closeCheckoutModal();
    showCartModal();
  });

  const placeOrderButton = modalContainer.querySelector('.place-order-button');
  placeOrderButton.addEventListener('click', placeOrder);

  // Add event listeners to payment method radios
  const paymentMethodRadios = modalContainer.querySelectorAll('input[name="payment-method"]');
  paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', togglePaymentForms);
  });

  // Format inputs
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', formatCardNumber);
  }

  const cardExpiryInput = document.getElementById('card-expiry');
  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', formatCardExpiry);
  }

  const cashChangeInput = document.getElementById('cash-change');
  if (cashChangeInput) {
    cashChangeInput.addEventListener('input', formatCurrency);
  }
}

// Close checkout modal
function closeCheckoutModal() {
  const modalContainer = document.getElementById('checkout-modal-container');
  if (modalContainer) {
    document.body.classList.remove('modal-open');
    modalContainer.innerHTML = '';
  }
}

// Toggle payment forms based on selected payment method
function togglePaymentForms() {
  const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

  // Hide all payment forms
  const paymentForms = document.querySelectorAll('.payment-form');
  paymentForms.forEach(form => {
    form.style.display = 'none';
  });

  // Show selected payment form
  if (selectedMethod === 'credit-card' || selectedMethod === 'debit-card') {
    document.getElementById('credit-card-form').style.display = 'block';
  } else if (selectedMethod === 'pix') {
    document.getElementById('pix-form').style.display = 'block';
  } else if (selectedMethod === 'cash') {
    document.getElementById('cash-form').style.display = 'block';
  }
}

// Format card number input (add spaces every 4 digits)
function formatCardNumber(event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, '');

  if (value.length > 16) {
    value = value.slice(0, 16);
  }

  // Add spaces every 4 digits
  const parts = [];
  for (let i = 0; i < value.length; i += 4) {
    parts.push(value.slice(i, i + 4));
  }

  input.value = parts.join(' ');
}

// Format card expiry input (MM/YY)
function formatCardExpiry(event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, '');

  if (value.length > 4) {
    value = value.slice(0, 4);
  }

  if (value.length > 2) {
    input.value = value.slice(0, 2) + '/' + value.slice(2);
  } else {
    input.value = value;
  }
}

// Format currency input
function formatCurrency(event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, '');

  if (value === '') {
    input.value = '';
    return;
  }

  value = parseInt(value, 10) / 100;
  input.value = 'R$ ' + value.toFixed(2).replace('.', ',');
}

// Place order
function placeOrder() {
  // Validate delivery form
  const deliveryForm = document.getElementById('delivery-form');
  if (!deliveryForm.checkValidity()) {
    alert('Por favor, preencha todos os campos obrigatórios de entrega.');
    return;
  }

  // Validate payment form
  const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

  if (selectedMethod === 'credit-card' || selectedMethod === 'debit-card') {
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;
    const cardName = document.getElementById('card-name').value;

    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      alert('Por favor, preencha todos os campos do cartão.');
      return;
    }
  } else if (selectedMethod === 'cash') {
    const cashChange = document.getElementById('cash-change').value;
    if (!cashChange) {
      alert('Por favor, informe o valor para troco.');
      return;
    }
  }

  // Close checkout modal
  closeCheckoutModal();

  // Show order confirmation
  showOrderConfirmation();

  // Clear cart
  cart.items = [];
  cart.total = 0;
  updateCartIconCount();
}

// Show order confirmation
function showOrderConfirmation() {
  // Create modal container if it doesn't exist
  let modalContainer = document.getElementById('confirmation-modal-container');

  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'confirmation-modal-container';
    document.body.appendChild(modalContainer);
  }

  // Generate random order number
  const orderNumber = Math.floor(Math.random() * 10000) + 1000;

  // Set modal content
  modalContainer.innerHTML = `
    <div class="confirmation-modal">
      <div class="modal-header">
        <h3>Pedido Confirmado!</h3>
        <button class="close-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="confirmation-icon">✓</div>
        <h4>Obrigado pelo seu pedido!</h4>
        <p>Seu pedido #${orderNumber} foi recebido e está sendo preparado.</p>
        <p>Você receberá atualizações sobre o status do seu pedido por telefone.</p>
        <p class="delivery-time">Tempo estimado de entrega: 30-45 minutos</p>
      </div>
      <div class="modal-footer">
        <button class="close-confirmation-button">Fechar</button>
      </div>
    </div>
  `;

  // Show modal
  document.body.classList.add('modal-open');

  // Add event listeners
  const closeButton = modalContainer.querySelector('.close-modal');
  closeButton.addEventListener('click', closeConfirmationModal);

  const closeConfirmationButton = modalContainer.querySelector('.close-confirmation-button');
  closeConfirmationButton.addEventListener('click', closeConfirmationModal);
}

// Close confirmation modal
function closeConfirmationModal() {
  const modalContainer = document.getElementById('confirmation-modal-container');
  if (modalContainer) {
    document.body.classList.remove('modal-open');
    modalContainer.innerHTML = '';
  }
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