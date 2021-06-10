// * Aside Event Listeners

// (Event Listener) - Menu
function asideMenuEventListeners () {
    $("#AsideMenuDashboardBtn").click(() => {
        // save last location (when loaded, it will open there the Dashboard section)
        userData.userLastLocation = new lastLocation({
            "menuSection" : true,
            "menuSectionName" : "menu",
            "generalOverviewStatus" : false,
            "projectStatus" : false,
            "projectId" : undefined,
            "projectColor" : undefined,
            "specificTabStatus" : false,
            "tabId" : undefined
        });
        saveDataToDB();

        createDashboardTopBar();
        createDashboardMainCtr();
    });
}

// (Event Listener) - Other
function asideOtherEventListeners() {
    $("#asideOtherFeedbackBtn").on("click", function () {
        console.log("Ping");
        // TODO Finish the configuration of the feedback btn
    });
    $("#asideOtherConfigBtn").on("click", () => {
        // prepend the alert config dom
        $("body").prepend(`
            <div class="alertMax">
                <div class="alertMax__ctr">
                    <div class="alertMax__info">
                        <p>General Configuration</p>
                        <svg id="alertMaxBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                        </svg>
                    </div>
                    <form id="alertMaxConfigForm" class="alertMax__form" action="">
                        <div class="alertMax__form__input">
                            <label for="theme">Theme</label>
                            <select name="theme" id="alertMaxTheme" class="select">
                                <option value="light">Light</option>
                                <option value="night">Night</option>
                            </select>
                        </div>
                        <div class="alertMax__form__buttons">
                            <input class="btn btn--blue" type="submit" value="Save">
                        </div>
                    </form>
                </div>
            </div>
        `);
        // event close config
        $("#alertMaxBtnClose").on("click", () => {
            $(".alertMax").remove();
        });
        // capture data submited by user
        $("#alertMaxConfigForm").submit((event) => {
            event.preventDefault();
            if ($("#alertMaxTheme").val() != userConfig.theme) {
                userConfig.theme = $("#alertMaxTheme").val();
            }
            saveDataToDB();
        });
    });
}

// (Event Listener) - Projects
function asideProjectsEventListeners() {
    // Create a new project from btn (+)
    document.getElementById("prjsBtnCreate").addEventListener("click", () => {
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.innerHTML = "";
        // Create alertMin dom
        let alertMinDom = document.createElement("div");
        alertMinDom.className = "alertMin";
        alertMinDom.innerHTML = `
            <div class="alertMin__ctr">
                <div class="alertMin__info alertMin__info--blue">
                    <p>Create Project</p>
                    <svg id="alertMinBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
                </div>
                <form id="alertMinForm" class="alertMin__form" action="">
                    <div class="alertMin__form__input">
                        <label for="name">Name</label>
                        <input id="alertMinProjectName" class="input" type="text" name="name">
                    </div>
                    <div class="alertMin__form__input">
                        <label for="color">Project Color</label>
                        <select name="color" id="alertMinProjectColor" class="select">
                            <option value="orange">Orange</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                            <option value="red">Red</option>
                        </select>
                    </div>
                    <div class="alertMin__form__buttons">
                        <input class="btn btn-blue" type="submit">
                    </div>
                </form>
            </div>
        `;
        mainCtr.appendChild(alertMinDom);
        // Close alertMin
        document.getElementById("alertMinBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertMinDom);
        });
        // Capture data
        document.getElementById("alertMinForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let projectName = String(document.getElementById("alertMinProjectName").value);
            let projectColor = String(document.getElementById("alertMinProjectColor").value);
            if (projectName !== "") {
                // object creation
                let newProject = { "name": projectName, "color": projectColor };
                newProject = new project(newProject);
                userData.projects.push(newProject);
                // Project info DOM
                createProjectTopBarDom(newProject);
                // Create the default Project Overview Tab
                createOverviewDOM(newProject);
                saveDataToDB();
            }
        });
    });

    // Open a Project from Aside Btns
    let projectBtns = document.getElementsByClassName("prjs__prjs-ctr__prj");
    for (const ProjectBtn of projectBtns) {
        ProjectBtn.addEventListener("click", (event) => {
            userData.projects.forEach(projectProperties => {
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

// * Tasks Events Listeners
function tasksEventsListeners() {
    // (Event Listener) - Creating a task (+)
    document.getElementById("taskBtnCreate").addEventListener("click", (event) => {
        // * alertMin creation (DOM)
        let alertMinDom = document.createElement("div");
        alertMinDom.className = "alertMin";
        alertMinDom.innerHTML = `
            <div class="alertMin__ctr">
                <div class="alertMin__info alertMin__info--${userData.userLastLocation.projectColor}">
                    <p>Create Task</p>
                    <svg id="alertMinBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
                </div>
                <form id="alertMinForm" class="alertMin__form" action="">
                    <div class="alertMin__form__input">
                        <label for="name">Name</label>
                        <input id="alertMinTaskName" class="input" type="text" name="name">
                    </div>
                    <div class="alertMin__form__input">
                        <label for="dueDate">Due date</label>
                        <input id="alertMinTaskDueDate" class="input" type="" name="date" placeholder="dd/mm/yyyy">
                    </div>
                    <div class="alertMin__form__input--description">
                        <label for="description">Description</label>
                        <textarea id="alertMinTaskDescription" class="textarea" name="description" id=""></textarea>
                    </div>
                    <div class="alertMin__form__buttons">
                        <input class="btn btn--${userData.userLastLocation.projectColor}" type="submit">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertMinDom);
        // (Event Listener) - Close alertMin
        document.getElementById("alertMinBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertMinDom);
        });
        // (Event Listener) - Capture alertMin data
        document.getElementById("alertMinForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // task object instance creation
            let newTask = {
                "name": String(document.getElementById("alertMinTaskName").value),
                "dueDate": parseDate(String(document.getElementById("alertMinTaskDueDate").value)),
                "description": String(document.getElementById("alertMinTaskDescription").value)
            };
            if ((newTask.name != "") && (newTask.description != "")) {
                newTask = new task(newTask);
                // add the task
                userData.projects.forEach(projectProperties => {
                    if (projectProperties.id == userData.userLastLocation.projectId) {
                        projectProperties.tabs.forEach(tabProperties => {
                            if (tabProperties.id == userData.userLastLocation.tabId) {
                                tabProperties.tasks.push(newTask);
                                $(".alertMin").remove();
                                createTaskDom(newTask, true);
                                $(`#${newTask.id}`).fadeIn();
                                setTimeout(() => {
                                    saveDataToDB();
                                }, 400);
                            }
                        });
                    }
                });
            }
        });
    });

    // (Event Listener) - Delete a Task (trash)
    let btnsTaskDelete = document.getElementsByClassName("btnTaskDelete");
    for (const task of btnsTaskDelete) {
        task.addEventListener("click", (event) => {
            userData.projects.forEach(projectProperties => {
                if (projectProperties.id == userData.userLastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == userData.userLastLocation.tabId) {
                            let i = 0;
                            tabProperties.tasks.forEach(taskProperties => {
                                if (taskProperties.id == event.target.parentNode.parentNode.parentNode.parentNode.id) {
                                    tabProperties.tasks.splice(i, 1);
                                    $(`#${taskProperties.id}`).fadeOut();
                                    setTimeout(() => {
                                        saveDataToDB();
                                    }, 400);
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

    // (Event Listener) - Complete a Task (check)
    let btnsTaskComplete = document.getElementsByClassName("btnTaskComplete");
    for (const task of btnsTaskComplete) {
        task.addEventListener("click", (event) => {
            userData.projects.forEach(projectProperties => {
                if (projectProperties.id == userData.userLastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == userData.userLastLocation.tabId) {
                            tabProperties.tasks.forEach(taskProperties => {
                                if (taskProperties.id == event.target.parentNode.parentNode.parentNode.parentNode.id) {
                                    if (taskProperties.doneState === false) {
                                        taskProperties.doneState = true;
                                    }
                                    else if (taskProperties.doneState === true) {
                                        taskProperties.doneState = false;
                                    }
                                    saveDataToDB();
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}

// * Goals Events Listeners
function goalsEventsListeners() {
    // (Event Listener) - Create a Goal (+)
    document.getElementById("goalBtnCreate").addEventListener("click", () => {
        // Create alertMin DOM
        let alertMinDom = document.createElement("div");
        alertMinDom.className = "alertMin";
        alertMinDom.innerHTML = `
            <div class="alertMin__ctr">
                <div class="alertMin__info alertMin__info--${userData.userLastLocation.projectColor}">
                    <p>Create Goal</p>
                    <svg id="alertMinBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
                </div>
                <form id="alertMinForm" class="alertMin__form" action="">
                    <div class="alertMin__form__input">
                        <label for="name">Name</label>
                        <input id="alertMinGoalName" class="input" type="text" name="name">
                    </div>
                    <div class="alertMin__form__buttons">
                        <input class="btn btn--${userData.userLastLocation.projectColor}" type="submit">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertMinDom);
        // (Event Listener) - Event Close alertMin
        document.getElementById("alertMinBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertMinDom);
        });
        // (Event Listener) - Capture alertMin data
        document.getElementById("alertMinForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let goalName = String(document.getElementById("alertMinGoalName").value);
            // object creation
            let newGoal = { "name": goalName };
            newGoal = new goal(newGoal);
            // add the task
            userData.projects.forEach(projectProperties => {
                if (projectProperties.id == userData.userLastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == userData.userLastLocation.tabId) {
                            tabProperties.goals.push(newGoal);
                            $(".alertMin").remove().delay(1000);
                            createGoalDom(newGoal, true);
                            $(`#${newGoal.id}`).fadeIn();
                            setTimeout(() => {
                                saveDataToDB();
                            }, 400);
                        }
                    });
                }
            });
        });
    });

    // (Event Listener) - Delete a Goal (Trash)
    let btnGoalDelete = document.getElementsByClassName("btnGoalDelete");
    for (const goal of btnGoalDelete) {
        goal.addEventListener("click", (event) => {
            userData.projects.forEach(projectProperties => {
                if (projectProperties.id == userData.userLastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == userData.userLastLocation.tabId) {
                            let i = 0;
                            tabProperties.goals.forEach(goalProperties => {
                                if (goalProperties.id == event.target.parentNode.parentNode.id) {
                                    tabProperties.goals.splice(i, 1);
                                    $(`#${goalProperties.id}`).fadeOut();
                                    setTimeout(() => {
                                        saveDataToDB();
                                    }, 400);
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

    // (Event Listener) - Complete a Goal (check)
    let btnGoalComplete = document.getElementsByClassName("btnGoalComplete");
    for (const goal of btnGoalComplete) {
        goal.addEventListener("click", (event) => {
            userData.projects.forEach(projectProperties => {
                if (projectProperties.id == userData.userLastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == userData.userLastLocation.tabId) {
                            tabProperties.goals.forEach(goalProperties => {
                                if (goalProperties.id == event.target.parentNode.parentNode.id) {
                                    if (goalProperties.doneState === false) {
                                        goalProperties.doneState = true;
                                    }
                                    else if (goalProperties.doneState === true) {
                                        goalProperties.doneState = false;
                                    }
                                    saveDataToDB();
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}

// * Reminders Events Listeners
function remindersEventListeners() {
    // (Event Listener) - Create a Reminder (+)
    document.getElementById("reminderBtnCreate").addEventListener("click", () => {
        // Create alertMin DOM
        let alertMinDom = document.createElement("div");
        alertMinDom.className = "alertMin";
        alertMinDom.innerHTML = `
            <div class="alertMin__ctr">
                <div class="alertMin__info alertMin__info--${userData.userLastLocation.projectColor}">
                    <p>Create Reminder</p>
                    <svg id="alertMinBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
                </div>
                <form id="alertMinForm" class="alertMin__form" action="">
                    <div class="alertMin__form__input">
                        <label for="name">Name</label>
                        <input id="reminderName" class="input" type="text" name="name">
                    </div>
                    <div class="alertMin__form__input">
                        <label for="dueDate">Due date</label>
                        <input id="reminderDueDate" class="input" type="text" name="dueDate" placeholder="dd/mm/yyyy">
                    </div>
                    <div class="alertMin__form__buttons">
                        <input class="btn btn--${userData.userLastLocation.projectColor}" type="submit">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertMinDom);
        // (Event Listener) - Close alertMin
        document.getElementById("alertMinBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertMinDom);
        });
        // (Event Listener) - Capture Data
        document.getElementById("alertMinForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let newReminder = {
                name: String(document.getElementById("reminderName").value),
                dueDate: parseDate(String(document.getElementById("reminderDueDate").value))
            }
            // object creation
            if (newReminder.name != "") {
                newReminder = new reminder(newReminder);
                // add the reminder
                userData.projects.forEach(projectProperties => {
                    if (projectProperties.id == userData.userLastLocation.projectId) {
                        projectProperties.tabs.forEach(tabProperties => {
                            if (tabProperties.id == userData.userLastLocation.tabId) {
                                tabProperties.reminders.push(newReminder);
                                $(".alertMin").remove().delay(1000);
                                createReminderDom(newReminder, true);
                                $(`#${newReminder.id}`).fadeIn();
                                setTimeout(() => {
                                    saveDataToDB();
                                }, 400);
                            }
                        });
                    }
                });
            }
        });
    });

    // (Event Listener) - Delete Reminder (trash)
    let btnsReminderDelete = document.getElementsByClassName("btnReminderDelete");
    for (const reminder of btnsReminderDelete) {
        reminder.addEventListener("click", (event) => {
            userData.projects.forEach(projectProperties => {
                if (projectProperties.id == userData.userLastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == userData.userLastLocation.tabId) {
                            let i = 0;
                            tabProperties.reminders.forEach(reminderProperties => {
                                if (reminderProperties.id == event.target.parentNode.parentNode.id) {
                                    tabProperties.reminders.splice(i, 1);
                                    $(`#${reminderProperties.id}`).fadeOut();
                                    setTimeout(() => {
                                        saveDataToDB();
                                    }, 400);
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
    // (Event Listener) - Complete Reminder (check)
    let btnsReminderComplete = document.getElementsByClassName("btnReminderComplete");
    for (const reminder of btnsReminderComplete) {
        reminder.addEventListener("click", (event) => {
            userData.projects.forEach(projectProperties => {
                if (projectProperties.id == userData.userLastLocation.projectId) {
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == userData.userLastLocation.tabId) {
                            tabProperties.reminders.forEach(reminderProperties => {
                                if (reminderProperties.id == event.target.parentNode.parentNode.id) {
                                    if (reminderProperties.doneState === false) {
                                        reminderProperties.doneState = true;
                                    }
                                    else if (reminderProperties.doneState === true) {
                                        reminderProperties.doneState = false;
                                    }
                                    saveDataToDB();
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}