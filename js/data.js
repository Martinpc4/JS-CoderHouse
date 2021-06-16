// ! App Data Collections
let userData = {}; // includes id, name, last name, projects, config

// ! Retrieve storage from Mongo DB 
// this if will check for an userId in the local storage
if (JSON.parse(localStorage.getItem("userData")) != undefined) {
    $.get("https://webhooks.mongodb-realm.com/api/client/v2.0/app/tasktabs-api-hqqej/service/TaskTabs-API/incoming_webhook/webhook-user-data?secret=TaskTabs-user-data-fdsg68j7hfjl56468sert4y68ty3jk7safg",
        {"userId" : JSON.parse(localStorage.getItem("userData")).userId},
        function (data, textStatus, jqXHR) {
            localStorage.clear();
            if (data != null) {
                // * Instance the data from MongoDB to classes from the app
                let userProjects = [];
                data.projects.forEach(projectProperties => {
                    projectProperties.id = Number(projectProperties.id.$numberDouble);
                    let newProject = new project(projectProperties);
                    newProject.tabs = [];
    
                    // * Format and instance the projects data
                    if (projectProperties.tabs != undefined) {
                        // Give the number format to id's
                        projectProperties.tabs.forEach(tabProperties => {
                            tabProperties.id = Number(tabProperties.id.$numberDouble);
                            tabProperties.tabOf = Number(tabProperties.tabOf.$numberDouble);
                        });
                        // Creates an instance of a tab
                        projectProperties.tabs.forEach(tabProperties => {
                            let newTab = new tab(tabProperties);
                            if (newTab.id === undefined) {
                                newTab.id = randomId(projectProperties.tabs);
                            }
                            newTab.tasks = [];
                            newTab.goals = [];
                            newTab.reminders = [];
    
                            if ((tabProperties.tasks != null) && (tabProperties.overview === false)) {
                                // give the number format to id's
                                tabProperties.tasks.forEach(taskProperties => {
                                    taskProperties.id = Number(taskProperties.id.$numberDouble);
                                });
                                // Create instances of tasks < tabs < projects
                                tabProperties.tasks.forEach(taskProperties => {
                                    if (taskProperties.dueDate != false) {
                                        taskProperties.dueDate = new Date(taskProperties.dueDate);
                                    }
                                    let newTask = new task(taskProperties);
                                    // asign a random Id in case it doesn't have it yet
                                    if (newTask.id === undefined) {
                                        newTask.id = randomId(tabProperties.tasks);
                                    }
                                    newTab.tasks.push(newTask);
                                });
                            }
                            if (tabProperties.goals != null) {
                                // give the number format to id's
                                tabProperties.goals.forEach(goalProperties => {
                                    goalProperties.id = Number(goalProperties.id.$numberDouble);
                                });
                                // Create instances of goals < tabs < projects
                                tabProperties.goals.forEach(goalProperties => {
                                    let newGoal = new goal(goalProperties);
                                    // asign a random Id in case it doesn't have it yet
                                    if (newGoal.id === undefined) {
                                        newGoal.id = randomId(tabProperties.goals);
                                    }
                                    newTab.goals.push(newGoal);
                                });
                            }
                            if (tabProperties.goals != null) {
                                // give the number format to id's
                                tabProperties.reminders.forEach(reminderProperties => {
                                    reminderProperties.id = Number(reminderProperties.id.$numberDouble);
                                });
                                // Create instances of reminders < tabs < projects
                                tabProperties.reminders.forEach(reminderProperties => {
                                    if (reminderProperties.dueDate != false) {
                                        reminderProperties.dueDate = new Date(reminderProperties.dueDate);
                                    }
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
    
                // * Instance the user from MongoDB
                userData = new user({
                    // user sensitive data
                    "id": data.userId,
                    "email" : data.userEmail,
                    // user non-senitive data
                    "name": data.name,
                    "lastName": data.lastName,
                    "userProjects": userProjects,
                    "userConfig": data.userConfig,
                    "userLastLocation": data.userLastLocation
                });
                createUserData(userData); // function to save the data retrieved into the global variable called "userData"
                
                // * Generates projects and possibly fav proyects containers DOM
                realoadAsidePrjs();
                
                // * Set aside events listeners
                asideOtherEventListeners();
                asideMenuEventListeners();
                
                // * Creates the DOM of the user's Dashboard (default)
                createDashboardMainCtr();
                createDashboardTopBar();
                
                // * Retrieve userLastLocation
                userData.userLastLocation = new lastLocation(data.userLastLocation);
                // saveDataToDB();
            }
            else if (data == null) {
                console.log("INVALID USERNAME OR PASSWORD");
            }
        }
    );
}
else if (JSON.parse(localStorage.getItem("userData")) == undefined) {
    // as i hasn't found it, it will load the login html file
    window.open("login.html", "_self");
}

function createUserData(userDataProperties) {
    userData = userDataProperties;
}

function saveDataToDB() {
    // * Sent data to DB
    $.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/tasktabs-api-hqqej/service/TaskTabs-API/incoming_webhook/webhook-user-data?secret=TaskTabs-user-data-fdsg68j7hfjl56468sert4y68ty3jk7safg",
    { 
        "userData" : JSON.stringify(userData)
    },
    function (data, textStatus, jqXHR) {
    }
    );
    // * Save data in Local Storage
    localStorage.setItem("userProjects", JSON.stringify(userData.projects));
    localStorage.setItem("userLastLocation", JSON.stringify(userData.userLastLocation));
};


// userData.userLastLocation = new lastLocation({
//     "menuSection" : false,
//     "menuSectionName" : undefined,
//     "generalOverviewStatus" : true,
//     "projectStatus" : true,
//     "projectId" : undefined,
//     "projectColor" : undefined,
//     "specificTabStatus" : false,
//     "tabId" : undefined
// });
// userData.projects = [
//     {
//         "id": 42504, "name": "UCEMA", "fav": true, "color": "red", "tabs": [
//             { "tabOf": 42504, "id": 50297, "name": "Overview", "overview": true, "tasks": [], "goals": [], "reminders": [] },
//             { "tabOf": 42504, "id": 74927, "name": "Fundamentos de informatica", "tasks": [], "goals": [], "reminders": [] }
//         ]
//     },
//     {
//         "id": 4250412321, "name": "CoderHouse", "fav": false, "color": "orange", "tabs": [
//             { "tabOf": 4250412321, "id": 50297, "name": "Overview", "overview": true, "tasks": [], "goals": [], "reminders": [] },
//             { "tabOf": 4250412321, "id": 74927, "name": "JavaScript", "tasks": [], "goals": [], "reminders": [] }
//         ]
//     }
// ]q