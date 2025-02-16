document.addEventListener("DOMContentLoaded", () => {
    /* =======================================================
       1. Carregar o mercado cadastrado (localStorage)
       ======================================================= */
    const marketsContainer = document.querySelector(".IndicacaoMercados .Markets");
    if (marketsContainer) {
      // Alinha à esquerda e limpa os conteúdos existentes
      marketsContainer.style.justifyContent = "flex-start";
      marketsContainer.innerHTML = "";
    }
  
    const nomeMercado = localStorage.getItem("nomeMercado");
    const endereco = localStorage.getItem("endereco");
  
    if (nomeMercado && endereco && marketsContainer) {
      const marketCard = document.createElement("div");
      marketCard.classList.add("Market");
  
      const marketImg = document.createElement("img");
      marketImg.src = "../imagens/foto_loja.png"; // Caminho da imagem do mercado
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
  
      // Insere o card no início do container (à esquerda)
      marketsContainer.prepend(marketCard);
    }
  
    /* =======================================================
       2. Carregar os produtos cadastrados (localStorage)
       ======================================================= */
    const productsContainer = document.querySelector(".IndicacaoProdutos .products");
    if (productsContainer) {
      // Alinha os produtos à esquerda e limpa o container
      productsContainer.style.justifyContent = "flex-start";
      productsContainer.innerHTML = "";
    }
  
    // Recupera os produtos salvos (a chave "produtos" deve conter um array de objetos)
    const storedProducts = JSON.parse(localStorage.getItem("produtos")) || [];
    storedProducts.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product");
  
      // Cria e adiciona a imagem do produto
      const productImg = document.createElement("img");
      productImg.src = product.productImage || "sem-imagem.png";
      productImg.alt = product.productName || "Produto sem nome";
      productCard.appendChild(productImg);
  
      // Adiciona as informações do produto com rótulos
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
  
    // Ao clicar em um card de produto, abre o modal com os detalhes do produto
    const productCards = document.querySelectorAll(".IndicacaoProdutos .products .product");
    productCards.forEach(product => {
      product.addEventListener("click", () => {
        // Obtém os dados do card:
        // Primeiro <p> tem o nome (ex.: "Nome: Café")
        // Segundo <p> tem o preço (ex.: "Preço: R$8,00")
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
  });
  