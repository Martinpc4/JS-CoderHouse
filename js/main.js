// !FUNCTIONS
function randomId(array) {
    let id = 0;
    let i = 0;
    let state = true;
    if (array.length == 0) {
        id = Math.floor(Math.random() * (100000 - 1) + 1);
    }
    else {
        while (state === true) {
            id = Math.floor(Math.random() * (100000 - 1) + 1);
            for (task of array) {
                if (task.id == id) {
                    break;
                }
                else if (task.id != id) {
                    if (array.length = i) {
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
function parseDate(date) {
    date = String(date);
    date = date.replaceAll(" ", "");
    let dateArray = date.split("/");
    let newDate = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0])
    return newDate;
}
function onTime(date) {
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
