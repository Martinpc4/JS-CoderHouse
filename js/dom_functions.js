// !TASK
function createTaskDom (newTask) {
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
                <i class="btnTaskDelete bi bi-trash"></i>
            </div>
        </div>
    `;
    const domTaskContainer = document.getElementById("tasksContainer");
    domTaskContainer.appendChild(domTask);
}
// !GOAL
function createGoalDom (newGoal) {
    let domGoal = document.createElement("div");
    domGoal.className = "goal";
    domGoal.id = `${newGoal.id}`;
    if (newGoal.doneState === false) {
        domGoal.innerHTML = `
            <i class="btnGoalComplete bi bi-circle"></i>
            <p class="goal__title">${newGoal.name}</p>
            <i class="btnGoalDelete bi bi-trash"></i>
        `;
    }
    else if (newGoal.doneState === true) {
        domGoal.innerHTML = `
            <i class="btnGoalComplete bi bi-circle-fill"></i>
            <p class="goal__title">${newGoal.name}</p>
            <i class="btnGoalDelete bi bi-trash"></i>
        `;
    }
    const goal_container = document.getElementById("goalsContainer");
    goal_container.appendChild(domGoal);
}
// !CREATE REMINDER
function createReminderDom (newReminder) {
    let domReminder = document.createElement("div");
    domReminder.className = "reminders";
    if (onTime(newReminder.dueDate) === true) {
        domReminder.innerHTML = `
            <i class="reminders__icon bi bi-square"></i>
            <p class="reminders__title">${newReminder.name}</p>
            <p class="reminders__dueDate">${String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth() + 1) + "/" + String(newReminder.dueDate.getFullYear())}</p>
            <div class="reminders__status reminders__status--onTime"></div>
        `;
    }
    else if (onTime(newReminder.dueDate) === false) {
        domReminder.innerHTML = `
            <i class="reminders__icon bi bi-square"></i>
            <p class="reminders__title">${newReminder.name}</p>
            <p class="reminders__dueDate">${String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth() + 1) + "/" + String(newReminder.dueDate.getFullYear())}</p>
            <div class="reminders__status reminders__status--overdue"></div>
        `;
    }
    
    const reminders_container = document.getElementById("remindersContainer");
    reminders_container.appendChild(domReminder);
}