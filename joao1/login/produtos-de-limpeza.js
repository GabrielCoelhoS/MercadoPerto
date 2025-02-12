document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
  
    function addProductToDOM(product) {
      const newProductDiv = document.createElement("div");
      newProductDiv.classList.add("product");
      
      const newImg = document.createElement("img");
      newImg.classList.add("produto-img");
      newImg.alt = product.productName;
      newImg.src = product.productImage ? product.productImage : "sem-imagem.png";
  
      const namePara = document.createElement("p");
      namePara.textContent = product.productName;
  
      const pricePara = document.createElement("p");
      pricePara.textContent = product.productPrice || "R$0,00";
  
      newProductDiv.appendChild(newImg);
      newProductDiv.appendChild(namePara);
      newProductDiv.appendChild(pricePara);
  
      productsContainer.appendChild(newProductDiv);
    }
  
    function carregarProdutosFiltrados() {
      const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
      // Filtra os produtos cuja sessão é "Produtos de Limpeza"
      const limpeza = produtos.filter(produto => produto.productSession === "Produtos de Limpeza");
      productsContainer.innerHTML = "";
      limpeza.forEach(produto => {
        addProductToDOM(produto);
      });
    }
  
    carregarProdutosFiltrados();
  });
  