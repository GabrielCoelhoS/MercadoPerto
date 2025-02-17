document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-info-mercado");

    const cnpjInput = document.getElementById("cnpj");

    cnpjInput.addEventListener("input", () => {
        let cnpj = cnpjInput.value.replace(/\D/g, "");
        cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
        cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
        cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
        cnpjInput.value = cnpj;
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const cnpj = cnpjInput.value;
        const razaoSocial = document.getElementById("razao-social").value;
        const nomeMercado = document.getElementById("nome-mercado").value;
        const telefone = document.getElementById("telefone").value;

        if (!validarCNPJ(cnpj)) {
            alert("CNPJ inválido! Por favor, insira um CNPJ válido.");
            return;
        }

        if (!cnpj || !razaoSocial || !nomeMercado || !telefone) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        localStorage.setItem("cnpj", cnpj);
        localStorage.setItem("razaoSocial", razaoSocial);
        localStorage.setItem("nomeMercado", nomeMercado);
        localStorage.setItem("telefone", telefone);

        window.location.href = "../HTML/cadastroInfoLocalizacaoEmpresa.html";
    });

    const voltarBtn = document.querySelector(".btn-voltar");
    voltarBtn.addEventListener("click", () => {
        window.location.href = "../../index.html";
    });

    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, "");

        if (cnpj.length !== 14) return false;

        if (/^(\d)\1+$/.test(cnpj)) return false;

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
