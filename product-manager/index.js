document.addEventListener('DOMContentLoaded', () => {

    const addProductBtn = document.querySelector('.button-add');
    const addModalOverlay = document.getElementById('add-product-modal');
    const addProductForm = document.getElementById('add-product-form');

    const editModalOverlay = document.getElementById('edit-product-modal');
    const editForm = document.getElementById('edit-product-form');
    let currentlyEditingProductId = null;

    const productListContainer = document.querySelector('.product-list');
    const productsTitle = document.querySelector('.products-title');
    const cardTemplate = document.getElementById('product-card-template');
    const emptyStateTemplate = document.getElementById('empty-state-template');

    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const filterForm = document.getElementById('filter-form');

    const allCloseButtons = document.querySelectorAll('.modal-close-btn');
    const allCancelButtons = document.querySelectorAll('.cancel-btn');
    const allOverlays = document.querySelectorAll('.modal-overlay');

    const STORAGE_KEY = 'my-products';
    let appData = {
        products: [],
        nextId: 0,
    };

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    }

    function loadData() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            appData = JSON.parse(savedData);
        }
    }

    function openModal(modal) {
        modal.classList.add('active');
    }

    function closeAllModals() {
        allOverlays.forEach(overlay => overlay.classList.remove('active'));
    }

    function populateCategoryFilter() {
        const categories = [...new Set(appData.products.map(p => p.category))];
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function applyFiltersAndRender() {
        let filteredProducts = [...appData.products];
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const sortValue = sortFilter.value;

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(searchTerm)
            );
        }

        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(p =>
                p.category === selectedCategory
            );
        }

        switch (sortValue) {
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case 'stock-asc':
                filteredProducts.sort((a, b) => a.stock - b.stock);
                break;
            case 'stock-desc':
                filteredProducts.sort((a, b) => b.stock - a.stock);
                break;
        }

        renderProducts(filteredProducts);
    }

    function renderProducts(productsToRender) {
        productListContainer.innerHTML = '';
        productsTitle.innerHTML = `Products <span class="number">(${productsToRender.length})</span>`;

        if (productsToRender.length === 0) {
            if (emptyStateTemplate) {
                const emptyStateClone = emptyStateTemplate.content.cloneNode(true);
                productListContainer.appendChild(emptyStateClone);
            }
            return;
        }

        productsToRender.forEach(product => {
            const cardClone = cardTemplate.content.cloneNode(true);

            const stockText = product.stock == 0 ? '(Out of Stock)' : product.stock < 10 ? `${product.stock} (Low Stock)` : product.stock;
            cardClone.querySelector('.product-name').textContent = product.name;
            cardClone.querySelector('.product-price').textContent = `$${product.price}`;
            cardClone.querySelector('.product-category').textContent = product.category;
            cardClone.querySelector('.product-stock').textContent = stockText;

            const deleteBtn = cardClone.querySelector('.button-actions.delete');
            deleteBtn.addEventListener('click', () => {
                const userConfirmed = confirm('Are you sure you want to delete this product?');
                if (userConfirmed) {
                    appData.products = appData.products.filter(p => p.id !== product.id);
                    saveData();
                    applyFiltersAndRender();
                    populateCategoryFilter();
                }
            });

            const editBtn = cardClone.querySelector('.button-actions.edit');
            editBtn.addEventListener('click', () => {
                currentlyEditingProductId = product.id;
                document.getElementById('edit-product-name').value = product.name;
                document.getElementById('edit-product-price').value = product.price;
                document.getElementById('edit-product-category').value = product.category;
                document.getElementById('edit-product-stock').value = product.stock;
                openModal(editModalOverlay);
            });

            productListContainer.appendChild(cardClone);
        });
    }

    addProductBtn.addEventListener('click', () => openModal(addModalOverlay));
    allCloseButtons.forEach(button => button.addEventListener('click', closeAllModals));
    allCancelButtons.forEach(button => button.addEventListener('click', closeAllModals));
    allOverlays.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                closeAllModals();
            }
        });
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });

    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newProduct = {
            id: appData.nextId,
            name: document.getElementById('product-name').value,
            price: parseFloat(document.getElementById('product-price').value).toFixed(2),
            category: document.getElementById('product-category').value,
            stock: parseInt(document.getElementById('product-stock').value, 10),
        };
        appData.nextId++;
        appData.products.push(newProduct);
        saveData();
        applyFiltersAndRender();
        populateCategoryFilter();
        addProductForm.reset();
        closeAllModals();
    });

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productIndex = appData.products.findIndex(p => p.id === currentlyEditingProductId);
        if (productIndex > -1) {
            appData.products[productIndex].name = document.getElementById('edit-product-name').value;
            appData.products[productIndex].price = parseFloat(document.getElementById('edit-product-price').value).toFixed(2);
            appData.products[productIndex].category = document.getElementById('edit-product-category').value;
            appData.products[productIndex].stock = parseInt(document.getElementById('edit-product-stock').value, 10);
            saveData();
            applyFiltersAndRender();
            populateCategoryFilter();
            closeAllModals();
        }
    });

    searchInput.addEventListener('input', applyFiltersAndRender);
    categoryFilter.addEventListener('change', applyFiltersAndRender);
    sortFilter.addEventListener('change', applyFiltersAndRender);

    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        categoryFilter.value = 'all';
        sortFilter.value = 'name-asc';

        applyFiltersAndRender();
    });

    loadData();
    applyFiltersAndRender();
    populateCategoryFilter();
});