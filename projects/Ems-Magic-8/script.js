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

let showingAnswer = false;

// Triangle click / tap handler
triangle.addEventListener('click', () => {
  // If showing an answer, clear it for a new question
  if (showingAnswer) {
    input.value = '';
    showingAnswer = false;
    triangle.classList.remove('active');
    input.focus(); // focus again after clearing (important for mobile)
    return;
  }

  // If input is empty, focus it so user can type (mobile-friendly)
  if (input.value.trim() === '') {
    input.focus();
    return;
  }

  // If there’s text, show an answer
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  input.value = randomResponse;
  showingAnswer = true;
  triangle.classList.remove('active');
});

// Activate triangle visual state while typing
input.addEventListener('input', () => {
  if (input.value.trim() !== '' && !showingAnswer) {
    triangle.classList.add('active');
  } else {
    triangle.classList.remove('active');
  }
});
