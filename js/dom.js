// @ Top Bar DOM Functions

// ! Clean Top Bar
function cleanTopBarDom () {
    document.getElementById("topBarInfoCtr").innerHTML = "";
    document.getElementById("topBarInfoActionsCtr").innerHTML = "";
    document.getElementById("topBarTabsCtr").innerHTML = "";
}
// ! Create Project Top Bar DOM
function createProjectTopBarDom (projectProperties) {
    // - Create topBarInfoCtr
    const prjInfoCtr = document.getElementById("topBarInfoCtr");
    prjInfoCtr.innerHTML = `
        <i class="bi bi-star"></i>
    `;
    let prjInfoCtrDom = document.createElement("p");
    prjInfoCtrDom.innerText = `${projectProperties.name}`;
    prjInfoCtr.appendChild(prjInfoCtrDom);

    // - Create topBarInfoActionsCtr
    let prjActionsDom = document.createElement("i");
    prjActionsDom.className = "bi bi-gear";
    const prjActionsCtr = document.getElementById("topBarInfoActionsCtr");
    prjActionsCtr.appendChild(prjActionsDom);

    // * Create topBarInforActionsCtr event listener
    // TODO Hay que terminar el evento de la configuración del projecto

    // - Create topBarTabsCtr
    projectProperties.tabs.forEach(tabProperties => {
        const prjTabsCtr = document.getElementById("topBarTabsCtr");
        prjTabsCtr.innerHTML = "";
        projectProperties.tabs.forEach(projectTab => {
            let newTab = document.createElement("div");
            newTab.className = "top-bar__tabs-ctr__tab tab-link";
            newTab.id = `${projectTab.id}`;
            newTab.innerHTML = `
                <p>${projectTab.name}</p>
            `;
            prjTabsCtr.appendChild(newTab);
        });
    });
    
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
}

// @ Main Container DOM Functions

// ! Overview Tab DOM
function createOverviewDOM(projectProperties) {
    // - Save last location
    lastLocation = {projectStatus : true, projectId : projectProperties.id, generalOverviewStatus : true, specificTabStatus : false, tabId : undefined}
    if ((lastLocation.generalOverviewStatus != true) || (lastLocation.projectId != projectProperties.id)) {
        saveStorage();
    }
    // - Generate dom
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
                    <i id="overviewBtnTabsCreate" class="bi bi-plus-lg"></i>
                </div>
            </div>
            <div id="overviewPrjStatsTabCtr" class="tabs-stat__ctr">
            </div>
        </div>
    `;
    mainCtr.appendChild(prjOverview);
    // - Create the create event listener
    document.getElementById("overviewBtnTabsCreate").addEventListener("click", () => {
        // * Alert creation (DOM)
        let alertDom = document.createElement("div");
        alertDom.className = "alert";
        alertDom.innerHTML = `
            <div class="alert__ctr">
                <div class="alert__info">
                    <p>Create new Tab</p>
                    <i id="alertBtnClose" class="bi bi-x-lg"></i>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Name</label>
                        <input id="alertTabName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn" type="submit">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertDom);
        // * Close alert
        document.getElementById("alertBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertDom);
        });
        // * Capture data
        document.getElementById("alertForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let tabName = String(document.getElementById("alertTabName").value);
            // tab object creation
            let newTab = { "name": tabName, "tabOf" : lastLocation.projectId, "overview" : false, };
            newTab = new tab(newTab);
            // adding the new tab to the project
            userProjects.forEach( projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    projectProperties.tabs.push(newTab);
                    saveStorage();
                }
            });
        });
    });
    // - Fill the overview projects container
    const overviewPrjCtr = document.getElementById("overviewPrjStatsTabCtr");
    projectProperties.tabs.forEach(tabProperties => {
        if (tabProperties.overview === false) {
            // * Count the amount of tasks, goals and reminders
            let tasksNotFinished = 0;
            let goalsNotFinished = 0;
            let remindersNotFinished = 0;

            tabProperties.tasks.forEach( taskProperties => {
                if (taskProperties.doneState == false) {
                    tasksNotFinished++;
                }
            });
            tabProperties.goals.forEach( goalProperties => {
                if (goalProperties.doneState == false) {
                    goalsNotFinished++;
                }
            });
            tabProperties.reminders.forEach( reminderProperties => {
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
                    <i id="overviewBtnTabDelete" class="bi bi-trash"></i>
                </div>
            `;
            overviewPrjCtr.appendChild(newTab);
            // * Create event listener for the deletion of a tab
            document.getElementById("overviewBtnTabDelete").addEventListener("click", (event) => {
                console.log("PING");
                userProjects.forEach( projectProperties => {
                    if (projectProperties.id == lastLocation.projectId) {
                        let i = 0;
                        projectProperties.tabs.forEach( tabProperties => {
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
function createTabDom (tabProperties) {
    // - Save last location
    lastLocation = {projectStatus : true, projectId : tabProperties.tabOf, generalOverviewStatus : false, specificTabStatus : true, tabId : tabProperties.id}
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
                    <i id="goalBtnCreate" class="bi bi-plus-lg"></i>
                </div>
                <div id="goalsCtr" class="goals__ctr">
                </div>
            </div>
            <div class="tasks">
                <div class="tasks__info">
                    <p>Tasks</p>
                </div>
                <div class="tasks__actions">
                    <i id="taskBtnCreate" class="bi bi-plus-lg"></i>
                </div>
                <div id="tasksCtr" class="tasks__ctr">
                </div>
            </div>
            <div class="reminders">
                <div class="reminders__info">
                    <p>Reminders</p>
                </div>
                <div class="reminders__actions">
                    <i id="reminderBtnCreate" class="bi bi-plus-lg"></i>
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
            <p class="task__dueDate">${String(newTask.dueDate.getDate()) + "/" + String(newTask.dueDate.getMonth() + 1) + "/" + String(newTask.dueDate.getFullYear())}</p>
            <p class="task__description">${newTask.description}</p>
            <div class="task__actions">
                <i class="btnTaskComplete bi bi-check2"></i>
                <i class="btnTaskDelete bi bi-trash"></i>
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
    if (newGoal.doneState === false) {
        domGoal.innerHTML = `
            <i class="btnGoalComplete bi bi-circle"></i>
            <p class="goal__title">${newGoal.name}</p>
            <i class="btnGoalDelete bi bi-trash"></i>
        `;
    }
    else if (newGoal.doneState === true) {
        domGoal.innerHTML = `
            <i class="btnGoalComplete bi bi-circle-fill"></i>
            <p class="goal__title">${newGoal.name}</p>
            <i class="btnGoalDelete bi bi-trash"></i>
        `;
    }
    const goal_ctr = document.getElementById("goalsCtr");
    goal_ctr.appendChild(domGoal);
}

// ! Reminders

// - Reminders DOM Creation
function createReminderDom(newReminder) {
    let domReminder = document.createElement("div");
    domReminder.className = "reminders";
    domReminder.id = `${newReminder.id}`;
    if (onTime(newReminder.dueDate) === true) {
        domReminder.innerHTML = `
            <div class="reminders__actions-complete">
            <i class="btnReminderComplete bi bi-square"></i>
            </div>
            <div class="reminders__status reminders__status--onTime"></div>
            <p class="reminders__title">${newReminder.name}</p>
            <p class="reminders__dueDate">${String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth() + 1) + "/" + String(newReminder.dueDate.getFullYear())}</p>
            <div class="reminders__actions-delete">
                <i class="btnReminderDelete bi bi-trash"></i>
            </div>
        `;
    }
    else if (onTime(newReminder.dueDate) === false) {
        domReminder.innerHTML = `
            <div class="reminders__actions-complete">
            <i class="btnReminderComplete bi bi-square"></i>
            </div>
            <div class="reminders__status reminders__status--overdue"></div>
            <p class="reminders__title">${newReminder.name}</p>
            <p class="reminders__dueDate">${String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth() + 1) + "/" + String(newReminder.dueDate.getFullYear())}</p>
            <div class="reminders__actions-delete">
                <i class="btnReminderDelete bi bi-trash"></i>
            </div>
        `;
    }

    const reminders_ctr = document.getElementById("remindersCtr");
    reminders_ctr.appendChild(domReminder);
}