// ! Menu
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

// ! Other
function asideOtherEventListeners() {
    // * Feedback
    $("#asideOtherFeedbackBtn").on("click", function () {
        $("body").prepend(`
            <div class="alertMax">
                <div class="alertMax__ctr">
                    <div class="alertMax__info">
                        <p>Feedback!</p>
                        <svg id="alertMaxBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                        </svg>
                    </div>
                    <form id="alertMaxFeedbackForm" class="alertMax__form" action="">
                        <div class="alertMax__form__input">
                            <label for="topicName">Topic</label>
                            <input id="alertMaxTopicName" class="input" type="text" name="topicName" placeholder="Bug report...">
                        </div>
                        <div class="alertMax__form__input" style="grid-column: 1 / 3 !important;">
                            <label for="userMessage">Message</label>
                            <textarea id="alertMaxUserMessage" class="textarea" name="userMessage" placeholder="Describe the issue"></textarea>
                        </div>
                        <div class="alertMax__form__buttons" style="grid-column: 1 / 3 !important;">
                            <input class="btn btn--blue" type="submit" value="Save">
                        </div>
                    </form>
                </div>
            </div>
        `);
        // Close feedback alert
        $("#alertMaxBtnClose").on("click", () => {
            $(".alertMax").remove();
        });
        // Capture user data from feedback
        $("#alertMaxFeedbackForm").submit(function (e) { 
            e.preventDefault();
            const userTopicName = $("#alertMaxTopicName").val();
            const userMesasage = $("#alertMaxUserMessage").val();
        });
    });

    // * Configuration
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
                            <label for="userName">Name</label>
                            <input id="alertMaxUserName" class="input" type="text" name="userName" placeholder="${userData.name}">
                        </div>
                        <div class="alertMax__form__input">
                            <label for="userLastName">Lastname</label>
                            <input id="alertMaxUserLastName" class="input" type="text" name="userLastName" placeholder="${userData.lastName}">
                        </div>
                        <div class="alertMax__form__input">
                            <label for="userEmail">Email</label>
                            <input id="alertMaxUserEmail" class="input" type="text" name="userEmail" placeholder="${userData.email}">
                        </div>
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
        // Close config
        $("#alertMaxBtnClose").on("click", () => {
            $(".alertMax").remove();
        });
        // Capture data submited by user
        $("#alertMaxConfigForm").submit((e) => {
            e.preventDefault();

            const userName = $("#alertMaxUserName").val();
            const userLastName = $("#alertMaxUserLastName").val();
            const userEmail = $("#alertMaxUserEmail").val();

            // If the user name entered is not empty and different from the one that is currently assign, it replaces it
            if ((userName != "") && (userName != userData.name)) {
                userData.name = userName;
            }
            // If the lastname entered is not empty and different from the one that is currently assign, it replaces it
            if ((userLastName != "") && (userLastName != userData.lastName)) {
                userData.lastName = userLastName;
            }
            // If the email entered is not empty and different from the one that is currently assign, it replaces it
            if ((userEmail != "") && (userEmail != userData.email)) {
                userData.email = userEmail;
            }

            if ($("#alertMaxTheme").val() != userData.userConfig.theme) {
                userData.userConfig.theme = $("#alertMaxTheme").val();
            }

            // save data to db
            saveDataToDB();
            // removes the alert max dom
            $(".alertMax").remove();
        });
    });
}

// ! Projects
function asideProjectsEventListeners() {
    // * Create a new project from btn (+)
    document.getElementById("prjsBtnCreate").addEventListener("click", () => {
        $("#mainCtr").append(`
            <div class="alertMin">
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
            </div>
        `);
        // Close alertMin
        $("#alertMinBtnClose").on("click", () => {
            $(".alertMin").remove();
        });
        // Capture data
        $("#alertMinForm").submit(function (e) { 
            e.preventDefault();
           // storing user given values in them
           let projectName = String($("#alertMinProjectName").val());
           let projectColor = String($("#alertMinProjectColor").val());
           if (projectName !== "") {
               // object creation from user data
               let newProject = { "name": projectName, "color": projectColor };
               newProject = new project(newProject);
               userData.projects.push(newProject);
               // Save data in DB
               saveDataToDB();
               // Create Project DOM
               createProjectTopBarDom(newProject);
               createOverviewDOM(newProject);
           } 
        });
    });

    // * Open a Project from Aside Btns
    $(".prjs__prjs-ctr__prj").on("click", function (e) {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == e.target.parentNode.id) {
                // * Project info DOM
                createProjectTopBarDom(projectProperties);
                // * Create the default Project Overview Tab
                createOverviewDOM(projectProperties);
            }
        });
    });
}

// ! Tasks Events Listeners
function tasksEventsListeners() {
    // * Creating a task (+ btn)
    $("#taskBtnCreate").on("click", function () {
        // alertMin creation (DOM)
        $("#mainCtr").append(`
            <div class="alertMin">
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
                            <input id="alertMinTaskDueDate" class="input" type="date" name="date">
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
            </div>
        `);
        // Close alertMin
        $("#alertMinBtnClose").on("click", function () {
            $(".alertMin").remove();
        });
        // Capture alertMin data
        $("#alertMinForm").submit(function (e) { 
            e.preventDefault();
            // Create an object with user's given data
            let newTask = {
                "id" : randomId(() => {
                    userData.projects.forEach(projectProperties => {
                        if (projectProperties.id == userData.userLastLocation.projectId) {
                            projectProperties.tabs.forEach(tabProperties => {
                                if (tabProperties.id == userData.userLastLocation.tabId) {
                                    return(tabProperties.tasks);
                                }
                            });
                        }
                    });
                }),
                "name": String($("#alertMinTaskName").val()),
                "dueDate": parseDate(String($("#alertMinTaskDueDate").val())),
                "description": String($("#alertMinTaskDescription").val())
            };
            if (newTask.name != "") { // check if the name of the task given by the user isn't blank
                newTask = new task(newTask);
                // add the task
                userData.projects.forEach(projectProperties => {
                    if (projectProperties.id == userData.userLastLocation.projectId) {
                        projectProperties.tabs.forEach(tabProperties => {
                            if (tabProperties.id == userData.userLastLocation.tabId) {
                                // adds the new task to the tab and project
                                tabProperties.tasks.push(newTask);
                                $(".alertMin").remove();
                                // saves the data in the db
                                saveDataToDB();
                                // creates the dom of the task and applies a jq animation
                                newTask.generateDOM(true);
                                $(`#${newTask.id}`).fadeIn();
                                // reloads the tab after the jq animation
                                setTimeout(() => {
                                    reloadTab();
                                }, 400);
                            }
                        });
                    }
                });
            } 
        });
    });

    // * Delete a Task (trash btn)
    $(".btnTaskDelete").on("click", function (e) {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == userData.userLastLocation.projectId) {
                projectProperties.tabs.forEach(tabProperties => {
                    if (tabProperties.id == userData.userLastLocation.tabId) {
                        let i = 0;
                        tabProperties.tasks.forEach(taskProperties => {
                            if (taskProperties.id == e.target.parentNode.parentNode.parentNode.parentNode.id) {
                                // removes the task from the project
                                tabProperties.tasks.splice(i, 1);
                                // applies a jq animation
                                $(`#${taskProperties.id}`).fadeOut(800);
                                // saves the data in the db
                                saveDataToDB();
                                // reloads the tab after the jq animation
                                setTimeout(() => {
                                    reloadTab();
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

    // * Complete a Task (check btn)
    $(".btnTaskComplete").on("click", function (e) {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == userData.userLastLocation.projectId) {
                projectProperties.tabs.forEach(tabProperties => {
                    if (tabProperties.id == userData.userLastLocation.tabId) {
                        tabProperties.tasks.forEach(taskProperties => {
                            if (taskProperties.id == e.target.parentNode.parentNode.parentNode.parentNode.id) {
                                taskProperties.complete();
                            }
                        });
                    }
                });
            }
        });
    });
}

// ! Goals Events Listeners
function goalsEventsListeners() {
    // * Create a Goal (+)
    $("#goalBtnCreate").on("click", function () {
        $("#mainCtr").append(`
            <div class="alertMin">
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
            </div>
        `);

        // Close alertMin
        $("#alertMinBtnClose").on("click", () => {
            $(".alertMin").remove();
        });

        // Capture alertMin data
        $("#alertMinForm").submit(function (e) { 
            e.preventDefault();
           // storing user given values in them
           let goalName = String($("#alertMinGoalName").val());
           // object creation with user given data
           let newGoal = {
               "id" : randomId(()=> {
                   userData.projects.forEach(projectProperties => {
                       if (projectProperties.id == userData.userLastLocation.projectId) {
                           projectProperties.tabs.forEach(tabProperties => {
                               if (tabProperties.id == userData.userLastLocation.tabId) {
                                   return(tabProperties.goals);
                               }
                           });
                       }
                   });
               }),
               "name": goalName
           };
           newGoal = new goal(newGoal);
           console.log(newGoal);
           // Add the goal
           userData.projects.forEach(projectProperties => {
               if (projectProperties.id == userData.userLastLocation.projectId) {
                   projectProperties.tabs.forEach(tabProperties => {
                       if (tabProperties.id == userData.userLastLocation.tabId) {
                           tabProperties.goals.push(newGoal);
                           saveDataToDB();
                           $(".alertMin").remove();
                           newGoal.generateDOM(true);
                           $(`#${newGoal.id}`).fadeIn();
                       }
                   });
               }
           });
        });
    });

    // * Delete a Goal (Trash)
    $(".btnGoalDelete").on("click", function (e) {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == userData.userLastLocation.projectId) {
                projectProperties.tabs.forEach(tabProperties => {
                    if (tabProperties.id == userData.userLastLocation.tabId) {
                        let i = 0;
                        tabProperties.goals.forEach(goalProperties => {
                            if (goalProperties.id == e.target.parentNode.parentNode.id) {
                                tabProperties.goals.splice(i, 1);
                                saveDataToDB();
                                $(`#${goalProperties.id}`).fadeOut(800);
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

    // * Complete a Goal (check)
    $(".btnGoalComplete").on("click", function (e) {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == userData.userLastLocation.projectId) {
                projectProperties.tabs.forEach(tabProperties => {
                    if (tabProperties.id == userData.userLastLocation.tabId) {
                        tabProperties.goals.forEach(goalProperties => {
                            if (goalProperties.id == e.target.parentNode.parentNode.id) {
                                goalProperties.complete();
                            }
                        });
                    }
                });
            }
        }); 
    });
}

// ! Reminders Events Listeners
function remindersEventListeners() {
    // * Create a Reminder (+)
    $("#reminderBtnCreate").on("click", function () {
        // Create alertMin DOM
        $("#mainCtr").append(`
            <div class="alertMin">
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
                            <input id="reminderDueDate" class="input" type="date" name="dueDate">
                        </div>
                        <div class="alertMin__form__buttons">
                            <input class="btn btn--${userData.userLastLocation.projectColor}" type="submit">
                        </div>
                    </form>
                </div>
            </div>
        `);

        // Close alertMin
        $("#alertMinBtnClose").on("click", function () {
            $(".alertMin").remove();
        });
        // Capture Data
        $("#alertMinForm").submit(function (e) { 
            e.preventDefault();
            // storing user given values in them
            let newReminder = {
                "id" : randomId(()=> {
                    userData.projects.forEach(projectProperties => {
                        if (projectProperties.id == userData.userLastLocation.projectId) {
                            projectProperties.tabs.forEach(tabProperties => {
                                if (tabProperties.id == userData.userLastLocation.tabId) {
                                    return(tabProperties.reminders);
                                }
                            });
                        }
                    });
                }),
                name: String($("#reminderName").val()),
                dueDate: parseDate(String($("#reminderDueDate").val()))
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
                                newReminder.generateDOM(true);
                                saveDataToDB();
                                $(".alertMin").remove();
                                $(`#${newReminder.id}`).fadeIn();
                                
                                reloadTab();
                            }
                        });
                    }
                });
            }
        });

    });

    // * Delete Reminder (trash btn)
    $(".btnReminderDelete").on("click", function (e) {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == userData.userLastLocation.projectId) {
                projectProperties.tabs.forEach(tabProperties => {
                    if (tabProperties.id == userData.userLastLocation.tabId) {
                        let i = 0;
                        tabProperties.reminders.forEach(reminderProperties => {
                            if (reminderProperties.id == e.target.parentNode.parentNode.id) {
                                tabProperties.reminders.splice(i, 1);
                                saveDataToDB();
                                $(`#${reminderProperties.id}`).fadeOut(800);
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

    // * Complete Reminder (check btn)
    $(".btnReminderComplete").on("click", function (e) {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == userData.userLastLocation.projectId) {
                projectProperties.tabs.forEach(tabProperties => {
                    if (tabProperties.id == userData.userLastLocation.tabId) {
                        tabProperties.reminders.forEach(reminderProperties => {
                            if (reminderProperties.id == e.target.parentNode.parentNode.id) {
                                reminderProperties.complete();
                            }
                        });
                    }
                });
            }
        }); 
    });
}