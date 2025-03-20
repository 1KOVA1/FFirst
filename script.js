// Дані для розкладу (легко змінювати)
const scheduleData = {
    week1: {
        times: ["08:30", "10:25", "12:20", "14:15"],
        days: {
            Понеділок: ["", "Основи цифрової схемотехніки", "Проектування інформаційних систем. Частина 2. Web-програмування (Лек)", ""],
            Вівторок: ["", "Проектування інформаційних систем. Частина 2. Web-програмування (Лаба)", "Основи цифрової схемотехніки (Прак)", "Робототехніка (Прак)"],
            Середа: ["", "Основи підприємницької діяльності", "Естетика промислового дизайну, Логіка (Прак)", "Технологічні вимірювання та прилади. Частина 2. Засоби вимірювання (Прак)"],
            Четвер: ["", "Проектування систем автоматизації (Лек)", "Метрологія(Лек)", "Метрологія(Прак)"],
            Пʼятниця: ["", "", "Проектування систем автоматизації (Прак)", "English"],
            Субота: ["", "", "", ""]
        }
    },
    week2: {
        times: ["08:30", "10:25", "12:20", "14:15"],
        days: {
            Понеділок: ["", "Основи цифрової схемотехніки (Лек)", "Проектування інформаційних систем. Частина 2. Web-програмування (Лек)", ""],
            Вівторок: ["", "Проектування інформаційних систем. Частина 2. Web-програмування (Лек)", "Основи цифрової схемотехніки (Прак)", "Робототехніка (Лаба-!!!)"],
            Середа: ["Основи підприємницької діяльності", "Ефективна презентація, Логіка, Візуалізація даних (Прак)", "Технологічні вимірювання та прилади. Частина 2. Засоби вимірювання (Лек)", "Технологічні вимірювання та прилади. Частина 2. Засоби вимірювання (Лаб)"],
            Четвер: ["Робототехніка (Лекція)", "Проектування систем автоматизації (Лек)", "Метрологія(Лек)", "Метрологія(Прак)"],
            Пʼятниця: ["", "Екологічна безпека інженерної діяльності (Прак)", "Проектування систем автоматизації (Прак)", "English"],
            Субота: ["", "", "", ""]
        }
    }
};

// Функція для створення розкладу
function createSchedule(weekData, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    const times = weekData.times;
    const days = weekData.days;

    times.forEach((time, index) => {
        const row = document.createElement("tr");
        const timeCell = document.createElement("td");
        timeCell.textContent = time;
        row.appendChild(timeCell);

        Object.values(days).forEach(day => {
            const cell = document.createElement("td");
            cell.textContent = day[index];
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
} 

// Функція для визначення поточного тижня
function getCurrentWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}
// Показуємо поточний тиждень
function showCurrentWeek() {
    const weekIndicator = document.getElementById('week-indicator');
    const currentWeek = getCurrentWeek();
    weekIndicator.textContent = `Зараз ${currentWeek} тиждень`;

    // Підсвічуємо поточний тиждень
    document.getElementById(`week${currentWeek}`).classList.add('current-week');
}

// Функція для підсвітки поточного предмета
function highlightCurrentClass() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (неділя) - 6 (субота)
    const hours = today.getHours();
    const minutes = today.getMinutes();

    if (dayOfWeek >= 1 && dayOfWeek <= 6) { // З понеділка по суботу
        const currentWeek = getCurrentWeek();
        const rows = document.querySelectorAll(`#week${currentWeek} table tbody tr`);

        rows.forEach(row => {
            const timeCell = row.cells[0];
            const timeText = timeCell.textContent.trim(); // Отримуємо текст часу та видаляємо зайві пробіли

            // Перевіряємо, чи час вказано у правильному форматі (наприклад, "08:30 - 10:25")
            if (timeText && timeText.includes(' - ')) {
                const [startTime, endTime] = timeText.split(' - ');
                const [startHour, startMinute] = startTime.split(':').map(Number);
                const [endHour, endMinute] = endTime.split(':').map(Number);

                // Перевіряємо, чи поточний час потрапляє в інтервал заняття
                if (hours > startHour || (hours === startHour && minutes >= startMinute)) {
                    if (hours < endHour || (hours === endHour && minutes <= endMinute)) {
                        row.cells[dayOfWeek].classList.add('active-class');
                    }
                }
            }
        });
    }
}

// Запускаємо функції при завантаженні сторінки
window.onload = function () {
    createSchedule(scheduleData.week1, 'week1-body');
    createSchedule(scheduleData.week2, 'week2-body');
    showCurrentWeek();
    highlightCurrentClass(); // Додано виклик функції для підсвітки
};
