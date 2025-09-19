let timelimit = 20;
let score = 0;
let chronoStart = 20;
let questionTimer;
let timeUpdater;


let data = [
    {
        theme: "syntax",
        questions:
            [
                {
                    question: "How do you write a single-line comment in JavaScript?",
                    answers: [
                        "// This is a comment",
                        "/* This is a comment */",
                        "# This is a comment",
                        "-- This is a comment",
                    ],
                    correct: [0, 1],
                },
                {
                    question: "How do you write a multi-line comment in JavaScript?",
                    answers: [
                        "<code>/* This is a<br>multi-line comment */</code> ",
                        "<code>// This is a <br> multi-line comment //</code>",
                        "<code>/* This is a</code> <code> multi-line comment */</code>",
                        "<code> <-- This is a <br> multi-line comment --> </code>",
                    ],
                    correct: [0],
                },
                {
                    question: "Which of the following is a valid variable name in JavaScript?",
                    answers: [
                        "let 1stPlace",
                        "let firstPlace",
                        "let first-place",
                        "let first place",
                    ],
                    correct: [1]
                }
            ]
    },
    {
        theme: 'number',
        questions:
            [
                {
                    question: "What will be the output of the following code: console.log(0x1a);?",
                    answers: [
                        "1a",
                        "0x1a",
                        "26",
                        "10",
                    ],
                    correct: [2]
                }
            ]

    },
    {
        theme: 'boolean',
        questions:
            [
                {
                    question: "Which function is used to cast a non-Boolean value to a boolean value in JavaScript?",
                    answers: [
                        "CastBoolean()",
                        "ToBoolean",
                        "ConvertToBoolean()",
                        "Boolean()",
                    ],
                    correct: [3],
                },
                {
                    question: "What will be the output of the following code: let error = 'An error occurred'; if (error) { console.log(error); }?",
                    answers: [
                        "An error occured",
                        "true",
                        "undefined",
                        "false",
                    ],
                    correct: [0]
                }
            ]
    }
];

// helpers 
/**
 * this function is used to shuffle an array .
 * @param {Array} array : the array to shuffle 
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Enable or disable next button depending on disabled 
 * @param {boolean} disabled 
 */
function toggleNext(disabled) {
    document.getElementById('next-btn').disabled = disabled;
}

/**
 * Disable or enable unchecked input options 
 * @param {boolean} enabled - boolean value {true : show / false : hide}
 */
function toggleOptions(enabled) {
    let options = document.querySelectorAll(`input[type="checkbox"], input[type="radio"]:not(checked)`);
    options.forEach((answerOption) => {
        answerOption.disabled = !enabled;
    });
}

/**
 * Disable or enable start Quiz Button
 * @param {boolean} enabled 
 */
function toggleStartQuiz(enabled) {
    document.getElementsByClassName('start-btn')[0].disabled = !enabled;
}

/**
 * 
 * @param {array} arr1 
 * @param {array} arr2 
 * @returns true if the arrays contains same elements(order doesn't matter),false otherwise 
 */
function areArraysEqualUnordered(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    const sortedArr1 = [...arr1].sort(); // Create copies to avoid modifying original arrays
    const sortedArr2 = [...arr2].sort();

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }
    return true;
}

//

updateScore = () => {
    document.getElementsByClassName("score")[0].innerHTML = `Score: ${score} / ${userQuiz.questions.length}`;
}

startTimer = () => {

}

updateTimer = (time) => {
    document.getElementsByClassName("chrono")[0].innerHTML = `Timer : ${time.toFixed(2)}s`;
}

// create DOM structure 
let currentQuestionFragment = new DocumentFragment();
let questionNode = document.createElement('div');
questionNode.className = 'question';
let answersNode = document.createElement('div');
answersNode.className = 'answers container';



function showNextQuestion(index, quizQ) {
    // Remove last question DOM Text
    answersNode.replaceChildren();
    currentQuestionFragment.replaceChildren();
    // Insert empty Nodes
    currentQuestionFragment.appendChild(questionNode);
    currentQuestionFragment.appendChild(answersNode);

    questionNode.setAttribute('data-index', index);
    questionNode.innerText =  `Question ${index+1} of ${quizQ.length} ${quizQ[index].question}`;
    if (quizQ[index].correct.length > 1) {
        let multiAnswers = document.createElement('div');
        multiAnswers.style.fontStyle = 'italic';
        multiAnswers.innerText = `Plusieurs réponses sont possibles`;
        answersNode.prepend(multiAnswers);
    }
    quizQ[index].answers.forEach((answer, answerIndex) => {
        let answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answersNode.appendChild(answerDiv);


        let optionInput = document.createElement('li');


        if (quizQ[index].correct.length > 1) {

            optionInput.innerHTML = `<input type='checkbox' name='question_${index}' value=${answerIndex}>
                                     ${answer} </input>`

        } else {
            optionInput.innerHTML = `<input type='radio' name='question_${index}' value=${answerIndex}>
                                     ${answer} </input>`
        }

        answerDiv.appendChild(optionInput);
        answersNode.appendChild(answerDiv);
    })
    currentQuestionFragment.appendChild(answersNode);
    document.getElementById('quizz').appendChild(currentQuestionFragment);

    toggleNext(false);
    var time = timelimit
    timeUpdater = setInterval(() => {
        updateTimer(time);
        time = (time * 100 - 0.01 * 100) / 100;
    }, 10);

    questionTimer = setTimeout(() => {
        clearInterval(timeUpdater);
        if (index == quizQ.length - 1) {
            finishQuiz();
        } else {
            showNextQuestion(++index, quizQ);
        }
    }, timelimit * 1000);
}


function startQuizz(theme) {
    // Initialize quiz data
    score = 0;
    currentQuizData = {
        date: new Date().toISOString(),
        score: 0,
        answers: [],
        theme: theme
    };

    // remove Start Button
    document.getElementsByClassName("start-btn")[0].remove();
    userQuiz = data.find((item) => item.theme == theme);
    shuffleArray(userQuiz.questions);

    // Initialize answers array with correct length
    for (let i = 0; i < userQuiz.questions.length; i++) {
        currentQuizData.answers.push({
            selected: [],
            correct: false
        });
    }

    showNext();
    showNextQuestion(0, userQuiz.questions);
    updateScore();
}

function handleNext() {
    clearTimeout(questionTimer);
    clearInterval(timeUpdater);

    toggleOptions(false);
    toggleNext(true);
    evaluateAnswer();

    let currentIndex = parseInt(questionNode.dataset['index']);

    // Check if this was the last question
    if (currentIndex >= userQuiz.questions.length - 1) {
        finishQuiz();
    } else {
        // Move to next question after a short delay
        setTimeout(() => {
            showNextQuestion(currentIndex + 1, userQuiz.questions);
            toggleNext(false);
            toggleOptions(true);
        }, 1500);
    }
}


function showNext() {
    let nextBtn = document.createElement('button');
    nextBtn.id = 'next-btn';
    nextBtn.textContent = "Suivant";
    document.getElementById('quizz-container').appendChild(nextBtn);

    nextBtn.addEventListener("click", handleNext);
}

function evaluateAnswer() {
    let selectedOptions = [];
    let questionIndex = parseInt(questionNode.dataset['index']);
    let currentQuestion = userQuiz.questions[questionIndex];

    // Initialize answer object if not exists
    if (!currentQuizData.answers[questionIndex]) {
        currentQuizData.answers[questionIndex] = {
            selected: [],
            correct: false
        };
    }

    if (currentQuestion.correct.length < 2) {
        // Single choice question (radio buttons)
        let option = answersNode.querySelector(`input[name=question_${questionIndex}]:checked`);
        console.log(option);

        let selectedOption = (option == undefined) ? null : parseInt(option.value);
        console.log(selectedOption);

        currentQuizData.answers[questionIndex].selected = selectedOption !== null ? [selectedOption] : [];

        if (selectedOption !== null && selectedOption == currentQuestion.correct[0]) {
            currentQuizData.answers[questionIndex].correct = true;
            score++;
            markCorrectAnswer(option);
        } else {
            currentQuizData.answers[questionIndex].correct = false;
            if (option) {
                markIncorrectAnswer(option);
            }
        }
    } else {
        // Multiple choice question (checkboxes)
        let checkedOptions = answersNode.querySelectorAll(`input[name=question_${questionIndex}]:checked`);
        selectedOptions = Array.from(checkedOptions).map(option => parseInt(option.value));

        currentQuizData.answers[questionIndex].selected = selectedOptions;

        // Check if selected answers match correct answers
        let isCorrect = areArraysEqualUnordered(selectedOptions, currentQuestion.correct);
        currentQuizData.answers[questionIndex].correct = isCorrect;

        if (isCorrect) {
            score++;
            // Mark all selected options as correct
            checkedOptions.forEach(option => markCorrectAnswer(option));
        } else {
            // Mark selected options as incorrect
            checkedOptions.forEach(option => markIncorrectAnswer(option));
        }
    }

    updateScore();
}

function markCorrectAnswer(nodeElem) {
    nodeElem.parentNode.parentNode.classList.add('correct')
}

function markIncorrectAnswer(nodeElem) {
    nodeElem.parentNode.parentNode.classList.add('incorrect')
}

function finishQuiz() {
    // Update final score in currentQuizData
    currentQuizData.score = score;

    // Add quiz data to activeUser history
    if (!activeUser.history) {
        activeUser.history = [];
    }
    activeUser.history.push(currentQuizData);

    // Update user data in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userIndex = users.findIndex(user => user.username === activeUser.username);
    if (userIndex !== -1) {
        users[userIndex] = activeUser;
    } else {
        users.push(activeUser);
    }
    localStorage.setItem('users', JSON.stringify(users));

    // Display final results
    document.getElementById('quizz').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h2>🎉 Quiz Completed!</h2>
            <div class="score" style="font-size: 2rem; margin: 1rem 0;">
                Final Score: ${score} / ${userQuiz.questions.length}
            </div>
            <p style="font-size: 1.2rem; color: #6b7280;">
                ${score === userQuiz.questions.length ? 'Perfect score! 🌟' :
            score >= userQuiz.questions.length * 0.7 ? 'Great job! 👏' :
                'Keep practicing! 💪'}
            </p>
            <button class="start-btn" onclick="location.reload()" style="margin-top: 1rem;">
                Take Another Quiz
            </button>
        </div>
    `;

    // Remove next button if it exists
    let nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.remove();
    }

    console.log('Quiz completed and saved to localStorage:', currentQuizData);
    console.log('Updated user data:', activeUser);
}


function Repeat() {
    let repeatBtn = document.createElement('button');
    repeatBtn.className = 'repeat btn';
    repeatBtn.innerText = 'Rejouer';
    repeatBtn.addEventListener('click', (event) => {
        event.preventDefault();
        score = 0;
        toggleOptions(true)
    });
    repeatBtn.after(document.getElementsByClassName('next')[0]);
}

function showResult() {
    questions.forEach((currentItem, questionIndex) => {
        let selectedOption = document.querySelectorAll(`input[name='question_${questionIndex}']:checked`);
        if (selectedOption.value == currentItem.correct) {
            score++;
        }
    });
}

/**
 * Get The availaible themes from an array of objects and make select options in DOM
 * @param {array} data - the array of questions
 */
function showAvailaibleThemes(data) {
    let themes = new Set(data.map((item) => item.theme));

    for (const theme of themes) {
        let option = new Option(theme, theme, false, false);
        document.getElementById('themes').add(option);
    }
}

/**
 * 
 * @param {string} username 
 * @returns user data object {name , history}
 */
function loadUserData(username) {
    let activeUser = { username: username };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length == 0) {
        users.push(activeUser);
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        let found = users.find((user) => user.username == username);
        if (found == undefined) {
            users.push(activeUser);
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            activeUser = found;
        }
    }
    return activeUser;
}

let activeUser;
let userQuiz = [];
let currentQuizData = {
    date: new Date().toISOString(),
    score: 0,
    answers: [],
    theme: ""
};

document.addEventListener("DOMContentLoaded", (event) => {
    toggleStartQuiz((document.getElementById('username').value !== ''));
    showAvailaibleThemes(data);
    document.getElementById('username').addEventListener('keyup', (event) => {
        toggleStartQuiz((event.target.value !== ''));
    })
    document.getElementsByClassName("start-btn")[0].onclick = () => {
        const username = document.getElementById('username').value;
        activeUser = loadUserData(username);
        let theme = document.getElementById('themes').value;
        startQuizz(theme);
    }
});



