// @ Top Bar DOM Functions

// ! Clean Top Bar
function cleanTopBarDom () {
    document.getElementById("topBarInfoCtr").innerHTML = "";
    document.getElementById("topBarInfoActionsCtr").innerHTML = "";
    document.getElementById("topBarTabsCtr").innerHTML = "";
    document.getElementById("topBarTabsActionsCtr").innerHTML = "";
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

    // Create topBarInfoActionsCtr
    let prjActionsDom = document.createElement("i");
    prjActionsDom.className = "bi bi-gear";
    const prjActionsCtr = document.getElementById("topBarInfoActionsCtr");
    prjActionsCtr.appendChild(prjActionsDom);

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
    
    // Create event listeners for each tab
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

    // Create topBarTabsActionsCtr
    const topBarTabsActionsCtr = document.getElementById("topBarTabsActionsCtr");
    let tabActions = document.createElement("i");
    tabActions.id = "tabsBtnCreate";
    tabActions.className = "bi bi-plus-lg";
    topBarTabsActionsCtr.appendChild(tabActions);

    // Create even listener for topBarTabsActionsCtr
    tabsEventsListeners();
}

// @ Main Container DOM Functions

// ! Overview Tab DOM
function createOverviewDOM(projectProperties) {
    // - Save last location
    lastLocation = {projectStatus : true, projectId : projectProperties.id, generalOverviewStatus : true, specificTabStatus : false, tabId : undefined}
    // - Generate dom
    const mainCtr = document.getElementById("mainCtr");
    mainCtr.innerHTML = "";
    let prjOverview = document.createElement("div");
    prjOverview.className = "prj-overview";
    prjOverview.innerHTML = `
        <div class="prj-overview__tabs-status">
            <div class="prj-overview__tabs-status__title">
                <p>Tabs</p>
            </div>
            <div id="overviewPrjCtr" class="prj-overview__tabs-status__prjs"></div>
        </div>
    `;
    mainCtr.appendChild(prjOverview);
    // - Fill the overview projects container
    const overviewPrjCtr = document.getElementById("overviewPrjCtr");
    projectProperties.tabs.forEach(tab => {
        if (tab.overview === false) {
            let newTab = document.createElement("div");
            newTab.className = "prj-overview__tabs-status__prj";
            newTab.innerHTML = `
                <p>${tab.name}</p>
            `;
            overviewPrjCtr.appendChild(newTab);
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