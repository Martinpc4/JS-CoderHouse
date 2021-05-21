 // ! Contructors
class task {
    constructor(taskProperties) {
        this.id = taskProperties.id === undefined ? randomId(userTasks) : taskProperties.id;
        this.name = taskProperties.name;
        this.dueDate = taskProperties.dueDate;
        this.description = taskProperties.description;
        this.doneState = false;
    }
}
class goal {
    constructor(goalProperties) {
        this.id = goalProperties.id === undefined ? randomId(userGoals) : goalProperties.id;
        this.name = goalProperties.name;
        this.doneState = false;
    }
}
class reminder {
    constructor(reminderProperties) {
        this.id = reminderProperties.id === undefined ? randomId(userReminders) : reminderProperties.id;
        this.name = reminderProperties.name;
        this.dueDate = reminderProperties.dueDate;
        this.doneState = false;
    }
}

// ! Class Functions
function randomId(array) {
    let i = 0;
    let state = true;
    if (array.length == 0) {
        id = Math.floor(Math.random() * (100000 - 1) + 1);
    }
    else {
        while (state === true) {
            id = Math.floor(Math.random() * (100000 - 1) + 1);
            for (object of array) {
                if (object.id == id) {
                    break;
                }
                else if (object.id != id) {
                    if (array.length == i) {
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