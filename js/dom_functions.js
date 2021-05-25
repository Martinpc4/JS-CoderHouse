// - Overview Tab Dom
function createOverviewDOM(projectProperties) {
    // Generate dom
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
    // Fill the overview projects
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
// - General Tab Dom
function createTabDom (tabProperties) {
    const mainCtr = document.getElementById("mainCtr");
    mainCtr.innerHTML = "";
    mainCtr.innerHTML = `
        <div id="tabCtr" class="main-ctr">
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
    tabProperties.tasks.forEach(taskProperties => {
        createTaskDom(taskProperties);
    });
    tabProperties.goals.forEach(goalProperties => {
        console.log(goalProperties);
        createGoalDom(goalProperties);
    });
    tabProperties.reminders.forEach(reminderProperties => {
        createReminderDom(reminderProperties);
    });
}

// !TASK
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
// !GOAL
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
// !CREATE REMINDER
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