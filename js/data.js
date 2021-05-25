let userProjects = [];

// ! START SEQUENCE
function retrieveStorage() {
    // * Retrieving Projects
    let projects = JSON.parse(localStorage.getItem("userProjects"));
    projects.forEach(projectProperties => {
        let newProject = new project(projectProperties);
        userProjects.push(newProject);
    });
    userProjects.forEach(projectProperties => {
        // * Creating intances of tabs < projects
        projectProperties.tabs.forEach(tabProperties => {
            let newTab = new tab(tabProperties);
            tabProperties = newTab;
            if (tabProperties.tasks != undefined) {
                // * Create instances of tasks < tabs < projects
                tabProperties.tasks.forEach(taskProperties => {
                    let newTask = new task(taskProperties);
                    taskProperties = newTask;
                });
            }
            if (tabProperties.goals != undefined) {
                // * Create instances of goals < tabs < projects
                tabProperties.goals.forEach(goalProperties => {
                    let newGoal = new goal(goalProperties);
                    goalProperties = newGoal;
                });
            }
            if (tabProperties.reminders != undefined) {
                // * Create instances of reminders < tabs < projects
                tabProperties.reminders.forEach(reminderProperties => {
                    let newReminder = new reminder(reminderProperties);
                    reminderProperties = newReminder;
                });
            }
        });
    });
    // - Aside dom Creation
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

}
function saveStorage() {
    localStorage.setItem("userProjects", JSON.stringify(userProjects));
    location.reload();
}

retrieveStorage();

// localStorage.setItem("userProjects", JSON.stringify(
//     [
//         {id: 1230, fav: false, color: "red",name: "CoderHouse", tabs: [{
//             tabOf: 1230, id: "12354", overview: false, name: "Fundamentos de Informatica", tasks: [{
//                 taskOf: 12354, name: "Hacer la Tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)", description: "sample text"
//             }], reminders: [{
//                 reminderOf: 12354, name: "Recordatorio tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)"
//             }], goals: [{
//                 reminderOf: 12354, name: "Meta tarea"
//             }]
//         }]},
//         {id: 122394, fav: true, color: "yellow",name: "UCEMA", tabs: [{
//             tabOf: 122394, id:"1395123", overview: false, name: "Fundamentos de Informatica", tasks: [{
//                 taskOf: 1395123, name: "Hacer la Tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)", description: "sample text"
//             }], reminders: [{
//                 reminderOf: 1395123, name: "Recordatorio tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)"
//             }], goals: [{
//                 reminderOf: 1395123, name: "Meta tarea"
//             }]
//         },
//         {
//             tabOf: 122394,id: "12837123", overview: false, name: "Analisis Matematico I", tasks: [{
//                 taskOf: 12837123, name: "Hacer la Tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)", description: "sample text"
//             }], reminders: [{
//                 reminderOf: 12837123, name: "Recordatorio tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)"
//             }], goals: [{
//                 reminderOf: 12837123, name: "Meta tarea"
//             }]
//             }
//         ]}
//     ]
// ));