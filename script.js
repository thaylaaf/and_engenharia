document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todas as imagens do carrossel
    const images = document.querySelectorAll('.carrossel-imagem .imagem-fundo');
    
    // Define o índice da imagem atualmente visível
    let currentIndex = 0;
    
    // Define o intervalo de tempo para a troca de imagens (em milissegundos)
    const intervalTime = 5000; // 5 segundos

    function showNextImage() {
        // Remove a classe 'active' da imagem atual, fazendo-a desaparecer
        images[currentIndex].classList.remove('active');
        
        // Calcula o índice da próxima imagem, voltando ao início se chegar ao fim
        currentIndex = (currentIndex + 1) % images.length;
        
        // Adiciona a classe 'active' à próxima imagem, fazendo-a aparecer
        images[currentIndex].classList.add('active');
    }

    // Inicia o carrossel automático
    setInterval(showNextImage, intervalTime);
});


document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.querySelector('.carrossel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let items = Array.from(carrossel.children);
    const itemsVisible = 3; // Quantidade de itens visíveis em tela cheia
    let currentIndex = itemsVisible; // Começamos nos primeiros itens reais
    let isTransitioning = false;

    const setupCarousel = () => {
        // 1. Clonar itens para o efeito infinito
        const itemsToPrepend = items.slice(-itemsVisible).map(item => item.cloneNode(true));
        const itemsToAppend = items.slice(0, itemsVisible).map(item => item.cloneNode(true));

        carrossel.prepend(...itemsToPrepend);
        carrossel.append(...itemsToAppend);

        // 2. Atualizar a lista de itens para incluir os clones
        items = Array.from(carrossel.children);
        
        // 3. Posicionar o carrossel no início dos itens "reais" (sem animação)
        carrossel.classList.add('no-transition');
        updateCarrosselPosition();
        
        // Força o navegador a aplicar o estilo antes de remover a classe
        setTimeout(() => {
            carrossel.classList.remove('no-transition');
        }, 50);
    };

    const updateCarrosselPosition = () => {
        const itemWidth = 100 / itemsVisible;
        const newTransform = -currentIndex * itemWidth;
        carrossel.style.transform = `translateX(${newTransform}%)`;
    };

    const shiftItems = (direction) => {
        if (isTransitioning) return;
        isTransitioning = true;
        
        carrossel.classList.remove('no-transition');

        // Mover para o próximo ou anterior
        currentIndex += direction;
        updateCarrosselPosition();
    };

    // Evento que "escuta" o fim da animação de transição
    carrossel.addEventListener('transitionend', () => {
        // Se chegamos nos clones do final...
        if (currentIndex >= items.length - itemsVisible) {
            carrossel.classList.add('no-transition');
            currentIndex = itemsVisible; // Volta para os primeiros itens reais
            updateCarrosselPosition();
        }

        // Se chegamos nos clones do início...
        if (currentIndex <= itemsVisible - 1) {
            carrossel.classList.add('no-transition');
            // Volta para os últimos itens reais
            currentIndex = items.length - (itemsVisible * 2);
            updateCarrosselPosition();
        }
        
        isTransitioning = false;
    });

    // Adiciona os eventos de clique
    nextBtn.addEventListener('click', () => shiftItems(1));
    prevBtn.addEventListener('click', () => shiftItems(-1));
    
    // Inicia o carrossel
    setupCarousel();
});

document.addEventListener('DOMContentLoaded', function() {
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const menu = document.querySelector('.menu');

    menuHamburguer.addEventListener('click', function() {
        // Alterna a classe 'ativo' no menu e no botão
        menu.classList.toggle('ativo');
        this.classList.toggle('ativo');

        // Atualiza o aria-label para acessibilidade
        if (this.classList.contains('ativo')) {
            this.setAttribute('aria-label', 'Fechar menu');
        } else {
            this.setAttribute('aria-label', 'Abrir menu');
        }
    });
});