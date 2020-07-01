var checkStart;
(checkStart = function() {

    // toggleToast('success');

    ToggleBusyIndicator(true);
    GetDrivers();
    var c = readCookie('token');

    if (c == null) {
        GoToLoginPage();
        ToggleBusyIndicator(false);
        return;
    }


    //ons.notification.toast('This is an alert!', { timeout: 2000, modifier: 'thick' });



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
    ToggleBusyIndicator(false);
})();

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

                refern();
                document.getElementById('loginId').innerHTML = currentUsr;
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
    location.reload();
}

function GoToMainPage(userId) {
    SetTitle('Matemco F1 2020');
    //loginId.innerHTML = userId;
    ReadCircuits();
    GetContestants();
}


function GoToLoginPage() {
    //navigator.resetToPage('login.html');
    ToggleBackButton(false);
    navigator.pushPage('login.html');
}