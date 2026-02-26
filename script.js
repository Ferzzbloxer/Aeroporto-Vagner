// 1. O MOLDE (CLASSE)
class Voo {
    constructor(codigo, origem, destino, horario) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.horario = horario;
        this.status = "No Pátio"; 
        this.altitude = 0; 
    }

    // MÉTODO PARA ATUALIZAR A TELA
    atualizarStatus() {
        // Atualiza os textos no HTML
        document.getElementById('txt-codigo').innerText = this.codigo;
        document.getElementById('txt-rota').innerText = `${this.origem} -> ${this.destino}`;
        document.getElementById('txt-horario').innerText = this.horario;
        document.getElementById('txt-status').innerText = this.status;
        document.getElementById('txt-altitude').innerText = this.altitude;

        const img = document.getElementById('img-aviao');

        // LÓGICA DO MOVIMENTO (O que você pediu: voar para fora)
        if (this.status === "Em Voo" || this.status === "Subindo") {
            // Voa para a direita (150vw tira ele da tela), sobe um pouco e inclina
            img.style.transform = "translateX(150vw) translateY(-100px) rotate(-15deg)";
            img.style.opacity = "0"; // Faz ele sumir suavemente
        } else {
            // Volta para o centro, reto e visível
            img.style.transform = "translateX(0) translateY(0) rotate(0deg)";
            img.style.opacity = "1";
        }
    }

    decolar() {
        if (this.status !== "Em Voo" && this.status !== "Subindo") {
            this.status = "Em Voo";
            this.altitude = 500;
            this.atualizarStatus();
        }
    }

    pousar() {
        this.status = "Aterrissado";
        this.altitude = 0;
        this.atualizarStatus();
    }

    verAltitude() {
        if (this.status === "Em Voo" || this.status === "Subindo") {
            this.altitude += 1000;
            this.status = "Subindo";
            this.atualizarStatus();
        } else {
            alert("O avião não pode subir se não decolar primeiro!");
        }
    }

    mudarHorario(novo) {
        this.horario = novo;
        this.atualizarStatus();
    }
}

// 2. CRIANDO O OBJETO (INSTÂNCIA)
// Aqui o 'this' passa a ser o 'meuVoo'
const meuVoo = new Voo("AD123", "São Paulo", "Recife", "14:30");

// Mostrar os dados assim que a página abrir
meuVoo.atualizarStatus();

// 3. FUNÇÃO PARA O BOTÃO DE HORÁRIO
function alterarHorario() {
    const novo = prompt("Qual o novo horário?");
    if (novo) {
        meuVoo.mudarHorario(novo);
    }
}