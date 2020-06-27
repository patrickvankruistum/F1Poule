const navigator = document.querySelector('#navigator');
const backButton = document.getElementById('backButton');
const loginId = document.getElementById('loginId');


backButton.addEventListener('click', function(event) {
    var id = navigator.topPage.id;
    if (id == 'race') {
        navigator.pushPage('main.html');
    }
})

var currentUsr = '';