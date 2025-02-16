document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     1. Carregar o mercado cadastrado (localStorage)
     ======================================================= */
  const marketsContainer = document.querySelector(".IndicacaoMercados .Markets");
  if (marketsContainer) {
      marketsContainer.style.justifyContent = "flex-start";
      marketsContainer.innerHTML = "";
  }

  const nomeMercado = localStorage.getItem("nomeMercado");
  const endereco = localStorage.getItem("endereco");

  if (nomeMercado && endereco && marketsContainer) {
      const marketCard = document.createElement("div");
      marketCard.classList.add("Market");

      const marketImg = document.createElement("img");
      marketImg.src = "../imagens/foto_loja.png";
      marketImg.alt = nomeMercado;

      const textsDiv = document.createElement("div");
      textsDiv.classList.add("texts");

      const nameP = document.createElement("p");
      nameP.textContent = "Nome: " + nomeMercado;

      const locationP = document.createElement("p");
      locationP.textContent = "Endereço: " + endereco;

      textsDiv.appendChild(nameP);
      textsDiv.appendChild(locationP);
      marketCard.appendChild(marketImg);
      marketCard.appendChild(textsDiv);
      marketsContainer.prepend(marketCard);
  }

  /* =======================================================
     2. Carregar os produtos cadastrados (localStorage)
     ======================================================= */
  const productsContainer = document.querySelector(".IndicacaoProdutos .products");
  if (productsContainer) {
      productsContainer.style.justifyContent = "flex-start";
      productsContainer.innerHTML = "";
  }

  const storedProducts = JSON.parse(localStorage.getItem("produtos")) || [];
  storedProducts.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product");

      const productImg = document.createElement("img");
      productImg.src = product.productImage || "sem-imagem.png";
      productImg.alt = product.productName || "Produto sem nome";
      productCard.appendChild(productImg);

      const nameP = document.createElement("p");
      nameP.textContent = "Nome: " + (product.productName || "Não informado");
      productCard.appendChild(nameP);

      const priceP = document.createElement("p");
      priceP.textContent = "Preço: " + (product.productPrice || "R$0,00");
      productCard.appendChild(priceP);

      const descP = document.createElement("p");
      descP.textContent = "Descrição: " + (product.productDescription || "Sem descrição");
      productCard.appendChild(descP);

      const sessionP = document.createElement("p");
      sessionP.textContent = "Sessão: " + (product.productSession || "Não definida");
      productCard.appendChild(sessionP);

      if (productsContainer) {
          productsContainer.appendChild(productCard);
      }
  });

  /* =======================================================
     3. Funcionalidade de busca para filtrar produtos
     ======================================================= */
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-bnt");

  if (searchButton) {
      searchButton.addEventListener("click", () => {
          const searchTerm = searchInput.value.toLowerCase();
          filterProducts(searchTerm);
      });
  }

  function filterProducts(searchTerm) {
      const productCards = document.querySelectorAll(".IndicacaoProdutos .products .product");
      productCards.forEach(product => {
          const productText = product.textContent.toLowerCase();
          product.style.display = productText.includes(searchTerm) ? "block" : "none";
      });
  }

  /* =======================================================
     4. Modal para Adicionar Produto ao Carrinho
     ======================================================= */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalPrice = document.getElementById("modal-price");
  const closeModalButton = document.querySelector(".close");
  const addToCartButton = document.querySelector(".add-to-cart");

  document.querySelectorAll(".IndicacaoProdutos .products .product").forEach(product => {
      product.addEventListener("click", () => {
          const productImgSrc = product.querySelector("img").src;
          const productNameText = product.querySelector("p:nth-of-type(1)").textContent;
          const productPriceText = product.querySelector("p:nth-of-type(2)").textContent;

          modalImg.src = productImgSrc;
          modalTitle.textContent = productNameText;
          modalPrice.textContent = productPriceText;

          modal.style.display = "flex";
      });
  });

  if (closeModalButton) {
      closeModalButton.addEventListener("click", () => {
          modal.style.display = "none";
      });
  }

  if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
          const quantityInput = document.getElementById("quantity");
          const selectedProduct = {
              name: modalTitle.textContent,
              price: modalPrice.textContent,
              quantity: quantityInput.value,
          };

          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(selectedProduct);
          localStorage.setItem("cart", JSON.stringify(cart));

          alert("Produto adicionado ao carrinho!");
          modal.style.display = "none";
      });
  }

  /* =======================================================
     5. Adicionar ícone do usuário que redireciona para a página do usuário
     ======================================================= */
  const header = document.querySelector("header");
  if (header) {
      const userIcon = document.createElement("span");
      userIcon.classList.add("user-icon");
      userIcon.innerHTML = "\uD83D\uDC64"; // Ícone de usuário
      userIcon.style.cursor = "pointer";
      userIcon.style.fontSize = "24px";
      userIcon.addEventListener("click", () => {
          window.location.href = "../HTML/informacoesUsuario.html"; // Página do usuário
      });
      header.appendChild(userIcon);
  }
});
