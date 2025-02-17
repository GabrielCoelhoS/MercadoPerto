document.addEventListener("DOMContentLoaded", () => {
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

    document.querySelector('.btn-voltar').addEventListener('click', () => {
        window.location.href = "../HTML/cadastroInfoLocalizacaoEmpresa.html";corretamente
    });
    document.querySelector('.btn-continuar').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "../HTML/primeira_empresa.html";
    });
});
