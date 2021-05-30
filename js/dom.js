// @ Top Bar DOM Functions

// ! Create Project Top Bar DOM
function createProjectTopBarDom(projectProperties) {
    // - Create Top Bar Ctr
    const topBarCtr = document.getElementById("topBarCtr");
    topBarCtr.innerHTML = "";

    // * Create topBarInfoCtr
    const topBarInfoCtr = document.createElement("div");
    topBarInfoCtr.className = "top-bar__title-ctr";
    topBarInfoCtr.id = "topBarInfoCtr";
    topBarInfoCtr.innerHTML = `
        ${ projectProperties.fav === false ? `<i id="prjBtnFav" class="far fa-star"></i>` : `<i id="prjBtnFav" class="fas fa-star"></i>`}
        <p>${projectProperties.name}</p>
    `;
    topBarCtr.appendChild(topBarInfoCtr);

    // * Create topBarInfoActionsCtr
    const topBarInfoActionsCtr = document.createElement("div");
    topBarInfoActionsCtr.className = "top-bar__info-actions-ctr";
    topBarInfoActionsCtr.id = "topBarInfoActionsCtr";
    topBarInfoActionsCtr.innerHTML = `
        <i id="prjBtnConfig" class="fas fa-cog"></i>
    `;
    topBarCtr.appendChild(topBarInfoActionsCtr);
    
    // * Create Config event listener
    document.getElementById("prjBtnConfig").addEventListener("click", () => {
        let alertDom = document.createElement("div");
        alertDom.className = "alert";
        alertDom.innerHTML = `
            <div class="alert__ctr">
                <div class="alert__info alert__info--${lastLocation.projectColor}">
                    <p>${projectProperties.name}</p>
                    <i id="alertBtnClose" class="fas fa-times"></i>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Change name</label>
                        <input id="alertProjectNewName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__input">
                        <label for="color">Change color</label>
                        <select name="color" class="select" id="alertProjectNewColor">
                            <option value="orange">Orange</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                            <option value="red">Red</option>
                        </select>
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn btn--${lastLocation.projectColor}" type="submit" value="Save">
                        <input id="alertProjectBtnDelete" class="btn btn--${lastLocation.projectColor}" type="button" value="Delete Project">
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

        // * Capture alert data (Config)
        document.getElementById("alertForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // change name
            let alertProjectNewName = String(document.getElementById("alertProjectNewName").value);
            if ((projectProperties.name != alertProjectNewName) && !(alertProjectNewName === "")) {
                projectProperties.name = alertProjectNewName;
            }
            // change color
            let alertProjectNewColor = String(document.getElementById("alertProjectNewColor").value);
            if (projectProperties.color != alertProjectNewColor) {
                projectProperties.color = alertProjectNewColor;
                lastLocation.projectColor = alertProjectNewColor;
            }
            saveStorage();
        });

        // * Event delete project (btn)
        document.getElementById("alertProjectBtnDelete").addEventListener("click", () => {
            let i = 0;
            userProjects.forEach( prjProperties => {
                if (prjProperties.id == projectProperties.id) {
                    userProjects.splice(i, 1);
                    saveStorage();
                }
                else {
                    i++;
                }
            });
        });
    });
    
    // * Create topBarTabsCtr
    const topBarTabsCtr = document.createElement("div");
    topBarTabsCtr.className = "top-bar__tabs-ctr";
    topBarTabsCtr.id = "topBarTabsCtr";
    projectProperties.tabs.forEach(projectTab => {
        let newTab = document.createElement("div");
        newTab.className = "top-bar__tabs-ctr__tab tab-link";
        newTab.id = `${projectTab.id}`;
        newTab.innerHTML = `
        <p>${projectTab.name}</p>
        `;
        topBarTabsCtr.appendChild(newTab);
    });
    topBarCtr.appendChild(topBarTabsCtr);
    
    // * Create event listeners for each tab
    const TabLinks = document.getElementsByClassName("top-bar__tabs-ctr__tab");
    for (const TabLink of TabLinks) {
        TabLink.addEventListener("click", (event) => {
            userProjects.forEach(projectProperties => {
                projectProperties.tabs.forEach(tabProperties => {
                    if (tabProperties.id == event.target.parentNode.id) {
                        if (tabProperties.overview === false) {
                            createTabDom(tabProperties);
                        }
                        else if (tabProperties.overview === true) {
                            createOverviewDOM(projectProperties);
                        }
                    }
                });
            });
        });
    }
    // * Create the event listener to set a project as favourite
    document.getElementById("prjBtnFav").addEventListener("click", () => {
        userProjects.forEach( projectProperties => {
            if (projectProperties.id == lastLocation.projectId) {
                if (projectProperties.fav == true) {
                    projectProperties.fav = false;
                }
                else if (projectProperties.fav == false) {
                    projectProperties.fav = true;
                }
                saveStorage();
            }
        });
    });
}

// @ Main Container DOM Functions

// ! Overview Tab DOM
function createOverviewDOM(projectProperties) {
    // - Save last location
    if ((lastLocation.generalOverviewStatus === false) || (lastLocation.projectId != projectProperties.id)) {
        lastLocation.generalOverviewStatus = true;
        lastLocation.projectStatus = true;
        lastLocation.projectId = projectProperties.id;
        lastLocation.projectColor = projectProperties.color;
        lastLocation.specificTabStatus = false;
        lastLocation.tabId = undefined;
        saveStorage();
    }
    // - (Project Status Component) Generate stats
    // * Create the project status
    let prjOnTime = undefined;
    projectProperties.tabs.forEach( tabProperties => {
        if (tabProperties.overview === false) {
            tabProperties.tasks.forEach( taskProperties => {
                if (taskProperties.onTime === false) {
                    prjOnTime = false;
                }
            });
        } 
    });
    // * Create the number of completed tasks and goals in the project
    let completedTotal = 0;
    let totalExisting = 0;
    projectProperties.tabs.forEach( tabProperties => {
        if (tabProperties.overview === false) {
            tabProperties.tasks.forEach( taskProperties => {
                if (taskProperties.doneState === true) {
                    completedTotal++;
                    totalExisting++;
                }
                else {
                    totalExisting++;
                }
            });
            tabProperties.goals.forEach( goalProperties => {
                if (goalProperties.doneState === true) {
                    completedTotal++;
                    totalExisting++
                }
                else {
                    totalExisting++;
                }
            });
            tabProperties.reminders.forEach( reminderProperties => {
                if (reminderProperties.doneState === true) {
                    completedTotal++;
                    totalExisting++;
                }
                else {
                    totalExisting++;
                }
            });
        }
    });
    // * Create the percentage of completed tasks and goals in the project
    let completedPrjPercentage = Math.floor((completedTotal * 100) / totalExisting);
    if (isNaN(completedPrjPercentage)) {
        completedPrjPercentage = 0;
    }
    // - Generate overview components DOM
    const mainCtr = document.getElementById("mainCtr");
    mainCtr.innerHTML = "";
    let prjOverview = document.createElement("div");
    prjOverview.className = "prj-overview";
    prjOverview.innerHTML = `
        <div class="tabs-stat">
            <div class="tabs-stat__hrds">
                <div class="tabs-stat__hrds__ctr-hdr">
                    <p>${projectProperties.name}'s Tabs</p>
                </div>
                <div class="tabs-stat__hrds__type-hdr">
                    <div class="tabs-stat__hrds__type-hdr__type">
                        <p>Tasks</p>
                    </div>
                    <div class="tabs-stat__hrds__type-hdr__type">
                        <p>Goals</p>
                    </div>
                    <div class="tabs-stat__hrds__type-hdr__type">
                        <p>Reminders</p>
                    </div>
                </div>
                <div class="tabs-stat__hrds__actions">
                    <i id="overviewBtnTabsCreate" class="fas fa-plus"></i>
                </div>
            </div>
            <div id="overviewPrjStatsTabCtr" class="tabs-stat__ctr">
            </div>
        </div>
        <div class="prj-status">
            <div class="prj-status__time">
                <div class="prj-status__time__hdr">
                    <p>Status</p>
                </div>
                ${
                    prjOnTime === false ? `
                        <div class="prj-status__time__status prj-status__time__status--delayed">
                            <p>Delayed</p>
                        </div>
                    `: `
                        <div class="prj-status__time__status prj-status__time__status--onTime">
                            <p>On time</p>
                        </div>
                    `
                }
            </div>
            <div class="prj-status__completed">
                <div class="prj-status__completed__hdr">
                    <p>Completed</p>
                </div>
                <div class="prj-status__completed__data">
                    <p>${completedTotal}/${totalExisting}</p>
                </div>
            </div>
            <div class="prj-status__percentage">
                <div class="prj-status__percentage__data">
                    <div class="prj-status__percentage__data__ctr">
                        <p>${completedPrjPercentage}%</p>
                    </div>
                </div>
                <div class="prj-status__percentage__hdr">
                    <p>completed</p>
                </div>
            </div>
        </div>
    `;
    mainCtr.appendChild(prjOverview);

    // - Tab Stats Component event Listeners
    // * (Tab Stats Component) Create the create event listener
    document.getElementById("overviewBtnTabsCreate").addEventListener("click", () => {
        // Alert creation (DOM)
        let alertDom = document.createElement("div");
        alertDom.className = "alert";
        alertDom.innerHTML = `
            <div class="alert__ctr">
                <div class="alert__info alert__info--${lastLocation.projectColor}">
                    <p>Create new Tab</p>
                    <i id="alertBtnClose" class="fas fa-times"></i>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Name</label>
                        <input id="alertTabName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn btn--${lastLocation.projectColor}" type="submit">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertDom);
        // Close alert
        document.getElementById("alertBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertDom);
        });
        // Capture data
        document.getElementById("alertForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let tabName = String(document.getElementById("alertTabName").value);
            // tab object creation
            let newTab = { "name": tabName, "tabOf": lastLocation.projectId, "overview": false, };
            newTab = new tab(newTab);
            // adding the new tab to the project
            userProjects.forEach(projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.push(newTab);
                    saveStorage();
                }
            });
        });
    });
    // * (Tab Stats Component) Fill the overview projects container
    const overviewPrjCtr = document.getElementById("overviewPrjStatsTabCtr");
    projectProperties.tabs.forEach(tabProperties => {
        if (tabProperties.overview === false) {
            // * Count the amount of tasks, goals and reminders
            let tasksNotFinished = 0;
            let goalsNotFinished = 0;
            let remindersNotFinished = 0;

            tabProperties.tasks.forEach(taskProperties => {
                if (taskProperties.doneState == false) {
                    tasksNotFinished++;
                }
            });
            tabProperties.goals.forEach(goalProperties => {
                if (goalProperties.doneState == false) {
                    goalsNotFinished++;
                }
            });
            tabProperties.reminders.forEach(reminderProperties => {
                if (reminderProperties.doneState == false) {
                    remindersNotFinished++;
                }
            });

            // * create the DOM for a new tab
            let newTab = document.createElement("div");
            newTab.className = "tabs-stat__ctr__tab";
            newTab.id = `${tabProperties.id}`;
            newTab.innerHTML = `
                <div class="tabs-stat__ctr__tab__hdr-ctr">
                    <div class="tabs-stat__ctr__tab__hdr-ctr__hdr">
                        <p>${tabProperties.name}</p>
                    </div>
                </div>
                <div class="tabs-stat__ctr__tab__types">
                    <div class="tabs-stat__ctr__tab__types__type">
                        <p>${tasksNotFinished}</p>
                    </div>
                    <div class="tabs-stat__ctr__tab__types__type">
                        <p>${goalsNotFinished}</p>
                    </div>
                    <div class="tabs-stat__ctr__tab__types__type">
                        <p>${remindersNotFinished}</p>
                    </div>
                </div>
                <div class="tabs-stat__ctr__tab__actions">
                    <i class="overviewBtnsTabsDelete fas fa-trash"></i>
                </div>
            `;
            overviewPrjCtr.appendChild(newTab);
        }
        // * (Tab Stats Component) Create event listener for the deletion of each tab
        for (const overviewBtnTabDelete of document.getElementsByClassName("overviewBtnsTabsDelete")) {
            overviewBtnTabDelete.addEventListener("click", (event) => {
                userProjects.forEach(projectProperties => {
                    if (projectProperties.id == lastLocation.projectId) {
                        let i = 0;
                        projectProperties.tabs.forEach(tabProperties => {
                            if (tabProperties.id == event.target.parentNode.parentNode.id) {
                                projectProperties.tabs.splice(i, 1);
                                saveStorage();
                            }
                            else {
                                i++;
                            }
                        });
                    }
                });
            });
        }
    });
}
// ! General Tab Dom
function createTabDom(tabProperties) {
    // - Save last location
    if (lastLocation.specificTabStatus === false) {
        userProjects.forEach( projectProperties => {
            if (projectProperties.id == tabProperties.tabOf) {
                lastLocation.projectStatus = true;
                lastLocation.projectId = projectProperties.id;
                lastLocation.projectColor = projectProperties.color;
                lastLocation.generalOverviewStatus = false;
                lastLocation.specificTabStatus = true;
                lastLocation.tabId = tabProperties.id;
                saveStorage();
            }
        });
    }
    // - Generate Specific Tab DOM
    const mainCtr = document.getElementById("mainCtr");
    mainCtr.innerHTML = "";
    mainCtr.innerHTML = `
        <div id="${tabProperties.id}" class="Goals-Tasks-Reminders-Ctr">
            <div class="goals">
                <div class="goals__info">
                    <p>Goals</p>
                </div>
                <div class="goals__actions">
                    <i id="goalBtnCreate" class="fas fa-plus"></i>
                </div>
                <div id="goalsCtr" class="goals__ctr">
                </div>
            </div>
            <div class="tasks">
                <div class="tasks__info">
                    <p>Tasks</p>
                </div>
                <div class="tasks__actions">
                    <i id="taskBtnCreate" class="fas fa-plus"></i>
                </div>
                <div id="tasksCtr" class="tasks__ctr">
                </div>
            </div>
            <div class="reminders">
                <div class="reminders__info">
                    <p>Reminders</p>
                </div>
                <div class="reminders__actions">
                    <i id="reminderBtnCreate" class="fas fa-plus"></i>
                </div>
                <div id="remindersCtr" class="reminders__ctr">
                </div>
            </div>
        </div>
    `;
    // - Create existing Tasks, Goals and Reminders DOM
    tabProperties.tasks.forEach(taskProperties => {
        createTaskDom(taskProperties); // creates the DOM
    });
    tabProperties.goals.forEach(goalProperties => {
        createGoalDom(goalProperties); // creates the DOM
    });
    tabProperties.reminders.forEach(reminderProperties => {
        createReminderDom(reminderProperties); // creates the DOM
    });
    goalsEventsListeners(); // creates goals events listeners
    remindersEventListeners(); // creates reminders events listeners
    tasksEventsListeners(); // creates tasks events listeners
}

// ! Tasks

// - Tasks DOM Creation
function createTaskDom(newTask) {
    let domTask = document.createElement("div");
    domTask.className = "task"
    domTask.id = `${newTask.id}`;
    domTask.innerHTML = `
        <div class="task__bar"></div>
        <div class="task__ctr">
            <p class="task__title">${newTask.name}</p>
            <p class="task__dueDate">
                ${
                    newTask.dueDate === false ? "" : String(newTask.dueDate.getDate()) + `/` + String(newTask.dueDate.getMonth() + 1) + `/` + String(newTask.dueDate.getFullYear())
                }
            </p>
            <p class="task__description">${newTask.description}</p>
            <div class="task__actions">
                ${
                    newTask.doneState === false ? `<i class="btnTaskComplete fas fa-check"></i>` : `<i class="btnTaskComplete far fa-check-square"></i>`
                }
                <i class="btnTaskDelete fas fa-trash"></i>
            </div>
        </div>
    `;
    const domTaskctr = document.getElementById("tasksCtr");
    domTaskctr.appendChild(domTask);
}

// ! Goals

// - Goals DOM Creation
function createGoalDom(newGoal) {
    let domGoal = document.createElement("div");
    domGoal.className = "goal";
    domGoal.id = `${newGoal.id}`;
    domGoal.innerHTML = `
        ${
            newGoal.doneState === false ? `<i class="btnGoalComplete far fa-circle"></i>` : `<i class="btnGoalComplete far fa-check-circle"></i>`
        }
        <p class="goal__title">${newGoal.name}</p>
        <i class="btnGoalDelete fas fa-trash"></i>
    `;
    const goal_ctr = document.getElementById("goalsCtr");
    goal_ctr.appendChild(domGoal);
}

// ! Reminders

// - Reminders DOM Creation
function createReminderDom(newReminder) {
    let domReminder = document.createElement("div");
    domReminder.className = "reminders";
    domReminder.id = `${newReminder.id}`;
    domReminder.innerHTML = `
            <div class="reminders__actions-complete">
                ${
                    newReminder.doneState === false ? `<i class="btnReminderComplete far fa-square"></i>` : `<i class="btnReminderComplete far fa-check-square"></i>`
                }
            </div>
            ${
                newReminder.onTime === true ? `<div class="reminders__status reminders__status--onTime"></div>` : `<div class="reminders__status reminders__status--overdue"></div>`
            }
            <p class="reminders__title">${newReminder.name}</p>
            <p class="reminders__dueDate">${
                newReminder.dueDate === false ? "" : String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth() + 1) + "/" + String(newReminder.dueDate.getFullYear())
            }</p>
            <div class="reminders__actions-delete">
                <i class="btnReminderDelete fas fa-trash"></i>
            </div>
        `;

    const reminders_ctr = document.getElementById("remindersCtr");
    reminders_ctr.appendChild(domReminder);
}