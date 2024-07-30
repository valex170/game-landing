document.addEventListener('DOMContentLoaded', () => {
    const posters = document.querySelectorAll('.poster');
    const nextButton = document.getElementById('next');
    const paginationContainer = document.querySelector('.pagination');
    let currentIndex = 0;

    // Медиа-запрос для проверки ширины экрана
    const mediaQuery = window.matchMedia('(max-width: 430px) and (min-width: 375px)');

    function updatePosters() {
        posters.forEach((poster, index) => {
            const position = (index - currentIndex + posters.length) % posters.length;
            
            if (mediaQuery.matches) {
                // Изменение стилей для экрана от 375 до 430 пикселей
                if (position === 0) {
                    poster.classList.add('active');
                    poster.classList.remove('behind');
                    poster.style.transform = `translateX(0)`;
                    poster.style.zIndex = 2;
                } else if (position === 1) {
                    poster.classList.remove('active');
                    poster.classList.remove('behind');
                    poster.style.transform = `translateX(60px) scale(0.9)`;
                    poster.style.zIndex = 1;
                } else if (position === 2) {
                    poster.classList.remove('active');
                    poster.classList.remove('behind');
                    poster.style.transform = `translateX(85px) scale(0.8)`;
                    poster.style.zIndex = 0;
                } else {
                    poster.classList.remove('active');
                    poster.classList.add('behind');
                    poster.style.transform = `translateX(1000px) scale(0.7)`;
                    poster.style.zIndex = -1;
                }
            } else {
                // Изменение стилей для экрана с шириной вне диапазона 375-430 пикселей
                if (position === 0) {
                    poster.classList.add('active');
                    poster.classList.remove('behind');
                    poster.style.transform = `translateX(0)`;
                    poster.style.zIndex = 2;
                } else if (position === 1) {
                    poster.classList.remove('active');
                    poster.classList.remove('behind');
                    poster.style.transform = `translateX(120px) scale(0.9)`;
                    poster.style.zIndex = 1;
                } else if (position === 2) {
                    poster.classList.remove('active');
                    poster.classList.remove('behind');
                    poster.style.transform = `translateX(170px) scale(0.8)`;
                    poster.style.zIndex = 0;
                } else {
                    poster.classList.remove('active');
                    poster.classList.add('behind');
                    poster.style.transform = `translateX(1000px) scale(0.7)`;
                    poster.style.zIndex = -1;
                }
            }
            
            poster.style.opacity = position < 3 ? '1' : '0';
        });

        updatePagination();
    }

    function showNextPoster() {
        currentIndex = (currentIndex + 1) % posters.length;
        updatePosters();
    }

    function showPoster(index) {
        currentIndex = index;
        updatePosters();
    }

    function createPagination() {
        posters.forEach((_, index) => {
            const button = document.createElement('button');
            button.classList.add('pagination-button');
            button.addEventListener('click', () => showPoster(index));
            paginationContainer.appendChild(button);
        });
    }

    function updatePagination() {
        const paginationButtons = document.querySelectorAll('.pagination-button');
        paginationButtons.forEach((button, index) => {
            button.classList.toggle('active', index === currentIndex);
        });
    }

    createPagination();
    updatePosters();
    nextButton.addEventListener('click', showNextPoster);

    // Добавляем слушатель событий на изменение размера экрана
    mediaQuery.addEventListener('change', updatePosters);
});
