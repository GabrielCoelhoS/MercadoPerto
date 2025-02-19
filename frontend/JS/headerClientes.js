const header = document.querySelector("header");
    if (header) {
      const userIcon = document.createElement("span");
      userIcon.classList.add("user-icon");
      userImg = document.createElement("img");
      userImg.src = "../imagens/iconamoon_profile-fill.png";
      userIcon.appendChild(userImg);
      userIcon.style.cursor = "pointer";
      userIcon.style.fontSize = "24px";
      userIcon.addEventListener("click", () => {
        window.location.href = "../HTML/informacoesUsuario.html";
      });
      header.appendChild(userIcon);

      const cartIcon = document.createElement("span");
      cartIcon.classList.add("cart-icon");
      cartImg = document.createElement("img");
      cartImg.src = "../imagens/carrinho-icon.png";
      cartIcon.appendChild(cartImg);
      cartIcon.style.cursor = "pointer";
      cartIcon.style.fontSize = "24px";

      cartIcon.addEventListener("click", () => {
        openCartModal();
      });
      header.appendChild(cartIcon);
    }
  