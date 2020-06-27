function OnLoginPageLoad() {
    //CreateNewUser('PKM', 'yo');

}

function myFunction() {
    // const navigator = document.querySelector('#navigator');
    // navigator.resetToPage('race1.html');
    navigator.pushPage('race1.html', { data: { title: 'Austriaa' } });
}

function CreateNewUser(userName, password) {
    database.ref('/players/' + userName.toUpperCase()).set({
        password: password
    });
}

function CreateNewToken(playerId) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var n = String(today.getMinutes()).padStart(2, '0');
    var s = String(today.getSeconds()).padStart(2, '0');

    var token = playerId + ':' + GenerateToken(128, '123456789abcdefghijklmnopqrstuvwxyz') + yyyy + mm + dd + n + s;
    var expirationDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 0);

    var messageListRef = firebase.database().ref('/tokens/');
    var newMessageRef = messageListRef.push();
    newMessageRef.set({
        'player_id': playerId.toUpperCase(),
        'token': token
    });

    document.cookie = 'token=' + token + '=;expires=' + expirationDate.toGMTString(); // cookieDate(expirationDate);
}

function GenerateToken(len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
        ans +=
            arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}