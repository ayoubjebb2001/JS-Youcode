let timer = 0;
let score = 0;
let counterInterval;

let questions = [
    [
        { theme: "syntax" },
        {
            question: "How do you write a single-line comment in JavaScript?",
            answers: [
                "// This is a comment",
                "/* This is a comment */",
                "# This is a comment",
                "-- This is a comment",
            ],
            correct: 0
        },
        {
            question: "How do you write a multi-line comment in JavaScript?",
            answers: [
                "<code>/* This is a<br>multi-line comment */</code> ",
                "<code>// This is a <br> multi-line comment //</code>",
                "<code>/* This is a</code> <code> multi-line comment */</code>",
                "<code> <-- This is a <br> multi-line comment --> </code>",
            ],
            correct: 0
        },
        {
            question: "Which of the following is a valid variable name in JavaScript?",
            answers: [
                "let 1stPlace",
                "let firstPlace",
                "let first-place",
                "let first place",
            ],
            correct: 1
        }
    ],
    [
        {
            theme: 'number'
        },
        {
            question: "What will be the output of the following code: console.log(0x1a);?",
            answers: [
                "1a",
                "0x1a",
                "26",
                "10",
            ],
            correct: 2
        }],
    [
        {
            theme: 'boolean'
        },
        {
            question: "Which function is used to cast a non-Boolean value to a boolean value in JavaScript?",
            answers: [
                "CastBoolean()",
                "ToBoolean",
                "ConvertToBoolean()",
                "Boolean()",
            ],
            correct: 3
        },
        {
            question: "What will be the output of the following code: let error = 'An error occurred'; if (error) { console.log(error); }?",
            answers: [
                "An error occured",
                "true",
                "undefined",
                "false",
            ],
            correct: 0
        }
    ]
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
 * Disable or enable Submit button depending on enabled 
 * @param {boolean} enabled 
 */
function toggleSubmit(enabled) {
    document.getElementsByClassName('submit')[0].disabled = !enabled;
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


updateChrono = () => {
    document.getElementsByClassName("chrono")[0].innerHTML = `Time: ${timer.toFixed(2)}s`;
}

updateScore = () => {
    document.getElementsByClassName("score")[0].innerHTML = `Score: ${score} / ${questions.length}`;
}

function showQuestions() {
    // create question div
    let questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.setAttribute('name', `question-${questionIndex}`);

    let questionText = document.createElement('div');
    questionText.textContent = currentItem.question;

    questionDiv.appendChild(questionText);
    document.getElementById('quizz').appendChild(questionDiv);
    // create options container
    let answersDiv = document.createElement('ul');
    answersDiv.innerHTML = currentItem.answers.map((answer, answerIndex) =>
        `<li>
                <input type="radio" name="question_${questionIndex}" value="${answerIndex}">
                <label for="question_${questionIndex}">${answer}</label>
            </li>`
    ).join(' ');
    questionDiv.appendChild(answersDiv);
}

startQuizz = () => {
    // remove Start Button
    document.getElementsByClassName("start-btn")[0].remove();
    showQuestions();
    showSubmit();
}

function handleSubmit() {
    clearInterval(counterInterval);
    toggleOptions(false);
    toggleSubmit(false);
    showResult();
    Repeat();
}


function showSubmit() {
    let submitBtn = document.createElement('button');
    submitBtn.className = 'submit btn';
    submitBtn.textContent = "Valider";
    document.getElementById('quizz-container').appendChild(submitBtn);

    submitBtn.addEventListener("click", handleSubmit);
}



startTimer = () => {
    counterInterval = setInterval(() => {
        timer = (timer * 100 + 0.1 * 100) / 100;
        updateChrono();
    }, 100);
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
    repeatBtn.after(document.getElementsByClassName('submit')[0]);
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
    let themes = new Set(data.map((item) => item[0].theme));
    
    for (const theme of themes) {
        let option = new Option(theme,theme,false,false);    
        document.getElementById('themes').add(option);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    toggleStartQuiz((document.getElementById('username').value !== ''));
    updateChrono();
    showAvailaibleThemes(questions);
    document.getElementById('username').addEventListener('keyup',(event)=>{
        toggleStartQuiz((event.target.value !== ''));
    })
    document.getElementsByClassName("start-btn")[0].onclick = () => {
        startQuizz();
        startTimer();
    }
});



