document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    // Redirecionar para a página de login após um pequeno atraso
    setTimeout(function() {
        window.location.href = 'login_inicial.html'; // Caminho da página de login
    }, 500); // Atraso de 500ms para garantir que o redirecionamento ocorra
});

