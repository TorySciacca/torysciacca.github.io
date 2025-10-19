const triangle = document.querySelector('.triangle');
const input = document.querySelector('.question-input');

// Some sample Magic 8 Ball responses
const responses = [
  "Yes, definitely!",
  "Ask again later...",
  "No chance!",
  "It is certain.",
  "Cannot predict now.",
  "Very doubtful.",
  "Outlook good.",
  "Focus and ask again."
];

// Enable input on first click
triangle.addEventListener('click', () => {
  if (input.disabled) {
    input.disabled = false;
    input.focus();
    input.style.opacity = '1';
    return; // don't trigger answer immediately on first click
  }

  // If input is enabled and has text, show a random response
  handleQuestion();
});

// Activate triangle visual state based on input content
input.addEventListener('input', () => {
  if (input.value.trim() !== '') {
    triangle.classList.add('active');
  } else {
    triangle.classList.remove('active');
  }
});

// Trigger response when pressing Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleQuestion();
  }
});

// Function to show a random Magic 8 Ball response
function handleQuestion() {
  const question = input.value.trim();
  if (question === '') return; // ignore empty

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  // Replace input text with response and disable it again
  input.value = randomResponse;
  input.disabled = true;
  input.style.opacity = '0.5';
  triangle.classList.remove('active');
}
