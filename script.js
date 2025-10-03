// Aguarda o documento HTML ser completamente carregado antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA O MENU HAMBÚRGUER ---
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const menu = document.querySelector('.menu');

    if (menuHamburguer && menu) {
        // 1. LÓGICA PARA ABRIR/FECHAR O MENU COM O BOTÃO
        menuHamburguer.addEventListener('click', function() {
            menu.classList.toggle('ativo');
            this.classList.toggle('ativo');

            if (this.classList.contains('ativo')) {
                this.setAttribute('aria-label', 'Fechar menu');
            } else {
                this.setAttribute('aria-label', 'Abrir menu');
            }
        });

        // 2. LÓGICA PARA FECHAR O MENU AO CLICAR FORA (NOVA ADIÇÃO)
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = menu.contains(event.target);
            const isClickOnHamburguer = menuHamburguer.contains(event.target);
            const isMenuOpen = menu.classList.contains('ativo');

            // Se o menu está aberto e o clique foi fora do menu e do botão, fecha o menu
            if (isMenuOpen && !isClickInsideMenu && !isClickOnHamburguer) {
                menu.classList.remove('ativo');
                menuHamburguer.classList.remove('ativo');
                menuHamburguer.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }


    // --- LÓGICA PARA O CARROSSEL DO TOPO (HERO) ---
    const images = document.querySelectorAll('.carrossel-imagem .imagem-fundo');
    if (images.length > 0) {
        let currentIndexHero = 0;
        const intervalTime = 5000;

        function showNextImage() {
            images[currentIndexHero].classList.remove('active');
            currentIndexHero = (currentIndexHero + 1) % images.length;
            images[currentIndexHero].classList.add('active');
        }

        setInterval(showNextImage, intervalTime);
    }


    // --- LÓGICA PARA O CARROSSEL DE PROJETOS ---
    const carrosselProjetos = document.querySelector('.carrossel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (carrosselProjetos && prevBtn && nextBtn) {
        let items = [];
        let itemsVisible = 0;
        let currentIndexProjetos = 0;
        let isTransitioning = false;
        let originalItems = Array.from(carrosselProjetos.children);

        const getItemsVisible = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1100) return 2;
            return 3;
        };

        const updateCarrosselPosition = (animate = true) => {
            if (!animate) carrosselProjetos.classList.add('no-transition');
            
            const itemWidth = 100 / itemsVisible;
            const newTransform = -currentIndexProjetos * itemWidth;
            carrosselProjetos.style.transform = `translateX(${newTransform}%)`;
            
            if (!animate) {
                setTimeout(() => carrosselProjetos.classList.remove('no-transition'), 50);
            }
        };
    
        const setupCarousel = () => {
            itemsVisible = getItemsVisible();
            carrosselProjetos.innerHTML = ''; 
            originalItems.forEach(item => carrosselProjetos.appendChild(item.cloneNode(true)));

            let currentItems = Array.from(carrosselProjetos.children);
            const itemsToPrepend = currentItems.slice(-itemsVisible).map(item => item.cloneNode(true));
            const itemsToAppend = currentItems.slice(0, itemsVisible).map(item => item.cloneNode(true));
            carrosselProjetos.prepend(...itemsToPrepend);
            carrosselProjetos.append(...itemsToAppend);
            
            items = Array.from(carrosselProjetos.children);
            currentIndexProjetos = itemsVisible; 
            updateCarrosselPosition(false);
        };

        const shiftItems = (direction) => {
            if (isTransitioning) return;
            isTransitioning = true;
            
            carrosselProjetos.classList.remove('no-transition');
            currentIndexProjetos += direction;
            updateCarrosselPosition(true);
        };

        carrosselProjetos.addEventListener('transitionend', () => {
            if (currentIndexProjetos >= items.length - itemsVisible) {
                currentIndexProjetos = itemsVisible;
                updateCarrosselPosition(false);
            }
            if (currentIndexProjetos <= itemsVisible - 1) {
                currentIndexProjetos = items.length - (itemsVisible * 2);
                updateCarrosselPosition(false);
            }
            isTransitioning = false;
        });

        nextBtn.addEventListener('click', () => shiftItems(1));
        prevBtn.addEventListener('click', () => shiftItems(-1));
        
        setupCarousel();
        window.addEventListener('resize', setupCarousel);
    }
});