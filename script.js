let timelimit = 5;
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
 * Disable or enable next button depending on enabled 
 * @param {boolean} enabled 
 */
function togglenext(enabled) {
    document.getElementsByClassName('next')[0].disabled = !enabled;
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
//

updateScore = () => {
    document.getElementsByClassName("score")[0].innerHTML = `Score: ${score} / ${questions.length}`;
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


    questionNode.innerText = quizQ[index].question;
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

    togglenext(true);
    var time = timelimit
    timeUpdater = setInterval(() => {
        updateTimer(time);
        time = (time * 100 - 0.01 * 100) / 100;
    }, 10);

    questionTimer = setTimeout(() => {
        clearInterval(timeUpdater);
        if(index == quizQ.length-1) {
            // showResult();
            console.log("last question");
        }else{

            showNextQuestion(++index, quizQ);
        }
    }, timelimit * 1000);
}


function startQuizz(userdata, theme) {
    // remove Start Button
    document.getElementsByClassName("start-btn")[0].remove();
    let userQuiz = data.find((item) => item.theme == "syntax");
    shuffleArray(userQuiz.questions);
    showNext();
    showNextQuestion(0, userQuiz.questions);
}

function handleNext() {
    toggleOptions(false);
    // togglenext(false);
    // showResult();
    // Repeat();
}


function showNext() {
    let nextBtn = document.createElement('button');
    nextBtn.className = 'next btn';
    nextBtn.textContent = "Suivant";
    document.getElementById('quizz-container').appendChild(nextBtn);

    nextBtn.addEventListener("click", handleNext);
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


document.addEventListener("DOMContentLoaded", (event) => {
    toggleStartQuiz((document.getElementById('username').value !== ''));
    showAvailaibleThemes(data);
    document.getElementById('username').addEventListener('keyup', (event) => {
        toggleStartQuiz((event.target.value !== ''));
    })
    document.getElementsByClassName("start-btn")[0].onclick = () => {
        const username = document.getElementById('username').value;
        let activeUser = loadUserData(username);
        let theme = document.getElementById('themes').value;
        startQuizz(activeUser, theme);
    }
});



