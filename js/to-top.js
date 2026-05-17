const backToTopBtn = document.getElementById('backToTop')

// Відстежуємо скрол сторінки
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('back-to-top--show')
    } else {
        backToTopBtn.classList.remove('back-to-top--show')
    }
})

// Плавне підняття вгору при кліку
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // Забезпечує плавний рух сторінки замість різкого стрибка
    })
})
