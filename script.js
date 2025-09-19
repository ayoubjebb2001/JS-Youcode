let timelimit = 20;
let score = 0;
let chronoStart = 20;
let questionTimer;
let timeUpdater;
let activeUser;
let userQuiz = [];
let currentQuizData = {
    date: new Date().toISOString(),
    score: 0,
    answers: [],
    theme: ""
};


let data = [
    {
        theme: "syntax",
        questions: [
            {
                question: "How do you write a single-line comment in JavaScript?",
                answers: [
                    "// This is a comment",
                    "/* This is a comment */",
                    "# This is a comment",
                    "-- This is a comment",
                ],
                correct: [0],
            },
            {
                question: "How do you write a multi-line comment in JavaScript?",
                answers: [
                    "/* This is a multi-line comment */",
                    "// This is a multi-line comment //",
                    "<!-- This is a multi-line comment -->",
                    "# This is a multi-line comment #",
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
            },
            {
                question: "Which keyword is used to declare a constant in JavaScript?",
                answers: [
                    "var",
                    "let",
                    "const",
                    "final",
                ],
                correct: [2]
            },
            {
                question: "What is the correct syntax for a JavaScript function?",
                answers: [
                    "function = myFunction() {}",
                    "function myFunction() {}",
                    "create myFunction() {}",
                    "def myFunction() {}",
                ],
                correct: [1]
            },
            {
                question: "How do you create an array in JavaScript?",
                answers: [
                    "var arr = (1, 2, 3)",
                    "var arr = [1, 2, 3]",
                    "var arr = {1, 2, 3}",
                    "var arr = 1, 2, 3",
                ],
                correct: [1]
            },
            {
                question: "Which operator is used for strict equality in JavaScript?",
                answers: [
                    "==",
                    "===",
                    "=",
                    "!=",
                ],
                correct: [1]
            },
            {
                question: "How do you write a for loop in JavaScript?",
                answers: [
                    "for (i = 0; i <= 5; i++)",
                    "for i = 1 to 5",
                    "for (i <= 5; i++)",
                    "for (i = 0; i <= 5)",
                ],
                correct: [0]
            },
            {
                question: "What is the correct way to write a JavaScript object?",
                answers: [
                    "var obj = (name: 'John', age: 30)",
                    "var obj = {name: 'John', age: 30}",
                    "var obj = [name: 'John', age: 30]",
                    "var obj = name: 'John', age: 30",
                ],
                correct: [1]
            },
            {
                question: "Which method is used to add an element to the end of an array?",
                answers: [
                    "add()",
                    "append()",
                    "push()",
                    "insert()",
                ],
                correct: [2]
            },
            {
                question: "How do you access the first element of an array named 'arr'?",
                answers: [
                    "arr[1]",
                    "arr[0]",
                    "arr.first()",
                    "arr.get(0)",
                ],
                correct: [1]
            },
            {
                question: "What is the correct syntax for an if statement in JavaScript?",
                answers: [
                    "if i == 5 then",
                    "if (i == 5)",
                    "if i = 5",
                    "if i === 5 then",
                ],
                correct: [1]
            }
        ]
    },
    {
        theme: 'numbers',
        questions: [
            {
                question: "What will be the output of the following code: console.log(0x1a);?",
                answers: [
                    "1a",
                    "0x1a",
                    "26",
                    "10",
                ],
                correct: [2]
            },
            {
                question: "What is the result of 5 + '5' in JavaScript?",
                answers: [
                    "10",
                    "'55'",
                    "NaN",
                    "Error",
                ],
                correct: [1]
            },
            {
                question: "What does Number.isNaN(NaN) return?",
                answers: [
                    "true",
                    "false",
                    "undefined",
                    "NaN",
                ],
                correct: [0]
            },
            {
                question: "What is the result of Math.floor(4.7)?",
                answers: [
                    "4",
                    "5",
                    "4.7",
                    "Error",
                ],
                correct: [0]
            },
            {
                question: "What does parseInt('10.5') return?",
                answers: [
                    "10.5",
                    "10",
                    "11",
                    "NaN",
                ],
                correct: [1]
            },
            {
                question: "What is the maximum safe integer in JavaScript?",
                answers: [
                    "Number.MAX_VALUE",
                    "Number.MAX_SAFE_INTEGER",
                    "Infinity",
                    "9007199254740991",
                ],
                correct: [1, 3]
            },
            {
                question: "What does Math.random() return?",
                answers: [
                    "A random integer",
                    "A random number between 0 and 1",
                    "A random number between 1 and 10",
                    "A random boolean",
                ],
                correct: [1]
            },
            {
                question: "What is the result of 10 / 0 in JavaScript?",
                answers: [
                    "0",
                    "undefined",
                    "Infinity",
                    "Error",
                ],
                correct: [2]
            },
            {
                question: "What does Number('123abc') return?",
                answers: [
                    "123",
                    "NaN",
                    "Error",
                    "'123abc'",
                ],
                correct: [1]
            },
            {
                question: "What is the result of Math.ceil(4.1)?",
                answers: [
                    "4",
                    "5",
                    "4.1",
                    "Error",
                ],
                correct: [1]
            },
            {
                question: "Which method converts a number to a string?",
                answers: [
                    "toString()",
                    "String()",
                    "valueOf()",
                    "Both toString() and String()",
                ],
                correct: [3]
            },
            {
                question: "What is the result of 0.1 + 0.2 in JavaScript?",
                answers: [
                    "0.3",
                    "0.30000000000000004",
                    "0.30000000000000000",
                    "Error",
                ],
                correct: [1]
            }
        ]
    },
    {
        theme: 'boolean',
        questions: [
            {
                question: "Which function is used to cast a non-Boolean value to a boolean value in JavaScript?",
                answers: [
                    "CastBoolean()",
                    "ToBoolean()",
                    "ConvertToBoolean()",
                    "Boolean()",
                ],
                correct: [3],
            },
            {
                question: "What will be the output of the following code: let error = 'An error occurred'; if (error) { console.log(error); }?",
                answers: [
                    "An error occurred",
                    "true",
                    "undefined",
                    "false",
                ],
                correct: [0]
            },
            {
                question: "What is the result of Boolean(0)?",
                answers: [
                    "true",
                    "false",
                    "0",
                    "undefined",
                ],
                correct: [1]
            },
            {
                question: "Which of the following values is falsy in JavaScript?",
                answers: [
                    "[]",
                    "{}",
                    "''",
                    "'false'",
                ],
                correct: [2]
            },
            {
                question: "What does !!'hello' return?",
                answers: [
                    "true",
                    "false",
                    "'hello'",
                    "undefined",
                ],
                correct: [0]
            },
            {
                question: "Which values are falsy in JavaScript?",
                answers: [
                    "false, 0, '', null, undefined, NaN",
                    "false, 0, [], {}, null, undefined",
                    "false, 0, '', 'false', null, undefined",
                    "false, 0, '', null, undefined",
                ],
                correct: [0]
            },
            {
                question: "What is the result of Boolean([])?",
                answers: [
                    "true",
                    "false",
                    "undefined",
                    "Error",
                ],
                correct: [0]
            },
            {
                question: "What does the && operator return if the first operand is falsy?",
                answers: [
                    "true",
                    "false",
                    "The first operand",
                    "The second operand",
                ],
                correct: [2]
            },
            {
                question: "What is the result of true && false?",
                answers: [
                    "true",
                    "false",
                    "undefined",
                    "Error",
                ],
                correct: [1]
            },
            {
                question: "What does the || operator return if the first operand is truthy?",
                answers: [
                    "true",
                    "false",
                    "The first operand",
                    "The second operand",
                ],
                correct: [2]
            },
            {
                question: "What is the result of null == undefined?",
                answers: [
                    "true",
                    "false",
                    "null",
                    "undefined",
                ],
                correct: [0]
            },
            {
                question: "What is the result of null === undefined?",
                answers: [
                    "true",
                    "false",
                    "null",
                    "undefined",
                ],
                correct: [1]
            }
        ]
    },
    {
        theme: 'arrays',
        questions: [
            {
                question: "Which method adds one or more elements to the end of an array?",
                answers: [
                    "append()",
                    "push()",
                    "add()",
                    "insert()",
                ],
                correct: [1]
            },
            {
                question: "Which method removes the last element from an array?",
                answers: [
                    "remove()",
                    "delete()",
                    "pop()",
                    "shift()",
                ],
                correct: [2]
            },
            {
                question: "What does the map() method return?",
                answers: [
                    "The original array",
                    "A new array with transformed elements",
                    "The first element",
                    "undefined",
                ],
                correct: [1]
            },
            {
                question: "Which method finds the first element that satisfies a condition?",
                answers: [
                    "filter()",
                    "find()",
                    "search()",
                    "locate()",
                ],
                correct: [1]
            },
            {
                question: "What does [1, 2, 3].length return?",
                answers: [
                    "2",
                    "3",
                    "4",
                    "undefined",
                ],
                correct: [1]
            },
            {
                question: "Which method creates a new array with all elements that pass a test?",
                answers: [
                    "map()",
                    "filter()",
                    "find()",
                    "reduce()",
                ],
                correct: [1]
            },
            {
                question: "What does the slice() method do?",
                answers: [
                    "Modifies the original array",
                    "Returns a shallow copy of a portion of an array",
                    "Removes elements from an array",
                    "Adds elements to an array",
                ],
                correct: [1]
            },
            {
                question: "Which method joins all elements of an array into a string?",
                answers: [
                    "concat()",
                    "join()",
                    "toString()",
                    "stringify()",
                ],
                correct: [1]
            },
            {
                question: "What does the indexOf() method return if the element is not found?",
                answers: [
                    "0",
                    "-1",
                    "null",
                    "undefined",
                ],
                correct: [1]
            },
            {
                question: "Which method reverses the elements of an array in place?",
                answers: [
                    "reverse()",
                    "flip()",
                    "invert()",
                    "backward()",
                ],
                correct: [0]
            },
            {
                question: "What does the reduce() method do?",
                answers: [
                    "Reduces the array size",
                    "Executes a reducer function for each element and returns a single value",
                    "Removes duplicate elements",
                    "Sorts the array",
                ],
                correct: [1]
            },
            {
                question: "Which method checks if at least one element passes a test?",
                answers: [
                    "every()",
                    "some()",
                    "includes()",
                    "contains()",
                ],
                correct: [1]
            }
        ]
    },
    {
        theme: 'objects',
        questions: [
            {
                question: "How do you access the property 'name' of an object 'person'?",
                answers: [
                    "person->name",
                    "person.name",
                    "person[name]",
                    "person::name",
                ],
                correct: [1]
            },
            {
                question: "Which method returns an array of an object's property names?",
                answers: [
                    "Object.keys()",
                    "Object.values()",
                    "Object.entries()",
                    "Object.properties()",
                ],
                correct: [0]
            },
            {
                question: "How do you add a new property to an object?",
                answers: [
                    "obj.newProp = value",
                    "obj['newProp'] = value",
                    "Object.assign(obj, {newProp: value})",
                    "All of the above",
                ],
                correct: [3]
            },
            {
                question: "What does Object.values() return?",
                answers: [
                    "An array of property names",
                    "An array of property values",
                    "An array of key-value pairs",
                    "The object itself",
                ],
                correct: [1]
            },
            {
                question: "How do you check if an object has a specific property?",
                answers: [
                    "obj.hasProperty('prop')",
                    "obj.hasOwnProperty('prop')",
                    "obj.contains('prop')",
                    "obj.includes('prop')",
                ],
                correct: [1]
            },
            {
                question: "What does the 'this' keyword refer to in an object method?",
                answers: [
                    "The global object",
                    "The object that owns the method",
                    "undefined",
                    "The parent object",
                ],
                correct: [1]
            },
            {
                question: "Which method creates a new object with the specified prototype?",
                answers: [
                    "Object.create()",
                    "Object.new()",
                    "Object.prototype()",
                    "Object.make()",
                ],
                correct: [0]
            },
            {
                question: "How do you delete a property from an object?",
                answers: [
                    "remove obj.prop",
                    "delete obj.prop",
                    "obj.prop = null",
                    "obj.remove('prop')",
                ],
                correct: [1]
            },
            {
                question: "What does Object.freeze() do?",
                answers: [
                    "Makes an object immutable",
                    "Stops object execution",
                    "Copies an object",
                    "Serializes an object",
                ],
                correct: [0]
            },
            {
                question: "Which method copies properties from source objects to a target object?",
                answers: [
                    "Object.copy()",
                    "Object.assign()",
                    "Object.merge()",
                    "Object.extend()",
                ],
                correct: [1]
            },
            {
                question: "What is the result of {} == {}?",
                answers: [
                    "true",
                    "false",
                    "undefined",
                    "Error",
                ],
                correct: [1]
            },
            {
                question: "How do you iterate over all properties of an object?",
                answers: [
                    "for...in loop",
                    "Object.keys().forEach()",
                    "for...of loop with Object.entries()",
                    "All of the above",
                ],
                correct: [3]
            }
        ]
    },
    {
        theme: 'functions',
        questions: [
            {
                question: "What is a function declaration?",
                answers: [
                    "var func = function() {}",
                    "function func() {}",
                    "const func = () => {}",
                    "func = function() {}",
                ],
                correct: [1]
            },
            {
                question: "What is an arrow function?",
                answers: [
                    "function() => {}",
                    "() => {}",
                    "=> function() {}",
                    "function => () {}",
                ],
                correct: [1]
            },
            {
                question: "What does the 'arguments' object contain?",
                answers: [
                    "Function parameters",
                    "All arguments passed to a function",
                    "Function return value",
                    "Function name",
                ],
                correct: [1]
            },
            {
                question: "Which method calls a function with a given 'this' value?",
                answers: [
                    "call()",
                    "apply()",
                    "bind()",
                    "Both call() and apply()",
                ],
                correct: [3]
            },
            {
                question: "What does a function return if no return statement is used?",
                answers: [
                    "null",
                    "undefined",
                    "0",
                    "''",
                ],
                correct: [1]
            },
            {
                question: "What is a closure?",
                answers: [
                    "A function inside another function",
                    "A function that has access to outer scope variables",
                    "A function that returns another function",
                    "A function with no parameters",
                ],
                correct: [1]
            },
            {
                question: "What is the difference between call() and apply()?",
                answers: [
                    "No difference",
                    "call() takes arguments individually, apply() takes an array",
                    "apply() takes arguments individually, call() takes an array",
                    "call() is faster than apply()",
                ],
                correct: [1]
            },
            {
                question: "What does bind() return?",
                answers: [
                    "The function result",
                    "A new function with bound 'this'",
                    "undefined",
                    "The original function",
                ],
                correct: [1]
            },
            {
                question: "What is a higher-order function?",
                answers: [
                    "A function that calls itself",
                    "A function that takes or returns other functions",
                    "A function with many parameters",
                    "A function that runs slowly",
                ],
                correct: [1]
            },
            {
                question: "What is function hoisting?",
                answers: [
                    "Functions are moved to the top of their scope",
                    "Functions are executed immediately",
                    "Functions are cached",
                    "Functions are optimized",
                ],
                correct: [0]
            },
            {
                question: "What happens to 'this' in an arrow function?",
                answers: [
                    "It refers to the global object",
                    "It refers to the function itself",
                    "It inherits 'this' from the enclosing scope",
                    "It is undefined",
                ],
                correct: [2]
            },
            {
                question: "What is an IIFE?",
                answers: [
                    "Immediately Invoked Function Expression",
                    "Internal Interface Function Expression",
                    "Inherited Instance Function Expression",
                    "Interactive Inline Function Expression",
                ],
                correct: [0]
            }
        ]
    },
    {
        theme: 'promises',
        questions: [
            {
                question: "What is a Promise in JavaScript?",
                answers: [
                    "A guarantee that code will run",
                    "An object representing eventual completion of an async operation",
                    "A synchronous function",
                    "A type of variable",
                ],
                correct: [1]
            },
            {
                question: "What are the three states of a Promise?",
                answers: [
                    "pending, resolved, rejected",
                    "pending, fulfilled, rejected",
                    "waiting, completed, failed",
                    "new, running, finished",
                ],
                correct: [1]
            },
            {
                question: "Which method is used to handle a resolved Promise?",
                answers: [
                    "catch()",
                    "then()",
                    "finally()",
                    "resolve()",
                ],
                correct: [1]
            },
            {
                question: "Which method is used to handle a rejected Promise?",
                answers: [
                    "then()",
                    "catch()",
                    "finally()",
                    "reject()",
                ],
                correct: [1]
            },
            {
                question: "What does Promise.all() do?",
                answers: [
                    "Resolves when all promises resolve",
                    "Resolves when any promise resolves",
                    "Rejects when all promises reject",
                    "Runs promises sequentially",
                ],
                correct: [0]
            },
            {
                question: "What does async/await do?",
                answers: [
                    "Makes asynchronous code look synchronous",
                    "Makes code run faster",
                    "Prevents errors",
                    "Creates promises",
                ],
                correct: [0]
            },
            {
                question: "What keyword is used with async functions to wait for promises?",
                answers: [
                    "wait",
                    "await",
                    "pause",
                    "then",
                ],
                correct: [1]
            },
            {
                question: "What does Promise.race() return?",
                answers: [
                    "The fastest promise to complete",
                    "All promises when they complete",
                    "The slowest promise to complete",
                    "An array of all promise results",
                ],
                correct: [0]
            },
            {
                question: "How do you create a resolved Promise?",
                answers: [
                    "Promise.resolve(value)",
                    "new Promise(resolve => resolve(value))",
                    "Promise.create(value)",
                    "Both Promise.resolve(value) and new Promise(resolve => resolve(value))",
                ],
                correct: [3]
            },
            {
                question: "What happens if you don't catch a rejected Promise?",
                answers: [
                    "Nothing happens",
                    "The program crashes",
                    "An unhandled promise rejection warning/error occurs",
                    "The promise resolves automatically",
                ],
                correct: [2]
            },
            {
                question: "Can you use await without async?",
                answers: [
                    "Yes, always",
                    "No, never",
                    "Only in modules",
                    "Only at the top level in modules",
                ],
                correct: [3]
            },
            {
                question: "What does finally() do in a Promise chain?",
                answers: [
                    "Runs only when the promise resolves",
                    "Runs only when the promise rejects",
                    "Runs regardless of promise outcome",
                    "Runs before then() and catch()",
                ],
                correct: [2]
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
    questionNode.innerText = `Question ${index + 1} of ${quizQ.length} ${quizQ[index].question}`;
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
    userQuiz.questions=userQuiz.questions.splice(0,10);

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

        let selectedOption = (option == undefined) ? null : parseInt(option.value);

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

    displayFinalResults();


    // Remove next button if it exists
    let nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.remove();
    }

    console.log('Quiz completed and saved to localStorage:', currentQuizData);
    console.log('Updated user data:', activeUser);
}


function displayFinalResults() {
    document.querySelector('.chrono').innerText = '';

    // Generate corrections HTML
    let correctionsHtml = '';
    userQuiz.questions.forEach((question, index) => {
        const userAnswer = currentQuizData.answers[index];
        const isCorrect = userAnswer.correct;

        // Get answer text for selected answers
        const selectedAnswerTexts = userAnswer.selected.map(idx => question.answers[idx]).join(', ');
        const correctAnswerTexts = question.correct.map(idx => question.answers[idx]).join(', ');

        correctionsHtml += `
            <div style="margin: 1rem 0; padding: 1rem; border-radius: 0.5rem; background: ${isCorrect ? '#f0fdf4' : '#fef2f2'}; border: 1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'};">
                <h4 style="margin: 0 0 0.5rem 0; color: #374151;">Question ${index + 1}: ${question.question}</h4>
                ${!isCorrect ? `
                    <p style="margin: 0.25rem 0; color: #dc2626;">
                        <strong>❌ Your answer:</strong> ${selectedAnswerTexts || 'No answer selected'}
                    </p>
                ` : ''}
                <p style="margin: 0.25rem 0; color: ${isCorrect ? '#059669' : '#dc2626'};">
                    <strong>${isCorrect ? '✅' : '✅'} Correct answer:</strong> ${correctAnswerTexts}
                </p>
            </div>
        `;
    });

    document.getElementById('quizz').innerHTML = `
        <div style="padding: 2rem;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2>🎉 Quiz Completed!</h2>
                <div class="score" style="font-size: 2rem; margin: 1rem 0;">
                    Final Score: ${score} / ${userQuiz.questions.length}
                </div>
                <p style="font-size: 1.2rem; color: #6b7280;">
                    ${score === userQuiz.questions.length ? 'Perfect score! 🌟' :
            score >= userQuiz.questions.length * 0.7 ? 'Great job! 👏' :
                'Keep practicing! 💪'}
                </p>
            </div>
            
            <div style="margin: 2rem 0;">
                <h3 style="text-align: center; color: #374151; margin-bottom: 1rem;">📋 Quiz Corrections</h3>
                ${correctionsHtml}
            </div>
            
            <div style="text-align: center;">
                <button class="restart-btn" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; font-size: 1rem; cursor: pointer;">
                    Take Another Quiz
                </button>
            </div>
        </div>
    `;

    document.querySelector('.restart-btn').addEventListener('click', restartQuiz);
}

function restartQuiz() {
    activeUser = {

    };
    userQuiz = [];
    currentQuizData = {
        date: '',
        score: 0,
        answers: [],
        theme: ""
    };

    document.querySelector('.score').innerText = '';
    document.getElementById('username').value = "";
    document.getElementById('username').setAttribute('placeholder', 'enter your username');
    document.getElementById('themes').replaceChildren();

    var startButton = document.createElement('button');
    startButton.classList.add('start-btn');
    startButton.innerText = 'Start';
    document.getElementById('quizz').replaceChildren(startButton);

    mainMenu();
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


function mainMenu() {
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

}

document.addEventListener("DOMContentLoaded", mainMenu);



