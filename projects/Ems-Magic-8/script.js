const triangle = document.querySelector('.triangle');
const input = document.querySelector('.question-input');

// Sample Magic 8 Ball responses
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

// Track if an answer is currently shown
let showingAnswer = false;

// Triangle click handler
triangle.addEventListener('click', () => {
  if (!showingAnswer) {
    // Show answer if input has text
    if (input.value.trim() !== '') {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      input.value = randomResponse;
      showingAnswer = true;
      triangle.classList.remove('active');
    }
  } else {
    // Clear input to allow new question
    input.value = '';
    showingAnswer = false;
  }
});

// Activate triangle visual state while typing
input.addEventListener('input', () => {
  if (input.value.trim() !== '' && !showingAnswer) {
    triangle.classList.add('active');
  } else {
    triangle.classList.remove('active');
  }
});

// Trigger answer on Enter key
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && input.value.trim() !== '' && !showingAnswer) {
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    input.value = randomResponse;
    showingAnswer = true;
    triangle.classList.remove('active');
  }
});
