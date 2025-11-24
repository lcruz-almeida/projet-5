const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;
let magicTimeout;

// Cores mágicas
const colors = ['#ffd700', '#ff9a9e', '#a18cd1', '#ffffff', '#84fab0'];

// Função para tocar som
function playSound(audioId) {
    const audio = document.getElementById(audioId);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Erro ao tocar áudio: " + e));
    }
}

// Alternar tema
function toggleTheme() {
    body.classList.toggle('dark-mode');
    body.style.transition = 'background 1.5s ease, color 1.5s ease';
    setTimeout(() => { body.style.transition = ''; }, 1600);
}

// Abrir/fechar livro
function toggleBook() {
    isOpen = !isOpen;

    if (isOpen) {
        bookContainer.classList.add('open');

        // Sons das páginas
        const pageTurnDelay = 200;
        setTimeout(() => playSound('soundPage'), 300);
        setTimeout(() => playSound('soundPage'), 300 + pageTurnDelay);
        setTimeout(() => playSound('soundPage'), 300 + 2 * pageTurnDelay);

        // Partículas mágicas começam 0.8s depois da abertura
        magicTimeout = setTimeout(startMagic, 800);

    } else {
        bookContainer.classList.remove('open');
        clearTimeout(magicTimeout);
        stopMagic();
    }
}

// Criar partículas mágicas
function createParticle() {
    if (!isOpen) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 14 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `

}
