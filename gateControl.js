import Voo from './Voo.js'; // Import the shared class

class Portao {
    constructor(numero) {
        this.numero = numero;
        this.vooAcoplado = null; 
        this.isOcupado = false;
    }

    acoplarVoo(aviao) {
        if (this.isOcupado) {
            throw new Error(`Portão ${this.numero} já está ocupado!`);
        }

        this.vooAcoplado = aviao;
        this.isOcupado = true;
        console.log(`✅ Sucesso: O voo ${aviao.codigo} acoplou no Portão ${this.numero}.`);
    }

    liberarPortao() {
        if (this.vooAcoplado) {
            console.log(`Liberando o Portão ${this.numero} (O voo ${this.vooAcoplado.codigo} partiu)...`);
            this.vooAcoplado = null;
            this.isOcupado = false;
        }
    }
}

// SIMULAÇÃO
const terminalDePortoes = [
    new Portao("01"),
    new Portao("02"),
    new Portao("03")
];

let vooLatam = new Voo("LA-111", "SP", "RJ", "10:00");
let vooAzul = new Voo("AD-333", "PR", "SC", "11:00");

try {
    console.log("--- INICIANDO OPERAÇÃO NO PÁTIO ---");
    
    // Tenta acoplar o primeiro voo
    terminalDePortoes[0].acoplarVoo(vooLatam);
    
    // RESOLUÇÃO DO DESAFIO EXTRA:
    // Procurar o primeiro portão onde isOcupado seja falso
    let portaoLivre = terminalDePortoes.find(portao => portao.isOcupado === false);

    if (portaoLivre) {
        console.log(`Portão livre encontrado: ${portaoLivre.numero}`);
        portaoLivre.acoplarVoo(vooAzul);
    } else {
        console.log("Não há portões disponíveis.");
    }

} catch (erro) {
    console.error("🚨 ALERTA NA TORRE DE CONTROLE:", erro.message);
}