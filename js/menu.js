/* =========================================================
   HEARTZ BAND — Menú desplegable (se usa en todas las páginas)
   ========================================================= */

const menu = document.getElementById('menu');
const btnAbrir = document.getElementById('abrir-menu');
const btnCerrar = document.getElementById('cerrar-menu');
const opciones = menu.querySelectorAll('.menu-opciones a');
const imagenMenu = document.getElementById('menu-img');

function menuAbierto() {
  return menu.classList.contains('abierto');
}

function abrirMenu() {
  menu.classList.add('abierto');
  menu.setAttribute('aria-hidden', 'false');
  btnAbrir.setAttribute('aria-expanded', 'true');
  document.body.classList.add('sin-scroll');          // evita que la página se mueva detrás
  document.dispatchEvent(new Event('menu-abierto'));  // avisa a otras partes (ej. el carrusel)
  btnCerrar.focus();
}

function cerrarMenu() {
  menu.classList.remove('abierto');
  menu.setAttribute('aria-hidden', 'true');
  btnAbrir.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('sin-scroll');
  document.dispatchEvent(new Event('menu-cerrado'));
  btnAbrir.focus();
}

btnAbrir.addEventListener('click', abrirMenu);
btnCerrar.addEventListener('click', cerrarMenu);

// También se cierra con la tecla Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuAbierto()) cerrarMenu();
});

// Cambia la imagen de la derecha con una transición suave
function cambiarImagenMenu(ruta) {
  if (imagenMenu.getAttribute('src') === ruta) return;   // ya es la misma

  imagenMenu.classList.add('cambiando');   // se desvanece (CSS: opacity 0)
  setTimeout(() => {
    imagenMenu.src = ruta;
  }, 250);
}

// Cuando la nueva imagen termina de cargar, vuelve a aparecer
imagenMenu.addEventListener('load', () => imagenMenu.classList.remove('cambiando'));
imagenMenu.addEventListener('error', () => imagenMenu.classList.remove('cambiando'));

opciones.forEach((opcion) => {
  // Precarga la imagen para que el cambio sea instantáneo
  new Image().src = opcion.dataset.img;

  // Con el mouse y también con el teclado (Tab)
  opcion.addEventListener('mouseenter', () => cambiarImagenMenu(opcion.dataset.img));
  opcion.addEventListener('focus', () => cambiarImagenMenu(opcion.dataset.img));

  // Biografía y Contacto todavía no están disponibles
  if (opcion.classList.contains('deshabilitada')) {
    opcion.addEventListener('click', (e) => e.preventDefault());
  }
});
