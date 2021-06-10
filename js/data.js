// ! App Data Collections
let userData = {}; // includes id, name, last name, projects, config
let test = {};

// ! Retrieve storage from Mongo DB 
$.get("https://webhooks.mongodb-realm.com/api/client/v2.0/app/tasktabs-api-hqqej/service/TaskTabs-API/incoming_webhook/webhook-user-data?secret=TaskTabs-user-data-fdsg68j7hfjl56468sert4y68ty3jk7safg",
    { "userName": "testing-user", "userPassword": "testing-password" },
    function (data, textStatus, jqXHR) {
        if (data != null) {
            // * Instance the data from MongoDB to classes from the app
            let userProjects = [];
            data.projects.forEach(projectProperties => {
                projectProperties.id = Number(projectProperties.id.$numberDouble);
                let newProject = new project(projectProperties);
                newProject.tabs = [];

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
                "userId": data.userId,
                "userName": data.userName,
                // user non-senitive data
                "name": data.name,
                "lastName": data.lastName,
                "userProjects": userProjects,
                "userConfig": data.userConfig,
                "userLastLocation": data.userLastLocation
            });
            // Callback function to save the data retrieved into the global variable called "userData"
            createUserData(userData);

            // * Fav projects container DOM
            userData.projects.forEach(projectProperties => {
                if (projectProperties.fav === true) {
                    const asideCtr = document.getElementById("asideCtr");
                    let favPrjCtr = document.createElement("div");
                    favPrjCtr.className = "fav-prjs";
                    favPrjCtr.innerHTML = `
                        <div class="fav-prjs__title">
                            <p>Favourites</p>
                        </div>
                        <div id="favProjectContainer" class="fav-prjs__prj-ctr">
                        </div>
                    `;
                    asideCtr.appendChild(favPrjCtr);
                }
            });

            // * Fill both (fav and not fav) containers with projects (DOM)
            const favProjectContainer = document.getElementById("favProjectContainer");
            const projectContainer = document.getElementById("projectContainer");
            userData.projects.forEach(projectProperties => {
                // projects ctr
                if (projectProperties.fav === false) {
                    let projectDom = document.createElement("div");
                    projectDom.className = "prjs__prjs-ctr__prj";
                    projectDom.id = `${projectProperties.id}`;
                    projectDom.innerHTML = `
                        <div class="prjs__prjs-ctr__prj__color background-${projectProperties.color}"></div>
                        <p>${projectProperties.name}</p>
                    `;
                    projectContainer.appendChild(projectDom);
                }
                // fav projects ctr
                if (projectProperties.fav === true) {
                    let favProjectDom = document.createElement("div");
                    favProjectDom.className = "prjs__prjs-ctr__prj";
                    favProjectDom.id = `${projectProperties.id}`;
                    favProjectDom.innerHTML = `
                        <div class="prjs__prjs-ctr__prj__color background-${projectProperties.color}"></div>
                        <p>${projectProperties.name}</p>
                    `;
                    favProjectContainer.appendChild(favProjectDom);
                }
            });

            // *Set aside events listeners
            asideProjectsEventListeners();
            asideOtherEventListeners();
            asideMenuEventListeners();

            // * Retrieves the user's last location
            if (userData.userLastLocation === true) {
                userData.projects.forEach(projectProperties => {
                    if (projectProperties.id == lastLocation.projectId) {
                        createProjectTopBarDom(projectProperties);
                        if (userData.userLastLocation.generalOverviewStatus === true) {
                            createOverviewDOM(projectProperties);
                        }
                        else if ((userData.userLastLocation.generalOverviewStatus === false) && (userData.userLastLocation.specificTabStatus === true)) {
                            projectProperties.tabs.forEach(tabProperties => {
                                if (tabProperties.id == lastLocation.tabId) {
                                    createTabDom(tabProperties);
                                }
                            });
                        }
                    }
                });
            }
            else if (userData.userLastLocation.menuSection === true) {
                if (userData.userLastLocation.menuSectionName == "menu") {
                    createDashboardTopBar();
                    createDashboardMainCtr();
                }
            }
        }
        else if (data == null) {
            console.log("INVALID USERNAME OR PASSWORD");
        }
    }
);

function createUserData(userDataProperties) {
    userData = userDataProperties;
}

function saveDataToDB() {
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
    $.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/tasktabs-api-hqqej/service/TaskTabs-API/incoming_webhook/webhook-projects-data?secret=TasksTabs-API-3548653s47df8sd4g78ftjh636f786hadf",
        { "userId": "684324812383548613", "userLastLocation": JSON.stringify(userData.userLastLocation), "projects": JSON.stringify(userData.projects) },
        function (data, textStatus, jqXHR) {
        }
    );
};