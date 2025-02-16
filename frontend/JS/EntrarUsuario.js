document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Recupera a lista de usuários armazenados no localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Encontra o usuário que corresponde ao e-mail informado
  const user = users.find(user => user.email === email);
  
  // Verifica se o usuário existe e a senha está correta
  if (user && user.senha === password) {
      alert(`Bem-vindo, ${user.nome}!`);
      
      // Redireciona para a página inicial ou a área protegida
      window.location.href = '../HTML/TelaInicialCliente.html'; // Ajuste conforme necessário
  } else {
      alert('E-mail ou senha inválidos. Tente novamente.');
  }
});

