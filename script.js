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
            "/* This is a \nmulti-line comment */",
            "// This is a \nmulti-line comment //",
            "/* This is a\tmulti-line comment */",
            "<!-- This is a \n multi-line comment -->",
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

]

updateChrono = () => {
    document.getElementsByClassName("chrono")[0].innerHTML = `Time: ${timer}s`;
}

updateScore = () => {
    document.getElementsByClassName("score")[0].innerHTML = `Score: ${score}`;
}

showNextQuestion = () => {
    

}


startQuizz = () => {
    // remove Start Button
    document.getElementsByClassName("start-btn")[0].remove();
    // show question div
    let questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    showQuestions();
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



