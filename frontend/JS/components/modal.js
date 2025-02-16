document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const modalQuantity = document.getElementById("quantity");
    const closeModal = document.querySelector(".close");

    document.querySelectorAll(".product").forEach(product => {
        product.addEventListener("click", function () {
            const imgSrc = this.querySelector("img").src;
            const title = this.querySelector("p:nth-child(3)").textContent;
            const price = this.querySelector("p:nth-child(2)").textContent;

            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalPrice.textContent = price;
            modalQuantity.value = 1;

            modal.style.display = "flex";
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    document.querySelector(".add-to-cart").addEventListener("click", function () {
        const quantity = modalQuantity.value;
        alert(`Adicionado ${quantity}x ${modalTitle.textContent} ao carrinho!`);
        modal.style.display = "none";
    });
});