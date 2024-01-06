const form = document.getElementById('quizForm');
const questionsContainer = document.getElementById('questionsContainer');

// Function to create a question with options
function createQuestionElement(index) {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';

    const questionLabel = document.createElement('label');
    questionLabel.textContent = `Question ${index + 1}:`;
    questionElement.appendChild(questionLabel);

    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.name = `question${index}`;
    questionInput.required = true;
    questionElement.appendChild(questionInput);

    // Create options
    for (let i = 1; i <= 5; i++) {
        const optionLabel = document.createElement('label');
        optionLabel.textContent = `Option ${i}:`;
        questionElement.appendChild(optionLabel);

        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.name = `q${index}option${i}`;
        optionInput.required = true;
        questionElement.appendChild(optionInput);
    }

    // Correct answer
    const correctAnswerLabel = document.createElement('label');
    correctAnswerLabel.textContent = 'Correct Answer:';
    questionElement.appendChild(correctAnswerLabel);

    const correctAnswerInput = document.createElement('select');
    correctAnswerInput.name = `q${index}correctAnswer`;

    // Options for correct answer
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement('option');
        option.value = `Option ${i}`;
        option.textContent = `Option ${i}`;
        correctAnswerInput.appendChild(option);
    }

    questionElement.appendChild(correctAnswerInput);

    return questionElement;
}

// Function to add questions to the form
function addQuestionsToForm() {
    for (let i = 0; i < 10; i++) {
        questionsContainer.appendChild(createQuestionElement(i));
    }
}


addQuestionsToForm();