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
