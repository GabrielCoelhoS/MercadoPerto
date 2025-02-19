document.addEventListener("DOMContentLoaded", () => {
    // =====================================================
    // 1. Carregar informações do market-info
    // =====================================================
    function loadMarketInfo() {
      // Recupera os dados salvos no localStorage
      const nome = localStorage.getItem("nomeMercado");
      const enderecoInfo = localStorage.getItem("endereco");
      const bairroInfo = localStorage.getItem("bairro");
      const numeroInfo = localStorage.getItem("numero");
      const telefoneInfo = localStorage.getItem("telefone");
      const descricaoInfo = localStorage.getItem("descricao");
  
      // Seleciona os elementos do HTML
      const nomeMercadoEl = document.getElementById("nome-mercado");
      const enderecoEl = document.getElementById("endereco");
      const bairroEl = document.getElementById("bairro");
      const numeroEl = document.getElementById("numero");
      const telefoneEl = document.getElementById("telefone");
      const descricaoEl = document.getElementById("descricao");
  
      // Preenche cada elemento, se o dado existir
      if (nome) nomeMercadoEl.innerHTML = `Nome mercado: ${nome}`;
      if (enderecoInfo) enderecoEl.innerHTML = `Endereço: ${enderecoInfo}`;
      if (bairroInfo) bairroEl.innerHTML = `Bairro: ${bairroInfo}`;
      if (numeroInfo) numeroEl.innerHTML = `Número: ${numeroInfo}`;
      if (telefoneInfo) telefoneEl.innerHTML = `Telefone: ${telefoneInfo}`;
      if (descricaoInfo) descricaoEl.innerHTML = `Descrição: ${descricaoInfo}`;
    }
  
    // =====================================================
    // 2. Carregar categorias salvas
    // =====================================================
    function loadCategories() {
      // Recupera as categorias salvas (cada categoria deve ter: id, name e image)
      const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
      // Atenção: seu HTML possui duas tags com id "categories". 
      // Aqui, selecionamos o container interno, que é a <div> dentro da <section id="categories">
      const categoriesContainer = document.querySelector("section#categories > div");
      
      if (categoriesContainer) {
        categoriesContainer.innerHTML = ""; // Limpa o container antes de adicionar
  
        storedCategories.forEach(category => {
          // Cria o wrapper para cada categoria
          const categoryDiv = document.createElement("div");
          categoryDiv.classList.add("category-wrapper");
          categoryDiv.setAttribute("data-id", category.id);
  
          // Cria o link/âncora da categoria
          const categoryAnchor = document.createElement("a");
          categoryAnchor.classList.add("category");
          categoryAnchor.href = "#";
  
          // Cria a imagem da categoria
          const img = document.createElement("img");
          img.classList.add("category-img");
          img.alt = category.name;
          img.src = category.image ? category.image : "sem-imagem.png";
  
          // Cria o texto com o nome da categoria
          const span = document.createElement("span");
          span.textContent = category.name;
  
          // Monta a estrutura e insere no container
          categoryAnchor.appendChild(img);
          categoryAnchor.appendChild(span);
          categoryDiv.appendChild(categoryAnchor);
          categoriesContainer.appendChild(categoryDiv);
        });
      }
    }
  
    // =====================================================
    // 3. Carregar produtos salvos
    // =====================================================
    function loadProducts() {
      // Recupera os produtos salvos (cada produto deve ter: id, productName, productDescription, productPrice, productSession e productImage)
      const storedProducts = JSON.parse(localStorage.getItem("produtos")) || [];
      const productsContainer = document.querySelector("#best-sellers .products");
  
      if (productsContainer) {
        productsContainer.innerHTML = ""; // Limpa o container antes de adicionar
  
        storedProducts.forEach(product => {
          // Cria o container do produto
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.setAttribute("data-id", product.id);
  
          // Imagem do produto
          const productImg = document.createElement("img");
          productImg.classList.add("produto-img");
          productImg.alt = product.productName || "Produto cadastrado";
          productImg.src = product.productImage ? product.productImage : "sem-imagem.png";
  
          // Nome do produto
          const namePara = document.createElement("p");
          namePara.textContent = product.productName || "Nome não informado";
  
          // Descrição do produto
          const descPara = document.createElement("p");
          descPara.textContent = product.productDescription || "";
  
          // Preço do produto
          const pricePara = document.createElement("p");
          pricePara.textContent = product.productPrice || "R$0,00";
  
          // Sessão (categoria) do produto
          const sessionPara = document.createElement("p");
          sessionPara.textContent = product.productSession ? `Sessão: ${product.productSession}` : "Sessão: Não definida";
  
          // Monta a estrutura do produto e insere no container
          productDiv.appendChild(productImg);
          productDiv.appendChild(namePara);
          productDiv.appendChild(descPara);
          productDiv.appendChild(pricePara);
          productDiv.appendChild(sessionPara);
  
          productsContainer.appendChild(productDiv);
        });
      }
    }
  
    // =====================================================
    // Chamada das funções de carregamento
    // =====================================================
    loadMarketInfo();
    loadCategories();
    loadProducts();
  });
  