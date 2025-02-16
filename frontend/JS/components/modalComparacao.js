const btnComparar = document.getElementById("btnComparar");
let itensSelecionados = [];

function criarModalComparacao() {
    let modalExistente = document.getElementById("modalComparacao");
    if (modalExistente) {
        modalExistente.style.display = "block";
        return;
    }

    const modal = document.createElement("div");
    modal.id = "modalComparacao";
    modal.classList.add("modal");

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

    document.getElementById("btnCancelar").addEventListener("click", () => {
        itensSelecionados = [];
        modal.remove();
    });

    document.getElementById("btnConfirmar").addEventListener("click", () => {
        alert("Comparação iniciada!");
    });

    return modal;
}

function adicionarBotoesAdicionar() {
    const produtos = document.querySelectorAll(".product");

    produtos.forEach(produto => {
        const botaoAdicionar = document.createElement("button");
        botaoAdicionar.innerText = "+";
        botaoAdicionar.classList.add("botao-adicionar");

        botaoAdicionar.addEventListener("click", () => {
            adicionarAoComparador(produto);
        });

        produto.appendChild(botaoAdicionar);
    });
}

function adicionarAoComparador(produto) {
    const nome = produto.querySelector(".nome-produto").innerText;
    const preco = produto.querySelector(".preco-produto").innerText;

    const item = { nome, preco };

    if (!itensSelecionados.some(i => i.nome === item.nome)) {
        itensSelecionados.push(item);
        atualizarComparador();
    }
}

function atualizarComparador() {
    let modal = document.getElementById("modalComparacao");
    if (!modal) {
        modal = criarModalComparacao();
    }

    const itensContainer = document.getElementById("itensSelecionados");
    itensContainer.innerHTML = "";

    itensSelecionados.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("product mini");
        div.innerHTML = `<strong>${item.nome}</strong> - ${item.preco}`;
        itensContainer.appendChild(div);
    });

    modal.style.display = "block";
}

btnComparar.addEventListener("click", () => {
    if (itensSelecionados.length > 0) {
        adicionarBotoesAdicionar();
        atualizarComparador();
    }
});

