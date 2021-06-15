


$("#loginForm").submit(function (e) { 
    e.preventDefault();
    let userEmail = $("#loginUserEmail").val();
    let userPassword = $("#loginUserPassword").val();

    $.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/tasktabs-api-hqqej/service/TaskTabs-API/incoming_webhook/webhook-user-login?secret=TaskTabs-user-login-a3s5d4as68d4a68d4as35da4sd6a",
    { "userEmail": userEmail, "userPassword": userPassword },
    function (data, textStatus, jqXHR) {
        if (data != null) {
            localStorage.setItem("userData", JSON.stringify({
                "userId" :  data.userId,
            }))
        }
        else if (data == null) {
            console.log("INVALID USERNAME OR PASSWORD");
        }
        if (textStatus != "success") {
            console.log(`There has been an error connecting with the database. Current status: ${textStatus}`);
        }
        
    },
);
});