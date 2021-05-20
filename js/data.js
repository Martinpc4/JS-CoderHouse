let userTasks = [];
let userGoals = [];
let userReminders = [];

// ! STORAGE FUNCTIONS
function start() {
    const retirevedData = retrieveStorage();
    userTasks = retirevedData[0];
    userGoals = retirevedData[1];
    userReminders = retirevedData[2];

    userTasks.forEach(task => {
        createTaskDom(task);
    });
    userGoals.forEach(goal => {
        createGoalDom(goal);
    });
    userReminders.forEach(reminder => {
        createReminderDom(reminder);
    });
}
function retrieveStorage() {
    // * Retrieve Tasks
    let tasksArray = []
    let tasks = JSON.parse(localStorage.getItem("userTasks"));
    tasks.forEach(taskProperties => {
        const newTask = new task(taskProperties);
        tasksArray.push(newTask);
    });

    // * Retrieve Goals
    let goalsArray = [];
    const goals = JSON.parse(localStorage.getItem("userGoals"));
    goals.forEach(goalProperties => {
        const newGoal = new goal(goalProperties);
        goalsArray.push(newGoal);
    });

    // * Retrieve Reminders
    let remindersArray = [];
    let reminders = JSON.parse(localStorage.getItem("userReminders"));
    reminders.forEach(reminderProperties => {
        const newReminder = new reminder(reminderProperties);
        remindersArray.push(newReminder);
    });
    return ([tasksArray, goalsArray, remindersArray])
}
function saveStorage() {
    localStorage.setItem("userTasks", JSON.stringify(userTasks));
    localStorage.setItem("userGoals", JSON.stringify(userGoals));
    localStorage.setItem("userReminders", JSON.stringify(userReminders));
    location.reload();
}
// localStorage.clear();

start();

console.log(userTasks);
console.log(userGoals);
console.log(userReminders);

// localStorage.setItem("userTasks", JSON.stringify([
//     {name : "Tarea2", dueDate : "09/07/2021", description : "Hay que hacer la tarea de Fundamentos 2"},
//     {name : "Tarea1", dueDate : "03/12/2021", description : "Hay que hacer la tarea de Fundamentos 2"}
// ]));
// localStorage.setItem("userReminders", JSON.stringify([
//     {name : "Remember Task", dueDate : "10/12/2021"}, {name : "Remember Reminder", dueDate : "01/12/2021"}
// ]));
// localStorage.setItem("userGoals", JSON.stringify([
//     {name : "Remember Task"}, {name : "Remember Reminder"}
// ]));