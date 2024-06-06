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
    { id: 1, name: 'Chocolate', price: 3.5, imageUrl: 'images/chocolate_cupcake.jpg', description: 'Delicioso cupcake de chocolate' },
    { id: 2, name: 'Carinho', price: 3.0, imageUrl: 'images/carinho.jpg', description: 'Cupcake de massa de chocolate com recheio de doce de leite e cobertura de ganache tradicional' },
    { id: 3, name: 'Ciranda', price: 4.0, imageUrl: 'images/ciranda.jpg', description: 'Cupcake de massa de chocolate com recheio de brigadeiro artesanal e cobertura buttercream de chocolate' },
    { id: 4, name: 'Paixão', price: 3.5, imageUrl: 'images/paixao.jpg', description: 'Cupcake de massa de chocolate com toque de pimenta e pedacinhos de chocolate belga com recheio de doce de leite e cobertura ganache tradicional' },
    { id: 5, name: 'Romance', price: 3.5, imageUrl: 'images/romance.jpg', description: 'Cupcake de massa de chocolate com recheio de geleia de morango e cobertura de ganache tradicional' },
    { id: 6, name: 'Delicado', price: 3.5, imageUrl: 'images/delicado.jpg', description: 'Cupcake de massa baunilha com recheio ganache de framboesa e cobertura de merengue italiano' },
    { id: 7, name: 'Encanto', price: 3.5, imageUrl: 'images/encanto.jpg', description: 'Cupcake de massa de baunilha com recheio de geleia de amora e cobertura buttercream de baunilha' },
    { id: 8, name: 'Fantasia', price: 3.5, imageUrl: 'images/fantasia.jpg', description: 'Cupcake de massa de baunilha com recheio de geleia de morango e cobertura de ganache branco' },
    { id: 9, name: 'Flor de maracujá', price: 3.5, imageUrl: 'images/flor.jpg', description: 'Cupcake de massa sabor maracujá com recheio de geleia de damasco e cobertura de merengue italiano' },
    { id: 10, name: 'Tango', price: 3.5, imageUrl: 'images/tango.jpg', description: 'Cupcake de massa de nozes com recheio de doce de leite e cobertura buttercream de doce de leite' },
    { id: 11, name: 'Tropical', price: 3.5, imageUrl: 'images/tropical.jpg', description: 'Cupcake de massa sabor coco com recheio de ganache tradicional e cobertura de ganache de coco' },
    { id: 12, name: 'Red Velvet', price: 3.5, imageUrl: 'images/red.jpg', description: 'Cupcake de red velvet com cobertura cremosa' }
    ];

    window.products = products; // Torna o array products acessível globalmente

    if (document.getElementById('product-list')) {
        renderProducts(products);
    }
     // Adicione esta linha
     renderRecommendations(products.slice(3, 6)); // Modifique os índices conforme necessário para selecionar os produtos desejados
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

function renderRecommendations(recommendedProducts) {
    const recommendationList = document.getElementById('recommendation-list');
    recommendationList.innerHTML = '';
    recommendedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: R$ ${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        recommendationList.appendChild(productElement);
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
