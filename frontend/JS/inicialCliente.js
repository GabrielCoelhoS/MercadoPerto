document.addEventListener("DOMContentLoaded", () => {
    // Variável global para armazenar o id do produto selecionado
    let currentProductId = null;
  
    /* =======================================================
       1. Carregar as informações do Mercado (localStorage)
       ======================================================= */
    const marketsContainer = document.querySelector(".IndicacaoMercados .Markets");
    if (marketsContainer) {
      marketsContainer.style.justifyContent = "flex-start";
      marketsContainer.innerHTML = "";
    }
  
    const nomeMercadoLS = localStorage.getItem("nomeMercado");
    const enderecoLS = localStorage.getItem("endereco");
  
    if (nomeMercadoLS && enderecoLS && marketsContainer) {
      const marketCard = document.createElement("div");
      marketCard.classList.add("Market");
  
      const marketImg = document.createElement("img");
      marketImg.src = "../imagens/foto_loja.png";
      marketImg.alt = nomeMercadoLS;
  
      const textsDiv = document.createElement("div");
      textsDiv.classList.add("texts");
  
      const nameP = document.createElement("p");
      nameP.textContent = "Nome: " + nomeMercadoLS;
  
      const locationP = document.createElement("p");
      locationP.textContent = "Endereço: " + enderecoLS;
  
      textsDiv.appendChild(nameP);
      textsDiv.appendChild(locationP);
      marketCard.appendChild(marketImg);
      marketCard.appendChild(textsDiv);
      marketsContainer.prepend(marketCard);
    }
  
    /* =======================================================
       2. Carregar os produtos indicados (localStorage)
       ======================================================= */
    const productsIndicadosContainer = document.querySelector(".IndicacaoProdutos .products");
    if (productsIndicadosContainer) {
      productsIndicadosContainer.style.justifyContent = "flex-start";
      productsIndicadosContainer.innerHTML = "";
    }
  
    const storedProducts = JSON.parse(localStorage.getItem("produtos")) || [];
    storedProducts.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product");
      productCard.setAttribute("data-id", product.id);
  
      // Foto do produto
      const img = document.createElement("img");
      img.src = product.productImage ? product.productImage : "sem-imagem.png";
      img.alt = product.productName || "Produto sem nome";
      productCard.appendChild(img);
  
      // Nome do produto
      const namePara = document.createElement("p");
      namePara.textContent = "Nome: " + (product.productName || "Não informado");
      productCard.appendChild(namePara);
  
      // Preço do produto
      const pricePara = document.createElement("p");
      pricePara.textContent = "Preço: " + (product.productPrice || "R$0,00");
      productCard.appendChild(pricePara);
  
      // Ao clicar no card, abre o modal de "Adicionar ao Carrinho" com mais detalhes
      productCard.addEventListener("click", () => {
        currentProductId = product.id;
        document.getElementById("modal-title").textContent = "Nome: " + (product.productName || "Não informado");
        document.getElementById("modal-price").textContent = "Preço: " + (product.productPrice || "R$0,00");
        document.getElementById("modal-img").src = product.productImage ? product.productImage : "sem-imagem.png";
        document.getElementById("modal-img").alt = product.productName || "Produto sem nome";
        // Exibe os novos dados:
        document.getElementById("modal-description").textContent = "Descrição: " + (product.productDescription || "Sem descrição");
        document.getElementById("modal-session").textContent = "Sessão: " + (product.productSession || "Não definida");
        let loja = localStorage.getItem("nomeMercado") || "Loja não informada";
        document.getElementById("modal-store").textContent = "Loja: " + loja;
        
        modal.style.display = "flex";
      });
  
      productsIndicadosContainer.appendChild(productCard);
    });
  
    /* =======================================================
       3. Funcionalidade de Pesquisa com Modal de Resultados e Ordenação
       ======================================================= */
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-bnt");
  
    if (searchButton) {
      searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();
        searchProducts(searchTerm);
      });
    }
  
    function searchProducts(searchTerm) {
      const storedProducts = JSON.parse(localStorage.getItem("produtos")) || [];
      const filteredProducts = storedProducts.filter(product => {
        return product.productName && product.productName.toLowerCase().includes(searchTerm);
      });
      openSearchModal(filteredProducts);
    }
  
    let searchModal = document.getElementById("search-modal");
    if (!searchModal) {
      // Cria o modal de pesquisa
      searchModal = document.createElement("div");
      searchModal.id = "search-modal";
      searchModal.classList.add("modal");
      searchModal.style.display = "none"; // oculto inicialmente
  
      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");
      modalContent.style.maxHeight = "80vh";
      modalContent.style.position = "relative";
  
      // Botão para fechar o modal (fixo)
      const closeBtn = document.createElement("span");
      closeBtn.classList.add("close");
      closeBtn.innerHTML = "&times;";
      closeBtn.style.position = "absolute";
      closeBtn.style.top = "10px";
      closeBtn.style.right = "10px";
      closeBtn.style.cursor = "pointer";
      closeBtn.addEventListener("click", () => {
        searchModal.style.display = "none";
      });
      modalContent.appendChild(closeBtn);
  
      // Título do modal
      const headerH2 = document.createElement("h2");
      headerH2.textContent = "Resultados da Pesquisa";
      headerH2.style.textAlign = "center";
      headerH2.style.marginTop = "30px";
      modalContent.appendChild(headerH2);
  
      // Container com opções de ordenação (somente no modal)
      const sortContainer = document.createElement("div");
      sortContainer.style.margin = "10px auto";
      sortContainer.style.textAlign = "center";
  
      const sortAscBtn = document.createElement("button");
      sortAscBtn.textContent = "Preço Menor para Maior";
      sortAscBtn.style.marginRight = "10px";
  
      const sortDescBtn = document.createElement("button");
      sortDescBtn.textContent = "Preço Maior para Menor";
  
      sortContainer.appendChild(sortAscBtn);
      sortContainer.appendChild(sortDescBtn);
      modalContent.appendChild(sortContainer);
  
      // Container que receberá os resultados da pesquisa
      const resultsContainer = document.createElement("div");
      resultsContainer.id = "search-results";
      resultsContainer.style.display = "flex";
      resultsContainer.style.flexWrap = "wrap";
      resultsContainer.style.gap = "10px";
      resultsContainer.style.justifyContent = "center";
      resultsContainer.style.maxHeight = "50vh";
      resultsContainer.style.overflowY = "auto";
      resultsContainer.style.margin = "0 auto";
      modalContent.appendChild(resultsContainer);
  
      searchModal.appendChild(modalContent);
      document.body.appendChild(searchModal);
  
      // Eventos de ordenação
      sortAscBtn.addEventListener("click", () => {
        sortSearchResults("asc");
      });
      sortDescBtn.addEventListener("click", () => {
        sortSearchResults("desc");
      });
    }
  
    function openSearchModal(filteredProducts) {
      searchModal.filteredProducts = filteredProducts;
      renderSearchResults(filteredProducts);
      searchModal.style.display = "flex";
    }
  
    function renderSearchResults(productsArray) {
      const resultsContainer = document.getElementById("search-results");
      resultsContainer.innerHTML = "";
  
      productsArray.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.style.cursor = "pointer";
        productCard.style.width = "150px";
        productCard.style.border = "1px solid #ccc";
        productCard.style.padding = "5px";
        productCard.style.borderRadius = "5px";
        productCard.style.textAlign = "center";
  
        const img = document.createElement("img");
        img.src = product.productImage ? product.productImage : "sem-imagem.png";
        img.alt = product.productName || "Produto sem nome";
        img.style.width = "100%";
        productCard.appendChild(img);
  
        const namePara = document.createElement("p");
        namePara.textContent = "Nome: " + (product.productName || "Não informado");
        productCard.appendChild(namePara);
  
        const pricePara = document.createElement("p");
        pricePara.textContent = "Preço: " + (product.productPrice || "R$0,00");
        productCard.appendChild(pricePara);
  
        // Ao clicar, abre o modal de "Adicionar ao Carrinho" com detalhes
        productCard.addEventListener("click", () => {
          currentProductId = product.id;
          document.getElementById("modal-title").textContent = "Nome: " + (product.productName || "Não informado");
          document.getElementById("modal-price").textContent = "Preço: " + (product.productPrice || "R$0,00");
          document.getElementById("modal-img").src = product.productImage ? product.productImage : "sem-imagem.png";
          document.getElementById("modal-img").alt = product.productName || "Produto sem nome";
          document.getElementById("modal-description").textContent = "Descrição: " + (product.productDescription || "Sem descrição");
          document.getElementById("modal-session").textContent = "Sessão: " + (product.productSession || "Não definida");
          let loja = localStorage.getItem("nomeMercado") || "Loja não informada";
          document.getElementById("modal-store").textContent = "Loja: " + loja;
          
          modal.style.display = "flex";
          searchModal.style.display = "none";
        });
  
        resultsContainer.appendChild(productCard);
      });
    }
  
    function sortSearchResults(order) {
      let filteredProducts = searchModal.filteredProducts || [];
  
      function parsePrice(priceStr) {
        if (!priceStr) return 0;
        let num = priceStr.replace("R$", "").replace(",", ".").trim();
        return parseFloat(num) || 0;
      }
  
      if (order === "asc") {
        filteredProducts.sort((a, b) => parsePrice(a.productPrice) - parsePrice(b.productPrice));
      } else if (order === "desc") {
        filteredProducts.sort((a, b) => parsePrice(b.productPrice) - parsePrice(a.productPrice));
      }
      searchModal.filteredProducts = filteredProducts;
      renderSearchResults(filteredProducts);
    }
  
    /* =======================================================
       4. Modal para Adicionar Produto ao Carrinho
       ======================================================= */
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const modalDescription = document.getElementById("modal-description");
    const modalSession = document.getElementById("modal-session");
    const modalStore = document.getElementById("modal-store");
    const closeModalButton = document.querySelector("#modal .close");
    const addToCartButton = document.querySelector(".add-to-cart");
  
    if (closeModalButton) {
      closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  
    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
        const quantityInput = document.getElementById("quantity");
        const selectedProduct = {
          id: currentProductId,
          name: modalTitle.textContent,
          price: modalPrice.textContent,
          quantity: quantityInput.value,
          productImage: modalImg.src,
          productDescription: modalDescription.textContent,
          productSession: modalSession.textContent,
          store: modalStore.textContent
        };
  
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
  
        // Após adicionar, abre o modal do carrinho
        openCartModal();
        modal.style.display = "none";
      });
    }
    /* =======================================================
       6. Modal do Carrinho
       ======================================================= */
    let cartModal = document.getElementById("cart-modal");
    if (!cartModal) {
      cartModal = document.createElement("div");
      cartModal.id = "cart-modal";
      cartModal.classList.add("modal");
      cartModal.style.display = "none";
  
      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");
      modalContent.style.maxHeight = "80vh";
      modalContent.style.position = "relative";
  
      // Botão de fechar do carrinho
      const closeCartBtn = document.createElement("span");
      closeCartBtn.classList.add("close");
      closeCartBtn.innerHTML = "&times;";
      closeCartBtn.style.position = "absolute";
      closeCartBtn.style.top = "10px";
      closeCartBtn.style.right = "10px";
      closeCartBtn.style.cursor = "pointer";
      closeCartBtn.addEventListener("click", () => {
        cartModal.style.display = "none";
      });
      modalContent.appendChild(closeCartBtn);
  
      // Título do Carrinho
      const cartTitle = document.createElement("h2");
      cartTitle.textContent = "Carrinho de Compras";
      cartTitle.style.textAlign = "center";
      cartTitle.style.marginTop = "30px";
      modalContent.appendChild(cartTitle);
  
      // Container para itens do carrinho
      const cartItemsContainer = document.createElement("div");
      cartItemsContainer.id = "cart-items";
      cartItemsContainer.style.display = "flex";
      cartItemsContainer.style.flexDirection = "column";
      cartItemsContainer.style.gap = "10px";
      cartItemsContainer.style.maxHeight = "50vh";
      cartItemsContainer.style.overflowY = "auto";
      cartItemsContainer.style.margin = "0 auto";
      modalContent.appendChild(cartItemsContainer);
  
      cartModal.appendChild(modalContent);
      document.body.appendChild(cartModal);
    }
  
    function openCartModal() {
      validateCartItems();
      renderCartItems();
      cartModal.style.display = "flex";
    }
  
    // Remove do carrinho os produtos que não existem mais no localStorage "produtos"
    function validateCartItems() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const storedProducts = JSON.parse(localStorage.getItem("produtos")) || [];
      cart = cart.filter(item => storedProducts.find(prod => prod.id == item.id));
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function renderCartItems() {
      const cartItemsContainer = document.getElementById("cart-items");
      cartItemsContainer.innerHTML = "";
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "Carrinho vazio.";
        emptyMsg.style.textAlign = "center";
        cartItemsContainer.appendChild(emptyMsg);
      } else {
        cart.forEach(item => {
          const itemDiv = document.createElement("div");
          itemDiv.style.border = "1px solid #ccc";
          itemDiv.style.padding = "5px";
          itemDiv.style.borderRadius = "5px";
          itemDiv.style.display = "flex";
          itemDiv.style.alignItems = "center";
          itemDiv.style.justifyContent = "space-between";
  
          // Imagem reduzida
          const img = document.createElement("img");
          img.src = item.productImage ? item.productImage : "sem-imagem.png";
          img.alt = item.name;
          img.style.width = "50px";
          img.style.height = "50px";
          img.style.objectFit = "cover";
          itemDiv.appendChild(img);
  
          const infoDiv = document.createElement("div");
          infoDiv.style.flexGrow = "1";
          infoDiv.style.marginLeft = "10px";
  
          const nameP = document.createElement("p");
          nameP.textContent = item.name;
          const priceP = document.createElement("p");
          priceP.textContent = item.price;
          const quantityP = document.createElement("p");
          quantityP.textContent = "Qtd: " + item.quantity;
  
          infoDiv.appendChild(nameP);
          infoDiv.appendChild(priceP);
          infoDiv.appendChild(quantityP);
          itemDiv.appendChild(infoDiv);
  
          // Botão para remover o item
          const removeBtn = document.createElement("button");
          removeBtn.textContent = "Remover";
          removeBtn.addEventListener("click", () => {
            removeCartItem(item.id);
          });
          itemDiv.appendChild(removeBtn);
  
          cartItemsContainer.appendChild(itemDiv);
        });
      }
    }
  
    function removeCartItem(productId) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter(item => item.id != productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    }
  });
