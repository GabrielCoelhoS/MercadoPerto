document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.querySelector("#products-container"); // Certifique-se de ter um container na página
  
    function addProductToDOM(product) {
      // Criação do card (semelhante à função acima)
      const newProductDiv = document.createElement("div");
      newProductDiv.classList.add("product");
      
      const newImg = document.createElement("img");
      newImg.classList.add("produto-img");
      newImg.alt = product.productName;
      newImg.src = product.productImage ? product.productImage : "sem-imagem.png";
  
      const namePara = document.createElement("p");
      namePara.textContent = product.productName;
  
      newProductDiv.appendChild(newImg);
      newProductDiv.appendChild(namePara);
      productsContainer.appendChild(newProductDiv);
    }
  
    function carregarProdutosFiltrados() {
      const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
      // Filtra os produtos cuja sessão é “Não Perecíveis”
      const naoPereciveis = produtos.filter(produto => produto.productSession === "Não Perecíveis");
      productsContainer.innerHTML = "";
      naoPereciveis.forEach(produto => {
        addProductToDOM(produto);
      });
    }
  
    carregarProdutosFiltrados();
  });
  