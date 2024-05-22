// Simulação de produtos
const products = [
    { id: 1, name: 'Chocolate Cupcake', price: 3.5 },
    { id: 2, name: 'Vanilla Cupcake', price: 3.0 },
    { id: 3, name: 'Red Velvet Cupcake', price: 4.0 },
    { id: 4, name: 'Strawberry Cupcake', price: 3.5 },
];

// Renderização de produtos
function renderProducts() {
    const productList = document.querySelector('.product-list');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: R$ ${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

const cart = [];

// Função para adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartDisplay();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    const cartList = document.querySelector('.cart-list');
    cartList.innerHTML = ''; // Limpa o carrinho atual
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: R$ ${product.price.toFixed(2)}</p>
        `;
        cartList.appendChild(cartItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Adicionar evento aos botões "Add to Cart"
    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.parentElement.dataset.productId, 10);
            addToCart(productId);
        });
    });
});


// Chamada da função para renderizar os produtos ao carregar a página
document.addEventListener('DOMContentLoaded', renderProducts);
