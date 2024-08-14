let isTimerRunning = false;
let isBreakRunning = false;
let timerInterval;
let breakInterval;
let totalSeconds = 1500; // 25 minutes in seconds
let totalBreakSeconds = 300; // 5 minutes in seconds
let currentModeMinutes = 25;
let currentModeBreakMinutes = 5;

function toggleDropdown() {
    document.getElementById("dropdown").classList.toggle("show");
}

function setPomodoroTimer(minutes, breakMinutes) {
    currentModeMinutes = minutes;
    currentModeBreakMinutes = breakMinutes;
    totalSeconds = minutes * 60;
    totalBreakSeconds = breakMinutes * 60;
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = '00';
}

function resetTimer() {
    stopTimer();
    document.getElementById("start-stop").innerText = 'Start';
    document.getElementById("minutes").innerText = String(currentModeMinutes).padStart(2, '0');
    document.getElementById("seconds").innerText = '00';
}

document.getElementById('start-stop').addEventListener('click', function () {
    if (!isTimerRunning) {
        startTimer();
        this.innerText = 'Stop';
    } else {
        resetTimer();
    }
});

function startTimer() {
    isTimerRunning = true;
    const endTime = Date.now() + totalSeconds * 1000;
    timerInterval = setInterval(function () {
        const currentTime = Date.now();
        const remainingTime = Math.max(0, endTime - currentTime);
        const minutes = Math.floor((remainingTime / 1000) / 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        if (remainingTime === 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            document.getElementById('start-stop').innerText = 'Start';
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

document.getElementById('break').addEventListener('click', function () {
    stopTimer();
    document.getElementById('pomodoro-timer').style.display = 'none';
    document.getElementById('break-timer').style.display = 'block';
    startBreakTimer();
});

function startBreakTimer() {
    isBreakRunning = true;
    const breakEndTime = Date.now() + totalBreakSeconds * 1000;
    breakInterval = setInterval(function () {
        const currentTime = Date.now();
        const remainingBreakTime = Math.max(0, breakEndTime - currentTime);
        const breakMinutes = Math.floor((remainingBreakTime / 1000) / 60);
        const breakSeconds = Math.floor((remainingBreakTime / 1000) % 60);
        document.getElementById('break-minutes').innerText = String(breakMinutes).padStart(2, '0');
        document.getElementById('break-seconds').innerText = String(breakSeconds).padStart(2, '0');
        if (remainingBreakTime === 0) {
            clearInterval(breakInterval);
            isBreakRunning = false;
        }
    }, 1000);
}

document.getElementById('end-break').addEventListener('click', function () {
    stopBreakTimer();
    document.getElementById('break-timer').style.display = 'none';
    document.getElementById('pomodoro-timer').style.display = 'block';
    resetTimer();
});

function stopBreakTimer() {
    clearInterval(breakInterval);
    isBreakRunning = false;
}

document.querySelectorAll('.dropdown-content a').forEach((link) => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const text = event.target.textContent;
        if (text.includes('30 mins')) {
            setPomodoroTimer(25, 5);
        } else if (text.includes('1 hour')) {
            setPomodoroTimer(50, 10);
        }
        resetTimer();
    });
});

window.onclick = function (event) {
    if (!event.target.matches('.dropdown button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

document.getElementById('creds').addEventListener('click', () => {
    const credsButton = document.getElementById('creds');
    if (credsButton.classList.contains('active')) {
        credsButton.classList.remove('active');
        credsButton.innerHTML = 'Creds';
    } else {
        credsButton.classList.add('active');
        credsButton.innerHTML = 'Made by: Prasun | Github: <a href="https://github.com/LoneTerror" target="_blank">https://github.com/LoneTerror</a>';
    }
});