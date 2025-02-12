document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("keyup", function (event) {
        const searchQuery = event.target.value.trim();

        document.dispatchEvent(new CustomEvent("searchEvent", {
            detail: { query: searchQuery }
        }));
    });
});
