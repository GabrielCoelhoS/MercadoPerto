document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
  }

  alert(`Cadastro realizado com sucesso para: ${email}`);
});

