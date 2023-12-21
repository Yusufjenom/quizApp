const form = document.getElementById('quizDisplayForm');
const questionsContainer = document.getElementById('questionsContainer');

// Mock data for questions and options (replace this with your backend logic)
const quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Madrid', 'Rome', 'London'],
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn', 'Earth'],
    },
    // Add more questions as needed
];

// Function to create a question with options for display
function createQuestionElement(index, questionData) {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';

    const questionLabel = document.createElement('label');
    questionLabel.textContent = `Question ${index + 1}: ${questionData.question}`;
    questionElement.appendChild(questionLabel);

    // Display options
    questionData.options.forEach((option, i) => {
        const optionLabel = document.createElement('label');
        optionLabel.textContent = `${String.fromCharCode(65 + i)}. ${option}`;
        questionElement.appendChild(optionLabel);
        
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = `q${index}`;
        optionInput.value = option;
        questionElement.appendChild(optionInput);
    });

    return questionElement;
}

// Function to add questions to the form
function addQuestionsToForm() {
    quizData.forEach((questionData, index) => {
        questionsContainer.appendChild(createQuestionElement(index, questionData));
    });
}

// Event listener for form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Add your logic for handling submitted answers here
    console.log('Answers submitted!');
});

// Initialize the form with questions
addQuestionsToForm();