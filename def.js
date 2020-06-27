const navigator = document.querySelector('#navigator');
const backButton = document.getElementById('backButton');



const loginId = document.getElementById('loginId');


backButton.addEventListener('click', function(event) {
    var id = navigator.topPage.id;
    if (id == 'main' || id == 'login') {
        // do nothing
    } else {
        navigator.pushPage('main.html');
    }
})

var currentUsr = '';