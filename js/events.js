// ! TASK EVENTS
// - Create Task
document.getElementById("taskBtnCreate").addEventListener("click", () => {
    // Create alert dom
    let alertDom = document.createElement("div");
    alertDom.className = "alert";
    alertDom.innerHTML = `
        <div class="alert__container">
            <div class="alert__info">
                <p>Create Task</p>
                <i id="alertBtnClose" class="bi bi-x-lg"></i>
            </div>
            <form id="alertForm" class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input id="alertTaskName" class="input" type="text" name="name">
                </div>
                <div class="alert__form__input">
                    <label for="dueDate">Due date</label>
                    <input id="alertTaskDueDate" class="input" type="" name="date" placeholder="dd/mm/yyyy">
                </div>
                <div class="alert__form__input--description">
                    <label for="description">Description</label>
                    <textarea id="alertTaskDescription" class="textarea" name="description" id=""></textarea>
                </div>
                <div class="alert__form__buttons">
                    <input class="btn" type="submit">
                </div>
            </form>
        </div>
    `;
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.appendChild(alertDom);

    // Close alert
    document.getElementById("alertBtnClose").addEventListener("click", () => {
        mainContainer.removeChild(alertDom);
    });

    // Capture data
    document.getElementById("alertForm").addEventListener("submit", (event) => {
        event.preventDefault();
        // storing user given values in them
        let taskName = String(document.getElementById("alertTaskName").value);
        let taskDueDate = String(document.getElementById("alertTaskDueDate").value);
        let taskDescription = String(document.getElementById("alertTaskDescription").value);
        // object creation
        let newTask = { "name": taskName, "dueDate": parseDate(taskDueDate), "description": taskDescription };
        newTask = new task(newTask);
        userTasks.push(newTask);
        saveStorage();
    });
});
// - Delete a Task
let btnsTaskDelete = document.getElementsByClassName("btnTaskDelete");
for (const task of btnsTaskDelete) {
    task.addEventListener("click", (event) => {
        const taskContainer = event.target.parentNode.parentNode.parentNode;
        let i = 0;
        userTasks.forEach(task => {
            if (task.id == taskContainer.id) {
                userTasks.splice(i, 1);
            }
            else {
                i++;
            }
        });
        saveStorage();
    });
}
// - Complete a Task
let btnsTaskComplete = document.getElementsByClassName("btnTaskComplete");
for (const task of btnsTaskComplete) {
    task.addEventListener("click", (event) => {
        const taskContainer = event.target.parentNode.parentNode.parentNode;
        userTasks.forEach(task => {
            if (task.id == taskContainer.id) {
                if (task.doneState === false) {
                    task.doneState = true;
                }
                else if (task.doneState === true) {
                    task.doneState = false;
                }
            }
        });
        saveStorage();
    });
}

// ! GOAL EVENTS
// - Create a Goal
document.getElementById("goalBtnCreate").addEventListener("click", () => {
    // Create alert dom
    let alertDom = document.createElement("div");
    alertDom.className = "alert";
    alertDom.innerHTML = `
        <div class="alert__container">
            <div class="alert__info">
                <p>Create Goal</p>
                <i id="alertBtnClose" class="bi bi-x-lg"></i>
            </div>
            <form id="alertForm" class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input id="alertGoalName" class="input" type="text" name="name">
                </div>
                <div class="alert__form__buttons">
                    <input class="btn" type="submit">
                </div>
            </form>
        </div>
    `;
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.appendChild(alertDom);
    // Close alert
    let alertBtnClose = document.getElementById("alertBtnClose");
    alertBtnClose.addEventListener("click", () => {
        mainContainer.removeChild(alertDom);
    });
    // Capture data
    document.getElementById("alertForm").addEventListener("submit", (event) => {
        event.preventDefault();
        // storing user given values in them
        let goalName = String(document.getElementById("alertGoalName").value);
        // object creation
        goalName = {"name" : goalName};
        goalName = new goal(goalName);
        userGoals.push(goalName);
        saveStorage();
    });
});
// - Delete a Goal
let btnGoalDelete = document.getElementsByClassName("btnGoalDelete");
for (const goal of btnGoalDelete) {
    goal.addEventListener("click", (event) => {
        const goalContainer = event.target.parentNode;
        let i = 0;
        userGoals.forEach(goal => {
            if (goal.id == goalContainer.id) {
                userGoals.splice(i, 1);
            }
            else {
                i++
            }
        });
        saveStorage();
    });
}
// - Complete goal
let btnGoalComplete = document.getElementsByClassName("btnGoalComplete");
for (const goal of btnGoalComplete) {
    goal.addEventListener("click", (event) => {
        let goalContainer = event.target.parentNode;
        userGoals.forEach(goal => {
            if (goal.id == goalContainer.id) {
                if (goal.doneState === false) {
                    goal.doneState = true;
                }
                else if (goal.doneState === true) {
                    goal.doneState = false;
                }
            }
        });
        saveStorage();
    });
}

// ! REMINDER EVENTS
// - Create a Reminder
document.getElementById("reminderBtnCreate").addEventListener("click", () => {
    // Create alert dom
    let alertDom = document.createElement("div");
    alertDom.className = "alert";
    alertDom.innerHTML = `
        <div class="alert__container">
            <div class="alert__info">
                <p>Create Reminder</p>
                <i id="alertBtnClose" class="bi bi-x-lg"></i>
            </div>
            <form id="alertForm" class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input id="reminderName" class="input" type="text" name="name">
                </div>
                <div class="alert__form__input">
                    <label for="dueDate">Due date</label>
                    <input id="reminderDueDate" class="input" type="text" name="dueDate" placeholder="dd/mm/yyyy">
                </div>
                <div class="alert__form__buttons">
                    <input class="btn" type="submit">
                </div>
            </form>
        </div>
    `;
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.appendChild(alertDom);

    // Close alert
    let alertBtnClose = document.getElementById("alertBtnClose");
    alertBtnClose.addEventListener("click", () => {
        mainContainer.removeChild(alertDom);
    });

    // Capture data
    document.getElementById("alertForm").addEventListener("submit", (event) => {
        event.preventDefault();
        // storing user given values in them
        let reminderName = String(document.getElementById("reminderName").value);
        let reminderDueDate = String(document.getElementById("reminderDueDate").value);
        // object creation
        let newReminder = { "name": reminderName, "dueDate": parseDate(reminderDueDate)};
        newReminder = new reminder(newReminder);
        userReminders.push(newReminder);
        saveStorage();
    });
});
// - Delete Reminder
let btnsReminderDelete = document.getElementsByClassName("btnReminderDelete");
for (const reminder of btnsReminderDelete) {
    reminder.addEventListener("click", (event) => {
        const reminderContainer = event.target.parentNode.parentNode;
        let i = 0;
        userReminders.forEach(reminder => {
            if (reminder.id == reminderContainer.id) {
                userReminders.splice(i, 1);
            }
            else {
                i++
            }
        });
        saveStorage();
    });
}
// - Complete Reminder
let btnsReminderComplete = document.getElementsByClassName("btnReminderComplete");
for (const reminder of btnsReminderComplete) {
    reminder.addEventListener("click", (event) => {
        let reminderContainer = event.target.parentNode.parentNode;
        userReminders.forEach(reminder => {
            if (reminder.id == reminderContainer.id) {
                if (reminder.doneState === true) {
                    reminder.doneState = false;
                }
                else if (reminder.doneState === false) {
                    reminder.doneState = true;
                }
            }
        }); 
        saveStorage();
    });
}