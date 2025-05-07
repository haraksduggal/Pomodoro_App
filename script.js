// Default times in seconds
const POMODORO = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

let currentTime = POMODORO;
let timerInterval = null;
let currentSession = 'pomodoro';

// DOM elements
const timerDisplay = document.querySelector('.timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const pomodoroBtn = document.getElementById('pomodoro');
const shortBreakBtn = document.getElementById('short-break');
const longBreakBtn = document.getElementById('long-break');
const sessionButtons = [pomodoroBtn, shortBreakBtn, longBreakBtn];

// Update timer display
function updateTimerDisplay() {
  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const seconds = String(currentTime % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

// Set session and update UI
function setSession(session) {
  clearInterval(timerInterval);
  timerInterval = null;
  if (session === 'pomodoro') {
    currentTime = POMODORO;
  } else if (session === 'short') {
    currentTime = SHORT_BREAK;
  } else if (session === 'long') {
    currentTime = LONG_BREAK;
  }
  currentSession = session;
  updateTimerDisplay();

  // Update active button
  sessionButtons.forEach(btn => btn.classList.remove('active'));
  if (session === 'pomodoro') pomodoroBtn.classList.add('active');
  if (session === 'short') shortBreakBtn.classList.add('active');
  if (session === 'long') longBreakBtn.classList.add('active');
}

// Start timer
function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert('Time is up!');
    }
  }, 1000);
}

// Pause timer
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Reset timer
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  setSession(currentSession);
}

// Event listeners
pomodoroBtn.addEventListener('click', () => setSession('pomodoro'));
shortBreakBtn.addEventListener('click', () => setSession('short'));
longBreakBtn.addEventListener('click', () => setSession('long'));
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize display and set default active session
setSession('pomodoro');
