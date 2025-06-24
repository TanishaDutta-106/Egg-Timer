const sizeTextureTimes = {
  small: { runny: 4, soft: 5, hard: 7 },
  medium: { runny: 5, soft: 6, hard: 8 },
  large: { runny: 6, soft: 7, hard: 9 }
};

let timerInterval;
let timeLeft = 0;
let isRunning = false;

const sizeSelect = document.getElementById('egg-size');
const textureSelect = document.getElementById('egg-texture');
const timerInput = document.getElementById('timer-minutes');
const countdownEl = document.getElementById('countdown');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');

// Update timer input when selections change
function updateTimerPreset() {
  const size = sizeSelect.value;
  const texture = textureSelect.value;
  const preset = sizeTextureTimes[size][texture];
  timerInput.value = preset;

  // Only update timeLeft if timer is not running
  if (!isRunning) {
    timeLeft = preset * 60;
    updateCountdownDisplay();
  }
}

// Countdown display update
function updateCountdownDisplay() {
  let mins = Math.floor(timeLeft / 60);
  let secs = timeLeft % 60;
  countdownEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Enable or disable inputs
function setInputsDisabled(disabled) {
  sizeSelect.disabled = disabled;
  textureSelect.disabled = disabled;
  timerInput.disabled = disabled;
}

// Start/stop button handler
function toggleTimer() {
  if (!isRunning) {
    // Start
    timeLeft = parseInt(timerInput.value) * 60;
    timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        countdownEl.textContent = '🥚 DONE!';
        isRunning = false;
        startStopBtn.textContent = 'Start';
        setInputsDisabled(false);

        // Change egg image to boiled egg
        const eggImg = document.getElementById('egg-img');
        eggImg.src = 'egg-boiled.png'; // your boiled egg image

        return;
      }
      timeLeft--;
      updateCountdownDisplay();
    }, 1000);

    isRunning = true;
    startStopBtn.textContent = 'Stop';
    setInputsDisabled(true);  // Disable inputs on start

  } else {
    // Stop
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    setInputsDisabled(false); // Enable inputs on stop
  }
}

// Reset button handler
function resetTimer() {
  clearInterval(timerInterval);
  const preset = parseInt(timerInput.value);
  timeLeft = isNaN(preset) ? 0 : preset * 60;
  updateCountdownDisplay();
  isRunning = false;
  startStopBtn.textContent = 'Start';

  // Restore original egg image
  const eggImg = document.getElementById('egg-img');
  eggImg.src = 'egg.png'; // back to whole egg

  setInputsDisabled(false); // Enable inputs on reset
}

// Event listeners
sizeSelect.addEventListener('change', updateTimerPreset);
textureSelect.addEventListener('change', updateTimerPreset);
startStopBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize on page load
updateTimerPreset();
updateCountdownDisplay();