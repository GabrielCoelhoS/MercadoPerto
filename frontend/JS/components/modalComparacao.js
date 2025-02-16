function exibirComparacao(produtos) {
    let modalExistente = document.getElementById("modalComparacao");
    if (modalExistente) {
        modalExistente.remove();
    }

    const modalComparacao = document.createElement("div");
    modalComparacao.id = "modalComparacao";
    modalComparacao.classList.add("modal");

     modalComparacao.innerHTML = `
        <h2>Comparação de Produtos</h2>
        <div id="itensSelecionados"></div>
        <button id="btnFechar">Fechar</button>
        <div class="comparacao-container"></div>`;

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
        modalComparacao.querySelector(".comparacao-container").appendChild(div);
    })
    modalComparacao.querySelector(btnFechar).onclick = () => modalComparacao.remove();
    document.body.appendChild(modalComparacao);
}