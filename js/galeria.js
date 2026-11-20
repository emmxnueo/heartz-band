/* =========================================================
   HEARTZ BAND — Eventos: foto ampliada (visor)
   ========================================================= */

const fotos = document.querySelectorAll('.cuadricula .foto');
const visor = document.getElementById('visor');
const visorImg = document.getElementById('visor-img');
const contador = document.getElementById('visor-contador');
const btnCerrarVisor = document.getElementById('cerrar-visor');
const btnAnterior = document.getElementById('foto-anterior');
const btnSiguiente = document.getElementById('foto-siguiente');

let actual = 0;            // índice de la foto abierta
let ultimoBoton = null;    // para regresar el foco al cerrar

// Pone en el visor la foto número "n" (y da la vuelta al llegar al final)
function mostrarFoto(n) {
  actual = (n + fotos.length) % fotos.length;
  const boton = fotos[actual];
  const mini = boton.querySelector('img');

  // Si es la misma foto de antes no se vuelve a cargar (y no habría evento "load")
  if (visorImg.getAttribute('src') !== boton.dataset.grande) {
    visorImg.classList.add('cambiando');
    visorImg.src = boton.dataset.grande;   // versión grande de la foto
  }
  visorImg.alt = mini.alt;
  contador.textContent = `${actual + 1} / ${fotos.length}`;
}

visorImg.addEventListener('load', () => visorImg.classList.remove('cambiando'));
visorImg.addEventListener('error', () => visorImg.classList.remove('cambiando'));

function abrirVisor(n) {
  ultimoBoton = fotos[n];
  mostrarFoto(n);
  visor.classList.add('abierto');
  visor.setAttribute('aria-hidden', 'false');
  document.body.classList.add('sin-scroll');
  btnCerrarVisor.focus();
}

function cerrarVisor() {
  visor.classList.remove('abierto');
  visor.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('sin-scroll');
  if (ultimoBoton) ultimoBoton.focus();
}

function visorAbierto() {
  return visor.classList.contains('abierto');
}

// Clic en cualquier foto de la cuadrícula
fotos.forEach((boton, i) => {
  boton.addEventListener('click', () => abrirVisor(i));
});

btnCerrarVisor.addEventListener('click', cerrarVisor);
btnAnterior.addEventListener('click', () => mostrarFoto(actual - 1));
btnSiguiente.addEventListener('click', () => mostrarFoto(actual + 1));

// Clic en el fondo oscuro (fuera de la foto) también cierra
visor.addEventListener('click', (e) => {
  if (e.target === visor) cerrarVisor();
});

// Teclado: Esc cierra, flechas cambian de foto
document.addEventListener('keydown', (e) => {
  if (!visorAbierto()) return;
  if (e.key === 'Escape') cerrarVisor();
  if (e.key === 'ArrowLeft') mostrarFoto(actual - 1);
  if (e.key === 'ArrowRight') mostrarFoto(actual + 1);
});
