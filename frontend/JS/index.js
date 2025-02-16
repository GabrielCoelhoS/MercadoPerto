// Função para ações futuras no botão principal
const ctaButton = document.querySelector('.cta-button');

ctaButton.addEventListener('click', () => {
    alert('Funcionalidade em desenvolvimento. Aguarde!');
});

// Adicionando eventos para os links do menu
const navbarLinks = document.querySelectorAll('.navbar-links a');

navbarLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        alert(`Você clicou em: ${link.textContent}`);
    });
});
