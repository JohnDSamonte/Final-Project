const quizData = [
    {
        question: "What energy converts wind into electricity?",
        options: [
            "Solar Power",
            "Wind Energy",
            "Hydropower",
            "Biomass"
        ],
        correct: 1
    },
    {
        question: "Which energy source is renewable?",
        options: [
            "Coal",
            "Solar Power",
            "Natural Gas",
            "Nuclear"
        ],
        correct: 1
    },
    {
        question: "What energy comes from flowing water?",
        options: [
            "Biomass",
            "Hydropower",
            "Natural Gas",
            "Geothermal"
        ],
        correct: 1
    },
    {
        question: "Which energy source uses heat from the Earth?",
        options: [
            "Solar Power",
            "Geothermal",
            "Wind Energy",
            "Biomass"
        ],
        correct: 1
    },
    {
        question: "What is the cleanest energy source?",
        options: [
            "Nuclear",
            "Solar Power",
            "Natural Gas",
            "Oil"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContent = document.getElementById("myQuiz");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
const quizSection = document.getElementById("quiz");
const resultsSection = document.getElementById("results");
const restartButton = document.getElementById("restart");

function displayQuestion() {
    if (!quizData[currentQuestionIndex]) {
        console.error("Invalid question index:", currentQuestionIndex);
        return;
    }

    const questionData = quizData[currentQuestionIndex];
    quizContent.innerHTML = `
        <div class="question">${questionData.question}</div>
        <ul class="options">
            ${questionData.options.map((option, index) => 
                `<li><button class="option-btn" data-index="${index}">${option}</button></li>`
            ).join("")}
        </ul>
    `;

    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = true;
    submitButton.disabled = currentQuestionIndex !== quizData.length - 1;

    // Attach event listeners to buttons AFTER rendering
    document.querySelectorAll(".option-btn").forEach(button => {
        button.addEventListener("click", function () {
            checkAnswer(parseInt(this.dataset.index));
        });
    });
}

function checkAnswer(selected) {
    const questionData = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll(".options button");

    buttons.forEach((button, index) => {
        if (index === questionData.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    if (selected === questionData.correct) {
        score++;
    }

    nextButton.disabled = false; // Allow navigation after answering
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

submitButton.addEventListener("click", () => {
    quizSection.classList.remove("active");
    resultsSection.classList.add("active");
    resultsSection.style.display = "block"; // Ensure results are visible
    restartButton.style.display = "block"; // Show the restart button

    let resultMessage = `You scored ${score} out of ${quizData.length}. `;
    if (score === quizData.length) {
        resultMessage += "That is a perfect score! Excellent Work!";
    } else if (score === quizData.length - 1) {
        resultMessage += "Good job!";
    } else if (score >= quizData.length / 2) {
        resultMessage += "That is the passing score!";
    } else {
        resultMessage += "Please try again.";
    }
    
    resultsSection.textContent = resultMessage; // Update the results section with the message
});

restartButton.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    resultsSection.classList.remove("active");
    quizSection.classList.add("active");
    displayQuestion();
});

displayQuestion();