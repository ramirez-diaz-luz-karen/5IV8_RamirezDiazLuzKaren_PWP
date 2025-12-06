// ==================== IMPORTS DE FIREBASE ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// ==================== CONFIGURACIÓN DE FIREBASE ====================
const firebaseConfig = {
  apiKey: "AIzaSyAGSuziOm3zcQlbkoqtWIqZBVzJIdZo32A",
  authDomain: "gatodegatos-74887.firebaseapp.com",
  projectId: "gatodegatos-74887",
  storageBucket: "gatodegatos-74887.firebasestorage.app",
  messagingSenderId: "116854174198",
  appId: "1:116854174198:web:3c5794830993f6030717d7",
  measurementId: "G-TZTMDL46XS"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==================== VARIABLES DEL JUEGO ====================
let juegoIniciado = false;
let jugadorActual = "X";
let jugador1 = "X";
let jugador2 = "O";

let ganadorGrande = null;
let miniTableroActivo = null;
let tableroBloqueado = false;

const tableroGrande = [];
const ganadoresMini = Array(9).fill(null);

const tableroEl = document.getElementById("tableroGrande");
const estadoEl = document.getElementById("estado");
const jugadorActualEl = document.getElementById("jugadorActual");

const btnX = document.getElementById("btnX");
const btnO = document.getElementById("btnO");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnActualizar = document.getElementById("btnActualizar");

const msgBD = document.getElementById("msgBD");

const totalPartidasEl = document.getElementById("totalPartidas");
const ganadasXEl = document.getElementById("ganadasX");
const ganadasOEl = document.getElementById("ganadasO");
const empatesEl = document.getElementById("empates");
const ultimaFechaEl = document.getElementById("ultimaFecha");

// ==================== INICIALIZACIÓN ====================
function inicializarJuego() {
    for (let i = 0; i < 9; i++) tableroGrande[i] = Array(9).fill(null);
    ganadoresMini.fill(null);

    miniTableroActivo = null;
    tableroBloqueado = false;

    ganadorGrande = null;
    juegoIniciado = false;
    jugadorActual = jugador1;

    dibujarTablero();
    actualizarEstado();
}

window.addEventListener("load", () => {
    inicializarJuego();
    obtenerEstadisticas();
});

btnX.addEventListener("click", () => iniciarJuego("X"));
btnO.addEventListener("click", () => iniciarJuego("O"));
btnReiniciar.addEventListener("click", reiniciarPartida);
btnActualizar.addEventListener("click", obtenerEstadisticas);

function iniciarJuego(simbolo) {
    jugador1 = simbolo;
    jugador2 = simbolo === "X" ? "O" : "X";
    jugadorActual = jugador1;

    juegoIniciado = true;
    ganadorGrande = null;

    miniTableroActivo = null;
    tableroBloqueado = false;

    for (let i = 0; i < 9; i++) tableroGrande[i] = Array(9).fill(null);
    ganadoresMini.fill(null);

    dibujarTablero();
    actualizarEstado();
}

function reiniciarPartida() {
    inicializarJuego();
}

// ==================== FUNCIONES DEL TABLERO ====================
function dibujarTablero() {
    tableroEl.innerHTML = "";

    for (let b = 0; b < 9; b++) {
        const mini = document.createElement("div");
        mini.className = "miniTablero";

        if (juegoIniciado && miniTableroActivo !== null && !tableroBloqueado) {
            mini.style.opacity = b === miniTableroActivo ? "1" : "0.3";
        }

        if (ganadoresMini[b]) {
            const overlay = document.createElement("div");
            overlay.className = "overlayGanador";
            overlay.textContent = ganadoresMini[b];
            mini.appendChild(overlay);
        }

        for (let c = 0; c < 9; c++) {
            const celda = document.createElement("div");
            celda.className = "celda";
            celda.textContent = tableroGrande[b][c] || "";

            let permitido = false;

            if (juegoIniciado && !ganadorGrande && !ganadoresMini[b] && !tableroGrande[b][c]) {
                if (miniTableroActivo === null && !tableroBloqueado) permitido = true;
                else if (miniTableroActivo === b && !tableroBloqueado) permitido = true;
            }

            if (permitido) {
                celda.style.cursor = "pointer";
                celda.addEventListener("click", () => hacerJugada(b, c));
            } else if (!juegoIniciado) {
                celda.style.cursor = "not-allowed";
                celda.addEventListener("click", () => alert("Debes elegir primero un jugador (X u O)"));
            }

            mini.appendChild(celda);
        }

        tableroEl.appendChild(mini);
    }
}

function hacerJugada(indMini, indCelda) {
    if (!juegoIniciado) return alert("Debes elegir primero un jugador (X u O)");

    if (miniTableroActivo === null && !tableroBloqueado) {
        miniTableroActivo = indMini;
        dibujarTablero();
    }

    if (!tableroBloqueado && indMini !== miniTableroActivo) {
        return alert(`Debes jugar en el mini-tablero ${miniTableroActivo + 1}`);
    }

    if (tableroGrande[indMini][indCelda]) return;

    tableroGrande[indMini][indCelda] = jugadorActual;

    const ganadorMini = comprobarGanador(tableroGrande[indMini]);

    if (ganadorMini) {
        ganadoresMini[indMini] = ganadorMini;
        tableroBloqueado = true;
    }

    if (!ganadorMini && tableroLleno(tableroGrande[indMini])) {
        tableroBloqueado = true;
    }

    ganadorGrande = comprobarGanador(ganadoresMini);

    if (ganadorGrande) {
        juegoIniciado = false;
        dibujarTablero();
        actualizarEstado();
        alert(`¡GANÓ EL JUGADOR ${ganadorGrande}!`);
        guardarResultado(ganadorGrande);
        return;
    }

    if (tableroCompleto()) {
        ganadorGrande = "EMPATE";
        juegoIniciado = false;
        dibujarTablero();
        actualizarEstado();
        alert("La partida terminó en EMPATE");
        guardarResultado("EMPATE");
        return;
    }

    if (tableroBloqueado) {
        miniTableroActivo = null;
        tableroBloqueado = false;
    }

    jugadorActual = jugadorActual === "X" ? "O" : "X";
    dibujarTablero();
    actualizarEstado();
}

function comprobarGanador(arr) {
    const lineas = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (const [a, b, c] of lineas) {
        if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) return arr[a];
    }
    return null;
}

function tableroCompleto() {
    return tableroGrande.every(mini => mini.every(celda => celda));
}

function tableroLleno(arr) {
    return arr.every(v => v !== null);
}

function actualizarEstado() {
    if (!juegoIniciado) {
        if (ganadorGrande === "EMPATE") estadoEl.textContent = "La partida terminó en EMPATE";
        else if (ganadorGrande) estadoEl.textContent = `¡Ganó el jugador ${ganadorGrande}!`;
        else estadoEl.textContent = "Partida detenida. Elige un símbolo para comenzar.";
    } else {
        if (miniTableroActivo === null)
            estadoEl.textContent = `Turno de: ${jugadorActual} | Elige un mini-tablero`;
        else
            estadoEl.textContent = `Turno de: ${jugadorActual} | Jugando en mini-tablero ${miniTableroActivo + 1}`;
    }

    jugadorActualEl.textContent = juegoIniciado ? jugadorActual : "-";
}

// ==================== FIREBASE ====================
function guardarResultado(resultado) {
    const partida = {
        resultado: resultado,
        jugador1: jugador1,
        jugador2: jugador2,
        fecha: new Date().toISOString()
    };

    msgBD.textContent = "Guardando en Firebase...";

    const partidasRef = ref(db, "partidas");

    push(partidasRef, partida)
        .then(() => {
            msgBD.textContent = "Partida guardada correctamente";
            obtenerEstadisticas();
        })
        .catch(() => {
            msgBD.textContent = "Error guardando en Firebase";
        });
}

function obtenerEstadisticas() {
    msgBD.textContent = "Cargando estadísticas...";

    const partidasRef = ref(db, "partidas");

    get(partidasRef)
        .then(snapshot => {
            const data = snapshot.val() || {};
            const partidas = Object.values(data);

            const total = partidas.length;
            const ganadasX = partidas.filter(p => p.resultado === "X").length;
            const ganadasO = partidas.filter(p => p.resultado === "O").length;
            const empates = partidas.filter(p => p.resultado === "EMPATE").length;

            const ultima = partidas.length ?
                new Date(partidas[partidas.length - 1].fecha).toLocaleString()
                : "-";

            totalPartidasEl.textContent = total;
            ganadasXEl.textContent = ganadasX;
            ganadasOEl.textContent = ganadasO;
            empatesEl.textContent = empates;
            ultimaFechaEl.textContent = ultima;

            msgBD.textContent = "";
        })
        .catch(() => {
            msgBD.textContent = "Error cargando estadísticas";
        });
}
