// !CREATE TASK
function createTask(taskName, taskDueDate, taskDescription) {
    const taskcreated = new task(taskName, taskDueDate, taskDescription);
    userTasks.push(taskcreated);
    // create DOM
    let newTask = document.createElement("div");
    newTask.className = "task"

    newTask.innerHTML = `
        <p class="task__title">${taskName}</p>
        <p class="task__dueDate">${taskDueDate}</p>
        <p class="task__description">${taskDescription}</p>
        <div class="task__actions">
            <i class="bi bi-check2"></i>
            <i class="bi bi-trash"></i>
        </div>
    `;

    const task_container = document.getElementById("tasks-container");
    task_container.appendChild(newTask);
    // save task in storage
    const objectInJSON = JSON.stringify(newTask);
    sessionStorage.setItem("task", objectInJSON);
}
// !CREATE GOAL
function createGoal(goalName) {
    const goalCreated = new goal(goalName);
    userGoals.push(goalCreated);

    // create DOM
    let newGoal = document.createElement("div");
    newGoal.className = "goal";

    newGoal.innerHTML = `
        <i class="bi bi-circle"></i>
        <p class="goal__title">${goalName}</p>
    `;

    const goal_container = document.getElementById("goal-container");
    goal_container.appendChild(newGoal);

    // save goal in storage
    const objectInJSON = JSON.stringify(newGoal);
    sessionStorage.setItem("goal", objectInJSON);
}
// !CREATE REMINDER
function createReminder(reminderName, reminderDueDate) {
    reminderName = String(reminderName);
    reminderDueDate = String(reminderDueDate);

    const newReminder = new reminder(reminderName, reminderDueDate);
    userReminders.push(newReminder);

    // DOM
    let domReminder = document.createElement("div");
    domReminder.className = "reminders";
    if (onTime(reminderDueDate) === true) {
        domReminder.innerHTML = `
            <i class="reminders__icon bi bi-square"></i>
            <p class="reminders__title">${reminderName}</p>
            <p class="reminders__dueDate">${String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth()) + "/" + String(newReminder.dueDate.getFullYear())}</p>
            <div class="reminders__status reminders__status--onTime"></div>
        `;
    }
    else if (onTime(reminderDueDate) === false) {
        domReminder.innerHTML = `
            <i class="reminders__icon bi bi-square"></i>
            <p class="reminders__title">${reminderName}</p>
            <p class="reminders__dueDate">${String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth()) + "/" + String(newReminder.dueDate.getFullYear())}</p>
            <div class="reminders__status reminders__status--overdue"></div>
        `;
    }

    const reminders_container = document.getElementById("reminders-container");
    reminders_container.appendChild(domReminder);
}