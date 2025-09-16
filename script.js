let timer = 0;
let score = 0;

let questions = [
    {
        question : "How do you write a single-line comment in JavaScript?",
        answers : [
            "// This is a comment",
            "/* This is a comment */",
            "# This is a comment",
            "-- This is a comment",
        ],
        correct : 0 
    },
    {
        question : "How do you write a multi-line comment in JavaScript?",
        answers : [
            "<code>/* This is a<br>multi-line comment */</code> ",
            "<code>// This is a <br> multi-line comment //</code>",
            "<code>/* This is a</code> <code> multi-line comment */</code>",
            "<code> <-- This is a <br> multi-line comment --> </code>",
        ],
        correct : 0 
    },
        {
        question : "Which of the following is a valid variable name in JavaScript?",
        answers : [
            "let 1stPlace",
            "let firstPlace",
            "let first-place",
            "let first place",
        ],
        correct : 1 
    },
    {
        question : "What will be the output of the following code: console.log(0x1a);?",
        answers : [
            "1a",
            "0x1a",
            "26",
            "10",
        ],
        correct : 2 
    },
    {
        question : "Which function is used to cast a non-Boolean value to a boolean value in JavaScript?",
        answers : [
            "CastBoolean()",
            "ToBoolean",
            "ConvertToBoolean()",
            "Boolean()",
        ],
        correct : 3
    },
    {
        question : "What will be the output of the following code: let error = 'An error occurred'; if (error) { console.log(error); }?",
        answers : [
            "An error occured",
            "true",
            "undefined",
            "false",
        ],
        correct : 0
    },

];


updateChrono = () => {
    document.getElementsByClassName("chrono")[0].innerHTML = `Time: ${timer}s`;
}

updateScore = () => {
    document.getElementsByClassName("score")[0].innerHTML = `Score: ${score}`;
}

startQuizz = () => {
    // remove Start Button
    document.getElementsByClassName("start-btn")[0].remove();
    showQuestions();
    showSubmit();
}
function showQuestions()  {
    questions.forEach((currentItem,questionIndex)=>{
        // create question div
        let questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.setAttribute('name',`question-${questionIndex}`);
        
        let questionText = document.createElement('div');
        questionText.textContent = currentItem.question;

        questionDiv.appendChild(questionText);
        document.getElementById('quizz').appendChild(questionDiv);
        // create options container
        let answersDiv = document.createElement('ul');
        answersDiv.innerHTML = currentItem.answers.map((answer,answerIndex)=>
            `<li>
                <input type="radio" name="question_${questionIndex}" value="${answer}">
                <label for="question_${questionIndex}">${answer}</label>
            </li>`
        ).join(' ');
        questionDiv.appendChild(answersDiv);
    });
}

function showResult(){
    
}

function showSubmit() {
    let submitBtn = document.createElement('button');
    submitBtn.className = 'submit-btn';
    submitBtn.value = "Valider";
    document.getElementById('quizz-container').appendChild(submitBtn);

    submitBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        showResult();
    })
}

startTimer = () => {
    setInterval(() => {
        timer++;
        updateChrono();
    }, 1000);
}
document.addEventListener ("DOMContentLoaded", (event) => {
    updateChrono();

    document.getElementsByClassName("start-btn")[0].onclick = () => {
        startQuizz();
        startTimer();
    }
});



