// Модальне вікно для запису
const modal = document.getElementById('modal')
const closeBtn = document.querySelector('.modal__close')

// Функція для відкриття модального вікна
function openModal() {
    modal.style.display = 'block'
    // Додаємо стан в історію для обробки кнопки назад
    history.pushState({ modalOpen: true }, '')
}

// Функція для закриття модального вікна
function closeModal() {
    modal.style.display = 'none'
    // Очищаємо стан, якщо він є
    if (history.state && history.state.modalOpen) {
        history.replaceState(null, '')
    }
}

// Спроба відкрити додаток, з fallback на веб-лінк
function openDeepLink(event) {
    event.preventDefault()
    const appUrl = this.dataset.app
    const webUrl = this.dataset.web || this.href

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (isMobile && appUrl) {
        window.location = appUrl
        setTimeout(() => {
            window.location = webUrl
        }, 800)
    } else {
        window.location = webUrl
    }

    closeModal()
}

const appLinks = document.querySelectorAll('.modal__btn--modal[data-app]')
appLinks.forEach((link) => link.addEventListener('click', openDeepLink))

// Обробка кнопки назад браузера
window.addEventListener('popstate', (event) => {
    if (modal.style.display === 'block') {
        closeModal()
    }
})

// Закриття при кліку на хрестик
closeBtn.addEventListener('click', closeModal)

// Закриття при кліку поза модальним вікном
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal()
    }
})

// Закриття при натисканні клавіші Escape
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal()
    }
})

// Обробка кнопок варіантів запису - видалено, оскільки тепер це посилання
