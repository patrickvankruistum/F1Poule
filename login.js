var checkStart;
(checkStart = function() {
    var c = readCookie('token');

    if (c != null) {
        alert(c);
        currentUsr = c.substring(0, 3);

        database.ref('tokens').orderByChild('token').equalTo(c).on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                if (data.key == null) {
                    eraseCookie('token');
                    GoToLoginPage();
                } else {
                    alert(currentUsr);
                    GoToMainPage(currentUsr);
                }
            });
        });
    } else {
        GoToLoginPage();
    }
})();

function GoToLoginPage() {
    navigator.resetToPage('login.html');
}

function GoToMainPage(userId) {
    loginId.innerHTML = userId;
    navigator.resetToPage('main.html');
}

// signInBtn.addEventListener('click', (e) => {
//     e.preventDefault();

//     currentUsr = userName.value.toUpperCase();

//     if (currentUsr === '' || password.value === '') return;

//     var ref = database.ref('/players/' + currentUsr);

//     ref.once("value", snapshot => {
//         if (snapshot.exists()) {
//             const userData = snapshot.val();
//             if (userData.password === password.value) {

//                 if (rememberMe.checked) {
//                     CreateNewToken(currentUsr);
//                 }

//                 const navigator = document.querySelector('#navigator');
//                 loginId.innerHTML = currentUsr;
//                 navigator.resetToPage('upcomingraces.html');

//             } else {
//                 loginMessages.innerHTML = 'Onjuist wachtwoord.'
//                 return;
//             }
//         } else {
//             loginMessages.innerHTML = 'Gebruikersnaam bestaat niet.'
//             return;
//         }
//     });

// })