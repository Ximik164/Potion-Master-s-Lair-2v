
    document.addEventListener('DOMContentLoaded', function() {
        // Проверка существования всех элементов DOM
        const elements = {
            startScreen: document.getElementById('quiz-start'),
            questionsScreen: document.getElementById('quiz-questions'),
            resultsScreen: document.getElementById('quiz-results'),
            startButton: document.getElementById('start-quiz'),
            nextButton: document.getElementById('next-question'),
            restartButton: document.getElementById('restart-quiz'),
            questionElement: document.getElementById('question-text'),
            answersContainer: document.getElementById('answers-container'),
            currentQuestionElement: document.getElementById('current-question'),
            totalQuestionsElement: document.getElementById('total-questions'),
            currentScoreElement: document.getElementById('current-score'),
            finalScoreElement: document.getElementById('final-score'),
            maxScoreElement: document.getElementById('max-score'),
            resultMessageElement: document.getElementById('result-message')
        };

        // Проверка, что все элементы найдены
        for (const [key, element] of Object.entries(elements)) {
            if (!element) {
                console.error(`Элемент не найден: ${key}`);
                return;
            }
        }

        // Вопросы для викторины (сокращенный вариант для примера)
        const questions = [
            {
                question: "Какой ингредиент нужен для создания зелья регенерации?",
                answers: [
                    { text: "Светопыль", correct: false },
                    { text: "Огненный порошок", correct: false },
                    { text: "Глаз паука", correct: false },
                    { text: "Слеза гаста", correct: true }
                ]
            },
            {
                question: "Какое зелье получается при добавлении камня в грубое зелье?",
                answers: [
                    { text: "Зелье замедления", correct: false },
                    { text: "Зелье заражения", correct: true },
                    { text: "Зелье силы", correct: false },
                    { text: "Зелье урона", correct: false }
                ]
            },
            {
                question: "Какой ингредиент используется для создания зелья прыгучести?",
                answers: [
                    { text: "Светопыль", correct: false },
                    { text: "Лапка кролика", correct: true },
                    { text: "Перо", correct: false },
                    { text: "Слизь", correct: false }
                ]
            },
            {
                question: "Что произойдет, если добавить порох в зелье?",
                answers: [
                    { text: "Зелье станет взрывным", correct: true },
                    { text: "Зелье взорвётся", correct: false },
                    { text: "Зелье станет ядовитым", correct: false },
                    { text: "Зелье загорится", correct: false }
                ]
            },
            {
                question: "Какой эффект дает зелье замедленного падения?",
                answers: [
                    { text: "Игрок падает медленнее и не получает урон от падения", correct: true },
                    { text: "Игрок не может прыгать", correct: false },
                    { text: "Игрок ходит медленнее", correct: false },
                    { text: "Время замедляется вокруг игрока", correct: false }
                ]
            },
            {
                question: "Как создать зелье слабости?",
                answers: [
                    { text: "Приготовленный паучий глаз + грубое зелье", correct: true },
                    { text: "Огненный порошок + густое зелье", correct: false },
                    { text: "Сахар + грубое зелье", correct: false },
                    { text: "Паучий глаз + грубое зелье", correct: false }
                ]
            },
            {
                question: "Какой ингредиент превращает зелье исцеления в зелье урона?",
                answers: [
                    { text: "Приготовленный паучий глаз", correct: true },
                    { text: "Огненный порошок", correct: false },
                    { text: "Драконье дыхание", correct: false },
                    { text: "Иглобрюх", correct: false }
                ]
            },
            {
                question: "Какое зелье нужно для создания зелья ночного зрения?",
                answers: [
                    { text: "Грубое зелье", correct: true },
                    { text: "Зелье невидимости", correct: false },
                    { text: "Густое зелье", correct: false },
                    { text: "Непримечательное зелье", correct: false }
                ]
            },
            {
                question: "Какой эффект дает зелье подводного дыхания?",
                answers: [
                    { text: "Позволяет дышать под водой", correct: true },
                    { text: "Увеличивает скорость плавания", correct: false },
                    { text: "Делает игрока невидимым в воде", correct: false },
                    { text: "Защищает от мобов", correct: false }
                ]
            },
            {
                question: "Что делает зелье огнестойкости?",
                answers: [
                    { text: "Даёт иммунитет от огня и лавы", correct: true },
                    { text: "Дает иммунитет к адской жаре", correct: false },
                    { text: "Позволяет ходить по лаве", correct: false },
                    { text: "Делает игрока невосприимчивым к урону", correct: false }
                ]
            },
            {
                question: "Какой ингредиент используется для создания зелья невидимости?",
                answers: [
                    { text: "Золотая морковь", correct: false },
                    { text: "Приготовленный паучий глаз", correct: true },
                    { text: "Огненный порошок", correct: false },
                    { text: "Светопыль", correct: false }
                ]
            },
            {
                question: "Сколько нужно иметь одновременно эффектов для выполнения достижения энергетический коктель?",
                answers: [
                    { text: "33", correct: false },
                    { text: "27", correct: false },
                    { text: "15", correct: false },
                    { text: "17", correct: true }
                ]
            },
            {
                question: "Что нужно дать зомби после зелья слабости?",
                answers: [
                    { text: "Золотую морковь", correct: false },
                    { text: "Сверкающий ломтик арбуза", correct: false },
                    { text: "Зелье исцеление", correct: false },
                    { text: "Золотое яблоко", correct: true }
                ]
            }
        ];

        // Переменные викторины
        let shuffledQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        const questionsPerQuiz = 10;

        // Начать викторину
        elements.startButton.addEventListener('click', startQuiz);
        elements.restartButton.addEventListener('click', startQuiz);

        // Следующий вопрос
        elements.nextButton.addEventListener('click', nextQuestion);

        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questionsPerQuiz) {
                showQuestion();
            } else {
                showResults();
            }
        }

        function startQuiz() {
            console.log("Викторина запускается..."); // Отладочное сообщение
            
            shuffledQuestions = [...questions]
                .sort(() => Math.random() - 0.5)
                .slice(0, questionsPerQuiz);
            
            currentQuestionIndex = 0;
            score = 0;
            
            elements.currentScoreElement.textContent = score;
            elements.totalQuestionsElement.textContent = questionsPerQuiz;
            elements.maxScoreElement.textContent = questionsPerQuiz;
            
            elements.startScreen.classList.remove('active');
            elements.resultsScreen.classList.remove('active');
            elements.questionsScreen.classList.add('active');
            
            showQuestion();
        }

        function showQuestion() {
            resetState();
            const question = shuffledQuestions[currentQuestionIndex];
            
            elements.currentQuestionElement.textContent = currentQuestionIndex + 1;
            elements.currentScoreElement.textContent = score;
            elements.questionElement.textContent = question.question;
            
            question.answers.forEach(answer => {
                const button = document.createElement('div');
                button.classList.add('quiz-answer');
                button.textContent = answer.text;
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', selectAnswer);
                elements.answersContainer.appendChild(button);
            });
        }

        function resetState() {
            elements.nextButton.disabled = true;
            elements.answersContainer.innerHTML = '';
        }

        function selectAnswer(e) {
            const selectedButton = e.target;
            const correct = selectedButton.dataset.correct === 'true';
            
            if (correct) {
                selectedButton.classList.add('correct');
                score++;
                elements.currentScoreElement.textContent = score;
            } else {
                selectedButton.classList.add('incorrect');
                Array.from(elements.answersContainer.children).forEach(button => {
                    if (button.dataset.correct === 'true') {
                        button.classList.add('correct');
                    }
                });
            }
            
            Array.from(elements.answersContainer.children).forEach(button => {
                button.style.pointerEvents = 'none';
            });
            
            elements.nextButton.disabled = false;
        }

        function showResults() {
            elements.questionsScreen.classList.remove('active');
            elements.resultsScreen.classList.add('active');
            elements.finalScoreElement.textContent = score;
            
            const percentage = (score / questionsPerQuiz) * 100;
            let message = '';
            
            if (percentage >= 90) message = 'Превосходно! Вы настоящий мастер зельеварения!';
            else if (percentage >= 70) message = 'Очень хорошо! Вы отлично разбираетесь в зельях!';
            else if (percentage >= 50) message = 'Неплохо! Но есть куда расти в искусстве зельеварения.';
            else if (percentage >= 30) message = 'Нужно больше практики. Попробуйте изучить зелья еще раз!';
            else message = 'Похоже, вам придётся прикратить изучение зельеварения';
            
            elements.resultMessageElement.textContent = message;
        }
    });

// Показываем/скрываем кнопку "Наверх"
window.addEventListener('scroll', function () {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Плавный скролл наверх
document.querySelector('.scroll-to-top').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Закрываем меню на мобильных устройствах
            document.querySelector('.sidebar').classList.remove('active');
        }
    });
});

// Анимация при наведении на категории
document.querySelectorAll('.category, .category1').forEach(category => {
    category.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
    });

    category.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
});

// Мобильное меню
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(menuToggle);

    menuToggle.addEventListener('click', function () {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.sidebar') && !e.target.closest('.mobile-menu-toggle')) {
            document.querySelector('.sidebar').classList.remove('active');
        }
    });
});

// Подсветка активного раздела в меню при прокрутке
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('h2.categories-title');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Анимация загрузки
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Имитация загрузки изображений
document.querySelectorAll('img').forEach(img => {
    img.style.transition = 'opacity 0.5s ease';
    img.style.opacity = '0';

    const loadImage = new Image();
    loadImage.src = img.src;
    loadImage.onload = function () {
        img.style.opacity = '1';
    };
});

// Обновленный универсальный код для работы с модальными окнами
document.addEventListener('DOMContentLoaded', function() {
    // Открытие модальных окон при клике на элементы
    document.querySelectorAll('.category, .category1').forEach(category => {
        category.addEventListener('click', function() {
            const itemName = this.querySelector('h3').textContent.trim();
            openModal(itemName);
        });
    });

    // Закрытие модального окна при клике на крестик
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Переключение между вкладками
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const modal = this.closest('.modal');

            // Убираем активный класс у всех кнопок и вкладок
            modal.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            modal.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Добавляем активный класс текущей кнопке и вкладке
            this.classList.add('active');
            modal.querySelector(`#${tabId}-tab`).classList.add('active');
        });
    });



// Обновляем функцию openModal для новых достижений
function openModal(itemName) {
    let modalId = '';
    switch(itemName) {
        case 'Варочная стойка':
            modalId = 'brewingStandModal';
            break;
        case 'Приготовленный паучий глаз':
            modalId = 'fermentedSpiderEyeModal';
            break;
        case 'Грубое зелье':
            modalId = 'awkwardPotionModal';
            break;
        case 'Доктор для зомби':
            modalId = 'zombieDoctorModal';
            break;
        case 'Местный зельевар':
            modalId = 'localBreweryModal';
            break;
        case 'Энергетический коктейль':
            modalId = 'energyCocktailModal';
            break;
        case 'Невозможное возможно!':
            modalId = 'impossiblePossibleModal';
            break;
        case 'Котёл':
            modalId = 'cauldronModal';
            break;
        case 'Огненный порошок':
            modalId = 'blazePowderModal';
            break;
        case 'Колба':
            modalId = 'glassBottleModal';
            break;
        case 'Колба с водой':
            modalId = 'waterBottleModal';
            break;
        case 'Светопыль':
            modalId = 'glowstoneDustModal';
            break;
        case 'Нарост Нижнего мира':
            modalId = 'netherWartModal';
            break;
        case 'Редстоуновая пыль':
            modalId = 'redstoneDustModal';
            break;
        case 'Порох':
            modalId = 'gunpowderModal';
            break;
        case 'Варочная стойка':
            modalId = 'brewingStandModal';
            break;
        case 'Приготовленный паучий глаз':
            modalId = 'fermentedSpiderEyeModal';
            break;
        case 'Грубое зелье':
            modalId = 'awkwardPotionModal';
            break;
        case 'Доктор для зомби':
            modalId = 'zombieDoctorModal';
            break;
        case 'Драконье дыхание':
            modalId = 'dragonsBreathModal';
            break;
        case 'Сверкающий ломтик арбуза':
            modalId = 'glisteringMelonModal';
            break;
        case 'Огненный порошок)':
            modalId = 'blazePowderIngredientModal';
            break;
        case 'Паучий глаз':
            modalId = 'spiderEyeModal';
            break;
        case 'Слеза гаста':
            modalId = 'ghastTearModal';
            break;
        case 'Лавовый крем':
            modalId = 'magmaCreamModal';
            break;
        case 'Золотая морковь':
            modalId = 'goldenCarrotModal';
            break;
        case 'Иглобрюх':
            modalId = 'pufferfishModal';
            break;
        case 'Кроличья лапка':
            modalId = 'rabbitFootModal';
            break;
        case 'Мембрана фантома':
            modalId = 'phantomMembraneModal';
            break;
        case 'Черепаший панцирь':
            modalId = 'turtleShellModal';
            break;
        case 'Камень':
            modalId = 'stoneModal';
            break;
        case 'Блок слизи':
            modalId = 'slimeBlockModal';
            break;
        case 'Паутина':
            modalId = 'cobwebModal';
            break;
        case 'Стержень вихря':
            modalId = 'breezeRodModal';
            break;
        case 'Непримечательное зелье':
            modalId = 'mundanePotionModal';
            break;
        case 'Густое зелье':
            modalId = 'thickPotionModal';
            break;
        case 'Зелье слабости':
            modalId = 'weaknessPotionModal';
            break;
        case 'Зелье исцеления':
            modalId = 'healingPotionModal';
            break;
        case 'Зелье огнестойкости':
            modalId = 'fireResistancePotionModal';
            break;
        case 'Зелье регенерации':
            modalId = 'regenerationPotionModal';
            break;
        case 'Зелье силы':
            modalId = 'strengthPotionModal';
            break;
        case 'Зелье стремительности':
            modalId = 'swiftnessPotionModal';
            break;
        case 'Зелье ночного зрения':
            modalId = 'nightVisionPotionModal';
            break;
        case 'Зелье подводного дыхания':
            modalId = 'waterBreathingPotionModal';
            break;
        case 'Зелье медленного падения':
            modalId = 'slowFallingPotionModal';
            break;
        case 'Зелье черепашьей мощи':
            modalId = 'turtleMasterPotionModal';
            break;
        case 'Зелье прыгучести':
            modalId = 'leapingPotionModal';
            break;
        case 'Зелье отравления':
            modalId = 'poisonPotionModal';
            break;
        case 'Зелье невидимости':
            modalId = 'invisibilityPotionModal';
            break;
        case 'Зелье замедления':
            modalId = 'slownessPotionModal';
            break;
        case 'Зелье ветрового заряда':
            modalId = 'windChargingPotionModal';
            break;
        case 'Зелье плетения':
            modalId = 'weavingPotionModal';
            break;
        case 'Зелье слизистости':
            modalId = 'oozingPotionModal';
            break;
        case 'Зелье заражения':
            modalId = 'infestationPotionModal';
            break;
        case 'Зелье урона':
            modalId = 'harmingPotionModal';
            break;
        default:
            console.log('Модальное окно для "' + itemName + '" не найдено');
            return;
    }

    document.getElementById(modalId).style.display = 'block';
    const modal = document.getElementById(modalId);
    modal.querySelector('.tab-button').click();
}

});
