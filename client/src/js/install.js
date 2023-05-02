const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// beforeinstallprompt event handler
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// butinstall click even handler
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }
    promptEvent.prompt();
    window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
});

//appinstalled event handler
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
