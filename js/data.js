let userTasks = [];
let userGoals = [];
let userReminders = [];

// ! START SEQUENCE
function startSequence() {
    retrieveStorage();
    createDoms();
}
function retrieveStorage() {
    // * Retrieve Tasks
    let tasks = JSON.parse(localStorage.getItem("userTasks"));
    tasks.forEach(taskProperties => {
        userTasks.push(taskProperties);
    });

    // * Retrieve Goals
    const goals = JSON.parse(localStorage.getItem("userGoals"));
    goals.forEach(goalProperties => {
        userGoals.push(goalProperties);
    });

    // * Retrieve Reminders
    let reminders = JSON.parse(localStorage.getItem("userReminders"));
    reminders.forEach(reminderProperties => {
        userReminders.push(reminderProperties);
    });
}
function createDoms () {
    userTasks.forEach(taskProperties => {
        taskProperties.dueDate = new Date(taskProperties.dueDate);
        taskProperties = new task(taskProperties);
        createTaskDom(taskProperties);
    });
    userGoals.forEach(goalProperties => {
        goalProperties.dueDate = new Date(goalProperties.dueDate);
        goalProperties = new goal(goalProperties);
        createGoalDom(goalProperties);
    });
    userReminders.forEach(reminderProperties => {
        reminderProperties.dueDate = new Date(reminderProperties.dueDate);
        reminderProperties = new reminder(reminderProperties);
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

// localStorage.setItem("userTasks", JSON.stringify([
//     {name : "Tarea2", dueDate : "Fri Dec 03 2021 00:00:00 GMT-0300 (-03)", description : "Hay que hacer la tarea de Fundamentos 2"},
//     {name : "Tarea1", dueDate : "Fri Dec 03 2021 00:00:00 GMT-0300 (-03)", description : "Hay que hacer la tarea de Fundamentos 2"}
// ]));
// localStorage.setItem("userReminders", JSON.stringify([
//     {name : "Remember Task", dueDate : "Fri Dec 03 2021 00:00:00 GMT-0300 (-03)"},
//     {name : "Remember Reminder", dueDate : "Fri Dec 03 2021 00:00:00 GMT-0300 (-03)"},
//     {name : "Terminar la tarea", dueDate : "Fri Dec 03 2021 00:00:00 GMT-0300 (-03)"},
//     {name : "Corregir el codigo", dueDate : "Fri Dec 03 2021 00:00:00 GMT-0300 (-03)"}
// ]));
// localStorage.setItem("userGoals", JSON.stringify([
//     {name : "Remember Task"},
//     {name : "Remember Reminder"},
//     {name : "Corregir el codigo"}
// ]));