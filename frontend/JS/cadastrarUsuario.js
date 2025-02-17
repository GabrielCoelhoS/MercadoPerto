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
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const emailJaCadastrado = users.some(user => user.email === email);
    if (emailJaCadastrado) {
      alert('Email já cadastrado! Por favor, utilize outro e-mail.');
      return;
    }
    
    const novoUsuario = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      senha: senha 
    };

    users.push(novoUsuario);
    localStorage.setItem('users', JSON.stringify(users));
    
    setTimeout(function() {
      window.location.href = '../../index.html';
    }, 500); 
  });

  const voltarBtn = document.querySelector(".btn-voltar");
    voltarBtn.addEventListener("click", () => {
        window.location.href = "../../index.html";
    });
  