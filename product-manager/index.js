document.addEventListener('DOMContentLoaded', () => {

    const addProductBtn = document.querySelector('.button-add');
    const modalOverlay = document.getElementById('add-product-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const addProductForm = document.getElementById('add-product-form');
    const cancelBtn = document.querySelector('.cancel-btn');
    const productListContainer = document.querySelector('.product-list');
    const productsTitle = document.querySelector('.products-title');
    const cardTemplate = document.getElementById('product-card-template');
    const emptyStateTemplate = document.getElementById('empty-state-template');

    let products = [];

    function openModal() {
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    function renderProducts() {
        productListContainer.innerHTML = '';
        productsTitle.textContent = `Products (${products.length})`;

        if (products.length === 0) {
            const emptyStateClone = emptyStateTemplate.content.cloneNode(true);
            productListContainer.appendChild(emptyStateClone);
            return;
        }

        products.forEach(product => {
            const cardClone = cardTemplate.content.cloneNode(true);

            const stockText = product.stock == 0 ? '(Out of Stock)' : product.stock < 10 ? '(Low Stock)' : '';

            cardClone.querySelector('.product-name').textContent = product.name;
            cardClone.querySelector('.product-price').textContent = `$${product.price}`;
            cardClone.querySelector('.product-category').textContent = product.category;
            cardClone.querySelector('.product-stock').textContent = `${product.stock} `;

            const stockInfoSpan = document.createElement('span');
            stockInfoSpan.className = 'stock-info';
            stockInfoSpan.textContent = stockText;
            cardClone.querySelector('.product-stock').appendChild(stockInfoSpan);

            productListContainer.appendChild(cardClone);
        });
    }

    if (addProductBtn) {
        addProductBtn.addEventListener('click', openModal);
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            addProductForm.reset();
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    if (addProductForm) {
        addProductForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const newProduct = {
                id: Date.now(),
                name: document.getElementById('product-name').value,
                price: parseFloat(document.getElementById('product-price').value).toFixed(2),
                category: document.getElementById('product-category').value,
                stock: parseInt(document.getElementById('product-stock').value, 10),
            };

            products.push(newProduct);
            renderProducts();
            addProductForm.reset();
            closeModal();
        });
    }

    renderProducts();
});