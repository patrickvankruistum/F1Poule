var checkStart;
(checkStart = function() {

    hidePopover();

    var c = readCookie('token');

    if (c == null) {
        GoToLoginPage();
        return;
    }

    currentUsr = c.substring(0, 3);

    RemoveOldTokensFromDatabase();

    let keyFound = false;
    database.ref('tokens').orderByChild('token').equalTo(c).on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if (data.key != null) {
                keyFound = true;
            }
        });
        if (keyFound) {
            GoToMainPage(currentUsr);
        } else {
            eraseCookie('token');
            GoToLoginPage();
        }
    });


})();





function GoToMainPage(userId) {

    loginId.innerHTML = userId;
    ReadCircuits();

    //console.log(document.getElementById('main.html').innerHTML);

    //navigator.resetToPage('main.html');
}

function OnSignIn() {

    currentUsr = document.getElementById('loginUserName').value.toUpperCase();

    let password = document.getElementById('loginPassword');
    let rememberMe = document.getElementById('loginRememberMe');
    let loginMessages = document.getElementById('loginMessages');

    if (currentUsr === '' || password.value === '') return;

    var ref = database.ref('/players/' + currentUsr);

    ref.once("value", snapshot => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.password === password.value) {

                if (rememberMe.checked) {
                    CreateNewToken(currentUsr);
                }
                GoToMainPage(currentUsr);

            } else {
                loginMessages.innerHTML = 'Onjuist wachtwoord.'
                return;
            }
        } else {
            loginMessages.innerHTML = 'Gebruikersnaam bestaat niet.'
            return;
        }
    });
}

function SignOut() {
    eraseDatabaseToken();
    eraseCookie('token');
    currentUsr = '';
    hidePopover();
    GoToLoginPage();
}

function GoToLoginPage() {
    navigator.resetToPage('login.html');
    //navigator.pushPage('login.html');
}