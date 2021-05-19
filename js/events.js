// ! EVENTS
let btnTaskDelete = document.getElementsByClassName("task__actions__delete");
for (const task of btnTaskDelete) {
    task.addEventListener("click", deleteTask);
}
function deleteTask (event) {
    const eventTarget = event.target;
    const taskContainer = eventTarget.parentNode.parentNode.parentNode;
    userTasks = [{name : "Tarea2", dueDate : "03/01/2021", description : "Hay que hacer la tarea de Fundamentos 2"}, {name : "Tarea3", dueDate : "03/01/2021", description : "Hay que hacer la tarea de Fundamentos 3"}];
    // userTasks.forEach(element => {
    //     console.log(element);
    // });

    // userTasks.forEach(element => {
    //     console.log(element);
    // });

    let i = 0;
    userTasks.forEach(task => {
        if (task.id == taskContainer.id) {
            console.log("PING");
            //userTasks.splice(i, 1);
        }
        else {
            i++;
        }
    });
}