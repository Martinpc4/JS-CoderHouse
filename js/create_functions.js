// !TASK
function createTask(taskProperties) {
    // * Class
    const newTask = new task(taskProperties);
    userTasks.push(newTask);
    
    // * Create DOM
    let domTask = document.createElement("div");
    domTask.className = "task"
    domTask.id = `${newTask.id}`;
    domTask.innerHTML = `
        <div class="task__bar"></div>
        <div class="task__container">
            <p class="task__title">${newTask.name}</p>
            <p class="task__dueDate">${String(newTask.dueDate.getDate()) + "/" + String(newTask.dueDate.getMonth() + 1) + "/" + String(newTask.dueDate.getFullYear())}</p>
            <p class="task__description">${newTask.description}</p>
            <div class="task__actions">
                <i class="bi bi-check2"></i>
                <i class="task__actions__delete bi bi-trash"></i>
            </div>
        </div>
    `;
    const domTaskContainer = document.getElementById("tasks-container");
    domTaskContainer.appendChild(domTask);
}
// !GOAL
function createGoal(goalProperties) {
    // * Class
    const newGoal = new goal(goalProperties);
    userGoals.push(newGoal);

    // * Create DOM
    let domGoal = document.createElement("div");
    domGoal.className = "goal";
    domGoal.innerHTML = `
        <i class="bi bi-circle"></i>
        <p class="goal__title">${goalProperties.name}</p>
    `;
    const goal_container = document.getElementById("goal-container");
    goal_container.appendChild(domGoal);
}
// !CREATE REMINDER
function createReminder(reminderProperties) {
    // * Class
    const newReminder = new reminder(reminderProperties);
    userReminders.push(newReminder);

    // * Create DOM
    let domReminder = document.createElement("div");
    domReminder.className = "reminders";
    if (onTime(reminderProperties.dueDate) === true) {
        domReminder.innerHTML = `
            <i class="reminders__icon bi bi-square"></i>
            <p class="reminders__title">${newReminder.name}</p>
            <p class="reminders__dueDate">${String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth() + 1) + "/" + String(newReminder.dueDate.getFullYear())}</p>
            <div class="reminders__status reminders__status--onTime"></div>
        `;
    }
    else if (onTime(reminderProperties.dueDate) === false) {
        domReminder.innerHTML = `
            <i class="reminders__icon bi bi-square"></i>
            <p class="reminders__title">${newReminder.name}</p>
            <p class="reminders__dueDate">${String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth() + 1) + "/" + String(newReminder.dueDate.getFullYear())}</p>
            <div class="reminders__status reminders__status--overdue"></div>
        `;
    }
    
    const reminders_container = document.getElementById("reminders-container");
    reminders_container.appendChild(domReminder);
}