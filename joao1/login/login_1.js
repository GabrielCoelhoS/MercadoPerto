document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-info-mercado");

    // Referências aos campos
    const cnpjInput = document.getElementById("cnpj");

    // Aplicar máscara ao CNPJ enquanto o usuário digita
    cnpjInput.addEventListener("input", () => {
        let cnpj = cnpjInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2"); // Adiciona o primeiro ponto
        cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); // Adiciona o segundo ponto
        cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2"); // Adiciona a barra
        cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2"); // Adiciona o traço
        cnpjInput.value = cnpj;
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Obter os valores dos campos obrigatórios
        const cnpj = cnpjInput.value;
        const razaoSocial = document.getElementById("razao-social").value;
        const nomeMercado = document.getElementById("nome-mercado").value;
        const telefone = document.getElementById("telefone").value;

        // Validar CNPJ
        if (!validarCNPJ(cnpj)) {
            alert("CNPJ inválido! Por favor, insira um CNPJ válido.");
            return;
        }

        // Verificar se todos os campos estão preenchidos
        if (!cnpj || !razaoSocial || !nomeMercado || !telefone) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        // Salvar os dados no localStorage
        localStorage.setItem("cnpj", cnpj);
        localStorage.setItem("razaoSocial", razaoSocial);
        localStorage.setItem("nomeMercado", nomeMercado);
        localStorage.setItem("telefone", telefone);

        // Redirecionar para a próxima página (pagina-final.html)
        window.location.href = "login_2.html";
    });

    const voltarBtn = document.querySelector(".btn-voltar");
    voltarBtn.addEventListener("click", () => {
        // Redirecionar para a página login_1.html
        window.location.href = "login_inicial.html";
    });

    // Função para validar o formato do CNPJ localmente
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

        if (cnpj.length !== 14) return false; // O CNPJ deve ter 14 dígitos

        if (/^(\d)\1+$/.test(cnpj)) return false; // CNPJ com todos os dígitos iguais é inválido

        let soma = 0;
        let peso = 5;

        for (let i = 0; i < 12; i++) {
            soma += parseInt(cnpj[i]) * peso;
            peso = peso === 2 ? 9 : peso - 1;
        }

        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;

        soma = 0;
        peso = 6;

        for (let i = 0; i < 13; i++) {
            soma += parseInt(cnpj[i]) * peso;
            peso = peso === 2 ? 9 : peso - 1;
        }

        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;

        return digito1 === parseInt(cnpj[12]) && digito2 === parseInt(cnpj[13]);
    }
});
