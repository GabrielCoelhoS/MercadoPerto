document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const modalQuantity = document.getElementById("quantity");
    const closeModal = document.querySelector(".close");

    // Adicionando evento de clique em cada produto
    document.querySelectorAll(".product").forEach(product => {
        product.addEventListener("click", function () {
            const imgSrc = this.querySelector("img").src;
            const title = this.querySelector("p:nth-child(3)").textContent;
            const price = this.querySelector("p:nth-child(2)").textContent;

            // Atualiza os elementos do modal
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalPrice.textContent = price;
            modalQuantity.value = 1; // Resetando a quantidade para 1

            // Exibe o modal
            modal.style.display = "flex";
        });
    });

    // Fecha o modal ao clicar no "X"
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Botão "Adicionar ao Carrinho"
    document.querySelector(".add-to-cart").addEventListener("click", function () {
        const quantity = modalQuantity.value;
        alert(`Adicionado ${quantity}x ${modalTitle.textContent} ao carrinho!`);
        modal.style.display = "none"; // Fecha o modal após adicionar ao carrinho
    });
});