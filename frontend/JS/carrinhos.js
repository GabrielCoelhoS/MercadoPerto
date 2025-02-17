function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById("carrinho");
    carrinhoContainer.innerHTML = "";

    let mercados = {};

    // Supondo que "carrinho" seja um array de objetos com { nome, preco, mercado, aberto, quantidade }
    carrinho.forEach(produto => {
        if (!mercados[produto.mercado]) {
            mercados[produto.mercado] = {
                aberto: produto.aberto,
                produtos: []
            };
        }
        mercados[produto.mercado].produtos.push(produto);
    });

    // Criar os elementos do carrinho separados por mercado
    Object.keys(mercados).forEach(mercado => {
        let mercadoInfo = mercados[mercado];

        let secaoMercado = document.createElement("div");
        secaoMercado.classList.add("secao-mercado");
        secaoMercado.innerHTML = `<h3>Carrinho do: ${mercado}</h3>`;

        // Criar lista de produtos do mercado
        mercadoInfo.produtos.forEach(produto => {
            let itemDiv = document.createElement("div");
            itemDiv.classList.add("item-carrinho");
            itemDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" class="imagem-produto">
                <p>${produto.nome}</p>
                <p>R$${produto.preco.toFixed(2)} - ${produto.aberto ? "🟢 Aberto" : "🔴 Fechado"}</p>
                <button onclick="alterarQuantidade('${produto.nome}', -1)">➖</button>
                <span>${produto.quantidade}</span>
                <button onclick="alterarQuantidade('${produto.nome}', 1)">➕</button>
                <button onclick="removerDoCarrinho('${produto.nome}')">🗑️</button>
            `;

            secaoMercado.appendChild(itemDiv);
        });

        // Criar botão de pedido
        let botaoPedido = document.createElement("button");
        botaoPedido.innerText = "Fazer pedido";
        botaoPedido.classList.add("botao-pedido");
        
        if (!mercadoInfo.aberto) {
            botaoPedido.disabled = true;
            botaoPedido.classList.add("desativado"); // Para estilização no CSS
        } else {
            botaoPedido.onclick = () => fazerPedido(mercado);
        }

        secaoMercado.appendChild(botaoPedido);
        carrinhoContainer.appendChild(secaoMercado);
    });
}

// Função para alterar a quantidade do produto
function alterarQuantidade(nomeProduto, valor) {
    let produto = carrinho.find(p => p.nome === nomeProduto);
    if (produto) {
        produto.quantidade = Math.max(1, produto.quantidade + valor);
        atualizarCarrinho();
    }
}

// Função para remover produto
function removerDoCarrinho(nomeProduto) {
    carrinho = carrinho.filter(p => p.nome !== nomeProduto);
    atualizarCarrinho();
}

// Função para finalizar o pedido (simulação)
function fazerPedido(mercado) {
    alert(`Pedido feito para o mercado: ${mercado}!`);
}

// Exemplo de inicialização do carrinho
let carrinho = [
    { nome: "Arroz Chinês 1Kg", preco: 5.99, mercado: "Mercado do Jão", aberto: true, quantidade: 1, imagem: "arroz_chines.png" },
    { nome: "Arroz Branco Camil 1Kg", preco: 6.99, mercado: "Mercado do Fulano", aberto: false, quantidade: 1, imagem: "arroz_camil.png" }
];

atualizarCarrinho();
