import { fetchMarkets } from "../API.js";

document.addEventListener("DOMContentLoaded", function () {
    const resultsContainer = document.getElementsByClassName("results");

    async function searchMarkets(query) {
        if (query === "") {
            resultsContainer.innerHTML = "<p>Digite algo para pesquisar.</p>";
            return;
        }

        resultsContainer.innerHTML = "<p>Carregando...</p>";

        const data = await fetchMarkets(query);
        resultsContainer.innerHTML = "";

        if (!data || data.length === 0) {
            resultsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
            return;
        }

        data.forEach(market => {
            let div = document.createElement("div");
            div.classList.add("market-item");
            div.innerHTML = `<strong>${market.nome}</strong> - ${market.status}`;
            resultsContainer.appendChild(div);
        });
    }

    document.addEventListener("searchEvent", function (event) {
        searchMarkets(event.detail.query);
    });
});
