// ! General DOM Functions

function reloadTab() {
    // Remove the current Tab Dom
    $("#mainCtr").empty();
    $("#topBarCtr").empty();

    // Create the updated Tab DOM and Project Tab DOM
    userData.projects.forEach(projectProperties => {
        if (projectProperties.id == userData.userLastLocation.projectId) {
            createProjectTopBarDom(projectProperties);

            projectProperties.tabs.forEach(tabProperties => {
                if (tabProperties.id == userData.userLastLocation.tabId) {
                    createTabDom(tabProperties);
                }
            });
        }
    });
}

// ! Menu (DOM functions)

// * (DOM Function) Dashboard Section
// Create dashboard TopBar
function createDashboardTopBar() {
    // Clear the TopBar DOM
    $("#topBarCtr").empty();
    // Append the Dashboard Top Bar
    $("#topBarCtr").append(`
        <div id="topBarInfoCtr" class="top-bar__title-ctr">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill-rule="evenodd" d="M12.876.64a1.75 1.75 0 00-1.75 0l-8.25 4.762a1.75 1.75 0 00-.875 1.515v9.525c0 .625.334 1.203.875 1.515l8.25 4.763a1.75 1.75 0 001.75 0l8.25-4.762a1.75 1.75 0 00.875-1.516V6.917a1.75 1.75 0 00-.875-1.515L12.876.639zm-1 1.298a.25.25 0 01.25 0l7.625 4.402-7.75 4.474-7.75-4.474 7.625-4.402zM3.501 7.64v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947L3.501 7.64zm9.25 13.421l7.625-4.402a.25.25 0 00.125-.216V7.639l-7.75 4.474v8.947z"></path>
            </svg>
            <p>Dashboard</p>
        </div>
    `);
}
// Create dashboard MainCtr
function createDashboardMainCtr() {
    // create the DOM
    $("#mainCtr").empty);
    $("#mainCtr").prepend(`
        <div class="menu-section">
            <div class="menu-section__random-quote">
            </div>
            <div id="menuSectionDashboardPrjStatsCtr" class="menu-section__prjs-stats">
            </div>
        </div>
    `);

    let totalTGRCompleted = 0;
    let totalTGR = 0;
    userData.projects.forEach(projectProperties => {
        projectProperties.tabs.forEach(tabProperties => {
            tabProperties.tasks.forEach(taskProperties => {
                totalTGR += 1;
                if (taskProperties.doneState === true) {
                    totalTGRCompleted += 1;
                }
            });
            tabProperties.goals.forEach(goalProperties => {
                totalTGR += 1;
                if (goalProperties.doneState === true) {
                    totalTGRCompleted += 1;
                }
            });
            tabProperties.reminders.forEach(reminderProperties => {
                totalTGR += 1;
                if (reminderProperties.doneState === true) {
                    totalTGRCompleted += 1;
                }
            });
        });
        $("#menuSectionDashboardPrjStatsCtr").append(`
            <div class="menu-section__prjs-stats__prj">
                <div class="menu-section__prjs-stats__prj__data border-${projectProperties.color}">
                    <p>${isNaN((totalTGR * 100) / totalTGRCompleted) ? 100 : (totalTGR * 100) / totalTGRCompleted}%</p>
                </div>
                <div class="menu-section__prjs-stats__prj__name">
                    <p>${projectProperties.name}</p>
                </div>
            </div>
        `);
    });

    // Random Advice Component
    $.get("https://api.quotable.io/quotes?tags=inspirational|inspiration?maxLength=50", function (data, statusCode) {
        if (statusCode == "success") {
            let quoteNumber = Math.floor(Math.random() * (data.results.length - 1) + 1);
            let randomQuote = String('"' + data.results[quoteNumber].content + '" -' + data.results[quoteNumber].author);
            $(".menu-section__random-quote").prepend(`
                <p>${randomQuote}</p>
            `);
        }
        else if (statusCode != "success") {
            console.log("Dashboard inspirational quote (error: " + statusCode + ")");
            $(".menu-section__random-quote").prepend(`
                <p>Quote error</p>
            `);
        }
    });
}

// ! Project (DOM functions)

// * (Top Bar) - Prj Navigation Bar
function createProjectTopBarDom(projectProperties) {
    // Set user last location
    if ((userData.userLastLocation.projectId != projectProperties.id) || (userData.userLastLocation.menuSection == true)) {
        userData.userLastLocation.menuSection = false;
        userData.userLastLocation.menuSectionName = undefined;
        userData.userLastLocation.projectStatus = true;
        userData.userLastLocation.projectId = projectProperties.id;
        userData.userLastLocation.projectColor = projectProperties.color;
        // saveDataToDB();
    }

    // Check the project status
    projectProperties.onTime = projectProperties.checkOnTime();

    // Create Top Bar Ctr DOM
    $("#topBarCtr").empty();
    $("#topBarCtr").append(`
        <div id="topBarInfoCtr" class="top-bar__title-ctr">
            <p>${projectProperties.name}</p>
            ${projectProperties.fav === false ? `
                <svg id="prjBtnFav" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
                </svg>
            ` : `
                <svg id="prjBtnFav" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                </svg>
            `}
            <div class="top-bar__title-ctr__prj-status">
                ${projectProperties.onTime === false ? `
                    <div class="top-bar__title-ctr__prj-status__color background-red"></div>
                    <p class="top-bar__title-ctr__prj-status__text">Delayed</p>
                    `: `
                    <div class="top-bar__title-ctr__prj-status__color background-green"></div>
                    <p class="top-bar__title-ctr__prj-status__text">On track</p>
                `}
            </div>
        </div>
    `);

    // Create the event listener to set a project as favourite
    $("#prjBtnFav").on("click", function () {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == userData.userLastLocation.projectId) {
                if (projectProperties.fav == true) {
                    projectProperties.fav = false;
                }
                else if (projectProperties.fav == false) {
                    projectProperties.fav = true;
                }
                saveDataToDB();
            }
        }); 
    });

    // Create topBarInfoActionsCtr
    $("#topBarCtr").append(`
        <div id="topBarInfoActionsCtr" class="top-bar__info-actions-ctr">
            <svg id="prjBtnConfig" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm-1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/><path fill-rule="evenodd" d="M12 1c-.268 0-.534.01-.797.028-.763.055-1.345.617-1.512 1.304l-.352 1.45c-.02.078-.09.172-.225.22a8.45 8.45 0 00-.728.303c-.13.06-.246.044-.315.002l-1.274-.776c-.604-.368-1.412-.354-1.99.147-.403.348-.78.726-1.129 1.128-.5.579-.515 1.387-.147 1.99l.776 1.275c.042.069.059.185-.002.315-.112.237-.213.48-.302.728-.05.135-.143.206-.221.225l-1.45.352c-.687.167-1.249.749-1.304 1.512a11.149 11.149 0 000 1.594c.055.763.617 1.345 1.304 1.512l1.45.352c.078.02.172.09.22.225.09.248.191.491.303.729.06.129.044.245.002.314l-.776 1.274c-.368.604-.354 1.412.147 1.99.348.403.726.78 1.128 1.129.579.5 1.387.515 1.99.147l1.275-.776c.069-.042.185-.059.315.002.237.112.48.213.728.302.135.05.206.143.225.221l.352 1.45c.167.687.749 1.249 1.512 1.303a11.125 11.125 0 001.594 0c.763-.054 1.345-.616 1.512-1.303l.352-1.45c.02-.078.09-.172.225-.22.248-.09.491-.191.729-.303.129-.06.245-.044.314-.002l1.274.776c.604.368 1.412.354 1.99-.147.403-.348.78-.726 1.129-1.128.5-.579.515-1.387.147-1.99l-.776-1.275c-.042-.069-.059-.185.002-.315.112-.237.213-.48.302-.728.05-.135.143-.206.221-.225l1.45-.352c.687-.167 1.249-.749 1.303-1.512a11.125 11.125 0 000-1.594c-.054-.763-.616-1.345-1.303-1.512l-1.45-.352c-.078-.02-.172-.09-.22-.225a8.469 8.469 0 00-.303-.728c-.06-.13-.044-.246-.002-.315l.776-1.274c.368-.604.354-1.412-.147-1.99-.348-.403-.726-.78-1.128-1.129-.579-.5-1.387-.515-1.99-.147l-1.275.776c-.069.042-.185.059-.315-.002a8.465 8.465 0 00-.728-.302c-.135-.05-.206-.143-.225-.221l-.352-1.45c-.167-.687-.749-1.249-1.512-1.304A11.149 11.149 0 0012 1zm-.69 1.525a9.648 9.648 0 011.38 0c.055.004.135.05.162.16l.351 1.45c.153.628.626 1.08 1.173 1.278.205.074.405.157.6.249a1.832 1.832 0 001.733-.074l1.275-.776c.097-.06.186-.036.228 0 .348.302.674.628.976.976.036.042.06.13 0 .228l-.776 1.274a1.832 1.832 0 00-.074 1.734c.092.195.175.395.248.6.198.547.652 1.02 1.278 1.172l1.45.353c.111.026.157.106.161.161a9.653 9.653 0 010 1.38c-.004.055-.05.135-.16.162l-1.45.351a1.833 1.833 0 00-1.278 1.173 6.926 6.926 0 01-.25.6 1.832 1.832 0 00.075 1.733l.776 1.275c.06.097.036.186 0 .228a9.555 9.555 0 01-.976.976c-.042.036-.13.06-.228 0l-1.275-.776a1.832 1.832 0 00-1.733-.074 6.926 6.926 0 01-.6.248 1.833 1.833 0 00-1.172 1.278l-.353 1.45c-.026.111-.106.157-.161.161a9.653 9.653 0 01-1.38 0c-.055-.004-.135-.05-.162-.16l-.351-1.45a1.833 1.833 0 00-1.173-1.278 6.928 6.928 0 01-.6-.25 1.832 1.832 0 00-1.734.075l-1.274.776c-.097.06-.186.036-.228 0a9.56 9.56 0 01-.976-.976c-.036-.042-.06-.13 0-.228l.776-1.275a1.832 1.832 0 00.074-1.733 6.948 6.948 0 01-.249-.6 1.833 1.833 0 00-1.277-1.172l-1.45-.353c-.111-.026-.157-.106-.161-.161a9.648 9.648 0 010-1.38c.004-.055.05-.135.16-.162l1.45-.351a1.833 1.833 0 001.278-1.173 6.95 6.95 0 01.249-.6 1.832 1.832 0 00-.074-1.734l-.776-1.274c-.06-.097-.036-.186 0-.228.302-.348.628-.674.976-.976.042-.036.13-.06.228 0l1.274.776a1.832 1.832 0 001.734.074 6.95 6.95 0 01.6-.249 1.833 1.833 0 001.172-1.277l.353-1.45c.026-.111.106-.157.161-.161z"/>
            </svg>
        </div>
    `);
    // Create Config event 
    $("#prjBtnConfig").on("click", function () {
        $("#mainCtr").append(`
            <div class="alertMin">
                <div class="alertMin__ctr">
                    <div class="alertMin__info alertMin__info--${userData.userLastLocation.projectColor}">
                        <p>${projectProperties.name}</p>
                        <svg id="alertMinBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                        </svg>
                    </div>
                    <form id="alertMinForm" class="alertMin__form" action="">
                        <div class="alertMin__form__input">
                            <label for="name">Change name</label>
                            <input id="alertMinProjectNewName" class="input" type="text" name="name">
                        </div>
                        <div class="alertMin__form__input">
                            <label for="color">Change color</label>
                            <select name="color" class="select" id="alertMinProjectNewColor">
                                <option value="orange">Orange</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="purple">Purple</option>
                                <option value="red">Red</option>
                            </select>
                        </div>
                        <div class="alertMin__form__buttons">
                            <input class="btn btn--${userData.userLastLocation.projectColor}" type="submit" value="Save">
                            <input id="alertMinProjectBtnDelete" class="btn btn--${userData.userLastLocation.projectColor}" type="button" value="Delete Project">
                        </div>
                    </form>
                </div>
            </div>
        `);

        // Event Close Alert
        $("#alertMinBtnClose").on("click", function () {
            $(".alertMin").remove();
        });

        // Capture alert data (Config)
        $("#alertMinForm").submit(function (e) { 
            e.preventDefault();
            // change name
            let alertProjectNewName = String($("#alertMinProjectNewName").val());
            if ((projectProperties.name != alertProjectNewName) && !(alertProjectNewName === "")) {
                projectProperties.name = alertProjectNewName;
            }
            // change color
            let alertProjectNewColor = String($("#alertMinProjectNewColor").val());
            if (projectProperties.color != alertProjectNewColor) {
                projectProperties.color = alertProjectNewColor;
                userData.userLastLocation.projectColor = alertProjectNewColor;
            }
            saveDataToDB();
        });

        // Event delete project (btn)
        $("#alertMinProjectBtnDelete").on("click", function () {
            let i = 0;
            userData.projects.forEach(prjProperties => {
                if (prjProperties.id == projectProperties.id) {
                    userData.projects.splice(i, 1);
                    saveDataToDB();
                }
                else {
                    i++;
                }
            });
        });
    });

    // Create topBarTabsCtr
    $("#topBarCtr").append(`
        <div id="topBarTabsCtr" class="top-bar__tabs-ctr"></div>
    `);
    projectProperties.tabs.forEach(projectTab => {
        $("#topBarTabsCtr").append(`
            <div id="${projectTab.id}" class="top-bar__tabs-ctr__tab tab-link tab-link--${projectProperties.color}}">
                <p>${projectTab.name}</p>
            </div>
        `);
    });

    // Create event listeners for each tab
    $(".top-bar__tabs-ctr__tab").on("click", function (e) {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == userData.userLastLocation.projectId) {
                projectProperties.tabs.forEach(tabProperties => {
                    if (tabProperties.id == e.target.parentNode.id) {
                        if (tabProperties.overview === false) {
                            createTabDom(tabProperties);
                        }
                        else if (tabProperties.overview === true) {
                            createOverviewDOM(projectProperties);
                        }
                    }
                });
            }
        });
    });
}

// * (Main Ctr) Prj Overview Tab DOM
function createOverviewDOM(projectProperties) {
    // Save last location
    if ((userData.userLastLocation.generalOverviewStatus === false) || (userData.userLastLocation.projectId != projectProperties.id)) {
        userData.userLastLocation = new lastLocation({
            "menuSection": false,
            "menuSectionName": undefined,
            "generalOverviewStatus": true,
            "projectStatus": true,
            "projectId": projectProperties.id,
            "projectColor": projectProperties.color,
            "specificTabStatus": false,
            "tabId": undefined
        });
        saveDataToDB();
    }

    1 // Generate Overview Components DOM
    $("#mainCtr").append(`
        <div class="prj-overview">
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
                        <svg id="overviewBtnTabsCreate" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z"/>
                        </svg>
                    </div>
                </div>
                <div id="overviewPrjStatsTabCtr" class="tabs-stat__ctr">
                </div>
            </div>
        </div>
    `);

    // Event Listener - Create Tab
    $("#overviewBtnTabsCreate").on("click", function () {
        // Alert creation (DOM)
        $("#mainCtr").append(`
            <div class="alertMin">
                <div class="alertMin__ctr">
                    <div class="alertMin__info alertMin__info--${userData.userLastLocation.projectColor}">
                        <p>Create new Tab</p>
                        <svg id="alertBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                        </svg>
                    </div>
                    <form id="alertMinForm" class="alertMin__form" action="">
                        <div class="alertMin__form__input">
                            <label for="name">Name</label>
                            <input id="alertTabName" class="input" type="text" name="name">
                        </div>
                        <div class="alertMin__form__buttons">
                            <input class="btn btn--${userData.userLastLocation.projectColor}" type="submit">
                        </div>
                    </form>
                </div>
            </div>
        `);

        // Close alert
        $("#alertBtnClose").on("click", function () {
            $(".alertMin").remove();
        });

        // Capture data
        $("#alertMinForm").submit(function (e) { 
            e.preventDefault();
            // storing user given values in them
            let tabName = String($("#alertTabName").val());
            if (tabName != "") {
                // adding the new tab to the project
                userData.projects.forEach(projectProperties => {
                    if (projectProperties.id == userData.userLastLocation.projectId) {
                        // creates a random id for the tab
                        let tabId = randomId(projectProperties.tabs);
                        // tab object creation
                        let newTab = { "name": tabName, "tabOf": userData.userLastLocation.projectId, "id": tabId, "overview": false, };
                        newTab = new tab(newTab);
                        projectProperties.tabs.push(newTab);
                        // saves data in the db
                        saveDataToDB();
                        // removes the alert
                        $(".alertMin").remove();
                        // creates DOM of the new Tab
                        createOverviewDOM(projectProperties);
                        createProjectTopBarDom(projectProperties);
                    }
                });
            }
        });
    });

    // (Tab Stats Component)
    // Fill the overview projects container
    projectProperties.tabs.forEach(tabProperties => {
        if (tabProperties.overview === false) {
            // Count the amount of tasks, goals and reminders that are not finished
            let tasksNotFinished = 0;
            let goalsNotFinished = 0;
            let remindersNotFinished = 0;

            if (tabProperties.tasks != undefined) {
                tabProperties.tasks.forEach(taskProperties => {
                    if (taskProperties.doneState == false) {
                        tasksNotFinished++;
                    }
                });
            }
            if (tabProperties.goals != undefined) {
                tabProperties.goals.forEach(goalProperties => {
                    if (goalProperties.doneState == false) {
                        goalsNotFinished++;
                    }
                });
            }
            if (tabProperties.reminders != undefined) {
                tabProperties.reminders.forEach(reminderProperties => {
                    if (reminderProperties.doneState == false) {
                        remindersNotFinished++;
                    }
                });
            }
            // Create the DOM for a new tab
            $("#overviewPrjStatsTabCtr").append(`
                <div id="${tabProperties.id}" class="tabs-stat__ctr__tab">
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
                        <svg class="overviewBtnsTabsDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"/><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"/><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"/>
                        </svg>
                    </div>
                </div>
            `);
        }

        // Delete Tab - Event Listener
        $("#overviewBtnsTabsDelete").on("click", function (e) {
            userData.projects.forEach(projectProperties => {
                if (projectProperties.id == userData.userLastLocation.projectId) {
                    let i = 0;
                    projectProperties.tabs.forEach(tabProperties => {
                        if (tabProperties.id == e.target.parentNode.parentNode.id) {
                            projectProperties.tabs.splice(i, 1);
                            saveDataToDB();
                            createOverviewDOM(projectProperties);
                            createProjectTopBarDom(projectProperties);
                        }
                        else {
                            i++;
                        }
                    });
                }
            });
        });
    });
}

// * (Main Ctr) - Prj Specific Tab DOM
function createTabDom(tabProperties) {
    // Save last location
    if ((userData.userLastLocation.tabId != tabProperties.id) || (userData.userLastLocation.specificTabStatus === false)) {
        userData.projects.forEach(projectProperties => {
            if (projectProperties.id == tabProperties.tabOf) {
                userData.userLastLocation = new lastLocation({
                    "menuSection": false,
                    "menuSectionName": undefined,
                    "generalOverviewStatus": false,
                    "projectStatus": true,
                    "projectId": projectProperties.id,
                    "projectColor": projectProperties.color,
                    "specificTabStatus": true,
                    "tabId": tabProperties.id
                });
                saveDataToDB();
            }
        });
    }

    // Generate Specific Tab DOM
    $("#mainCtr").empty();
    $("#mainCtr").append(`
        <div id="${tabProperties.id}" class="Goals-Tasks-Reminders-Ctr">
            <div class="goals">
                <div class="goals__info">
                    <p>Goals</p>
                </div>
                <div class="goals__actions">
                    <svg id="goalBtnCreate" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z"/>
                    </svg>
                </div>
                <div id="goalsCtr" class="goals__ctr">
                </div>
            </div>
            <div class="tasks">
                <div class="tasks__info">
                    <p>Tasks</p>
                </div>
                <div class="tasks__actions">
                    <svg id="taskBtnCreate" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z"/>
                    </svg>
                </div>
                <div id="tasksCtr" class="tasks__ctr">
                </div>
            </div>
            <div class="reminders">
                <div class="reminders__info">
                    <p>Reminders</p>
                </div>
                <div class="reminders__actions">
                    <svg id="reminderBtnCreate" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z"/>
                    </svg>
                </div>
                <div id="remindersCtr" class="reminders__ctr">
                </div>
            </div>
        </div>
    `);

    // Generate existing Tasks, Goals and Reminders DOM
    $(`#${tabProperties.id}`).ready(function () {
        tabProperties.tasks.forEach(taskProperties => {
            taskProperties.generateDOM(false);
        });
        tabProperties.goals.forEach(goalProperties => {
            goalProperties.generateDOM(false);
        });
        tabProperties.reminders.forEach(reminderProperties => {
            reminderProperties.generateDOM(false);
        });
        // Generates the events listener for all generated Tasks, Goals and Reminders DOM
        goalsEventsListeners();
        tasksEventsListeners();
        remindersEventListeners();
    });

}