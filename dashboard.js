// SISTEMA DE DASHBOARDS - MODO HARDCORE
// Missão: Manipulação complexa de Arrays e Interatividade Sonora.

const frotaDoDia = [
    { codigo: "G3-11", status: "Confirmado", passageiros: 120 },
    { codigo: "LA-22", status: "Atrasado", passageiros: 200 },
    { codigo: "AZ-33", status: "Emergência", passageiros: 90 },
    { codigo: "AF-44", status: "Atrasado", passageiros: 300 }
];

console.log("=== PAINEL GERENCIAL DA DIRETORIA ===");

// ========================================================
// DESAFIO 1: O SOMATÓRIO (O temido Reduce)
// ========================================================
// A diretoria quer saber o total de passageiros na frota inteira!
// O reduce recebe (acumulador, valorAtual) e devolve o novo acumulador.
// O ", 0" no final diz pro acumulador começar do zero.

let totalPassageiros = frotaDoDia.reduce((acumulador, voo) => acumulador + voo.passageiros, 0);

console.log(`📊 TOTAL: Temos ${totalPassageiros} passageiros operando hoje.`);

// ========================================================
// DESAFIO 2: CONTAGEM DE ATRASOS (O Encadeamento)
// ========================================================
// Quantos voos estão atrasados hoje?
// .filter() devolve um NOVO array só com os que atendem à condição,
// e encadeamos ".length" na mesma linha pra já pegar o tamanho dele.

let qtdAtrasados = frotaDoDia.filter(voo => voo.status === "Atrasado").length;

console.log(`⚠️ ALERTA: Temos ${qtdAtrasados} voos atrasados no momento!`);

// ========================================================
// DESAFIO 3: O ALARME DE EMERGÊNCIA (Áudio API)
// ========================================================
// Se houver um voo em emergência, toque a sirene!

function verificarEmergencia(listaDeVoos) {
    // 1. O método find() procura se ALGUÉM está em emergência
    let temEmergencia = listaDeVoos.find(voo => voo.status === "Emergência");

    if (temEmergencia) {
        console.error(`🚨 EMERGÊNCIA DECLARADA NO VOO ${temEmergencia.codigo}! 🚨`);

        // 2. Cria uma nova instância de áudio passando o link do som:
        let sirene = new Audio("https://www.myinstants.com/media/sounds/nuclear-alarm.mp3");

        // 3. Dá o comando para o objeto tocar o som!
        sirene.play().catch(erro => {
            // Alguns navegadores bloqueiam o play() se não veio de um clique do usuário.
            console.error("Não foi possível tocar o alarme:", erro);
        });
    } else {
        console.log("✅ Nenhuma emergência no momento. Tudo tranquilo na pista.");
    }
}

// O navegador bloqueia áudios que tocam sozinhos ao carregar a página (política anti-spam).
// Por isso a chamada abaixo fica presa a um clique de botão no HTML (id="btnAlarme"),
// e não é chamada direto aqui no carregamento do arquivo.
const botaoAlarme = document.getElementById("btnAlarme");
if (botaoAlarme) {
    botaoAlarme.addEventListener("click", () => verificarEmergencia(frotaDoDia));
}
