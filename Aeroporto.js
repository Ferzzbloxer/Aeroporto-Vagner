import Voo from './Voo.js';

export default class Aeroporto {
    constructor(nomeDaBase) {
        this.nome = nomeDaBase;
        this.listaDeVoos = []; // Composição de Objetos
    }

    // Desafio 1 solucionado: Colocando voo no Array
    adicionarVooNoRadar(novoVoo) {
        this.listaDeVoos.push(novoVoo);
        console.log(`Voo ${novoVoo.codigo} adicionado ao radar de ${this.nome}.`);
    }

    // Desafio 2 solucionado: Buscando voo específico no Array
    buscarVoo(codigoProcurado) {
        return this.listaDeVoos.find(voo => voo.codigo === codigoProcurado);
    }
}
