const btnComparar = document.getElementById("btnComparar");
let itensSelecionados = [];

function criarModalSelecionarParaComparacao() {
    let modalExistente = document.getElementById("modalSelecionarParaComparacao");
    if (modalExistente) {
        modalExistente.style.display = "block";
        return;
    }

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

    document.getElementById("btnCancelar").addEventListener("click", () => {
        itensSelecionados = [];
        modal.remove();
        document.querySelector(".botao-adicionar").remove();
    });

    document.getElementById("btnConfirmar").addEventListener("click", () => {
        import ("./modalComparacao.js").then(module => { 
            console.log("module", module);
            module.exibirComparacao(itensSelecionados);
        });
    });
    console.log(document.getElementById("btnConfirmar"));
    return;
}

function adicionarBotoesAdicionar() {
    let botaoAdicionarExistente = document.querySelector(".botao-adicionar");
    if (botaoAdicionarExistente) {
        botaoAdicionarExistente.style.display = "block";
        return;
    }
    const produtos = document.querySelectorAll(".product-container");

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
    const imagem = produto.querySelector(".imagem-produto").src;
    const preco = produto.querySelector(".preco-produto").innerText;
    const loja = document.querySelector(".loja").innerText;
    const aberto = document.querySelector(".loja-status").innerText === "Aberto";

    const item = { nome, imagem, preco, loja, aberto};

    if (!itensSelecionados.some(i => i.nome === item.nome)) {
        itensSelecionados.push(item);
        atualizarComparador();
        console.log("Item adicionado:", item);
    }
}

function atualizarComparador() {
    let modal = document.getElementById("modalSelecionarParaComparacao");
    if (!modal) {
        modal = criarModalSelecionarParaComparacao();
    }

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



btnComparar.addEventListener("click", () => {
    adicionarBotoesAdicionar();
    if (itensSelecionados.length > 0) {
        atualizarComparador();
    } else{
        criarModalSelecionarParaComparacao();
    }
    
    
});

