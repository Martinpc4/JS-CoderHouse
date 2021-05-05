let userTasks = [];

function deleteTask (taskName) {
    if (userTasks.find(taskName => taskName) != undefined) {
        let i = 0;
        for (const task of userTasks) {
            if (task == taskName) {
                userTasks.splice(i, 1);
            }
            i++;
        }
    }
}

function randomId () {
    let id = 0;
    let i = 0;
    let state = true;
    if (userTasks.length == 0) {
        id = Math.floor(Math.random() * (100000-1)+1);
    }
    else {
        while (state === true) {
            id = Math.floor(Math.random() * (100000-1)+1);
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
    constructor (id, name, dueDate, description) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.doneState = false;
    }
}

console.log(userTasks);
const martinTask = new task(randomId(), "Hola2", "11/12/21", "Sample Text1");
userTasks.pop(martinTask);
const martinTask2 = new task(randomId(), "Hola2", "11/12/21", "Sample Text1");
userTasks.pop(martinTask2);
console.log(userTasks);