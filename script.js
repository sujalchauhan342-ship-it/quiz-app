const questions = [
    {
        question: "Which language is used to structure a web page?",
        answers: [
            { text: "HTML", correct: true },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "C++", correct: false }
        ]
    },

    {
        question: "Which language is mainly used to add interactivity to websites?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style System", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to create a link?",
        answers: [
            { text: "<p>", correct: false },
            { text: "<img>", correct: false },
            { text: "<a>", correct: true },
            { text: "<linker>", correct: false }
        ]
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "@", correct: false }
        ]
    },

    {
        question: "Which method is used to print something in the JavaScript console?",
        answers: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "write.console()", correct: false },
            { text: "log.console()", correct: false }
        ]
    },

    {
        question: "Which keyword declares a constant in JavaScript?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: true },
            { text: "constant", correct: false }
        ]
    },

    {
        question: "Which data type represents true or false?",
        answers: [
            { text: "String", correct: false },
            { text: "Number", correct: false },
            { text: "Boolean", correct: true },
            { text: "Object", correct: false }
        ]
    },

    {
        question: "Which HTML element is used for the largest heading?",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<heading>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<head>", correct: false }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    scoreElement.textContent = "Score: 0";

    nextButton.textContent = "Next";

    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}


function showQuestion() {

    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1}/${questions.length}`;

    questionElement.textContent = currentQuestion.question;


    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer.text;

        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });
}


function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}


function selectAnswer(event) {

    const selectedButton = event.target;

    const isCorrect =
        selectedButton.dataset.correct === "true";


    if (isCorrect) {

        selectedButton.classList.add("correct");

        score++;

        scoreElement.textContent = `Score: ${score}`;

    } else {

        selectedButton.classList.add("wrong");

    }


    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;

    });


    nextButton.style.display = "block";
}


nextButton.addEventListener("click", () => {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


function showResult() {

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    finalScore.textContent =
        `${score}/${questions.length}`;


    if (score === 10) {

        resultMessage.textContent =
            "Excellent! Perfect score! 🔥";

    } else if (score >= 7) {

        resultMessage.textContent =
            "Great job! Keep learning! 👏";

    } else if (score >= 5) {

        resultMessage.textContent =
            "Good effort! You can improve! 💪";

    } else {

        resultMessage.textContent =
            "Keep practicing and try again! 📚";

    }

}


restartButton.addEventListener("click", startQuiz);


startQuiz();