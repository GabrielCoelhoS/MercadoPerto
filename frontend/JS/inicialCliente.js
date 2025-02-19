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
