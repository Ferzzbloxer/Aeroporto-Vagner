// ==========================================
// 1. CLASSE MAIS BAIXA (COMPONENTE): Voo
// ==========================================
/*class Voo {
    constructor(codigo, origem, destino, horario) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.horario = horario;
        this.status = "No Pátio"; 
        this.altitude = 0; 
    }

    // Método que renderiza este voo específico na tela
    atualizarTela() {
        document.getElementById('txt-codigo').innerText = this.codigo;
        document.getElementById('txt-rota').innerText = `${this.origem} -> ${this.destino}`;
        document.getElementById('txt-horario').innerText = this.horario;
        document.getElementById('txt-status').innerText = this.status;
        document.getElementById('txt-altitude').innerText = this.altitude;

        const img = document.getElementById('img-aviao');

        // Lógica de animação do avião baseada no estado atual
        if (this.status === "Em Voo" || this.status === "Subindo") {
            img.style.transform = "translateX(150vw) translateY(-100px) rotate(-15deg)";
            img.style.opacity = "0"; 
        } else {
            img.style.transform = "translateX(0) translateY(0) rotate(0deg)";
            img.style.opacity = "1";
        }
    }

    decolar() {
        if (this.status !== "Em Voo" && this.status !== "Subindo") {
            this.status = "Em Voo";
            this.altitude = 500;
            this.atualizarTela();
        }
    }

    pousar() {
        this.status = "Aterrissado";
        this.altitude = 0;
        this.atualizarTela();
    }

    verAltitude() {
        if (this.status === "Em Voo" || this.status === "Subindo") {
            this.altitude += 1000;
            this.status = "Subindo";
            this.atualizarTela();
        } else {
            alert("O avião não pode subir se não decolar primeiro!");
        }
    }

    mudarHorario(novo) {
        this.horario = novo;
        this.atualizarTela();
    }
}

// ==========================================
// 2. CLASSE DETENTORA (CONTEINER): Aeroporto
// ==========================================
class Aeroporto {
    constructor(nomeDaBase) {
        this.nome = nomeDaBase;
        this.listaDeVoos = []; // Composição: Array pronto para guardar instâncias de Voo
    }

    // Desafio 1 solucionado: Usando .push()
    adicionarVooNoRadar(novoVoo) {
        this.listaDeVoos.push(novoVoo);
        console.log(`Voo ${novoVoo.codigo} adicionado ao radar de ${this.nome}.`);
    }

    // Desafio 2 solucionado: Usando .find()
    buscarVoo(codigoProcurado) {
        return this.listaDeVoos.find(voo => voo.codigo === codigoProcurado);
    }
}

// ==========================================
// 3. INSTANCIAÇÃO E CONFIGURAÇÃO DO SISTEMA
// ==========================================

// Criamos o aeroporto principal
const meuAeroporto = new Aeroporto("Afonso Pena");

// Criamos múltiplos voos
const voo1 = new Voo("AD123", "São Paulo", "Recife", "14:30");
const voo2 = new Voo("G3-100", "Curitiba", "Rio de Janeiro", "16:15");
const voo3 = new Voo("LA-200", "Belo Horizonte", "Brasília", "19:00");

// Guardamos os objetos dentro do aeroporto (Composição na prática)
meuAeroporto.adicionarVooNoRadar(voo1);
meuAeroporto.adicionarVooNoRadar(voo2);
meuAeroporto.adicionarVooNoRadar(voo3);

// Variável de controle global para saber qual voo está selecionado na tela
let vooAtual = voo1;

// Função para preencher a caixa de seleção HTML com os códigos dos voos no radar
function inicializarInterface() {
    const seletor = document.getElementById('seletor-voos');
    seletor.innerHTML = ""; // Limpa o seletor

    meuAeroporto.listaDeVoos.forEach(voo => {
        const opcao = document.createElement('option');
        opcao.value = voo.codigo;
        opcao.innerText = `${voo.codigo} (${voo.origem} -> ${voo.destino})`;
        seletor.appendChild(opcao);
    });

    // Exibe o primeiro voo por padrão
    vooAtual.atualizarTela();
}

// ==========================================
// 4. FUNÇÕES DE INTERAÇÃO COM A INTERFACE
// ==========================================

// Chamado quando o usuário troca o voo na caixinha de seleção
function mudarVooSelecionado(codigo) {
    // Busca o objeto correto dentro do aeroporto usando o método criado
    let vooAchado = meuAeroporto.buscarVoo(codigo);
    
    if (vooAchado) {
        vooAtual = vooAchado;
        vooAtual.atualizarTela(); // Renderiza as informações do novo voo na tela
    }
}

// Direciona os cliques de comandos (decolar, pousar, subir) ao objeto de voo ativo
function chamarMetodoVoo(metodo) {
    if (vooAtual && typeof vooAtual[metodo] === 'function') {
        vooAtual[metodo]();
    }
}

// Função para gerenciar a prompt de alteração de horário
function alterarHorario() {
    const novo = prompt("Qual o novo horário?");
    if (novo) {
        vooAtual.mudarHorario(novo);
    }
}

// Inicia o painel de voos assim que carregar o script
inicializarInterface();
