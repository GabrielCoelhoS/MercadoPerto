document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.querySelector("#filter-button");
    const filterMenu = document.querySelector("#filter-menu");

    filterButton.addEventListener("click", function () {
        filterMenu.classList.toggle("show");
    });
});