// SISTEMA DE PORTÕES (GATE CONTROL) - MODO HARDCORE
// Missão: Implementar regras de Associação de Objetos e Validação de Estado.

class Voo {
    constructor(codigo, companhia) {
        this.codigo = codigo;
        this.companhia = companhia;
    }
}

class Portao {
    constructor(numero) {
        this.numero = numero;
        this.vooAcoplado = null; // null significa que está vazio
        
        // DESAFIO 1: Crie uma variável de estado (booleana) para dizer se está ocupado. - done
        this.isOcupado = false;
    }

    acoplarVoo(aviao) {
        // DESAFIO 2: A Trava de Segurança
        // Faça um IF: Se o portão JÁ ESTIVER OCUPADO, o sistema deve "Cuspir" um Erro!
        // PESQUISE: "JavaScript throw new Error MDN"
        if (this.isOcupado == true) {
            throw new Error('Portão ocupado!');
        }

        // Se passar pelo IF sem dar erro, o avião acopla com sucesso!
        this.vooAcoplado = aviao;
        
        // DESAFIO 3: Altere o estado do portão para indicar que agora ele tem um dono!
        this.isOcupado = true;
        console.log(`✅ Sucesso: O voo ${aviao.codigo} acoplou no Portão ${this.numero}.`);
    }

    liberarPortao() {
        console.log(`Liberando o Portão ${this.numero} (O voo ${this.vooAcoplado.codigo} partiu)...`);
        
        // DESAFIO 4: Como você "limpa" os atributos para o portão voltar a ficar livre?
        this.vooAcoplado = null;
        this.isOcupado = false;
    }
}

// ========================================================
// A SIMULAÇÃO DO TERMINAL DE PASSAGEIROS
// ========================================================

// Criando 3 portões físicos no aeroporto
const terminalDePortoes = [
    new Portao("01"),
    new Portao("02"),
    new Portao("03")
];

// Criando 2 voos chegando da API
let vooLatam = new Voo("LA-111", "Latam");
let vooGol = new Voo("G3-222", "Gol");
let vooAzul = new Voo("AD-333", "Azul");

try {
    console.log("--- INICIANDO OPERAÇÃO NO PÁTIO ---");
    
    // Teste 1: Acoplando o Latam no Portão 1
    terminalDePortoes[0].acoplarVoo(vooLatam);
    
    // Teste 2: Tentando causar um acidente (Azul no mesmo portão!)
    // Se o seu Desafio 2 estiver certo, a linha abaixo VAI disparar um erro e cair no catch!
    terminalDePortoes[0].acoplarVoo(vooAzul); 
    
    // Se a linha acima falhar (der erro), a linha abaixo NÃO vai rodar (Segurança garantida).
    terminalDePortoes[1].acoplarVoo(vooGol); 

} catch (erro) {
    console.error("🚨 ALERTA NA TORRE DE CONTROLE:", erro.message);
}

// DESAFIO EXTRA (Descomente após resolver os anteriores):
// Como usar um array method (.find) para procurar automaticamente o primeiro portão livre?
/*
let portaoLivre = terminalDePortoes.find(portao => /* [SUA REGRA DE BUSCA AQUI] *\/);
if (portaoLivre) {
    portaoLivre.acoplarVoo(vooAzul);
} else {
    console.log("Não há portões disponíveis. O voo deve aguardar no ar.");
}
*/
