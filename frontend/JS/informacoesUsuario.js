document.addEventListener("DOMContentLoaded", () => {
    const userInfoContainer = document.getElementById("user-info");
    const editButton = document.getElementById("edit-info-btn");

    // Obtém os usuários do localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Pega o último usuário cadastrado (pode ajustar para pegar o usuário logado)
    const currentUser = users[users.length - 1];

    if (currentUser) {
        userInfoContainer.innerHTML = `
            <p><strong>Nome:</strong> ${currentUser.nome}</p>
            <p><strong>Sobrenome:</strong> ${currentUser.sobrenome}</p>
            <p><strong>E-mail:</strong> ${currentUser.email}</p>
            <p><strong>Senha:</strong> ******</p> <!-- Senha oculta -->
        `;
    } else {
        userInfoContainer.innerHTML = `<p>Nenhum usuário encontrado.</p>`;
    }

    // Abre o modal de edição ao clicar no botão
    editButton.addEventListener("click", () => {
        document.getElementById("edit-modal").style.display = "flex";

        // Preenche os campos do formulário com os dados atuais
        document.getElementById("edit-nome").value = currentUser.nome;
        document.getElementById("edit-sobrenome").value = currentUser.sobrenome;
        document.getElementById("edit-email").value = currentUser.email;
    });

    // Fechar modal ao clicar no botão "Fechar"
    document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("edit-modal").style.display = "none";
    });

    // Salvar alterações ao clicar no botão "Salvar"
    document.getElementById("save-edit").addEventListener("click", () => {
        const nome = document.getElementById("edit-nome").value;
        const sobrenome = document.getElementById("edit-sobrenome").value;
        const email = document.getElementById("edit-email").value;

        if (nome && sobrenome && email) {
            currentUser.nome = nome;
            currentUser.sobrenome = sobrenome;
            currentUser.email = email;

            localStorage.setItem("users", JSON.stringify(users));

            alert("Informações atualizadas com sucesso!");
            window.location.reload();
        } else {
            alert("Preencha todos os campos!");
        }
    });
});
