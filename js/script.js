let intentos = 6;

let lista = ["MONEY", "APPLE", "PEARL", "CLEAR", "HELLO", "CLOUD", "WHITE", "SUGAR", "TEARS", "LIGHT"];

let palabra = lista[Math.floor(Math.random() * lista.length)];

console.log(palabra);

let contenedor = document.getElementById("guesses");

const button = document.getElementById("guess-button");

const GRID = document.getElementById("grid");



button.addEventListener("click", intentar);

const retry = document.getElementById("retry-button");

retry.addEventListener("click", () => {
    const input = document.getElementById("guess-input");
    input.value = null;
    GRID.innerHTML = null;
    retry.style.display = "none";
    input.disabled = false;
    button.style.display = "block"
    contenedor.innerHTML = null;
    intentos = 6;
});


function intentar() {

    const ROW = document.createElement('div');
    ROW.className = 'row';


    const INTENTO = leerIntento();
    console.log(INTENTO)

    intentos--;

    if (INTENTO.length != 5) {
        alert("Deben ser 5 letras!!");

    } else {
        console.log("Analizar intento");
        for (const i in palabra) {
            const SPAN = document.createElement('span');
            SPAN.className = "letter";
            // si la letra de palabra es igual a intento
            // entonces imprimo la letra intento y verde
            if (palabra[i] === INTENTO[i]) {
                console.log(INTENTO[i], "verde");
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#79b851';

            } else if (palabra.includes(INTENTO[i])) {
                console.log(INTENTO[i], "amarillo");
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#f3c237';
            } else {
                console.log(INTENTO[i], "gris");
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#a4aec4';
            }
            ROW.appendChild(SPAN);
        }
        GRID.appendChild(ROW)
        if (intentos === 0) {
            console.log("Perdiste!");
            terminar("<h1>PERDISTE!!😖</h1>")
        }
        if (INTENTO === palabra) {
            console.log("Ganaste!");
            terminar("<h1>GANASTE!!🏆</h1>");
            return;
        }
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();

    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.style.display = "none";
    retry.style.display = "block";
    contenedor.innerHTML = mensaje;
    palabra = lista[Math.floor(Math.random() * lista.length)];
    console.log(palabra);

}



