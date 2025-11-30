const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;
let magicTimeout;
let fireInterval = null;
let lumiereInterval = null;


// Cores mágicas para partículas
const colors = ['#ffd700', '#ff9a9e', '#a18cd1', '#ffffff', '#84fab0'];

// FUNÇÃO PARA TOCAR SOM
function playSound(audioId) {
    const audio = document.getElementById(audioId);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Erro de áudio: " + e));
    }
}

// Alternar tema (dark/light)
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

        // NÃO iniciar partículas automaticamente!
        // magicTimeout = setTimeout(startMagic, 500); // removido
    } else { 
        bookContainer.classList.remove('open'); 
        clearTimeout(magicTimeout); 
        stopMagic(); 
    }
 }
    
// BUTTON PARTICULES
function createParticle() {
    if (!isOpen) return; // só cria partículas se o livro estiver aberto

    const particle = document.createElement('div');
    particle.classList.add('particle');

    // tamanho aleatório
    const size = Math.random() * 12 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // cores mágicas
    const currentColors = body.classList.contains('dark-mode')
        ? ['#ffffff', '#cfcfcf', '#a0a0ff', '#ffd700', '#e0e0ff']
        : colors;

    const color = currentColors[Math.floor(Math.random() * currentColors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;

    // posição inicial: centro da lombada
   const origin = document.getElementById('particleOrigin').getBoundingClientRect();
   const startX = origin.left + origin.width / 2;
   const startY = origin.top + origin.height / 2;




    // trajetórias aleatórias
    const tx = (Math.random() - 0.5) * 120;
    const txEnd = (Math.random() - 0.5) * 700;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--tx-end', `${txEnd}px`);

    // animação
    const duration = Math.random() * 2 + 2;
    particle.style.animation = `floatUp ${duration}s ease-out forwards`;

    // adiciona ao body
    document.body.appendChild(particle);

    // remove automaticamente após animação
    setTimeout(() => particle.remove(), duration * 1000);
}


let particlesActive = false;

function rainbowParticles() {
    if (!isOpen) return; // Só funciona se o livro estiver aberto

    if (!particlesActive) {
        startMagic();
        particlesActive = true;
    } else {
        stopMagic();
        particlesActive = false;
    }
}

function startMagic() {
    stopMagic();
    for (let i = 0; i < 100; i++) setTimeout(createParticle, i * 15);
    particleInterval = setInterval(createParticle, 15);
}

function stopMagic() {
    if (particleInterval) clearInterval(particleInterval);
}

// BUTTON VENT
function flyPages() {
    const pages = document.querySelectorAll('.page:not(.front-cover):not(.back-cover)');

    pages.forEach((page, i) => {
        setTimeout(() => {
            const flyingPage = page.cloneNode(true);
            const rect = page.getBoundingClientRect();

            flyingPage.style.position = 'absolute';
            flyingPage.style.left = `${rect.left}px`;
            flyingPage.style.top = `${rect.top}px`;
            flyingPage.style.width = `${rect.width}px`;
            flyingPage.style.height = `${rect.height}px`;
            flyingPage.style.zIndex = 1000;
            flyingPage.style.pointerEvents = 'none';
            flyingPage.style.transition = 'transform 4s ease-out, opacity 4s ease-out';

            document.body.appendChild(flyingPage);

            // Trajetória aleatória simulando vento
            const endX = (Math.random() - 0.5) * window.innerWidth * 2;
            const endY = (Math.random() - 0.5) * window.innerHeight * 2;
            const rotateX = (Math.random() - 0.5) * 1080;
            const rotateY = (Math.random() - 0.5) * 1080;

            requestAnimationFrame(() => {
                flyingPage.style.transform = `translate(${endX}px, ${endY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                flyingPage.style.opacity = 0;
            });

            setTimeout(() => flyingPage.remove(), 4000);
        }, i * 100);
    });
}

// BUTTON SECOUER
function shakeBook() {
    if (!isOpen) toggleBook();
    bookContainer.classList.add('shake');
    setTimeout(() => bookContainer.classList.remove('shake'), 500);
}



// BUTTON FEU
function spawnFire() {
    const rect = bookContainer.getBoundingClientRect();

    // Criar uma chama
    const flame = document.createElement("div");
    flame.classList.add("fire");

    // Posição inicial: centro do livro
    const startX = rect.left + rect.width / 2 - 10 + (Math.random() * 20 - 10);
    const startY = rect.top + rect.height / 2 + 30 + (Math.random() * 20 - 10);

    flame.style.left = `${startX}px`;
    flame.style.top = `${startY}px`;

    // Tamanho aleatório para variedade
    const size = Math.random() * 12 + 6;
    flame.style.width = `${size}px`;
    flame.style.height = `${size}px`;

    document.body.appendChild(flame);

    // Remover após animação
    setTimeout(() => flame.remove(), 1200);
}

// Função para começar o fogo
function startFire() {
    if (fireInterval) return;
    fireInterval = setInterval(spawnFire, 80);
}

// Função para parar o fogo
function stopFire() {
    clearInterval(fireInterval);
    fireInterval = null;
}

function toggleFire() {
    if (fireInterval) stopFire();
    else startFire();
}



function resetBook() {
    // Fecha o livro
    isOpen = false;
    bookContainer.classList.remove('open');

    // DESATIVAR SEMPRE o dark mode
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
    }

    // Para partículas mágicas
    if (typeof stopMagic === "function") stopMagic();

    // Para fogo
    if (typeof stopFire === "function") stopFire();

    // Para Lumière
    if (lumiereInterval) {
        clearInterval(lumiereInterval);
        lumiereInterval = null;
    }

    // Remove TODAS as partículas do ecrã
    document.querySelectorAll('.particle, .fire, .lumiere-particle').forEach(el => el.remove());
}



