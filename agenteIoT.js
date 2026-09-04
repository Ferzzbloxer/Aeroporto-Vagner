// ARQUIVO: agenteIoT.js (MODO HARDCORE)

// 1. DADOS SIMULADOS DA FROTA
// Adicionamos a propriedade "tempoParaDecolagem" (em segundos)
let frotaAtiva = [
    { codigo: "G3-100", destino: "São Paulo", status: "Embarque", tempoParaDecolagem: 5 },
    { codigo: "LA-222", destino: "Rio de Janeiro", status: "Embarque", tempoParaDecolagem: 10 },
    { codigo: "AZ-999", destino: "Campinas", status: "Aguardando", tempoParaDecolagem: 15 }
];

// 2. FUNÇÃO VISUAL (Já dominada por vocês)
function renderizarPainel() {
    let tela = document.getElementById("painel");
    tela.innerHTML = "<h2>Painel de Partidas Automático 🛫</h2>";
    
    frotaAtiva.forEach(voo => {
        let cor = voo.status === "Decolado" ? "green" : (voo.tempoParaDecolagem <= 5 ? "red" : "white");
        tela.innerHTML += `
            <div style="color: ${cor}; border: 1px solid gray; margin: 5px; padding: 10px;">
                <strong>${voo.codigo}</strong> para ${voo.destino} <br>
                Status: ${voo.status} | Decola em: ${voo.tempoParaDecolagem}s
            </div>
        `;
    });
}

// ========================================================
// DESAFIO 1: O AGENTE AUTÔNOMO (Lógica de Varredura)
// ========================================================
function varreduraDeRotina() {
    // Essa função será o "Cérebro" do nosso robô.
    
    frotaAtiva.forEach(voo => {
        // A) Se o avião já "Decolou", não faça nada (ignore).
        if (voo.status === "Decolado") return;

        // B) Se o tempo para decolagem for maior que zero, diminua 1 segundo!
        if (voo.tempoParaDecolagem > 0) {
            voo.tempoParaDecolagem -= 1;
        }

        // C) Se o tempo chegou a exatos ZERO, mude o status para "Decolado"!
        if (voo.tempoParaDecolagem === 0) {
            voo.status = "Decolado";
            console.log(`🚨 ATENÇÃO: O voo ${voo.codigo} acaba de decolar!`);
        }
    });

    // D) Após o robô alterar os dados na memória, mande ele redesenhar a tela!
    renderizarPainel();
}


// ========================================================
// DESAFIO 2: LIGANDO O ROBÔ (O Loop Temporal)
// ========================================================
// PESQUISE NO GOOGLE: "JavaScript setInterval MDN"
// A função setInterval executa uma função repetidamente de tempos em tempos.

console.log("Iniciando Agente IoT da Torre de Controle...");

// Use o setInterval para fazer a função "varreduraDeRotina" rodar a cada 1000 milissegundos (1 segundo).
setInterval((varreduraDeRotina), 1000);

// Renderiza a primeira vez só para a tela não começar em branco.
renderizarPainel();
