function buildLoginDOM() {
    //  Generate the Login DOM
    $(".register").remove();
    $("body").append(`
        <div class="login">
            <div class="login__icon">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M100 20.8333C90.1992 20.8303 80.6555 23.9691 72.7697 29.7889C64.8839 35.6087 59.0713 43.8031 56.1851 53.1694C53.2989 62.5356 53.491 72.5803 56.7333 81.8293C59.9757 91.0783 66.0974 99.0444 74.2 104.558C60.1375 109.716 47.9402 118.964 39.178 131.113C30.4158 143.261 25.4896 157.753 25.0333 172.725C24.9836 174.383 25.5944 175.992 26.7313 177.199C27.8683 178.407 29.4382 179.113 31.0958 179.163C32.7534 179.212 34.3629 178.601 35.5702 177.465C36.7774 176.328 37.4836 174.758 37.5333 173.1C38.0296 156.862 44.8288 141.456 56.4902 130.145C68.1516 118.835 83.7587 112.509 100.004 112.509C116.25 112.509 131.857 118.835 143.518 130.145C155.18 141.456 161.979 156.862 162.475 173.1C162.481 173.932 162.654 174.755 162.982 175.519C163.311 176.284 163.789 176.975 164.388 177.553C164.987 178.13 165.696 178.582 166.472 178.882C167.248 179.182 168.076 179.324 168.908 179.3C169.74 179.275 170.559 179.085 171.316 178.74C172.073 178.395 172.754 177.902 173.318 177.291C173.883 176.679 174.319 175.961 174.602 175.178C174.885 174.396 175.009 173.564 174.967 172.733C174.512 157.76 169.587 143.266 160.824 131.116C152.062 118.966 139.864 109.717 125.8 104.558C133.903 99.0444 140.024 91.0783 143.267 81.8293C146.509 72.5803 146.701 62.5356 143.815 53.1694C140.929 43.8031 135.116 35.6087 127.23 29.7889C119.345 23.9691 109.801 20.8303 100 20.8333V20.8333ZM66.6667 66.6667C66.6667 57.8261 70.1786 49.3477 76.4298 43.0964C82.681 36.8452 91.1594 33.3333 100 33.3333C108.841 33.3333 117.319 36.8452 123.57 43.0964C129.821 49.3477 133.333 57.8261 133.333 66.6667C133.333 75.5072 129.821 83.9857 123.57 90.2369C117.319 96.4881 108.841 100 100 100C91.1594 100 82.681 96.4881 76.4298 90.2369C70.1786 83.9857 66.6667 75.5072 66.6667 66.6667V66.6667Z" fill="white"/>
                </svg>
            </div>
            <form id="loginForm" action="" class="login__form">
                <div class="form__input">
                    <label class="label" for="userEmail">Email</label>
                    <input id="loginUserEmail" class="input" type="email" name="userEmail" placeholder="name@email.com">
                </div>
                <div class="form__input">
                    <label class="label" for="userPassword">Password</label>
                    <input id="loginUserPassword" class="input" type="password" name="userPassword" placeholder="Enter your password">
                </div>
                <div class="form__btns">
                    <input class="btn background-orange" type="submit" value="Log in">
                    <input id="loginBtnRegister" class="btn background-orange" type="button" value="Register">
                </div>
            </form>
        </div>
    `);

    // Generate the Register option DOM
    $("#loginBtnRegister").on("click", function () {
        buildRegisterDOM();
    });
    
    // Login of the User in the DB
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        let userEmail = $("#loginUserEmail").val();
        let userPassword = $("#loginUserPassword").val();

        if ((userEmail != "") && (userPassword != "")) {
            $.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/tasktabs-api-hqqej/service/TaskTabs-API/incoming_webhook/webhook-user-information?secret=TaskTabs-user-login-a3s5d4as68d4a68d4as35da4sd6a",
                {"operation" : "login", "userEmail": userEmail, "userPassword": userPassword },
                function (data, textStatus, jqXHR) {
                    if (data != null) {
                        localStorage.setItem("userData", JSON.stringify({
                            "userId": data.userId,
                        }))
                        window.open("index.html", "_self");
                    }
                    else if (data == null) {
                        console.log("INVALID USERNAME OR PASSWORD");
                    }
                    if (textStatus != "success") {
                        console.log(`There has been an error connecting with the database. Current status: ${textStatus}`);
                    }
        
                },
            );
        }
    });
}

function buildRegisterDOM() {
    // * Register DOM generation
    $(".login").remove();
    $("body").append(`
        <div class="register">
            <div class="login__icon">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M100 20.8333C90.1992 20.8303 80.6555 23.9691 72.7697 29.7889C64.8839 35.6087 59.0713 43.8031 56.1851 53.1694C53.2989 62.5356 53.491 72.5803 56.7333 81.8293C59.9757 91.0783 66.0974 99.0444 74.2 104.558C60.1375 109.716 47.9402 118.964 39.178 131.113C30.4158 143.261 25.4896 157.753 25.0333 172.725C24.9836 174.383 25.5944 175.992 26.7313 177.199C27.8683 178.407 29.4382 179.113 31.0958 179.163C32.7534 179.212 34.3629 178.601 35.5702 177.465C36.7774 176.328 37.4836 174.758 37.5333 173.1C38.0296 156.862 44.8288 141.456 56.4902 130.145C68.1516 118.835 83.7587 112.509 100.004 112.509C116.25 112.509 131.857 118.835 143.518 130.145C155.18 141.456 161.979 156.862 162.475 173.1C162.481 173.932 162.654 174.755 162.982 175.519C163.311 176.284 163.789 176.975 164.388 177.553C164.987 178.13 165.696 178.582 166.472 178.882C167.248 179.182 168.076 179.324 168.908 179.3C169.74 179.275 170.559 179.085 171.316 178.74C172.073 178.395 172.754 177.902 173.318 177.291C173.883 176.679 174.319 175.961 174.602 175.178C174.885 174.396 175.009 173.564 174.967 172.733C174.512 157.76 169.587 143.266 160.824 131.116C152.062 118.966 139.864 109.717 125.8 104.558C133.903 99.0444 140.024 91.0783 143.267 81.8293C146.509 72.5803 146.701 62.5356 143.815 53.1694C140.929 43.8031 135.116 35.6087 127.23 29.7889C119.345 23.9691 109.801 20.8303 100 20.8333V20.8333ZM66.6667 66.6667C66.6667 57.8261 70.1786 49.3477 76.4298 43.0964C82.681 36.8452 91.1594 33.3333 100 33.3333C108.841 33.3333 117.319 36.8452 123.57 43.0964C129.821 49.3477 133.333 57.8261 133.333 66.6667C133.333 75.5072 129.821 83.9857 123.57 90.2369C117.319 96.4881 108.841 100 100 100C91.1594 100 82.681 96.4881 76.4298 90.2369C70.1786 83.9857 66.6667 75.5072 66.6667 66.6667V66.6667Z" fill="white"/>
                </svg>
            </div>
            <form id="registerForm" action="" class="register__form">
                <div class="form__input">
                    <label class="label" for="userName">Email</label>
                    <input id="registerUserEmail" class="input" type="text" name="userName" placeholder="name@email.com">
                </div>
                <div class="form__input">
                    <label class="label" for="userPassword">Password</label>
                    <input id="registerUserPassword" class="input" type="password" name="userPassword" placeholder="Enter your password">
                </div>
                <div class="form__input">
                    <label class="label" for="userName">Name</label>
                    <input id="registerUserName" class="input" type="text" name="userName" placeholder="John">
                </div>
                <div class="form__input">
                    <label class="label" for="userLastName">Last Name</label>
                    <input id="registerUserLastName" class="input" type="text" name="userLastName" placeholder="Smith">
                </div>
                <div class="form__btns">
                    <input class="btn background-orange" type="submit" value="Register">
                    <input id="registerBtnLogin" class="btn background-orange" type="button" value="Log in">
                </div>
            </form>
        </div>
    `);

    // * Registration of the User in the database
    $(".register").ready(function () {
        // Generate the Register option DOM
        $("#registerBtnLogin").on("click", function (e) {
            console.log("ENTRE");
            e.preventDefault();
            buildLoginDOM();
        });

        // Generate the Login option DOM
        $("#registerForm").submit(function (e) {
            e.preventDefault();
            let userEmail = $("#registerUserEmail").val();
            let userPassword = $("#registerUserPassword").val();
            let userName = $("#registerUserName").val();
            let userLastName = $("#registerUserLastName").val();
        
            // $.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/tasktabs-api-hqqej/service/TaskTabs-API/incoming_webhook/webhook-user-information?secret=TaskTabs-user-login-a3s5d4as68d4a68d4as35da4sd6a",
            //     {"operation" : "register", "userEmail": userEmail, "userPassword": userPassword, "userName" : userName, "userLastName" : userLastName },
            //     function (data, textStatus, jqXHR) {
            //         console.log(data);
            //         if (data != null) {
            //             localStorage.setItem("userData", JSON.stringify({
            //                 "userId": data.userId,
            //             }))
            //         }
            //         else if (data == null) {
            //             console.log("Email already exists");
            //         }
            //         if (textStatus != "success") {
            //             console.log(`There has been an error connecting with the database. Current status: ${textStatus}`);
            //         }
        
            //     },
            // );
        });
    });

}

buildLoginDOM();