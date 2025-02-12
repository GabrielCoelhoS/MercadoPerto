document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.querySelector("#products-container");
    const sessionName = document.title.replace(" - Mercado Perto", "");

    function addProductToDOM(product) {
        const newProductDiv = document.createElement("div");
        newProductDiv.classList.add("product");

        const newImg = document.createElement("img");
        newImg.classList.add("produto-img");
        newImg.alt = product.productName;
        newImg.src = product.productImage || "sem-imagem.png";

        const namePara = document.createElement("p");
        namePara.textContent = product.productName;

        newProductDiv.appendChild(newImg);
        newProductDiv.appendChild(namePara);
        productsContainer.appendChild(newProductDiv);
    }

    function carregarProdutosFiltrados() {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        const produtosFiltrados = produtos.filter(produto => produto.productSession === sessionName);
        productsContainer.innerHTML = "";
        produtosFiltrados.forEach(produto => addProductToDOM(produto));
    }

    carregarProdutosFiltrados();
});
