// ARQUIVO: Torre.js
class TorreDeControle {
    static instanciaUnica;

    constructor() {
        // 2. A Trava do Singleton:
        // Se a 'instanciaUnica' JÁ EXISTE, aborte a criação e RETORNE a que já existe!
        if (TorreDeControle.instanciaUnica) {
            return TorreDeControle.instanciaUnica;
        }

        // Se chegou aqui, é porque é a primeira vez. Construa a torre!
        this.nome = "Torre Central";
        this.pistaOcupada = false;

        
        // 3. Salve o próprio objeto recém-criado (this) na variável estática!
        TorreDeControle.instanciaUnica = this;
    }
    
    autorizarPouso(codigoVoo) {
        if (this.pistaOcupada) {
            return 'NEGADO: Pista ocupada! Voo ${codigoVoo} entre em espera.';
        }
        this.pistaOcupada = true;
        return 'Autorizado: Voo ${codigoVoo} pode pousar.'
    }

    liberarPista() {
        this.pistaOcupada = false;
        console.log('Pista liberada.')
    }
}
export default TorreDeControle;
