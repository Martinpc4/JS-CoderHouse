// @ Define data arrays

let userProjects = [];
let lastLocation = [];

// @ Storage Data Functions

function retrieveStorage() {
    // - Retrieving projects data and storing them in userProject array
    if (JSON.parse(localStorage.getItem("userProjects")) != undefined) {
        let projects = JSON.parse(localStorage.getItem("userProjects"));
        projects.forEach(projectProperties => {
            let newProject = new project(projectProperties);
            newProject.tabs = [];
    
            if (projectProperties.tabs != undefined) {
                // Creates an instance of a tab
                projectProperties.tabs.forEach(tabProperties => {
                    let newTab = new tab(tabProperties);
                    if (newTab.id === undefined) {
                        newTab.id = randomId(projectProperties.tabs);
                    }
    
                    newTab.tasks = [];
                    newTab.goals = [];
                    newTab.reminders = [];
        
                    if (tabProperties.tasks != undefined) {
                        // * Create instances of tasks < tabs < projects
                        tabProperties.tasks.forEach(taskProperties => {
                            taskProperties.dueDate = new Date(taskProperties.dueDate);
                            let newTask = new task(taskProperties);
                            // asign a random Id in case it doesn't have it yet
                            if (newTask.id === undefined) {
                                newTask.id = randomId(tabProperties.tasks);
                            }
                            newTab.tasks.push(newTask);
                        });
                    }
                    if (tabProperties.goals != undefined) {
                        // * Create instances of goals < tabs < projects
                        tabProperties.goals.forEach(goalProperties => {
                            let newGoal = new goal(goalProperties);
                            // asign a random Id in case it doesn't have it yet
                            if (newGoal.id === undefined) {
                                newGoal.id = randomId(tabProperties.goals);
                            }
                            newTab.goals.push(newGoal);
                        });
                    }
                    if (tabProperties.reminders != undefined) {
                        // * Create instances of reminders < tabs < projects
                        tabProperties.reminders.forEach(reminderProperties => {
                            reminderProperties.dueDate = new Date(reminderProperties.dueDate);
                            let newReminder = new reminder(reminderProperties);
                            // asign a random Id in case it doesn't have it yet
                            if (newReminder.id === undefined) {
                                newReminder.id = randomId(tabProperties.reminders);
                            }
                            newTab.reminders.push(newReminder);
                        });
                    }
                    newProject.tabs.push(newTab);
                });
            }
            userProjects.push(newProject);
        });
    }
    // - Aside DOM Creation
    const projectContainer = document.getElementById("projectContainer");
    const favProjectContainer = document.getElementById("favProjectContainer");
    userProjects.forEach(Project => {
        // projects ctr
        let projectDom = document.createElement("div");
        projectDom.className = "prjs__prjs-ctr__prj";
        projectDom.id = `${Project.id}`;
        projectDom.innerHTML = `
            <div class="prjs__prjs-ctr__prj__color"></div>
            <p>${Project.name}</p>
        `;
        projectContainer.appendChild(projectDom);
        // fav projects ctr
        if (Project.fav === true) {
            let favProjectDom = document.createElement("div");
            favProjectDom.className = "prjs__prjs-ctr__prj";
            favProjectDom.id = `${Project.id}`;
            favProjectDom.innerHTML = `
                <div class="prjs__prjs-ctr__prj__color"></div>
                <p>${Project.name}</p>
            `;
            favProjectContainer.appendChild(favProjectDom);
        }
    });
    // - Retrieving user last known location and restoring it
    if (JSON.parse(localStorage.getItem("lastLocation")) != undefined) {
        lastLocation = JSON.parse(localStorage.getItem("lastLocation"));
        if (lastLocation.projectStatus === true) {
            cleanTopBarDom();
            userProjects.forEach(projectProperties => {
                if (projectProperties.id == lastLocation.projectId) {
                    createProjectTopBarDom(projectProperties);
                    if (lastLocation.generalOverviewStatus === true) {
                        createOverviewDOM(projectProperties);
                    }
                    else if ((lastLocation.generalOverviewStatus === false) && (lastLocation.specificTabStatus === true)) {
                        projectProperties.tabs.forEach(tabProperties => {
                            if (tabProperties.id == lastLocation.tabId) {
                                createTabDom(tabProperties);
                            }
                        });
                    }
                }
            });
        }
    }
    // let lastLocation = {projectStatus : true, projectId : 15234, generalOverviewStatus : false, specificTabStatus : true, tabId : 12312}

    // - Set event listeners
    // * Aside events
    projectEventsListeners();
}
function saveStorage() {    
    localStorage.setItem("userProjects", JSON.stringify(userProjects)); // userPorjects-related data
    localStorage.setItem("lastLocation", JSON.stringify(lastLocation)); // user last known location data
    location.reload(); // refresh the page
}

retrieveStorage();

// localStorage.clear();

// localStorage.setItem("userProjects", JSON.stringify(
//     [
//         {id: 1230, fav: false, color: "red",name: "CoderHouse", tabs: [{
//             tabOf: 1230, id: "12354", overview: false, name: "Fundamentos de Informatica", tasks: [{
//                 taskOf: 12354, name: "Hacer la Tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)", description: "sample text"
//             }], reminders: [{
//                 reminderOf: 12354, name: "Recordatorio tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)"
//             }], goals: [{
//                 reminderOf: 12354, name: "Meta tarea", doneState: false
//             }]
//         }]},
//         {id: 122394, fav: true, color: "yellow",name: "UCEMA", tabs: [{
//             tabOf: 122394, id:"1395123", overview: false, name: "Fundamentos de Informatica", tasks: [{
//                 taskOf: 1395123, name: "Hacer la Tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)", description: "sample text"
//             }], reminders: [{
//                 reminderOf: 1395123, name: "Recordatorio tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)"
//             }], goals: [{
//                 reminderOf: 1395123, name: "Meta tarea", doneState: false
//             }]
//         },
//         {
//             tabOf: 122394,id: "12837123", overview: false, name: "Analisis Matematico I", tasks: [{
//                 taskOf: 12837123, name: "Hacer la Tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)", description: "sample text"
//             }], reminders: [{
//                 reminderOf: 12837123, name: "Recordatorio tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)"
//             }], goals: [{
//                 reminderOf: 12837123, name: "Meta tarea", doneState: false
//             }]
//             }
//         ]}
//     ]
// ));