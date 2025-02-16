document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    // Recupera a lista de usuários do localStorage ou inicia um array vazio
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verifica se o e-mail já está cadastrado
    const emailJaCadastrado = users.some(user => user.email === email);
    if (emailJaCadastrado) {
      alert('Email já cadastrado! Por favor, utilize outro e-mail.');
      return;
    }
    
    // Cria o novo usuário
    const novoUsuario = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      senha: senha // Atenção: armazenar senhas no localStorage não é recomendado para produção
    };
    
    // Adiciona o novo usuário e atualiza o localStorage
    users.push(novoUsuario);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Redireciona para a página de login após um pequeno atraso
    setTimeout(function() {
      window.location.href = '../../index.html'; // Ajuste o caminho se necessário
    }, 500);
  });
  
  // Botão Voltar: retorna à página anterior
  document.querySelector('.btn-voltar').addEventListener('click', function() {
    window.history.back();
  });
  