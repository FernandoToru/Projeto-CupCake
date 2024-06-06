document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const modal = document.getElementById('login-modal');
    const span = document.getElementsByClassName('close')[0];

    loginLink.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Redirecionamentos
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const forgotPassword = document.getElementById('forgot-password');

    loginButton.onclick = function() {
        window.location.href = 'login.html';
    }

    registerButton.onclick = function() {
        window.location.href = 'register.html';
    }

    forgotPassword.onclick = function() {
        window.location.href = 'forgot-password.html';
    }

    // Exibição de produtos
    const products = [
        { id: 1, name: 'Chocolate Cupcake', price: 3.5, imageUrl: 'images/chocolate_cupcake.jpg', description: 'Delicioso cupcake de chocolate' },
        { id: 2, name: 'Vanilla Cupcake', price: 3.0, imageUrl: 'images/carinho.jpg', description: 'Saboroso cupcake de baunilha' },
        { id: 3, name: 'Red Velvet Cupcake', price: 4.0, imageUrl: 'images/ciranda.jpg', description: 'Cupcake de red velvet com cobertura cremosa' },
        { id: 4, name: 'Strawberry Cupcake', price: 3.5, imageUrl: 'images/paixao.jpg', description: 'Cupcake de morango com recheio de morango fresco' },
        { id: 5, name: 'Lemon Cupcake', price: 3.5, imageUrl: 'images/romance.jpg', description: 'Cupcake de limão com cobertura de limão' },
        { id: 6, name: 'Carrot Cupcake', price: 3.5, imageUrl: 'images/delicado.jpg', description: 'Cupcake de cenoura com cobertura de cream cheese' },
        { id: 7, name: 'Coconut Cupcake', price: 3.5, imageUrl: 'images/encanto.jpg', description: 'Cupcake de coco com cobertura de coco' },
        { id: 8, name: 'Blueberry Cupcake', price: 3.5, imageUrl: 'images/fantasia.jpg', description: 'Cupcake de mirtilo com cobertura de mirtilo' },
        { id: 9, name: 'Banana Cupcake', price: 3.5, imageUrl: 'images/flor.jpg', description: 'Cupcake de banana com cobertura de banana' },
        { id: 10, name: 'Pumpkin Cupcake', price: 3.5, imageUrl: 'images/tango.jpg', description: 'Cupcake de abóbora com cobertura de abóbora' },
        { id: 11, name: 'Coffee Cupcake', price: 3.5, imageUrl: 'images/tropical.jpg', description: 'Cupcake de café com cobertura de café' },
        { id: 12, name: 'Mint Cupcake', price: 3.5, imageUrl: 'images/red.jpg', description: 'Cupcake de red velvet com cobertura cremosa' }
    ];

    window.products = products; // Torna o array products acessível globalmente

    if (document.getElementById('product-list')) {
        renderProducts(products);
    }
});

function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: R$ ${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = window.products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho');
}
