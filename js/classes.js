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
class reminder {
    constructor(reminderName, reminderDueDate) {
        this.id = randomId(userGoals);
        this.name = reminderName;
        this.dueDate = parseDate(reminderDueDate);
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