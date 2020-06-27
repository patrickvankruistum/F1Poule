const userName = document.getElementById('loginUserName');
const password = document.getElementById('loginPassword');
const signInBtn = document.getElementById('loginSignIn');
const rememberMe = document.getElementById('loginRememberMe');
const loginMessages = document.getElementById('loginMessages');
const navigator = document.querySelector('#navigator');
const loginId = document.getElementById('loginId');
const backButton = document.getElementById('backButton');

backButton.addEventListener('click', function(event) {
    var id = navigator.topPage.id;
    if (id == 'main') {
        // do nothing
    } else {
        navigator.pushPage('main.html');
    }
})

var currentUsr = '';