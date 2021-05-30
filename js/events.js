// @ Projects Events Listeners

// - Event Listener Create Project (+)
function projectEventCreateListener() {
    // ! Create a new project (+)
    document.getElementById("prjsBtnCreate").addEventListener("click", () => {
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.innerHTML = "";

        // * Create alert dom
        let alertDom = document.createElement("div");
        alertDom.className = "alert";
        alertDom.innerHTML = `
            <div class="alert__ctr">
                <div class="alert__info alert__info--blue">
                    <p>Create Project</p>
                    <i id="alertBtnClose" class="bi bi-x-lg"></i>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Name</label>
                        <input id="alertProjectName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__input">
                        <label for="color">Project Color</label>
                        <select name="color" id="alertProjectColor">
                            <option value="orange">Orange</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                            <option value="red">Red</option>
                        </select>
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn btn--blue" type="submit">
                    </div>
                </form>
            </div>
        `;
        mainCtr.appendChild(alertDom);
        // * Close alert
        document.getElementById("alertBtnClose").addEventListener("click", () => {
            saveStorage();
        });
        // * Capture data
        document.getElementById("alertForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let projectName = String(document.getElementById("alertProjectName").value);
            let projectColor = String(document.getElementById("alertProjectColor").value);
            // object creation
            let newProject = { "name": projectName, "color": projectColor };
            newProject = new project(newProject);
            userProjects.push(newProject);
            // Project info DOM
            createProjectTopBarDom(newProject);
            // Create the default Project Overview Tab
            createOverviewDOM(newProject);
            saveStorage();
        });
    });    
}
// - Event Listener Open Project
function projectEventOpenListener () {
    // ! Open a Project from Aside Btns
    let projectBtns = document.getElementsByClassName("prjs__prjs-ctr__prj");
    for (const ProjectBtn of projectBtns) {
        ProjectBtn.addEventListener("click", (event) => {
            userProjects.forEach(projectProperties => {
                if (projectProperties.id == event.target.parentNode.id) {
                    // * Project info DOM
                    createProjectTopBarDom(projectProperties);
                    // * Create the default Project Overview Tab
                    createOverviewDOM(projectProperties);
                }
            });
        });
    }
}

// @ Tasks Events Listeners
function tasksEventsListeners () {
    // - Event for creating a task (btn +)
    document.getElementById("taskBtnCreate").addEventListener("click", (event) => {
        // * Alert creation (DOM)
        let alertDom = document.createElement("div");
        console.log(lastLocation.projectColor);
        alertDom.className = "alert";
        alertDom.innerHTML = `
            <div class="alert__ctr">
                <div class="alert__info alert__info--${lastLocation.projectColor}">
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
                        <input class="btn btn--${lastLocation.projectColor}" type="submit">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertDom);

        // * Close Alert (Event)

        document.getElementById("alertBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertDom);
        });

        // * Capture alert data (Event)
        document.getElementById("alertForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let taskName = String(document.getElementById("alertTaskName").value);
            let taskDueDate = String(document.getElementById("alertTaskDueDate").value);
            let taskDescription = String(document.getElementById("alertTaskDescription").value);
            // task object instance creation
            let newTask = { "name": taskName, "dueDate": parseDate(taskDueDate), "description": taskDescription };
            newTask = new task(newTask);
            // add the task
            userProjects.forEach(projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == lastLocation.tabId) {
                            tabProperties.tasks.push(newTask);
                            saveStorage();
                        }
                    });
                }
            });
        });
    });

    // - Delete a Task
    let btnsTaskDelete = document.getElementsByClassName("btnTaskDelete");
    for (const task of btnsTaskDelete) {
        task.addEventListener("click", (event) => {
            userProjects.forEach(projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == lastLocation.tabId) {
                            let i = 0;
                            tabProperties.tasks.forEach(taskProperties => {
                                if (taskProperties.id == event.target.parentNode.parentNode.parentNode.id) {
                                    tabProperties.tasks.splice(i, 1);
                                    saveStorage();
                                }
                                else {
                                    i++;
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    // - Complete a Task
    let btnsTaskComplete = document.getElementsByClassName("btnTaskComplete");
    for (const task of btnsTaskComplete) {
        task.addEventListener("click", (event) => {
            userProjects.forEach( projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.forEach( tabProperties => {
                        if (tabProperties.id == lastLocation.tabId) {
                            tabProperties.tasks.forEach( taskProperties => {
                                if (taskProperties.id == event.target.parentNode.parentNode.parentNode.id) {
                                    if (taskProperties.doneState === false) {
                                        taskProperties.doneState = true;
                                    }
                                    else if (taskProperties.doneState === true) {
                                        taskProperties.doneState = false;
                                    }
                                    saveStorage();
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}

// @ Goals Events Listeners
function goalsEventsListeners() {
    // * Create a Goal
    document.getElementById("goalBtnCreate").addEventListener("click", () => {
        // - DOM Alert
        let alertDom = document.createElement("div");
        alertDom.className = "alert";
        alertDom.innerHTML = `
            <div class="alert__ctr">
                <div class="alert__info alert__info--${lastLocation.projectColor}">
                    <p>Create Goal</p>
                    <i id="alertBtnClose" class="bi bi-x-lg"></i>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Name</label>
                        <input id="alertGoalName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn btn--${lastLocation.projectColor}" type="submit">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertDom);

        // * Event Close Alert
        document.getElementById("alertBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertDom);
        });

        // * Capture alert data (Event)
        document.getElementById("alertForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let goalName = String(document.getElementById("alertGoalName").value);
            // object creation
            let newGoal = { "name": goalName };
            newGoal = new goal(newGoal);
            // add the task
            userProjects.forEach(projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == lastLocation.tabId) {
                            tabProperties.goals.push(newGoal);
                            saveStorage();
                        }
                    });
                }
            });
        });
    });
    // - Delete a Goal
    let btnGoalDelete = document.getElementsByClassName("btnGoalDelete");
    for (const goal of btnGoalDelete) {
        goal.addEventListener("click", (event) => {
            userProjects.forEach( projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.forEach( tabProperties => {
                        if (tabProperties.id == lastLocation.tabId) {
                            let i = 0;
                            tabProperties.goals.forEach( goalProperties => {
                                if (goalProperties.id == event.target.parentNode.id) {
                                    tabProperties.goals.splice(i, 1);
                                    saveStorage();
                                }
                                else {
                                    i ++;
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    // - Complete a Goal
    let btnGoalComplete = document.getElementsByClassName("btnGoalComplete");
    for (const goal of btnGoalComplete) {
        goal.addEventListener("click", (event) => {
            userProjects.forEach( projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.forEach( tabProperties => {
                        if (tabProperties.id == lastLocation.tabId) {
                            tabProperties.goals.forEach( goalProperties => {
                                if (goalProperties.id == event.target.parentNode.id) {
                                    if (goalProperties.doneState === false) {
                                        goalProperties.doneState = true;
                                    }
                                    else if (goalProperties.doneState === true) {
                                        goalProperties.doneState = false;
                                    }
                                    saveStorage();
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}

// @ Reminders Events Listeners
function remindersEventListeners() {
    // - Create a Reminder
    document.getElementById("reminderBtnCreate").addEventListener("click", () => {
        // * DOM Alert
        let alertDom = document.createElement("div");
        alertDom.className = "alert";
        alertDom.innerHTML = `
            <div class="alert__ctr">
                <div class="alert__info alert__info--${lastLocation.projectColor}">
                    <p>Create Reminder</p>
                    <i id="alertBtnClose" class="bi bi-x-lg"></i>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Name</label>
                        <input id="reminderName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__input">
                        <label for="dueDate">Due date</label>
                        <input id="reminderDueDate" class="input" type="text" name="dueDate" placeholder="dd/mm/yyyy">
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn btn--${lastLocation.projectColor}" type="submit">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertDom);

        // * Event Close Alert
        document.getElementById("alertBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertDom);
        });

        // * Event Capture Data
        document.getElementById("alertForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let reminderName = String(document.getElementById("reminderName").value);
            let reminderDueDate = String(document.getElementById("reminderDueDate").value);
            // object creation
            let newReminder = { "name": reminderName, "dueDate": parseDate(reminderDueDate) };
            newReminder = new reminder(newReminder);
            // add the reminder
            userProjects.forEach(projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == lastLocation.tabId) {
                            tabProperties.reminders.push(newReminder);
                            saveStorage();
                        }
                    });
                }
            });
        });
    });
    // - Delete Reminder
    let btnsReminderDelete = document.getElementsByClassName("btnReminderDelete");
    for (const reminder of btnsReminderDelete) {
        reminder.addEventListener("click", (event) => {
            userProjects.forEach( projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.forEach( tabProperties => {
                        if (tabProperties.id == lastLocation.tabId) {
                            let i = 0;
                            tabProperties.reminders.forEach( reminderProperties => {
                                console.log(tabProperties.reminders);
                                if (reminderProperties.id == event.target.parentNode.parentNode.id) {
                                    tabProperties.reminders.splice(i, 1);
                                    saveStorage();
                                }
                                else {
                                    i ++;
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    // - Complete Reminder
    let btnsReminderComplete = document.getElementsByClassName("btnReminderComplete");
    for (const reminder of btnsReminderComplete) {
        reminder.addEventListener("click", (event) => {
            userProjects.forEach( projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.forEach( tabProperties => {
                        if (tabProperties.id == lastLocation.tabId) {
                            tabProperties.reminders.forEach( reminderProperties => {
                                if (reminderProperties.id == event.target.parentNode.parentNode.id) {
                                    if (reminderProperties.doneState === false) {
                                        reminderProperties.doneState = true;
                                    }
                                    else if (reminderProperties.doneState === true) {
                                        reminderProperties.doneState = false;
                                    }
                                    saveStorage();
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}