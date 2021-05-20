// ! EVENTS

// ? Create a Task
let btnTaskCreate = document.getElementById("taskBtnCreate");
btnTaskCreate.addEventListener("click", createTask);
function createTask(event) {
    console.log("PING")
    let alertDom = document.createElement("div");
    alertDom.className = "alert";
    alertDom.innerHTML = `
        <div class="alert__container">
            <div class="alert__info">
                <p>Create Task</p>
                <i class="bi bi-x-lg"></i>
            </div>
            <form class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input class="input" type="text" name="name">
                </div>
                <div class="alert__form__input">
                    <label for="dueDate">Due date</label>
                    <input class="input" type="text" name="dueDate">
                </div>
                <div class="alert__form__input--description">
                    <label for="description">Description</label>
                    <textarea class="textarea" name="description" id=""></textarea>
                </div>
                <div class="alert__form__buttons">
                    <input class="btn" type="submit">
                </div>
            </form>
        </div>
    `;

    const mainContainer = document.getElementById("mainContainer");
    mainContainer.appendChild(alertDom);
}

// ? Delete a Task
let btnTaskDelete = document.getElementsByClassName("task__actions__delete");
for (const task of btnTaskDelete) {
    task.addEventListener("click", deleteTask);
}
function deleteTask(event) {
    const eventTarget = event.target;
    const taskContainer = event.target.parentNode.parentNode.parentNode;

    console.log("PING");
    // userTasks.forEach(element => {
    //     console.log(element);
    // });

    // userTasks.forEach(element => {
    //     console.log(element);
    // });
    userTasks.forEach(task => {
        if (task.id == taskContainer.id) {
            console.log("PING");
            //userTasks.splice(i, 1);
        }
    });
}