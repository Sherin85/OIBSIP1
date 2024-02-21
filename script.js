let tasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            timestamp: new Date().toLocaleString()
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = "";
    }
}

function toggleTaskComplete(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        if (task.completed) {
            completedTasks.push(task);
        } else {
            completedTasks = completedTasks.filter(completedTask => completedTask.id !== taskId);
        }
        renderTasks();
    }
}

function calculateScore() {
    const totalTasks = tasks.length;
    const completedCount = completedTasks.length;
    if (totalTasks === 0) {
        return 0; // If no tasks, return perfect score
    }
    const score = Math.round((completedCount / totalTasks) * 100);
    return score;
}

function renderTasks() {
    const pendingTasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");
    const scoreDisplay = document.getElementById("score");

    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.text} - ${task.timestamp}`;
        if (task.completed) {
            li.classList.add("completed");
            completedTasksList.appendChild(li);
        } else {
            li.addEventListener("click", () => toggleTaskComplete(task.id));
            pendingTasksList.appendChild(li);
        }
    });

    const score = calculateScore();
    scoreDisplay.textContent = `Daily Score: ${score}/100`;
}

renderTasks();
