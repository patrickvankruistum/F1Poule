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

function ToggleBackButton(visible) {
    let element = document.getElementById('backButton');
    if (visible) element.setAttribute('style', 'visibility: visible');
    else element.setAttribute('style', 'visibility: hidden');
}

function ToggleBusyIndicator(visible) {
    let element = document.getElementById('progressBar');
    if (visible) element.setAttribute('style', 'visibility: visible');
    else element.setAttribute('style', 'visibility: hidden');
}

function SetTitle(text) {
    let element = document.getElementById('toolbarTitle');
    element.innerHTML = text;
}

document.addEventListener("show", function(event) {
    if (event.target.id == 'myPage') {
        // Clear your scope variables here or whatever                 
    }
});

document.addEventListener('init', function(event) {


    ons.ready(function() {
        var page = event.target;

        if (page.id === 'mainRacePage') {

        } else if (page.id === 'raceUitslag') {
            // testerino();
        }

    });

});

function getCountDownElement() {
    let element = document.getElementById('countDown');
    //element.innerHTML = 'NOT GOOD';
}

function setCountDownElement() {
    let element = document.getElementById('countDown');
    //element.innerHTML = 'NOT GOOD';
};

// function testerino() {
//     console.log('try to start timer');
//     clearInterval(intervalId);

//     if (intervalId != undefined) {
//         console.log('shit already exists');
//         return;
//     }

//     // var timeleft = 10;
//     intervalId = setInterval(function() {
//         if (delta <= 0) {
//             clearInterval(intervalId);
//         } else {
//             UpdateTimeLeft();
//         }
//         delta -= 1;
//     }, 60000);
// }

// function testerino() {
//     console.log('try to start timer');
//     clearInterval(intervalId);

//     if (intervalId != undefined) {
//         console.log('shit already exists');
//         return;
//     }

//     // var timeleft = 10;
//     intervalId = setInterval(function() {
//         if (delta <= 0) {
//             console.log('must clear');
//             clearInterval(intervalId);
//         } else {
//             UpdateTimeLeft();
//         }
//         delta -= 1;
//         console.log(delta);
//     }, 1000);
// }

// document.querySelector('#navigator').popPage({ refresh: true });



// function ShowToast(text) {



//     ons.notification.toast(text, {
//         timeout: 2000,
//         id: 'toast',
//         message: 'fuck'
//     });
// }

// function toggleToast(modifier) {
//     document
//         .querySelector('ons-toast[modifier~=' + modifier)
//         .toggle();
// }