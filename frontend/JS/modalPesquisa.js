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
  
   
  