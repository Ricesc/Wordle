// declaracion de variables y acceso al DOM
let intentos = 6;
let lista = ["MONEY", "APPLE", "PEARL", "CLEAR", "HELLO", "CLOUD", "WHITE", "SUGAR", "TEARS", "LIGHT"];
let contenedor = document.getElementById("guesses");
let palabra = getPalabra();

const button = document.getElementById("guess-button");
const GRID = document.getElementById("grid");
const retry = document.getElementById("retry-button");

button.addEventListener("click", intentar);
retry.addEventListener("click", reiniciar);


// detecta la tecla Enter para realizar un intento
let input = document.getElementById("guess-input").addEventListener("keypress", (event) => {
    //console.log(event.key);
    if (event.key == "Enter") {
        console.log("Enter");
        event.preventDefault()
        intentar()
    }
});

// obtiene una palabra de la API y en caso de error, recurre al array lista
async function getPalabra() {
    const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es";
    await fetch(API)
        .then(response => response.json())
        .then(response => {
            //console.log(response);
            palabra = response[0].toUpperCase();
            console.log("desde API:", palabra);
        })
        .catch(err => {
            console.log(err, "ocurrio un error");
            palabra = palabraAleatoria(lista);
            console.log("desde el array lista:", palabra);
        })
    return palabra;
}

// busca una palabra dentro del array lista
function palabraAleatoria(lista) {
    let palabra = lista[Math.floor(Math.random() * lista.length)];
    return palabra;
}

// reinicia los elementos y reemplaza la palabra
function reiniciar() {
    const input = document.getElementById("guess-input");
    input.value = null;
    GRID.innerHTML = null;
    retry.style.display = "none";
    input.disabled = false;
    button.style.display = "block"
    contenedor.innerHTML = null;
    intentos = 6;
    palabra = getPalabra();
}

// abarca toda la logica para determinar
// si la palabra ingresada coincide con la palabra a adivinar
function intentar() {
    //console.log(document.getElementById("guess-input"));
    const ROW = document.createElement('div');
    ROW.className = 'row';

    const INTENTO = leerIntento();
    console.log(INTENTO)

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
                // si la letra de palabra se encuentra en intento
                // entonces imprimo la letra intento y amarillo
            } else if (palabra.includes(INTENTO[i])) {
                console.log(INTENTO[i], "amarillo");
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#f3c237';
                // si la letra de palabra no se encuentra en intento
                // entonces imprimo la letra intento y gris
            } else {
                console.log(INTENTO[i], "gris");
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#a4aec4';
            }
            ROW.appendChild(SPAN);
        }
        GRID.appendChild(ROW)
        intentos--;
        if (intentos === 0) {
            console.log("Perdiste!");
            terminar("<h1 class='resultado loss'>PERDISTE!!😖</h1>")

        } else if (INTENTO === palabra) {
            console.log("Ganaste!");
            terminar("<h1 class='resultado win'>GANASTE!!🏆</h1>");
            return;
        }
    }
}

// recoge el valor ingresado y lo pasa a mayusculas
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();

    return intento;
}

// inhabilita el input e intercambia los botones
// muestra el mensaje del resultado de la partida
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.style.display = "none";
    retry.style.display = "block";
    contenedor.innerHTML = mensaje;
}