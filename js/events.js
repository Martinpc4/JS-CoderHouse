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
                    <svg id="alertBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Name</label>
                        <input id="alertProjectName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__input">
                        <label for="color">Project Color</label>
                        <select name="color" id="alertProjectColor" class="select">
                            <option value="orange">Orange</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                            <option value="red">Red</option>
                        </select>
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn blue" type="submit">
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
            if (projectName != "") {
                // object creation
                let newProject = { "name": projectName, "color": projectColor };
                newProject = new project(newProject);
                userProjects.push(newProject);
                // Project info DOM
                createProjectTopBarDom(newProject);
                // Create the default Project Overview Tab
                createOverviewDOM(newProject);
                saveStorage();
            }
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
                    <svg id="alertBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
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
                        <input class="btn ${lastLocation.projectColor}" type="submit">
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
            // task object instance creation
            let newTask = { 
                "name": String(document.getElementById("alertTaskName").value),
                "dueDate": parseDate(String(document.getElementById("alertTaskDueDate").value)),
                "description": String(document.getElementById("alertTaskDescription").value)
            };
            if ((newTask.name != "") && (newTask.description != "")) {
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
            }
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
                                // console.log(event.target.parentNode.parentNode.parentNode.id);
                                if (taskProperties.id == event.target.parentNode.parentNode.parentNode.parentNode.id) {
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
                                if (taskProperties.id == event.target.parentNode.parentNode.parentNode.parentNode.id) {
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
                    <svg id="alertBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Name</label>
                        <input id="alertGoalName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn ${lastLocation.projectColor}" type="submit">
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
                                if (goalProperties.id == event.target.parentNode.parentNode.id) {
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
                                if (goalProperties.id == event.target.parentNode.parentNode.id) {
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
                    <svg id="alertBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
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
                        <input class="btn ${lastLocation.projectColor}" type="submit">
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
            let newReminder = {
                name : String(document.getElementById("reminderName").value),
                dueDate : parseDate(String(document.getElementById("reminderDueDate").value))
            }
            // object creation
            if (newReminder.name != "") {
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
            }
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