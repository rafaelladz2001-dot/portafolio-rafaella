// Año actual en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Modo oscuro / claro con localStorage
const toggleBtn = document.getElementById('themeToggle');

function setTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggleBtn.textContent = isDark ? 'Claro' : 'Oscuro';
}

// Cargar preferencia guardada al iniciar
setTheme(localStorage.getItem('theme') === 'dark');

// Alternar al hacer clic
toggleBtn.addEventListener('click', () => {
  setTheme(!document.documentElement.classList.contains('dark'));
});

// Contador de visitas (simulado con localStorage; conectar a API real cuando esté lista)
(function loadVisits() {
  const count = parseInt(localStorage.getItem('visitCount') || '0', 10) + 1;
  localStorage.setItem('visitCount', count);
  const el = document.getElementById('visitCounter');
  if (el) el.textContent = `Visitas: ${count}`;
})();
