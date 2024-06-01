document.addEventListener('DOMContentLoaded', () => {
    // Configurações de modal e redirecionamento
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
        { id: 2, name: 'Vanilla Cupcake', price: 3.0, imageUrl: 'images/vanilla_cupcake.jpg', description: 'Saboroso cupcake de baunilha' },
        { id: 3, name: 'Red Velvet Cupcake', price: 4.0, imageUrl: 'images/red_velvet_cupcake.jpg', description: 'Cupcake de red velvet com cobertura cremosa' },
        { id: 4, name: 'Strawberry Cupcake', price: 3.5, imageUrl: 'images/strawberry_cupcake.jpg', description: 'Cupcake de morango com recheio de morango fresco' }
    ];

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
    alert('Produto adicionado ao carrinho');
}
