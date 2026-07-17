// ==============================
// Año actual en el footer
// ==============================
function showCurrentYear() {
  const yearSpan = document.getElementById('year');
  yearSpan.textContent = new Date().getFullYear();
}

// ==============================
// Modo oscuro / claro
// ==============================
const themeToggleButton = document.getElementById('themeToggle');

function applyTheme(isDarkMode) {
  document.documentElement.classList.toggle('dark', isDarkMode);
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  themeToggleButton.textContent = isDarkMode ? 'Claro' : 'Oscuro';
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme === 'dark';
  applyTheme(isDarkMode);
}

function toggleTheme() {
  const isCurrentlyDark = document.documentElement.classList.contains('dark');
  applyTheme(!isCurrentlyDark);
}

// ==============================
// Menú móvil (hamburguesa)
// ==============================
const navToggleButton = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function closeNav() {
  navLinks.classList.remove('open');
  navToggleButton.setAttribute('aria-expanded', 'false');
  navToggleButton.setAttribute('aria-label', 'Abrir menú');
}

function toggleNav() {
  const isOpen = navLinks.classList.toggle('open');
  navToggleButton.setAttribute('aria-expanded', String(isOpen));
  navToggleButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
}

navToggleButton.addEventListener('click', toggleNav);
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

// ==============================
// Formulario de contacto (envío AJAX a Formspree)
// ==============================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = 'Enviando…';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = '¡Mensaje enviado! Te responderé a través del correo que ingresaste.';
        contactForm.reset();
      } else {
        formStatus.textContent = 'No se pudo enviar el mensaje. Intenta de nuevo o escríbeme directo al correo.';
      }
    } catch (error) {
      formStatus.textContent = 'No se pudo enviar el mensaje. Revisa tu conexión e intenta de nuevo.';
    }
  });
}

// ==============================
// Animación de aparición al hacer scroll
// ==============================
const revealTargets = document.querySelectorAll('.fade-in-up');

if ('IntersectionObserver' in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}

// ==============================
// Inicialización
// ==============================
showCurrentYear();
loadSavedTheme();
themeToggleButton.addEventListener('click', toggleTheme);
