export function exibirComparacao(produtos) {
    let modalSelecionarParaComparacaoExistente = document.getElementById("modalSelecionarParaComparacao");
    if (modalSelecionarParaComparacaoExistente) {
        modalSelecionarParaComparacaoExistente.remove();
    }

    let modalExistente = document.getElementById("modalComparacao");
    if (modalExistente) {
        modalExistente.remove();
    }

    const modalComparacao = document.createElement("div");
    modalComparacao.id = "modalComparacao";
    modalComparacao.classList.add("modal");
    const comparacaoContainer = document.createElement("div");
    comparacaoContainer.classList.add("comparacao-container");
    comparacaoContainer.innerHTML = `
        <h2>Comparação de Produtos</h2>
        <div id="itensSelecionados"></div>
        <button id= "btnFechar">Fechar</button>
        <div class="products"></div>`;

    produtos.forEach(produto => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="imagem-produto">
            <p class="preco-produto"><strong>R$ ${produto.preco}</strong></p>
            <p class="nome-produto">${produto.nome}</p>
            <p class="loja-produto">Loja: ${produto.loja}</p>
        `;

        let statusLoja = document.createElement("p");
        statusLoja.innerText = produto.aberto ? "Aberto" : "Fechado";
        statusLoja.classList.add("loja-status", produto.aberto ? "aberto" : "fechado");
        div.appendChild(statusLoja);
        comparacaoContainer.querySelector(".products").appendChild(div);
    })

    modalComparacao.appendChild(comparacaoContainer);
    document.body.appendChild(modalComparacao);

    document.querySelector("#btnFechar").addEventListener("click", () => {
        modalComparacao.remove();
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

}