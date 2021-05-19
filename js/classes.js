class task {
    constructor(taskProperties) {
        this.id = taskProperties.id === undefined ? randomId(userTasks) : taskProperties.id;
        this.name = taskProperties.name;
        this.dueDate = parseDate(taskProperties.dueDate);
        this.description = taskProperties.description;
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
class goal {
    constructor(goalProperties) {
        this.id = goalProperties.id === undefined ? randomId(userGoals) : goalProperties.id;
        this.name = goalProperties.name;
        this.doneState = false;
    }
    changeName (newName) {
        this.name = newName;
    }
    finished() {
        this.doneState = true;
    }
}
class reminder {
    constructor(reminderProperties) {
        this.id = reminderProperties.id === undefined ? randomId(userGoals) : reminderProperties.id;
        this.name = reminderProperties.name;
        this.dueDate = parseDate(reminderProperties.dueDate);
        this.doneState = false;
    }
    changeName (newName) {
        this.name = newName;
    }
    changeDueDate (newDueDate) {
        this.dueDate = newDueDate;
    }
    finished () {
        this.doneState = true;
    }
}