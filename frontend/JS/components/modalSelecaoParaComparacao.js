const btnComparar = document.getElementById("btnComparar");
let itensSelecionados = [];

// Adiciona botões "+" aos produtos
function adicionarBotoesAdicionar() {
    document.querySelectorAll(".product-container").forEach(produto => {
        if (!produto.querySelector(".botao-adicionar")) {
            const botaoAdicionar = document.createElement("button");
            botaoAdicionar.innerText = "+";
            botaoAdicionar.classList.add("botao-adicionar");

            botaoAdicionar.addEventListener("click", () => {
                adicionarAoComparador(produto);
            });

            produto.appendChild(botaoAdicionar);
        }
    });
}

// Remove todos os botões "+"
function removerBotoesAdicionar() {
    document.querySelectorAll(".botao-adicionar").forEach(botao => botao.remove());
}

// Cria o modal de seleção para comparação
function criarModalSelecionarParaComparacao() {
    let modalExistente = document.getElementById("modalSelecionarParaComparacao");
    if (!modalExistente) {
        const modal = document.createElement("div");
        modal.id = "modalSelecionarParaComparacao";
        modal.classList.add("modal");
        modal.style.display = "none";

        modal.innerHTML = `
            <div class="modal-content">
                <h3>Selecione os itens para comparar</h3>
                <div id="itensSelecionados" class="itens-selecionados"></div>
                <div class="botoes">
                    <button id="btnCancelar">Cancelar</button>
                    <button id="btnConfirmar">Comparar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Evento do botão "Cancelar"
        document.getElementById("btnCancelar").addEventListener("click", () => {
            itensSelecionados = [];
            modal.style.display = "none";
            removerBotoesAdicionar();
        });

        // Evento do botão "Comparar"
        document.getElementById("btnConfirmar").addEventListener("click", () => {
            import("./modalComparacao.js").then(module => {
                module.exibirComparacao(itensSelecionados);
            });
            modal.style.display = "none";
            removerBotoesAdicionar(); // Remove os botões "+" após a comparação
        });

        return modal;
    }
    return modalExistente;
}

// Adiciona produto ao comparador e exibe o modal
function adicionarAoComparador(produto) {
    const nome = produto.querySelector(".nome-produto").innerText;
    const imagem = produto.querySelector(".imagem-produto").src;
    const preco = produto.querySelector(".preco-produto").innerText;
    const loja = document.querySelector(".loja").innerText;
    const aberto = document.querySelector(".loja-status").innerText === "Aberto";

    const item = { nome, imagem, preco, loja, aberto };

    if (!itensSelecionados.some(i => i.nome === item.nome)) {
        itensSelecionados.push(item);
        atualizarComparador();
        console.log("Item adicionado:", item);
    }

    // Exibe o modal de seleção ao clicar no produto
    const modal = criarModalSelecionarParaComparacao();
    modal.style.display = "block";
}

// Atualiza os itens no modal de seleção
function atualizarComparador() {
    const modal = criarModalSelecionarParaComparacao();
    const itensContainer = document.getElementById("itensSelecionados");
    itensContainer.innerHTML = "";

    itensSelecionados.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("product", "mini");
        div.innerHTML = `<img class="imagem-produto" src="${item.imagem}" alt="${item.nome}"> 
                         <p class="nome-produto">${item.nome}</p>`;
        itensContainer.appendChild(div);
    });

    modal.style.display = "block";
}

// Quando o botão "Comparar" é clicado, apenas adiciona os botões "+"
btnComparar.addEventListener("click", () => {
    adicionarBotoesAdicionar();
});
