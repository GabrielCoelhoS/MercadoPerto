const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-bnt");


if (searchButton) {
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase();
      localStorage.setItem("searchTerm", searchTerm);
      console.log(localStorage.getItem("searchTerm"));
      document.location.href = "Pesquisa.html";
    });
  }  