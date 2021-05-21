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
        let taskName = String(document.getElementById("alertTaskName").value);
        let taskDueDate = String(document.getElementById("alertTaskDueDate").value);
        let taskDescription = String(document.getElementById("alertTaskDescription").value);

        let newTask = {"name": taskName, "dueDate": parseDate(taskDueDate), "description": taskDescription};
        newTask = new task(newTask);
        userTasks.push(newTask);

        saveStorage();
    });
    console.log(userTasks);
});

// - Delete a Task
let btnTaskDelete = document.getElementsByClassName("task__actions__delete");
for (const task of btnTaskDelete) {
    task.addEventListener("click", deleteTask);
}
function deleteTask(event) {
    const taskContainer = event.target.parentNode.parentNode.parentNode;

    let i = 0;
    console.log(userTasks);
    userTasks.forEach(task => {
        if (task.id == taskContainer.id) {
            userTasks.splice(i, 1);
        }
        else {
            i++;
        }
    });

    saveStorage();
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
            <form class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input class="input" type="text" name="name">
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
});
// - Delete a Goal

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
            <form class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input class="input" type="text" name="name">
                </div>
                <div class="alert__form__input">
                    <label for="dueDate">Due date</label>
                    <input class="input" type="text" name="dueDate">
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
});
// - Delete a Reminder