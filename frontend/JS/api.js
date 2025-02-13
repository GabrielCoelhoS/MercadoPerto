export async function fetchMarkets(query) {
    try {
        const response = await fetch(`/buscar?q=${query}`);
        if (!response.ok) throw new Error("Erro na requisição");
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar mercados:", error);
        return null;
    }
}