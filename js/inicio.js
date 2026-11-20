/* =========================================================
   HEARTZ BAND — Inicio: carrusel
   (el menú está en menu.js)
   ========================================================= */

const carrusel = document.getElementById('carrusel');
const fotos = carrusel.querySelectorAll('img');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');

const TIEMPO_POR_FOTO = 6000;   // 6 segundos por foto
const INICIO_CARRUSEL = 2500;   // espera a que termine la animación de entrada

let actual = 0;          // índice de la foto visible
let temporizador = null; // guarda el setInterval para poder pausarlo

// Muestra la foto número "n" (y da la vuelta al llegar al final o al inicio)
function mostrarFoto(n) {
  fotos[actual].classList.remove('activa');
  actual = (n + fotos.length) % fotos.length;
  fotos[actual].classList.add('activa');
}

function siguiente() { mostrarFoto(actual + 1); }
function anterior()  { mostrarFoto(actual - 1); }

function iniciarCarrusel() {
  detenerCarrusel();   // evita que se acumulen dos temporizadores
  temporizador = setInterval(siguiente, TIEMPO_POR_FOTO);
}

function detenerCarrusel() {
  clearInterval(temporizador);
  temporizador = null;
}

// Flechas: avanzan o retroceden manualmente
btnSiguiente.addEventListener('click', siguiente);
btnAnterior.addEventListener('click', anterior);

// Al pasar el cursor se pausa; al retirarlo continúa
carrusel.addEventListener('mouseenter', detenerCarrusel);
carrusel.addEventListener('mouseleave', () => {
  if (!menuAbierto()) iniciarCarrusel();
});

// Mientras el menú está abierto el carrusel se detiene (eventos de menu.js)
document.addEventListener('menu-abierto', detenerCarrusel);
document.addEventListener('menu-cerrado', iniciarCarrusel);

// Arranca después de la animación de entrada
setTimeout(iniciarCarrusel, INICIO_CARRUSEL);
