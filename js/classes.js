// @ Classes
class project {
    constructor(projectProperties) {
        this.id = projectProperties.id === undefined ? randomId(userProjects) : projectProperties.id;
        this.name = projectProperties.name;
        this.tabs = projectProperties.tabs === undefined ? defaultTabs(this.id) : projectProperties.tabs;
        this.color = projectProperties.color === undefined ? "red" : projectProperties.color;
        this.fav = projectProperties.fav === undefined ? false : projectProperties.fav;
    }
}
class tab {
    constructor(tabProperties) {
        this.tabOf = tabProperties.tabOf;
        this.id = tabProperties.id;
        this.name = tabProperties.name;
        this.overview = tabProperties.overview === undefined ? false : tabProperties.overview;
        this.tasks = tabProperties.tasks;
        this.goals = tabProperties.goals;
        this.reminders = tabProperties.reminders;
    }
}
class task {
    constructor(taskProperties) {
        this.id = taskProperties.id;
        this.name = taskProperties.name;
        this.dueDate = taskProperties.dueDate;
        this.description = taskProperties.description;
        this.doneState = taskProperties.doneState === undefined ? false : taskProperties.doneState;
        this.onTime = this.doneState === false ? onTime(this.dueDate) : true;
    }
}
class goal {
    constructor(goalProperties) {
        this.id = goalProperties.id;
        this.name = goalProperties.name;
        this.doneState = goalProperties.doneState === undefined ? false : goalProperties.doneState;
    }
}
class reminder {
    constructor(reminderProperties) {
        this.id = reminderProperties.id;
        this.name = reminderProperties.name;
        this.dueDate = reminderProperties.dueDate;
        this.doneState = reminderProperties.doneState === undefined ? false : reminderProperties.doneState;
        this.onTime = this.doneState === false ? onTime(this.dueDate) : true;
    }
}

// @ Class Functions
function defaultTabs(projectId) {
    let defaultTabsArray = [];
    let overview = {
        tabOf: `${projectId}`,
        id: randomId([]),
        name: "Overview",
        goals: undefined,
        tasks: undefined,
        reminders: undefined,
        overview: true,
    };
    overview = new tab(overview);
    defaultTabsArray.push(overview);
    return (defaultTabsArray);
}
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