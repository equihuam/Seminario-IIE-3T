const button = document.getElementById('install');
const help = document.getElementById('install-help');
let promptEvent;

function showHelp(open) {
  help.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
}

button.hidden = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
showHelp(false);
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  promptEvent = event;
});
button.addEventListener('click', async () => {
  if (!promptEvent) {
    showHelp(help.hidden);
    return;
  }
  const available = promptEvent;
  promptEvent = null;
  showHelp(false);
  try {
    await available.prompt();
    await available.userChoice;
  } catch {
    showHelp(true);
  }
});
window.addEventListener('appinstalled', () => {
  promptEvent = null;
  button.hidden = true;
  showHelp(false);
});
document.getElementById('install-close').addEventListener('click', () => {
  showHelp(false);
  button.focus();
});
