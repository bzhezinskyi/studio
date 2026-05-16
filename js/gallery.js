async function renderPhotoGallery() {
    const galleryContainer = document.querySelector('.gallery__container')
    if (!galleryContainer) return

    try {
        const response = await fetch('./data/photos.json')
        const galleryData = await response.json()

        // Видалити стовбець заголовку та інший вміст, залишити лише заголовок
        const title = galleryContainer.querySelector('.gallery__title')
        if (title) {
            galleryContainer.innerHTML = ''
            galleryContainer.appendChild(title)
        }

        // Обробити кожну категорію
        Object.values(galleryData).forEach((category) => {
            // Створити підзаголовок для категорії
            const subtitle = document.createElement('h3')
            subtitle.className = 'gallery__title'
            subtitle.textContent = category.heading
            galleryContainer.appendChild(subtitle)

            // Створити сітку галереї
            const grid = document.createElement('ul')
            grid.className = 'gallery__grid'
            grid.id = `gallery-${category.id}`

            // Додати зображення
            category.content.forEach((photoPath) => {
                const item = document.createElement('li')
                item.className = 'gallery__item'

                const img = document.createElement('img')
                img.className = 'gallery__img'
                img.src = photoPath
                img.alt = category.heading
                img.loading = 'lazy'

                item.appendChild(img)
                grid.appendChild(item)
            })

            galleryContainer.appendChild(grid)
        })
    } catch (error) {
        console.error('Помилка завантаження фото:', error)
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPhotoGallery)
} else {
    renderPhotoGallery()
}
