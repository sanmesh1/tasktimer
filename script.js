let tasks = [];

function addTask() {
  let taskName = document.getElementById('task-name').value.trim();
  let taskDuration = parseInt(document.getElementById('task-duration').value.trim());

  if (taskName === '' || isNaN(taskDuration) || taskDuration <= 0) {
    alert('Please enter a valid task name and duration (in minutes).');
    return;
  }

  tasks.push({
    name: taskName,
    duration: taskDuration * 60, // Convert minutes to seconds
    timerId: null,
    elapsedTime: 0,
    status: 'paused' // 'paused', 'running', 'completed'
  });

  renderTasks();
}

function renderTasks() {
  let tasksContainer = document.getElementById('tasks-container');
  tasksContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    let taskElement = document.createElement('div');
    taskElement.className = 'task';

    let taskNameElement = document.createElement('h3');
    taskNameElement.textContent = task.name;
    taskElement.appendChild(taskNameElement);

    let timerElement = document.createElement('p');
    timerElement.id = `timer-${index}`;
    timerElement.textContent = formatTime(task.elapsedTime);
    taskElement.appendChild(timerElement);

    let controlsElement = document.createElement('div');
    controlsElement.className = 'controls';

    let startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.addEventListener('click', () => startTimer(index));
    controlsElement.appendChild(startButton);

    let pauseButton = document.createElement('button');
    pauseButton.textContent = 'Pause';
    pauseButton.addEventListener('click', () => pauseTimer(index));
    controlsElement.appendChild(pauseButton);

    let restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.addEventListener('click', () => restartTimer(index));
    controlsElement.appendChild(restartButton);

    taskElement.appendChild(controlsElement);

    tasksContainer.appendChild(taskElement);
  });
}

function startTimer(index) {
  if (tasks[index].status !== 'running') {
    tasks[index].status = 'running';
    tasks[index].timerId = setInterval(() => {
      tasks[index].elapsedTime++;
      document.getElementById(`timer-${index}`).textContent = formatTime(tasks[index].elapsedTime);
    }, 1000);
  }
}

function pauseTimer(index) {
  if (tasks[index].status === 'running') {
    clearInterval(tasks[index].timerId);
    tasks[index].status = 'paused';
  }
}

function restartTimer(index) {
  clearInterval(tasks[index].timerId);
  tasks[index].elapsedTime = 0;
  tasks[index].status = 'paused';
  document.getElementById(`timer-${index}`).textContent = formatTime(tasks[index].elapsedTime);
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
