// script.js

// Inicializar mazos con nombres de archivos de imagen
let mazoVerdad = Array.from({ length: 49 }, (_, i) => `images/imagesverdad${i + 1}.jpg`);
let mazoReto = Array.from({ length: 43 }, (_, i) => `images/imagesreto${i + 1}.jpg`);
let mazoShot = Array.from({ length: 5 }, (_, i) => `images/imagesshot${i + 1}.jpg`);

// Control de jugadores
let jugadorActual = 1;
let nombresJugadores = [];

// Función para extraer una carta aleatoria
function extraerCartaAleatoria(mazo, tipo) {
  if (mazo.length === 0) {
    alert(`El mazo de ${tipo} está vacío.`);
    verificarReinicio();
    return;
  }
  const indiceAleatorio = Math.floor(Math.random() * mazo.length);
  const carta = mazo.splice(indiceAleatorio, 1)[0]; // Extraer carta y eliminarla del mazo
  mostrarImagen(carta);
}

// Función para mostrar la imagen de una carta
function mostrarImagen(carta) {
  const cardImage = document.getElementById("card-image");
  cardImage.src = carta;
  cardImage.style.display = "block"; // Mostrar la imagen
}

// Verificar reinicio del juego
function verificarReinicio() {
  if (mazoVerdad.length === 0 && mazoReto.length === 0) {
    alert("¡Fin del juego! Reiniciando...");
    reiniciarJuego();
  }
}

// Reiniciar el juego
function reiniciarJuego() {
  mazoVerdad = Array.from({ length: 49 }, (_, i) => `imagesverdad${i + 1}.jpg`);
  mazoReto = Array.from({ length: 43 }, (_, i) => `imagesreto${i + 1}.jpg`);
  document.getElementById("card-image").style.display = "none"; // Ocultar la imagen
  jugadorActual = 1;
  actualizarJugadorActual();
}

// Cambiar turno
function cambiarTurno() {
  jugadorActual = jugadorActual === 1 ? 2 : 1;
  actualizarJugadorActual();
}

// Actualizar nombre del jugador actual
function actualizarJugadorActual() {
  document.getElementById("current-player").textContent = nombresJugadores[jugadorActual - 1];
}

// Manejar inicio de sesión
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  
  const jugador1 = document.getElementById("player1-name").value.trim();
  const jugador2 = document.getElementById("player2-name").value.trim();
  
  if (!jugador1 || !jugador2) {
    alert("Por favor, ingresa los nombres de ambos jugadores.");
    return;
  }
  
  nombresJugadores = [jugador1, jugador2];
  
  // Mostrar sección del juego y ocultar el login
  document.getElementById("login-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  
  actualizarJugadorActual();
});

// Eventos
document.getElementById("truth-btn").addEventListener("click", () => extraerCartaAleatoria(mazoVerdad, "Verdad"));
document.getElementById("dare-btn").addEventListener("click", () => extraerCartaAleatoria(mazoReto, "Reto"));
document.getElementById("random-btn").addEventListener("click", () => {
  const mazoAleatorio = Math.random() < 0.5 ? mazoVerdad : mazoReto;
  const tipo = mazoAleatorio === mazoVerdad ? "Verdad" : "Reto";
  extraerCartaAleatoria(mazoAleatorio, tipo);
});
document.getElementById("shot-btn").addEventListener("click", () => {
  const carta = mazoShot[Math.floor(Math.random() * mazoShot.length)];
  mostrarImagen(carta);
});
document.getElementById("next-player-btn").addEventListener("click", cambiarTurno);
