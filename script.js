const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;
let magicTimeout;

function playSound(audioId) {
  const audio = document.getElementById(audioId);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Erreur de lecture audio : " + e));
  }
}

function toggleTheme() {
  body.classList.toggle('dark-mode');
  body.style.transition = 'background 1.5s ease, color 1.5s ease';
  setTimeout(() => { body.style.transition = ''; }, 1600);
}

function toggleBook() {
  isOpen = !isOpen;
  if (isOpen) {
    bookContainer.classList.add('open');
    const pageTurnDelay = 200;
    setTimeout(() => { playSound('soundPage'); }, 300);
    setTimeout(() => { playSound('soundPage'); }, 300 + pageTurnDelay);
    setTimeout(() => { playSound('soundPage'); }, 300 + 2 * pageTurnDelay);
    magicTimeout = setTimeout(startMagic, 2200);
  } else {
    bookContainer.classList.remove('open');
    clearTimeout(magicTimeout);
    stopMagic();
  }
}

function createParticle() {
  if (!isOpen) return;

  const particle = document.createElement('div');
  particle.classList.add('particle');

  const size = Math.random() * 14 + 5; 
  let colors;
  if (body.classList.contains('dark-mode')) {
    colors = ['#ffffff', '#cfcfcf', '#a0a0ff', '#ffd700', '#e0e0ff'];
  } else {
    colors = ['#ffd700', '#ff9a9e', '#a18cd1', '#ffffff', '#ffb6c1'];
  }
  const color = colors[Math.floor(Math.random() * colors.length)];
  particle.style.background = color;
  particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;

  const rect = bookContainer.getBoundingClientRect();
  const startX = rect.left + rect.width/2;
  const startY = rect.top + rect.height/2 + (Math.random() * 150 - 75);
  particle.style.left = `${startX}px`;
  particle.style.top = `${startY}px`;

  const tx = (Math.random() - 0.5) * 120;
  const txEnd = (Math.random() - 0.5) * 700;
  particle.style.setProperty('--tx', `${tx}px`);
  particle.style.setProperty('--tx-end', `${txEnd}px`);

  const duration = Math.random() * 2 + 2;
  particle.style.animation = `floatUp ${duration}s ease-out forwards`;

  document.body.appendChild(particle);
  setTimeout(() => { particle.remove(); }, duration * 1000);
}

function startMagic() {
  stopMagic();
  for(let i = 0; i < 70; i++) setTimeout(createParticle, i * 25); 
  particleInterval = setInterval(createParticle, 20); 
}

function stopMagic() {
  if (particleInterval) clearInterval(particleInterval);
}

function flyPages() {
  // Seleciona apenas as páginas internas, excluindo capa e contracapa
  const pages = document.querySelectorAll('.page:not(.front-cover):not(.back-cover)');
  
  pages.forEach((page, i) => {
    setTimeout(() => {
      const flyingPage = page.cloneNode(true);
      flyingPage.style.position = 'absolute';
      flyingPage.style.left = `${page.getBoundingClientRect().left}px`;
      flyingPage.style.top = `${page.getBoundingClientRect().top}px`;
      flyingPage.style.width = `${page.offsetWidth}px`;
      flyingPage.style.height = `${page.offsetHeight}px`;
      flyingPage.style.transition = 'transform 3s ease-out, opacity 3s ease-out';
      flyingPage.style.zIndex = 1000;

      document.body.appendChild(flyingPage);

      // Posição final aleatória (simula vento)
      const endX = (Math.random() - 0.5) * window.innerWidth;
      const endY = -Math.random() * window.innerHeight;

      requestAnimationFrame(() => {
        flyingPage.style.transform = `translate(${endX}px, ${endY}px)`;
        flyingPage.style.opacity = 0;
      });

      setTimeout(() => flyingPage.remove(), 3000);

    }, i * 100);
  });
}


