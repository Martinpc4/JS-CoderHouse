let userTasks = [];
let userGoals = [];

// !FUNCTIONS
function deleteTask(taskId) {
    if (userTasks.find(task => task.id == taskId) != undefined) {
        let i = 0;
        for (task of userTasks) {
            if (task.id == taskId) {
                userTasks.splice(i, 1);
            }
            i++;
        }
    }
}
function randomId(array) {
    let id = 0;
    let i = 0;
    let state = true;
    if (array.length == 0) {
        id = Math.floor(Math.random() * (100000 - 1) + 1);
    }
    else {
        while (state === true) {
            id = Math.floor(Math.random() * (100000 - 1) + 1);
            for (task of array) {
                if (task.id == id) {
                    break;
                }
                else if (task.id != id) {
                    if (array.length = i) {
                        continue;
                    }
                    else {
                        state = false;
                        break;
                    }
                }
                i++;
            }
        }
    }
    return id;
}
function createTask (taskName, taskDueDate, taskDescription) {
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
    sessionStorage.setItem("task",objectInJSON);
}
function createGoal (goalName) {
    const goalCreated = new goal(goalName);
    userGoals.push(goalCreated);
    // create DOM
    let newGoal = document.createElement("div");
    newGoal.className = "goal"

    newGoal.innerHTML = `
        <i class="bi bi-circle"></i>
        <p class="goal__title">${goalName}</p>
    `;

    const goal_container = document.getElementById("goal-container");
    goal_container.appendChild(newGoal);
    // save goal in storage
    const objectInJSON = JSON.stringify(newGoal);
    sessionStorage.setItem("goal",objectInJSON);
}

// !Classes
class task {
    constructor(name, dueDate, description) {
        this.id = randomId(userTasks);
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.doneState = false;
        this.type= "task";
    }
    changeName (newName) {
        this.name = newName;
    }
    changeDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }
    changeDescription (newDescription) {
        this.description = newDescription;
    }
    finished() {
        this.doneState = true;
    }
}
class goal {
    constructor(name) {
        this.id = randomId(userGoals);
        this.name = name;
        this.doneState = false;
        this.type= "goal";
    }
    changeName (newName) {
        this.name = newName;
    }
    finished() {
        this.doneState = true;
    }
}

createTask(String(prompt("Ingrese el nombre de la tarea")), String(prompt("Ingrese la fecha limite de la tarea (dd/mm/yyyy)")), String(prompt("Ingrese la descripción de la tarea")));
createGoal(String(prompt("Ingrese el nombre de la goal")));