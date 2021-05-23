let userTasks = [];
let userGoals = [];
let userReminders = [];

// ! START SEQUENCE
function startSequence() {
    // * Retrieve Tasks
    let tasks = JSON.parse(localStorage.getItem("userTasks"));
    tasks.forEach(taskProperties => {
        taskProperties.dueDate = new Date(taskProperties.dueDate);
        let newTask = new task(taskProperties);
        userTasks.push(newTask);
    });

    // * Retrieve Goals
    const goals = JSON.parse(localStorage.getItem("userGoals"));
    goals.forEach(goalProperties => {
        let newGoal = new goal(goalProperties);
        userGoals.push(newGoal);
    });

    // * Retrieve Reminders
    let reminders = JSON.parse(localStorage.getItem("userReminders"));
    reminders.forEach(reminderProperties => {
        reminderProperties.dueDate = new Date(reminderProperties.dueDate);
        let newReminder = new reminder(reminderProperties);
        userReminders.push(newReminder);
    });

    // * Create Doms
    userTasks.forEach(taskProperties => {
        createTaskDom(taskProperties);
    });
    userGoals.forEach(goalProperties => {
        createGoalDom(goalProperties);
    });
    userReminders.forEach(reminderProperties => {
        createReminderDom(reminderProperties);
    });
}
function saveStorage() {
    localStorage.setItem("userTasks", JSON.stringify(userTasks));
    localStorage.setItem("userGoals", JSON.stringify(userGoals));
    localStorage.setItem("userReminders", JSON.stringify(userReminders));
    location.reload();
}

startSequence();