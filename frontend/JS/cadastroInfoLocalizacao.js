document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-endereco");
    
    const cepInput = document.getElementById("cep");
    const estadoInput = document.getElementById("estado");
    const cidadeInput = document.getElementById("cidade");
    const bairroInput = document.getElementById("bairro");
    const enderecoInput = document.getElementById("endereco");
    const numeroInput = document.getElementById("numero");
    const complementoInput = document.getElementById("complemento");

    function aplicarMascaraCep(valor) {
        return valor.replace(/\D/g, "")
            .replace(/^(\d{5})(\d{3})$/, "$1-$2");
    }

    cepInput.addEventListener("input", () => {
        cepInput.value = aplicarMascaraCep(cepInput.value);
    });

    cepInput.addEventListener("blur", async () => {
        const cep = cepInput.value.replace(/\D/g, "");

        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    alert("CEP não encontrado. Verifique e tente novamente.");
                    return;
                }

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

        const cep = cepInput.value;
        const estado = estadoInput.value;
        const cidade = cidadeInput.value;
        const bairro = bairroInput.value;
        const endereco = enderecoInput.value;
        const numero = numeroInput.value;
        const complemento = complementoInput.value;

        if (!cep || !estado || !cidade || !bairro || !endereco || !numero) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        localStorage.setItem("cep", cep);
        localStorage.setItem("estado", estado);
        localStorage.setItem("cidade", cidade);
        localStorage.setItem("bairro", bairro);
        localStorage.setItem("endereco", endereco);
        localStorage.setItem("numero", numero);
        localStorage.setItem("complemento", complemento);

        window.location.href = "../HTML/confirmacaoInfos.html";
    });

    const voltarBtn = document.querySelector(".btn-voltar");
    voltarBtn.addEventListener("click", () => {
        window.location.href = "../HTML/cadastroInfoEmpresariais.html";
    });
});
