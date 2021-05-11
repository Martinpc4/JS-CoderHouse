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

console.log(userTasks);

const newTask = new task(randomId(), String(prompt("Ingrese el nombre de la tarea")), String(prompt("Ingrese la fecha de terminación (dd/mm/yyyy):")), String(prompt("Ingrese la descripción:")));
const newTask2 = new task(randomId(), "Hola2", "11/12/21", "Sample Text1");

userTasks.push(newTask);
console.log(userTasks);

userTasks.push(newTask2);
console.log(userTasks);

userTasks.sort(x => x.id);

let realizado = String(prompt("Termino la tarea? (si/no):"));

if ((realizado.toLowerCase()) == "si") {
    userTasks[0].finished();
}

console.log(userTasks);

let eliminar = String(prompt("Quiere eliminar la primera tarea? (si/no):"));
if ((eliminar.toLowerCase()) == "si") {
    deleteTask(userTasks[0].id);
}

console.log(userTasks);