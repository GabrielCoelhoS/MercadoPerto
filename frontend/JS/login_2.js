document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-endereco");
    
    // Referências aos campos
    const cepInput = document.getElementById("cep");
    const estadoInput = document.getElementById("estado");
    const cidadeInput = document.getElementById("cidade");
    const bairroInput = document.getElementById("bairro");
    const enderecoInput = document.getElementById("endereco");
    const numeroInput = document.getElementById("numero");
    const complementoInput = document.getElementById("complemento");

    // Função para aplicar a máscara no CEP
    function aplicarMascaraCep(valor) {
        return valor.replace(/\D/g, "") // Remove tudo que não for número
            .replace(/^(\d{5})(\d{3})$/, "$1-$2"); // Adiciona o traço
    }

    // Evento para aplicar a máscara de CEP
    cepInput.addEventListener("input", () => {
        cepInput.value = aplicarMascaraCep(cepInput.value);
    });

    // Evento para preencher automaticamente estado e cidade ao inserir o CEP
    cepInput.addEventListener("blur", async () => {
        const cep = cepInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    alert("CEP não encontrado. Verifique e tente novamente.");
                    return;
                }

                // Preencher os campos de estado e cidade
                estadoInput.value = data.uf;
                cidadeInput.value = data.localidade;
                bairroInput.value = data.bairro;
                enderecoInput.value = data.logradouro;
            } catch (error) {
                alert("Erro ao buscar informações do CEP. Tente novamente mais tarde.");
            }
        } else {
            alert("CEP inválido. O CEP deve conter 8 dígitos.");
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Obter os valores dos campos
        const cep = cepInput.value;
        const estado = estadoInput.value;
        const cidade = cidadeInput.value;
        const bairro = bairroInput.value;
        const endereco = enderecoInput.value;
        const numero = numeroInput.value;
        const complemento = complementoInput.value;

        // Validação dos campos obrigatórios
        if (!cep || !estado || !cidade || !bairro || !endereco || !numero) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        // Salvar os dados no localStorage
        localStorage.setItem("cep", cep);
        localStorage.setItem("estado", estado);
        localStorage.setItem("cidade", cidade);
        localStorage.setItem("bairro", bairro);
        localStorage.setItem("endereco", endereco);
        localStorage.setItem("numero", numero);
        localStorage.setItem("complemento", complemento);

        // Redirecionar para a próxima página (pagina-final.html ou outra página desejada)
        window.location.href = "pagina-final.html";
    });

    const voltarBtn = document.querySelector(".btn-voltar");
    voltarBtn.addEventListener("click", () => {
        window.location.href = "login_1.html";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Preencher os campos com os dados armazenados no localStorage
    document.getElementById("cep").value = localStorage.getItem("cep");
    document.getElementById("estado").value = localStorage.getItem("estado");
    document.getElementById("cidade").value = localStorage.getItem("cidade");
    document.getElementById("bairro").value = localStorage.getItem("bairro");
    document.getElementById("endereco").value = localStorage.getItem("endereco");
    document.getElementById("numero").value = localStorage.getItem("numero");
    document.getElementById("complemento").value = localStorage.getItem("complemento");

    document.getElementById("cnpj").value = localStorage.getItem("cnpj");
    document.getElementById("razao-social").value = localStorage.getItem("razaoSocial");
    document.getElementById("nome-mercado").value = localStorage.getItem("nomeMercado");
    document.getElementById("telefone").value = localStorage.getItem("telefone");

    // Configurar o botão "Voltar" para redirecionar para a página anterior
    document.querySelector('.btn-back').addEventListener('click', () => {
        window.location.href = "login_2.html";  // Altere conforme necessário para redirecionar corretamente
    });

    // Botão "Continuar" - mensagem de sucesso
    document.querySelector('.btn-submit').addEventListener('click', (event) => {
        event.preventDefault();
        alert('Formulário enviado com sucesso!');
    });
});
