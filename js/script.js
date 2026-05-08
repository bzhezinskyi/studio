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
        summary.textContent = course.name

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
        })

        courseContainer.appendChild(details)
    })
}

// Завантажуємо курси при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadCourses)

document.getElementById('myButton').addEventListener('click', function () {
    alert('Привіт! Ти натиснув кнопку.')
})
