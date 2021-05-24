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
            // * Create instances of tasks < tabs < projects
            tabProperties.tasks.forEach(taskProperties => {
                let newTask = new task(taskProperties);
                taskProperties = newTask;
            });
            // * Create instances of goals < tabs < projects
            tabProperties.goals.forEach(goalProperties => {
                let newGoal = new goal(goalProperties);
                goalProperties = newGoal;
            });
            // * Create instances of reminders < tabs < projects
            tabProperties.reminders.forEach(reminderProperties => {
                let newReminder = new reminder(reminderProperties);
                reminderProperties = newReminder;
            });
        });
    });
    console.log(userProjects);

    
}
function saveStorage() {
    localStorage.setItem("userProjects", JSON.stringify(userProjects));
    location.reload();
}

retrieveStorage();

// localStorage.setItem("userProjects", JSON.stringify(
//     [{id: 1230, name: "UCEMA", tabs: [{
//         tabOf: 1230, id: 12354, name: "Fundamentos de Informatica", tasks: [{
//             taskOf: 12354, id: 15745, name: "Hacer la Tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)", description: "sample text"
//         }], reminders: [{
//             reminderOf: 12354, id: 18645, name: "Recordatorio tarea", dueDate: "Mon Apr 12 2021 00:00:00 GMT-0300 (-03)"
//         }], goals: [{
//             reminderOf: 12354, id: 37534, name: "Meta tarea"
//         }]
//     }]}]
// ));