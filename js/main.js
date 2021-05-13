let userTasks = [];

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

function randomId() {
    let id = 0;
    let i = 0;
    let state = true;
    if (userTasks.length == 0) {
        id = Math.floor(Math.random() * (100000 - 1) + 1);
    }
    else {
        while (state === true) {
            id = Math.floor(Math.random() * (100000 - 1) + 1);
            for (task of userTasks) {
                if (task.id == id) {
                    break;
                }
                else if (task.id != id) {
                    if (userTasks.length = i) {
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

class task {
    constructor(id, name, dueDate, description) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.doneState = false;
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

function createGroup (groupName, groupDescription) {
    let newGroup = document.createElement(`div.${groupName}`);

    newGroup.innerHTML = `
    <div class="group-container">
        <p class="group-container__title">UCEMA</p>
        <input class="group-container__dropdown__checkbox" type="checkbox" id="checkbox-${groupName}">
        <label for="checkbox-${groupName}" class="group-container__dropdown__icon group-container__dropdown__icon--closed">
            <i class="bi bi-chevron-up"></i>
        </label>
        <label for="checkbox-${groupName}" class="group-container__dropdown__icon group-container__dropdown__icon--opened">
            <i class="bi bi-chevron-down"></i>
        </label>
    </div>
    `;
    const asideContainer = document.getElementById("aside-group-conatiner");
    // ! ME QUEDE ACA appendChild(newGroup);
}

function createTask (taskName, taskDueDate, taskDescription) {
    let taskId = randomId();

    const taskcreated = new task(taskId, taskName, taskDueDate, taskDescription);

    let newTask = document.createElement("div");

    newTask.innerHTML = `
        <p class="">${taskName}</p>
        <p class="">${taskDescription}</p>
        <p class="">${taskDueDate}</p>
    `;

    const task_container = document.getElementById("");
    
}

createGroup("NuevoGrupo", "Hola como esta");

console.log();