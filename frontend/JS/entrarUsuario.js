const voltarBtn = document.querySelector(".btn-voltar");
    voltarBtn.addEventListener("click", () => {
        window.location.href = "../../index.html";
    });

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  
  const user = users.find(user => user.email === email);
  
  if (user && user.senha === password) {
      alert(`Bem-vindo, ${user.nome}!`);
      window.location.href = '../HTML/telaInicialCliente.html';
  } else {
      alert('E-mail ou senha inválidos. Tente novamente.');
  }

});

