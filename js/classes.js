// ! Classes

class lastLocation {
    constructor(lastLocationProperties) {
        this.menuSection = lastLocationProperties.menuSection;
        this.menuSectionName = lastLocationProperties.menuSectionName;
        this.generalOverviewStatus = lastLocationProperties.generalOverviewStatus;
        this.projectStatus = lastLocationProperties.projectStatus;
        this.projectId = lastLocationProperties.projectId;
        this.projectColor = lastLocationProperties.projectColor;
        this.specificTabStatus = lastLocationProperties.specificTabStatus;
        this.tabId = lastLocationProperties.tabId;
    }
}
class user {
    constructor(userProperties) {
        this.userId = userProperties.userId;
        this.name = userProperties.name;
        this.lastName = userProperties.lastName;
        this.userConfig = userProperties.userConfig;
        this.projects = userProperties.userProjects;
        this.userLastLocation = userProperties.userLastLocation;
    }
}
class project {
    constructor(projectProperties) {
        this.id = projectProperties.id === undefined ? randomId(userData.projects) : projectProperties.id;
        this.name = projectProperties.name;
        this.tabs = projectProperties.tabs === undefined ? defaultTabs(this.id) : projectProperties.tabs;
        this.color = projectProperties.color === undefined ? "red" : projectProperties.color;
        this.fav = projectProperties.fav === undefined ? false : projectProperties.fav;
        this.onTime = projectProperties.onTime;
    }
    checkOnTime() {
        // Defining variable that will determine if there is an overdue task
        let isThere = false;

        // Checking the dueDate and doneState variable from tasks to evaluate if there are onTime or not
        this.tabs.forEach(tabProperties => {
            if (tabProperties.overview === false) {
                if (tabProperties.tasks != undefined) {
                    tabProperties.tasks.forEach(taskProperties => {
                        if (((onTime(taskProperties.dueDate)) === false) && (taskProperties.doneState === false)) {
                            isThere = true;
                        }
                    });
                }
                if (tabProperties.reminders != undefined) {
                    tabProperties.reminders.forEach(reminderProperties => {
                        if (((onTime(reminderProperties.dueDate)) === false) && (reminderProperties.doneState === false)) {
                            isThere = true;
                        }
                    });
                }
            }
        });

        // Updating values according to the isThere variable
        if (isThere === false) {
            this.onTime = true;
            return true;
        }
        else if (isThere === true) {
            this.onTime = false;
            return false;
        }
    }
}
class tab {
    constructor(tabProperties) {
        this.tabOf = tabProperties.tabOf;
        this.id = tabProperties.id;
        this.name = tabProperties.name;
        this.overview = tabProperties.overview === undefined ? false : tabProperties.overview;
        this.tasks = tabProperties.tasks == undefined ? [] : tabProperties.tasks;
        this.goals = tabProperties.goals == undefined ? [] : tabProperties.goals;
        this.reminders = tabProperties.reminders == undefined ? [] : tabProperties.reminders;
    }
}
// Wed Dec 31 1969 21:00:00 GMT-0300 (-03)
class task {
    constructor(taskProperties) {
        this.id = taskProperties.id;
        this.name = taskProperties.name;
        this.dueDate = taskProperties.dueDate;
        this.description = taskProperties.description;
        this.doneState = taskProperties.doneState === undefined ? false : taskProperties.doneState;
    }
    generateDOM(display) {
        $("#tasksCtr").prepend(`
            <div id=${this.id} class="task" ${display === true ? 'style="display: none;"' : ""}>
                <div class="task__bar background-${userData.userLastLocation.projectColor}"></div>
                <div class="task__ctr">
                    <p class="task__title">${this.name}</p>
                    <p class="task__dueDate">
                        ${this.dueDate === false ? "" : String(this.dueDate.getDate()) + `/` + String(this.dueDate.getMonth() + 1) + `/` + String(this.dueDate.getFullYear())}
                    </p>
                    <p class="task__description">${this.description}</p>
                    <div class="task__actions">
                        <div class="task__actions-complete">
                            ${this.doneState === false ? `
                            <svg class="btnTaskComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"/>
                            </svg>
                            ` : `
                            <svg class="btnTaskComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"/><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/>
                            </svg>
                            `}
                        </div>
                        <div class="task__actions-delete">
                            <svg class="btnTaskDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"/><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"/><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
    complete() {
        if (this.doneState === true) {
            this.doneState = false;
            this.onTime = true;
        }
        else if (this.doneState === false) {
            this.doneState = true;
            this.onTime = onTime(this.dueDate);
        }
        saveDataToDB();
        reloadTab();
    }
}
class goal {
    constructor(goalProperties) {
        this.id = goalProperties.id;
        this.name = goalProperties.name;
        this.doneState = goalProperties.doneState === undefined ? false : goalProperties.doneState;
    }
    generateDOM(display) {
        $("#goalsCtr").append(`
            <div id="${this.id}" class="goal" ${display === true ? 'style="display: none;"' : ""}>
                <div class="goal__actions-complete">
                    ${this.doneState === false ? `
                        <svg class="btnGoalComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"/>
                        </svg>
                    ` : `
                        <svg class="btnGoalComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"/><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/>
                        </svg>
                    `}
                </div>
                <p class="goal__title">${this.name}</p>
                <div class="goal__actions-delete">
                    <svg class="btnGoalDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"/><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"/><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"/>
                    </svg>
                </div>
            </div>
        `);
    }
    complete() {
        console.log(this.doneState);
        if (this.doneState === true) {
            this.doneState = false;
        }
        else if (this.doneState === false) {
            this.doneState = true;
        }
        console.log(this.doneState);
        saveDataToDB();
        reloadTab();
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
    checkOnTime() {
        if (this.doneState === true) {
            this.onTime = true;
        }
        else if ((this.doneState === false) && (onTime(this.dueDate)) !== (this.onTime)) {
            this.onTime = onTime(this.dueDate);
            saveDataToDB();
        }
    }
    generateDOM(display) {
        $("#remindersCtr").append(`
            <div id="${this.id}" class="reminder" ${display === true ? 'style="display: none;"' : ""}>
                <div class="reminder__actions-complete">
                    ${this.doneState === false ? `
                        <svg class="btnReminderComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"/>
                        </svg>
                    ` : `
                        <svg class="btnReminderComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"/><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/>
                        </svg>
                    `}
                </div>
                ${this.onTime === true ? `<div class="reminder__status reminder__status--onTime"></div>` : `<div class="reminder__status reminder__status--overdue"></div>`}
                <p class="reminder__title">${this.name}</p>
                <p class="reminder__dueDate">${this.dueDate === false ? "" : String(this.dueDate.getDate()) + "/" + String(this.dueDate.getMonth() + 1) + "/" + String(this.dueDate.getFullYear())}</p>
                <div class="reminder__actions-delete">
                    <svg class="btnReminderDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"/><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"/><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"/>
                    </svg>
                </div>
            </div>
        `);
    }
    complete() {
        if (this.doneState === true) {
            this.doneState = false;
        }
        else if (this.doneState === false) {
            this.doneState = true;
        }
        this.checkOnTime();
        saveDataToDB();
        reloadTab();
    }
}

// ! Classes' functions

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

// ! Multi-use class-related Functions

function parseDate(date) {
    if (date === "") {
        return false;
    }
    else {
        date = String(date);
        date = date.replaceAll(" ", "");
        let dateArray = date.split("/");
        let newDate = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0])
        return newDate;
    }
}
function onTime(date) {
    if (date != false) {
        const todayDate = new Date();
        const todayMonth = (Number(todayDate.getMonth()) + 1);
        const todayDay = Number(todayDate.getDate());
        const todayYear = Number(todayDate.getFullYear());

        if (todayYear < Number(date.getFullYear())) {
            return true;
        }
        else if (todayYear > Number(date.getFullYear())) {
            return false;
        }
        else if (todayYear == Number(date.getFullYear())) {
            if (todayMonth < Number((date.getMonth() + 1))) {
                return true;
            }
            else if (todayMonth > Number((date.getMonth() + 1))) {
                return false;
            }
            else if (todayMonth == Number((date.getMonth() + 1))) {
                if (todayDay < Number(date.getDate())) {
                    return true
                }
                else if (todayDay > Number(date.getDate())) {
                    return false;
                }
                else if (todayDay == Number(date.getDate())) {
                    return true;
                }
            }
        }
    }
    else {
        return true;
    }
}