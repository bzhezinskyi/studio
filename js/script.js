// Завантаження курсів з JSON
async function loadCourses() {
    try {
        const response = await fetch('./data/course.json')
        const data = await response.json()
        renderCourses(data)
    } catch (error) {
        console.error('Помилка завантаження курсів:', error)
    }
}

// Генерування курсів у HTML
function renderCourses(coursesData) {
    const courseContainer = document.querySelector('.course__container')

    if (!courseContainer) return

    Object.values(coursesData).forEach((course) => {
        const details = document.createElement('details')
        details.className = 'course__details'

        const summary = document.createElement('summary')
        summary.className = 'course__subtitle'
        summary.innerHTML = `
    <svg class="course__arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
    </svg>
    <span>${course.name}</span>
`
        details.appendChild(summary)

        // Генеруємо вміст курсу
        course.details.forEach((section) => {
            const heading = document.createElement('h3')
            heading.className = 'course__txt--bold'
            heading.innerHTML = section.heading
            details.appendChild(heading)

            if (section.content && section.content.length > 0) {
                const list = document.createElement('ul')
                list.className = 'course__list'

                section.content.forEach((item) => {
                    const li = document.createElement('li')
                    li.className = 'course__txt'
                    li.innerHTML = item
                    list.appendChild(li)
                })

                details.appendChild(list)
            }

            // Додаємо кнопку, якщо вона вказана в JSON
            if (section.button) {
                const button = document.createElement('button')
                button.className = 'course__btn'
                button.textContent = section.button
                button.addEventListener('click', openModal) // Додаємо обробник для відкриття модального вікна
                details.appendChild(button)
            }
        })

        courseContainer.appendChild(details)
    })
}

// Завантажуємо курси при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadCourses)

document.getElementById('myButton').addEventListener('click', function () {
    alert('Привіт! Ти натиснув кнопку.')
})
