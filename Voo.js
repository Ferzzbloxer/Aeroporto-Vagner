// O "export default" permite que outras classes importem este arquivo
export default class Voo {
    constructor(codigo, origem, destino, horario) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.horario = horario;
        this.status = "No Pátio"; 
        this.altitude = 0; 
    }

    // Altera as informações visuais na tela
    atualizarTela() {
        document.getElementById('txt-codigo').innerText = this.codigo;
        document.getElementById('txt-rota').innerText = `${this.origem} -> ${this.destino}`;
        document.getElementById('txt-horario').innerText = this.horario;
        document.getElementById('txt-status').innerText = this.status;
        document.getElementById('txt-altitude').innerText = this.altitude;

        const img = document.getElementById('img-aviao');

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
        if (this.status === "Em Voo" || this.status === "Subindo") {
            this.status = "Aterrissado";
            this.altitude = 0;
            this.atualizarTela();
        }
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
