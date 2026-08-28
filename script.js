import Voo from './Voo.js';
import Aeroporto from './Aeroporto.js';
import TorreDeControle from './Torre.js';

// Inicializando o sistema do Aeroporto
const meuAeroporto = new Aeroporto("Afonso Pena");

// Criando instâncias de Voos
const voo1 = new Voo("AD123", "São Paulo", "Recife", "14:30");
const voo2 = new Voo("G3-100", "Curitiba", "Rio de Janeiro", "16:15");
const voo3 = new Voo("LA-200", "Belo Horizonte", "Brasília", "19:00");

// Adicionando os objetos ao radar do aeroporto (Composição na prática)
meuAeroporto.adicionarVooNoRadar(voo1);
meuAeroporto.adicionarVooNoRadar(voo2);
meuAeroporto.adicionarVooNoRadar(voo3);

// Variável global para rastrear qual voo está selecionado na tela
let vooAtual = voo1;

// Monta as opções do select no HTML dinamicamente
function inicializarInterface() {
    const seletor = document.getElementById('seletor-voos');
    seletor.innerHTML = ""; 

    meuAeroporto.listaDeVoos.forEach(voo => {
        const opcao = document.createElement('option');
        opcao.value = voo.codigo;
        opcao.innerText = `${voo.codigo} (${voo.origem} -> ${voo.destino})`;
        seletor.appendChild(opcao);
    });

    // Exibe o primeiro voo por padrão
    vooAtual.atualizarTela();
}

// Vincula as funções ao objeto global window para que o HTML consiga chamá-las
window.mudarVooSelecionado = function(codigo) {
    let vooAchado = meuAeroporto.buscarVoo(codigo);
    if (vooAchado) {
        vooAtual = vooAchado;
        vooAtual.atualizarTela();
    }
}

window.chamarMetodoVoo = function(metodo) {
    if (vooAtual && typeof vooAtual[metodo] === 'function') {
        vooAtual[metodo]();
    }
}

window.alterarHorario = function() {
    const novo = prompt("Qual o novo horário?");
    if (novo) {
        vooAtual.mudarHorario(novo);
    }
}

// --- TESTE DO SINGLETON ---
const torreGeral = new TorreDeControle();
const torreEmergencia = new TorreDeControle();

// A prova de fogo (tem que aparecer TRUE no console)
console.log("As torres são idênticas?", torreGeral === torreEmergencia);
// Funções para os novos botões da Torre
window.tentarPousoGeral = function() {
    // Usa a "torreGeral"
    const mensagem = torreGeral.autorizarPouso("G3-100");
    alert(mensagem);
}

window.tentarPousoEmergencia = function() {
    // Usa a "torreEmergencia"
    // Como é um Singleton, se a torreGeral ocupou a pista, a de emergência saberá!
    const mensagem = torreEmergencia.autorizarPouso("AZ-999");
    alert(mensagem);
}

// Inicia a aplicação
inicializarInterface();
