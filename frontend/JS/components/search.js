const searchModal = document.getElementById("productsAndMarket");

searchProducts(localStorage.getItem("searchTerm") || "");
function searchProducts(searchTerm) {
  const storedProducts = JSON.parse(localStorage.getItem("produtos")) || [];
  console.log(storedProducts);
  const filteredProducts = storedProducts.filter(product => {
    return product.productName && product.productName.toLowerCase().includes(searchTerm);
  });
  
  console.log(filteredProducts);
  renderSearchResults(filteredProducts);
}

function renderSearchResults(productsArray) {
  const resultsContainer = document.querySelector(".products"); // Corrigido!
  
  if (!resultsContainer) {
    console.error("Elemento resultsContainer não encontrado.");
    return;
  }

  resultsContainer.innerHTML = ""; // Limpa os resultados antes de adicionar novos

  productsArray.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");

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

    resultsContainer.appendChild(productCard); // Agora funciona corretamente
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
