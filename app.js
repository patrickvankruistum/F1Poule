function OnLoginPageLoad() {
    //CreateNewUser('PKM', 'yo');

}

function myFunction() {
    navigator.pushPage('race1.html', { data: { title: 'Austriaa' } });
}

function CreateNewUser(userName, password) {
    database.ref('/players/' + userName.toUpperCase()).set({
        password: password
    });
}

function CreateNewToken(playerId) {
    let token = GetToken(playerId);
    let expirationDate = GetExpirationDate(new Date().getFullYear());
    let messageListRef = firebase.database().ref('/tokens/');
    let newMessageRef = messageListRef.push();
    newMessageRef.set({
        'player_id': playerId.toUpperCase(),
        'expirationDate': expirationDate.toString(),
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

function GetToken(playerId) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var n = String(today.getMinutes()).padStart(2, '0');
    var s = String(today.getSeconds()).padStart(2, '0');

    return playerId + ':' + GenerateToken(128, '123456789abcdefghijklmnopqrstuvwxyz') + yyyy + mm + dd + n + s;
}

function GetExpirationDate(year) {
    return new Date(year, 11, 31, 23, 59, 59, 0);
}