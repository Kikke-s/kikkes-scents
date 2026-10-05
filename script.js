document.addEventListener("DOMContentLoaded", () => {

    const collectionCards =
        document.querySelectorAll(".collection-card");

    const diffuserOptions =
        document.getElementById("diffuserOptions");

    const diffuserButtons =
        document.querySelectorAll(".diffuser-option");

    const productsGrid =
        document.getElementById("productsGrid");

    const shopSection =
        document.getElementById("shop");

    const shopTitle =
        document.getElementById("shopTitle");

    const shopDescription =
        document.getElementById("shopDescription");

    const shopEyebrow =
        document.getElementById("shopEyebrow");

    const backButton =
        document.getElementById("backButton");


    const productModal =
        document.getElementById("productModal");

    const closeModal =
        document.getElementById("closeModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalType =
        document.getElementById("modalType");

    const modalName =
        document.getElementById("modalName");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalProfile =
        document.getElementById("modalProfile");

    const variantSelect =
        document.getElementById("variantSelect");

    const modalPrice =
        document.getElementById("modalPrice");

    const quantityDisplay =
        document.getElementById("quantity");

    const minusQuantity =
        document.getElementById("minusQuantity");

    const plusQuantity =
        document.getElementById("plusQuantity");

    const addToCart =
        document.getElementById("addToCart");


    const cartButton =
        document.getElementById("cartButton");

    const cartDrawer =
        document.getElementById("cartDrawer");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const closeCart =
        document.getElementById("closeCart");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");

    const checkoutWhatsApp =
        document.getElementById("checkoutWhatsApp");


    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");


    let currentProduct = null;
    let currentCategory = null;
    let currentVariant = null;
    let currentQuantity = 1;

    let cart =
        JSON.parse(localStorage.getItem("kikkesCart")) || [];


    /* =========================
       COLLECTION CARDS
    ========================= */

    collectionCards.forEach(card => {

        card.addEventListener("click", () => {

            const category =
                card.dataset.collection;

            if (category === "diffuser") {

                showDiffuserSelection();

            } else {

                showCategory(category);

            }

        });

    });


    /* =========================
       SHOW CATEGORY
    ========================= */

    function showCategory(category) {

        const product = products[category];

        if (!product) return;

        currentCategory = category;

        shopTitle.textContent =
            product.title;

        shopEyebrow.textContent =
            product.eyebrow;

        shopDescription.textContent =
            product.description;

        diffuserOptions.classList.add("hidden");

        productsGrid.classList.remove("hidden");

        backButton.classList.remove("hidden");

        renderProducts(category);

        shopSection.scrollIntoView({
            behavior: "smooth"
        });

    }


    /* =========================
       DIFFUSER SELECTION
    ========================= */

    function showDiffuserSelection() {

        currentCategory = "diffuser";

        shopEyebrow.textContent =
            "DIFFUSER COLLECTION";

        shopTitle.textContent =
            "Choose Your Diffuser";

        shopDescription.textContent =
            "Bring beautiful fragrance into your home or take your favourite scent with you on the road.";

        productsGrid.classList.add("hidden");

        diffuserOptions.classList.remove("hidden");

        backButton.classList.remove("hidden");

        shopSection.scrollIntoView({
            behavior: "smooth"
        });

    }


    diffuserButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.diffuser;

            showCategory(category);

        });

    });


    /* =========================
       RENDER PRODUCTS
    ========================= */

    function renderProducts(category) {

        const product =
            products[category];

        productsGrid.innerHTML = "";

        product.scents.forEach(scent => {

            const card =
                document.createElement("article");

            card.className =
                "product-card";


            card.innerHTML = `

                <button class="product-image-button">

                    <img
                        src="images/${product.imageFolder}/${scent.image}"
                        alt="${scent.name}"
                    >

                </button>

                <div class="product-card-content">

                    <span class="product-number">
                        ${String(product.scents.indexOf(scent) + 1).padStart(2, "0")}
                    </span>

                    <h3>${scent.name}</h3>

                    <p>
                        ${scent.description}
                    </p>

                    <div class="product-card-bottom">

                        <span>
                            From ₦${product.variants[0].price.toLocaleString()}
                        </span>

                        <button class="view-product">
                            View →
                        </button>

                    </div>

                </div>
            `;


            card.querySelector(".product-image-button")
                .addEventListener("click", () => {

                    openProduct(
                        category,
                        scent.id
                    );

                });


            card.querySelector(".view-product")
                .addEventListener("click", () => {

                    openProduct(
                        category,
                        scent.id
                    );

                });


            productsGrid.appendChild(card);

        });

    }


    /* =========================
       OPEN PRODUCT
    ========================= */

    function openProduct(category, scentId) {

        const product =
            products[category];

        const scent =
            product.scents.find(
                item => item.id === scentId
            );

        if (!scent) return;

        currentProduct = {
            ...scent,
            category: category
        };

        currentCategory = category;

        currentQuantity = 1;

        quantityDisplay.textContent =
            currentQuantity;


        modalImage.src =
            `images/${product.imageFolder}/${scent.image}`;

        modalImage.alt =
            scent.name;

        modalType.textContent =
            product.title;

        modalName.textContent =
            scent.name;

        modalDescription.textContent =
            scent.description;

        modalProfile.textContent =
            scent.profile;


        variantSelect.innerHTML = "";

        product.variants.forEach((variant, index) => {

            const option =
                document.createElement("option");

            option.value = index;

            option.textContent =
                `${variant.name} — ₦${variant.price.toLocaleString()}`;

            variantSelect.appendChild(option);

        });


        currentVariant =
            product.variants[0];

        modalPrice.textContent =
            `₦${currentVariant.price.toLocaleString()}`;


        productModal.classList.remove("hidden");

        document.body.classList.add("modal-open");

    }


    /* =========================
       VARIANT
    ========================= */

    variantSelect.addEventListener("change", () => {

        const product =
            products[currentCategory];

        const index =
            Number(variantSelect.value);

        currentVariant =
            product.variants[index];

        modalPrice.textContent =
            `₦${currentVariant.price.toLocaleString()}`;

    });


    /* =========================
       QUANTITY
    ========================= */

    minusQuantity.addEventListener("click", () => {

        if (currentQuantity > 1) {

            currentQuantity--;

            quantityDisplay.textContent =
                currentQuantity;

        }

    });


    plusQuantity.addEventListener("click", () => {

        currentQuantity++;

        quantityDisplay.textContent =
            currentQuantity;

    });


    /* =========================
       ADD TO CART
    ========================= */

    addToCart.addEventListener("click", () => {

        const product =
            products[currentCategory];

        const selectedVariant =
            product.variants[
                Number(variantSelect.value)
            ];


        const existing =
            cart.find(item =>
                item.category === currentCategory &&
                item.scentId === currentProduct.id &&
                item.variant === selectedVariant.name
            );


        if (existing) {

            existing.quantity +=
                currentQuantity;

        } else {

            cart.push({

                category: currentCategory,

                scentId: currentProduct.id,

                name: currentProduct.name,

                image:
                    `images/${product.imageFolder}/${currentProduct.image}`,

                variant:
                    selectedVariant.name,

                price:
                    selectedVariant.price,

                quantity:
                    currentQuantity

            });

        }


        saveCart();

        updateCart();

        closeProductModal();

        openCart();

    });


    /* =========================
       CART
    ========================= */

    function saveCart() {

        localStorage.setItem(
            "kikkesCart",
            JSON.stringify(cart)
        );

    }


    function updateCart() {

        cartItems.innerHTML = "";

        let total = 0;
        let count = 0;


        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <div>♡</div>

                    <h3>Your bag is empty</h3>

                    <p>
                        Discover a fragrance for your space.
                    </p>

                </div>

            `;

        }


        cart.forEach((item, index) => {

            total +=
                item.price * item.quantity;

            count +=
                item.quantity;


            const cartItem =
                document.createElement("div");

            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>${item.variant}</p>

                    <strong>
                        ₦${(item.price * item.quantity).toLocaleString()}
                    </strong>

                    <div class="cart-quantity">

                        <button class="cart-minus">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button class="cart-plus">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    title="Remove"
                >
                    ×
                </button>

            `;


            cartItem
                .querySelector(".cart-minus")
                .addEventListener("click", () => {

                    if (item.quantity > 1) {

                        item.quantity--;

                    } else {

                        cart.splice(index, 1);

                    }

                    saveCart();
                    updateCart();

                });


            cartItem
                .querySelector(".cart-plus")
                .addEventListener("click", () => {

                    item.quantity++;

                    saveCart();
                    updateCart();

                });


            cartItem
                .querySelector(".remove-item")
                .addEventListener("click", () => {

                    cart.splice(index, 1);

                    saveCart();
                    updateCart();

                });


            cartItems.appendChild(cartItem);

        });


        cartTotal.textContent =
            `₦${total.toLocaleString()}`;

        cartCount.textContent =
            count;

    }


    /* =========================
       WHATSAPP CHECKOUT
    ========================= */

    checkoutWhatsApp.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your bag is empty.");

            return;

        }


        let message =
            "Hello Kikkes Scents! 💕\n\n";

        message +=
            "I would like to place an order:\n\n";


        let total = 0;


        cart.forEach(item => {

            const subtotal =
                item.price * item.quantity;

            total += subtotal;


            message +=
                `• ${item.name}\n`;

            message +=
                `  ${item.variant} × ${item.quantity}\n`;

            message +=
                `  ₦${subtotal.toLocaleString()}\n\n`;

        });


        message +=
            `Total: ₦${total.toLocaleString()}\n\n`;

        message +=
            "Thank you! I look forward to my order. 🤍";


        const whatsappNumber =
            "2347087081470";


        const url =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        window.open(url, "_blank");

    });


    /* =========================
       MODAL
    ========================= */

    closeModal.addEventListener(
        "click",
        closeProductModal
    );


    productModal.addEventListener("click", event => {

        if (event.target === productModal) {

            closeProductModal();

        }

    });


    function closeProductModal() {

        productModal.classList.add("hidden");

        document.body.classList.remove("modal-open");

    }


    /* =========================
       CART DRAWER
    ========================= */

    cartButton.addEventListener(
        "click",
        openCart
    );


    closeCart.addEventListener(
        "click",
        closeCartDrawer
    );


    cartOverlay.addEventListener(
        "click",
        closeCartDrawer
    );


    function openCart() {

        cartDrawer.classList.add("open");

        cartOverlay.classList.add("show");

        document.body.classList.add("drawer-open");

    }


    function closeCartDrawer() {

        cartDrawer.classList.remove("open");

        cartOverlay.classList.remove("show");

        document.body.classList.remove("drawer-open");

    }


    /* =========================
       BACK BUTTON
    ========================= */

    backButton.addEventListener("click", () => {

        productsGrid.classList.add("hidden");

        diffuserOptions.classList.add("hidden");

        backButton.classList.add("hidden");

        shopTitle.textContent = "";

        shopDescription.textContent = "";

        shopEyebrow.textContent = "";

        document
            .getElementById("collections")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


    /* =========================
       MOBILE MENU
    ========================= */

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("open");

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

        });

    });


    /* =========================
       INITIAL STATE
    ========================= */

    productsGrid.classList.add("hidden");

    diffuserOptions.classList.add("hidden");

    backButton.classList.add("hidden");

    updateCart();

});