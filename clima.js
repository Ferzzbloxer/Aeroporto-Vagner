const urlSatelite = "https://api.open-meteo.com/v1/forecast?latitude=-24.41&longitude=-53.52&current_weather=true";

async function buscarClimaAtual() {
    try {
        // O 'await' faz o JS esperar a resposta da rede
        const resposta = await fetch(urlSatelite);
        
        // O 'await' faz o JS esperar a conversão dos dados
        const dadosJson = await resposta.json();
        
        const temperaturaAtual = dadosJson.current_weather.temperature;
        
        const painel = document.getElementById("painelClima");
        painel.innerText = `Temperatura Local: ${temperaturaAtual}°C 🌡️`;
        painel.style.color = "cyan";

    } catch (erro) {
        console.error("Erro na conexão:", erro);
        document.getElementById("painelClima").innerText = "Satélite Offline ❌";
    }
}

buscarClimaAtual();
