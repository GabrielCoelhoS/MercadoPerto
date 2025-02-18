// Salva o produto no localStorage
function salvarProdutoNoStorage(product) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push(product);
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }
  
  // Cria e adiciona o produto na estrutura desejada
  function addProductToDOM(product) {
    // Seleciona o container da seção "Mercado do Fulano"
    const productsContainer = document.querySelector("#productAndMarket .products");
  
    // Cria a estrutura com "product-container" e "product"
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");
    productContainer.setAttribute("data-id", product.id);
  
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
  
    // Imagem do produto
    const img = document.createElement("img");
    img.classList.add("imagem-produto");
    img.alt = product.productName || "Produto cadastrado";
    img.src = product.productImage ? product.productImage : "sem-imagem.png";
  
    // Preço do produto
    const pricePara = document.createElement("p");
    pricePara.classList.add("preco-produto");
    pricePara.innerHTML = product.productPrice ? `<strong>${product.productPrice}</strong>` : "<strong>R$0,00</strong>";
  
    // Nome do produto
    const namePara = document.createElement("p");
    namePara.classList.add("nome-produto");
    namePara.textContent = product.productName || "Nome não informado";
  
    // Monta a estrutura
    productDiv.appendChild(img);
    productDiv.appendChild(pricePara);
    productDiv.appendChild(namePara);
    productContainer.appendChild(productDiv);
    productsContainer.appendChild(productContainer);
  }
  
  // Carrega os produtos salvos e renderiza na tela
  function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const productsContainer = document.querySelector("#productAndMarket .products");
    productsContainer.innerHTML = ""; // Limpa os produtos antigos
    produtos.forEach((produto) => {
      addProductToDOM(produto);
    });
  }
  
  // Exclui um produto e atualiza a interface
  function excluirProduto(id) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos = produtos.filter((produto) => produto.id !== id);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarProdutos();
  }
  
  // Carrega os produtos salvos ao iniciar a página
  carregarProdutos();
  
  // Processa o cadastro do produto via formulário
  manualProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const productPrice = document.getElementById("productPrice").value;
    const productStock = document.getElementById("productStock").value;
    const productSession = document.getElementById("productSession").value;
    const fileInput = document.getElementById("productImage");
    const productImageFile = fileInput.files[0];
  
    function processaProduto(productImageDataURL = null) {
      const product = {
        id: Date.now(),
        productName,
        productDescription,
        productPrice,
        productStock,
        productSession,
        productImage: productImageDataURL,
      };
  
      salvarProdutoNoStorage(product);
      addProductToDOM(product);
      closeModalProduct();
      manualProductForm.reset();
    }
  
    if (productImageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        processaProduto(e.target.result);
      };
      reader.readAsDataURL(productImageFile);
    } else {
      processaProduto();
    }
  });
  