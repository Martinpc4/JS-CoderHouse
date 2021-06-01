// * Clases
class project {
    constructor(projectProperties) {
        this.id = projectProperties.id === undefined ? randomId(userProjects) : projectProperties.id;
        this.name = projectProperties.name;
        this.tabs = projectProperties.tabs === undefined ? defaultTabs(this.id) : projectProperties.tabs;
        this.color = projectProperties.color === undefined ? "red" : projectProperties.color;
        this.fav = projectProperties.fav === undefined ? false : projectProperties.fav;
    }
}
class tab {
    constructor(tabProperties) {
        this.tabOf = tabProperties.tabOf;
        this.id = tabProperties.id;
        this.name = tabProperties.name;
        this.overview = tabProperties.overview === undefined ? false : tabProperties.overview;
        this.tasks = tabProperties.tasks;
        this.goals = tabProperties.goals;
        this.reminders = tabProperties.reminders;
    }
}
class task {
    constructor(taskProperties) {
        this.id = taskProperties.id;
        this.name = taskProperties.name;
        this.dueDate = taskProperties.dueDate;
        this.description = taskProperties.description;
        this.doneState = taskProperties.doneState === undefined ? false : taskProperties.doneState;
        this.onTime = this.doneState === false ? onTime(this.dueDate) : true;
    }
}
class goal {
    constructor(goalProperties) {
        this.id = goalProperties.id;
        this.name = goalProperties.name;
        this.doneState = goalProperties.doneState === undefined ? false : goalProperties.doneState;
    }
}
class reminder {
    constructor(reminderProperties) {
        this.id = reminderProperties.id;
        this.name = reminderProperties.name;
        this.dueDate = reminderProperties.dueDate;
        this.doneState = reminderProperties.doneState === undefined ? false : reminderProperties.doneState;
        this.onTime = this.doneState === false ? onTime(this.dueDate) : true;
    }
}

// * Funciones de Clase
function defaultTabs(projectId) {
    let defaultTabsArray = [];
    let overview = {
        tabOf: `${projectId}`,
        id: randomId([]),
        name: "Overview",
        goals: undefined,
        tasks: undefined,
        reminders: undefined,
        overview: true,
    };
    overview = new tab(overview);
    defaultTabsArray.push(overview);
    return (defaultTabsArray);
}
function randomId(array) {
    let i = 0;
    let state = true;
    if (array.length == 0) {
        id = Math.floor(Math.random() * (100000 - 1) + 1);
    }
    else {
        while (state === true) {
            id = Math.floor(Math.random() * (100000 - 1) + 1);
            for (object of array) {
                if (object.id == id) {
                    break;
                }
                else if (object.id != id) {
                    if (array.length == i) {
                        continue;
                    }
                    else {
                        state = false;
                        break;
                    }
                }
                i++;
            }
        }
    }
    return id;
}


// * Funciones multi-uso

function parseDate(date) {
    console.log(date);
    if (date === "") {
        return false;
    }
    else {
        date = String(date);
        date = date.replaceAll(" ", "");
        let dateArray = date.split("/");
        let newDate = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0])
        return newDate;
    }
}
function onTime(date) {
    if (date != false) {
        const todayDate = new Date();
        const todayMonth = (Number(todayDate.getMonth()) + 1);
        const todayDay = Number(todayDate.getDate());
        const todayYear = Number(todayDate.getFullYear());
    
        if (todayYear < Number(date.getFullYear())) {
            return true;
        }
        else if (todayYear > Number(date.getFullYear())) {
            return false;
        }
        else if (todayYear == Number(date.getFullYear())) {
            if (todayMonth < Number((date.getMonth() + 1))) {
                return true;
            }
            else if (todayMonth > Number((date.getMonth() + 1))) {
                return false;
            }
            else if (todayMonth == Number((date.getMonth() + 1))) {
                if (todayDay < Number(date.getDate())) {
                    return true
                }
                else if (todayDay > Number(date.getDate())) {
                    return false;
                }
                else if (todayDay == Number(date.getDate())) {
                    return true;
                }
            }
        }
    }
    else {
        return true;
    }
}

// * (Funciones DOM) - Top Bar

// Create Project Top Bar  DOM
function createProjectTopBarDom(projectProperties) {
    // Create Top Bar Ctr
    const topBarCtr = document.getElementById("topBarCtr");
    topBarCtr.innerHTML = "";

    // Create topBarInfoCtr
    const topBarInfoCtr = document.createElement("div");
    topBarInfoCtr.className = "top-bar__title-ctr";
    topBarInfoCtr.id = "topBarInfoCtr";
    topBarInfoCtr.innerHTML = `
        ${projectProperties.fav === false ? `
            <svg id="prjBtnFav" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
            </svg>
        ` : `
            <svg id="prjBtnFav" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
            </svg>
        `}
        <p>${projectProperties.name}</p>
    `;
    topBarCtr.appendChild(topBarInfoCtr);
    // Create the event listener to set a project as favourite
    document.getElementById("prjBtnFav").addEventListener("click", () => {
        userProjects.forEach(projectProperties => {
            if (projectProperties.id == lastLocation.projectId) {
                if (projectProperties.fav == true) {
                    projectProperties.fav = false;
                }
                else if (projectProperties.fav == false) {
                    projectProperties.fav = true;
                }
                saveStorage();
            }
        });
    });

    // Create topBarInfoActionsCtr
    const topBarInfoActionsCtr = document.createElement("div");
    topBarInfoActionsCtr.className = "top-bar__info-actions-ctr";
    topBarInfoActionsCtr.id = "topBarInfoActionsCtr";
    topBarInfoActionsCtr.innerHTML = `
        <svg id="prjBtnConfig" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm-1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/><path fill-rule="evenodd" d="M12 1c-.268 0-.534.01-.797.028-.763.055-1.345.617-1.512 1.304l-.352 1.45c-.02.078-.09.172-.225.22a8.45 8.45 0 00-.728.303c-.13.06-.246.044-.315.002l-1.274-.776c-.604-.368-1.412-.354-1.99.147-.403.348-.78.726-1.129 1.128-.5.579-.515 1.387-.147 1.99l.776 1.275c.042.069.059.185-.002.315-.112.237-.213.48-.302.728-.05.135-.143.206-.221.225l-1.45.352c-.687.167-1.249.749-1.304 1.512a11.149 11.149 0 000 1.594c.055.763.617 1.345 1.304 1.512l1.45.352c.078.02.172.09.22.225.09.248.191.491.303.729.06.129.044.245.002.314l-.776 1.274c-.368.604-.354 1.412.147 1.99.348.403.726.78 1.128 1.129.579.5 1.387.515 1.99.147l1.275-.776c.069-.042.185-.059.315.002.237.112.48.213.728.302.135.05.206.143.225.221l.352 1.45c.167.687.749 1.249 1.512 1.303a11.125 11.125 0 001.594 0c.763-.054 1.345-.616 1.512-1.303l.352-1.45c.02-.078.09-.172.225-.22.248-.09.491-.191.729-.303.129-.06.245-.044.314-.002l1.274.776c.604.368 1.412.354 1.99-.147.403-.348.78-.726 1.129-1.128.5-.579.515-1.387.147-1.99l-.776-1.275c-.042-.069-.059-.185.002-.315.112-.237.213-.48.302-.728.05-.135.143-.206.221-.225l1.45-.352c.687-.167 1.249-.749 1.303-1.512a11.125 11.125 0 000-1.594c-.054-.763-.616-1.345-1.303-1.512l-1.45-.352c-.078-.02-.172-.09-.22-.225a8.469 8.469 0 00-.303-.728c-.06-.13-.044-.246-.002-.315l.776-1.274c.368-.604.354-1.412-.147-1.99-.348-.403-.726-.78-1.128-1.129-.579-.5-1.387-.515-1.99-.147l-1.275.776c-.069.042-.185.059-.315-.002a8.465 8.465 0 00-.728-.302c-.135-.05-.206-.143-.225-.221l-.352-1.45c-.167-.687-.749-1.249-1.512-1.304A11.149 11.149 0 0012 1zm-.69 1.525a9.648 9.648 0 011.38 0c.055.004.135.05.162.16l.351 1.45c.153.628.626 1.08 1.173 1.278.205.074.405.157.6.249a1.832 1.832 0 001.733-.074l1.275-.776c.097-.06.186-.036.228 0 .348.302.674.628.976.976.036.042.06.13 0 .228l-.776 1.274a1.832 1.832 0 00-.074 1.734c.092.195.175.395.248.6.198.547.652 1.02 1.278 1.172l1.45.353c.111.026.157.106.161.161a9.653 9.653 0 010 1.38c-.004.055-.05.135-.16.162l-1.45.351a1.833 1.833 0 00-1.278 1.173 6.926 6.926 0 01-.25.6 1.832 1.832 0 00.075 1.733l.776 1.275c.06.097.036.186 0 .228a9.555 9.555 0 01-.976.976c-.042.036-.13.06-.228 0l-1.275-.776a1.832 1.832 0 00-1.733-.074 6.926 6.926 0 01-.6.248 1.833 1.833 0 00-1.172 1.278l-.353 1.45c-.026.111-.106.157-.161.161a9.653 9.653 0 01-1.38 0c-.055-.004-.135-.05-.162-.16l-.351-1.45a1.833 1.833 0 00-1.173-1.278 6.928 6.928 0 01-.6-.25 1.832 1.832 0 00-1.734.075l-1.274.776c-.097.06-.186.036-.228 0a9.56 9.56 0 01-.976-.976c-.036-.042-.06-.13 0-.228l.776-1.275a1.832 1.832 0 00.074-1.733 6.948 6.948 0 01-.249-.6 1.833 1.833 0 00-1.277-1.172l-1.45-.353c-.111-.026-.157-.106-.161-.161a9.648 9.648 0 010-1.38c.004-.055.05-.135.16-.162l1.45-.351a1.833 1.833 0 001.278-1.173 6.95 6.95 0 01.249-.6 1.832 1.832 0 00-.074-1.734l-.776-1.274c-.06-.097-.036-.186 0-.228.302-.348.628-.674.976-.976.042-.036.13-.06.228 0l1.274.776a1.832 1.832 0 001.734.074 6.95 6.95 0 01.6-.249 1.833 1.833 0 001.172-1.277l.353-1.45c.026-.111.106-.157.161-.161z"/>
        </svg>
    `;
    topBarCtr.appendChild(topBarInfoActionsCtr);
    // Create Config event listener
    document.getElementById("prjBtnConfig").addEventListener("click", () => {
        let alertDom = document.createElement("div");
        alertDom.className = "alert";
        alertDom.innerHTML = `
            <div class="alert__ctr">
                <div class="alert__info alert__info--${lastLocation.projectColor}">
                    <p>${projectProperties.name}</p>
                    <svg id="alertBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Change name</label>
                        <input id="alertProjectNewName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__input">
                        <label for="color">Change color</label>
                        <select name="color" class="select" id="alertProjectNewColor">
                            <option value="orange">Orange</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                            <option value="red">Red</option>
                        </select>
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn ${lastLocation.projectColor}" type="submit" value="Save">
                        <input id="alertProjectBtnDelete" class="btn ${lastLocation.projectColor}" type="button" value="Delete Project">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertDom);

        // Event Close Alert
        document.getElementById("alertBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertDom);
        });

        // Capture alert data (Config)
        document.getElementById("alertForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // change name
            let alertProjectNewName = String(document.getElementById("alertProjectNewName").value);
            if ((projectProperties.name != alertProjectNewName) && !(alertProjectNewName === "")) {
                projectProperties.name = alertProjectNewName;
            }
            // change color
            let alertProjectNewColor = String(document.getElementById("alertProjectNewColor").value);
            if (projectProperties.color != alertProjectNewColor) {
                projectProperties.color = alertProjectNewColor;
                lastLocation.projectColor = alertProjectNewColor;
            }
            saveStorage();
        });

        // Event delete project (btn)
        document.getElementById("alertProjectBtnDelete").addEventListener("click", () => {
            let i = 0;
            userProjects.forEach(prjProperties => {
                if (prjProperties.id == projectProperties.id) {
                    userProjects.splice(i, 1);
                    saveStorage();
                }
                else {
                    i++;
                }
            });
        });
    });

    // Create topBarTabsCtr
    const topBarTabsCtr = document.createElement("div");
    topBarTabsCtr.className = "top-bar__tabs-ctr";
    topBarTabsCtr.id = "topBarTabsCtr";
    projectProperties.tabs.forEach(projectTab => {
        let newTab = document.createElement("div");
        newTab.className = `top-bar__tabs-ctr__tab tab-link tab-link--${projectProperties.color}`;
        newTab.id = `${projectTab.id}`;
        newTab.innerHTML = `
        <p>${projectTab.name}</p>
        `;
        topBarTabsCtr.appendChild(newTab);
    });
    topBarCtr.appendChild(topBarTabsCtr);
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
}

// * (Funciones DOM) - Main Container

// Create Project Overview Tab DOM
function createOverviewDOM(projectProperties) {
    // Save last location
    if ((lastLocation.generalOverviewStatus === false) || (lastLocation.projectId != projectProperties.id)) {
        lastLocation.generalOverviewStatus = true;
        lastLocation.projectStatus = true;
        lastLocation.projectId = projectProperties.id;
        lastLocation.projectColor = projectProperties.color;
        lastLocation.specificTabStatus = false;
        lastLocation.tabId = undefined;
        saveStorage();
    }

    // (Project Status Component)
    // Obtain the project status
    let prjOnTime = undefined;
    projectProperties.tabs.forEach(tabProperties => {
        if (tabProperties.overview === false) {
            tabProperties.tasks.forEach(taskProperties => {
                if (taskProperties.onTime === false) {
                    prjOnTime = false;
                }
            });
        }
    });
    // Generate the number of completed tasks and goals in the project
    let completedTotal = 0;
    let totalExisting = 0;
    projectProperties.tabs.forEach(tabProperties => {
        if (tabProperties.overview === false) {
            tabProperties.tasks.forEach(taskProperties => {
                if (taskProperties.doneState === true) {
                    completedTotal++;
                    totalExisting++;
                }
                else {
                    totalExisting++;
                }
            });
            tabProperties.goals.forEach(goalProperties => {
                if (goalProperties.doneState === true) {
                    completedTotal++;
                    totalExisting++
                }
                else {
                    totalExisting++;
                }
            });
            tabProperties.reminders.forEach(reminderProperties => {
                if (reminderProperties.doneState === true) {
                    completedTotal++;
                    totalExisting++;
                }
                else {
                    totalExisting++;
                }
            });
        }
    });
    // Generate the percentage of completed tasks and goals in the project
    let completedPrjPercentage = Math.floor((completedTotal * 100) / totalExisting);
    if (isNaN(completedPrjPercentage)) {
        completedPrjPercentage = 0;
    }

    // Generate Overview Components DOM
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
                    <svg id="overviewBtnTabsCreate" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z"/>
                    </svg>
                </div>
            </div>
            <div id="overviewPrjStatsTabCtr" class="tabs-stat__ctr">
            </div>
        </div>
        <div class="prj-status">
            <div class="prj-status__time">
                <div class="prj-status__time__hdr">
                    <p>Status</p>
                </div>
                ${prjOnTime === false ? `
                        <div class="prj-status__time__status">
                            <div class="prj-status__time__status__color-ctr prj-status__time__status__color-ctr--delayed"></div>
                            <p>Delayed</p>
                        </div>
                    `: `
                        <div class="prj-status__time__status">
                            <div class="prj-status__time__status__color-ctr prj-status__time__status__color-ctr--onTrack"></div>
                            <p>On track</p>
                        </div>
                `}
            </div>
            <div class="prj-status__completed">
                <div class="prj-status__completed__hdr">
                    <p>Completed</p>
                </div>
                <div class="prj-status__completed__data">
                    <p>${completedTotal}/${totalExisting}</p>
                </div>
            </div>
            <div class="prj-status__percentage">
                <div class="prj-status__percentage__data">
                    <div class="prj-status__percentage__data__ctr">
                        <p>${completedPrjPercentage}%</p>
                    </div>
                </div>
                <div class="prj-status__percentage__hdr">
                    <p>completed</p>
                </div>
            </div>
        </div>
    `;
    mainCtr.appendChild(prjOverview);
    // Event Listener - Create Tab
    document.getElementById("overviewBtnTabsCreate").addEventListener("click", () => {
        // Alert creation (DOM)
        let alertDom = document.createElement("div");
        alertDom.className = "alert";
        alertDom.innerHTML = `
            <div class="alert__ctr">
                <div class="alert__info alert__info--${lastLocation.projectColor}">
                    <p>Create new Tab</p>
                    <svg id="alertBtnClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/>
                    </svg>
                </div>
                <form id="alertForm" class="alert__form" action="">
                    <div class="alert__form__input">
                        <label for="name">Name</label>
                        <input id="alertTabName" class="input" type="text" name="name">
                    </div>
                    <div class="alert__form__buttons">
                        <input class="btn ${lastLocation.projectColor}" type="submit">
                    </div>
                </form>
            </div>
        `;
        const mainCtr = document.getElementById("mainCtr");
        mainCtr.appendChild(alertDom);
        // Close alert
        document.getElementById("alertBtnClose").addEventListener("click", () => {
            mainCtr.removeChild(alertDom);
        });
        // Capture data
        document.getElementById("alertForm").addEventListener("submit", (event) => {
            event.preventDefault();
            // storing user given values in them
            let tabName = String(document.getElementById("alertTabName").value);
            if (tabName != "") {
                // tab object creation
                let newTab = { "name": tabName, "tabOf": lastLocation.projectId, "overview": false, };
                newTab = new tab(newTab);
                // adding the new tab to the project
                userProjects.forEach(projectProperties => {
                    if (projectProperties.id == lastLocation.projectId) {
                        projectProperties.tabs.push(newTab);
                        saveStorage();
                    }
                });
            }
        });
    });

    // (Tab Stats Component)
    // Fill the overview projects container
    const overviewPrjCtr = document.getElementById("overviewPrjStatsTabCtr");
    projectProperties.tabs.forEach(tabProperties => {
        if (tabProperties.overview === false) {
            // Count the amount of tasks, goals and reminders that are not finished
            let tasksNotFinished = 0;
            let goalsNotFinished = 0;
            let remindersNotFinished = 0;

            tabProperties.tasks.forEach(taskProperties => {
                if (taskProperties.doneState == false) {
                    tasksNotFinished++;
                }
            });
            tabProperties.goals.forEach(goalProperties => {
                if (goalProperties.doneState == false) {
                    goalsNotFinished++;
                }
            });
            tabProperties.reminders.forEach(reminderProperties => {
                if (reminderProperties.doneState == false) {
                    remindersNotFinished++;
                }
            });
            // Create the DOM for a new tab
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
                    <svg class="overviewBtnsTabsDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"/><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"/><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"/>
                    </svg>
                </div>
            `;
            overviewPrjCtr.appendChild(newTab);
        }
        // Delete Tab - Event Listener
        for (const overviewBtnTabDelete of document.getElementsByClassName("overviewBtnsTabsDelete")) {
            overviewBtnTabDelete.addEventListener("click", (event) => {
                userProjects.forEach(projectProperties => {
                    if (projectProperties.id == lastLocation.projectId) {
                        let i = 0;
                        projectProperties.tabs.forEach(tabProperties => {
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

// Create Specific Tab DOM
function createTabDom(tabProperties) {
    // Save last location
    if (lastLocation.specificTabStatus === false) {
        userProjects.forEach(projectProperties => {
            if (projectProperties.id == tabProperties.tabOf) {
                lastLocation.projectStatus = true;
                lastLocation.projectId = projectProperties.id;
                lastLocation.projectColor = projectProperties.color;
                lastLocation.generalOverviewStatus = false;
                lastLocation.specificTabStatus = true;
                lastLocation.tabId = tabProperties.id;
                saveStorage();
            }
        });
    }

    // Generate Specific Tab DOM
    const mainCtr = document.getElementById("mainCtr");
    mainCtr.innerHTML = "";
    mainCtr.innerHTML = `
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
    `;

    // Generate existing Tasks, Goals and Reminders DOM
    tabProperties.tasks.forEach(taskProperties => {
        createTaskDom(taskProperties);
    });
    tabProperties.goals.forEach(goalProperties => {
        createGoalDom(goalProperties);
    });
    tabProperties.reminders.forEach(reminderProperties => {
        createReminderDom(reminderProperties);
    });
    // Generates the events listener for all generated Tasks, Goals and Reminders DOM
    goalsEventsListeners();
    remindersEventListeners();
    tasksEventsListeners();
}

// * (Funciones DOM) - Tasks, Goals and Reminders

// Tasks DOM Creation
function createTaskDom(newTask) {
    let domTask = document.createElement("div");
    domTask.className = "task"
    domTask.id = `${newTask.id}`;
    domTask.innerHTML = `
        <div class="task__bar ${lastLocation.projectColor}"></div>
        <div class="task__ctr">
            <p class="task__title">${newTask.name}</p>
            <p class="task__dueDate">
                ${newTask.dueDate === false ? "" : String(newTask.dueDate.getDate()) + `/` + String(newTask.dueDate.getMonth() + 1) + `/` + String(newTask.dueDate.getFullYear())}
            </p>
            <p class="task__description">${newTask.description}</p>
            <div class="task__actions">
                <div class="task__actions-complete">
                    ${newTask.doneState === false ? `
                        <svg class="btnTaskComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"/>
                        </svg>
                    ` : `
                        <svg class="btnTaskComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"/><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/>
                        </svg>
                    `}
                </div>
                <div class="task__actions-delete">
                    <svg class="btnTaskDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"/><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"/><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"/>
                    </svg>
                </div>
            </div>
        </div>
    `;
    const domTaskctr = document.getElementById("tasksCtr");
    domTaskctr.appendChild(domTask);
}

// Goals DOM Creation
function createGoalDom(newGoal) {
    let domGoal = document.createElement("div");
    domGoal.className = "goal";
    domGoal.id = `${newGoal.id}`;
    domGoal.innerHTML = `
        <div class="goal__actions-complete">
            ${newGoal.doneState === false ? `
                <svg class="btnGoalComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"/>
                </svg>
            ` : `
                <svg class="btnGoalComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"/><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/>
                </svg>
            `}
        </div>
        <p class="goal__title">${newGoal.name}</p>
        <div class="goal__actions-delete">
            <svg class="btnGoalDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"/><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"/><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"/>
            </svg>
        </div>
    `;
    const goal_ctr = document.getElementById("goalsCtr");
    goal_ctr.appendChild(domGoal);
}

// Reminders DOM Creation
function createReminderDom(newReminder) {
    let domReminder = document.createElement("div");
    domReminder.className = "reminders";
    domReminder.id = `${newReminder.id}`;
    domReminder.innerHTML = `
            <div class="reminders__actions-complete">
                ${newReminder.doneState === false ? `
                    <svg class="btnReminderComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"/>
                    </svg>
                ` : `
                    <svg class="btnReminderComplete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"/><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/>
                    </svg>
                `}
            </div>
            ${newReminder.onTime === true ? `<div class="reminders__status reminders__status--onTime"></div>` : `<div class="reminders__status reminders__status--overdue"></div>`
        }
            <p class="reminders__title">${newReminder.name}</p>
            <p class="reminders__dueDate">${newReminder.dueDate === false ? "" : String(newReminder.dueDate.getDate()) + "/" + String(newReminder.dueDate.getMonth() + 1) + "/" + String(newReminder.dueDate.getFullYear())
        }</p>
            <div class="reminders__actions-delete">
                <svg class="btnReminderDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"/><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"/><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"/>
                </svg>
            </div>
        `;

    const reminders_ctr = document.getElementById("remindersCtr");
    reminders_ctr.appendChild(domReminder);
}