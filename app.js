const userName = document.getElementById('userName');
const password = document.getElementById('password');
const signInBtn = document.getElementById('signIn');
const loginId = document.getElementById('wtf');
const loginMessages = document.getElementById('loginMessages');

const database = firebase.database();

signInBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (userName.value === '' || password.value === '') return;

    var ref = database.ref('/players/' + userName.value); //.toUpperCase());



    ref.once("value", snapshot => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.password === password.value) {
                const navigator = document.querySelector('#navigator');
                navigator.resetToPage('upcomingraces.html');
                loginId.innerHTML = userName.value; // + '  <ons-icon id="wtf" icon="md-face" style="margin-right:20px"></ons-icon>';
            } else {
                loginMessages.innerHTML = 'Onjuist wachtwoord.'
            }
        } else {
            loginMessages.innerHTML = 'Gebruikersnaam bestaat niet.'
            return;
        }
    });

})

function CreateNewUser(userName, password) {
    database.ref('/players/' + userName.toUpperCase()).set({
        password: password
    });
}


// (function() {

//     // Initialize Firebase
//     const firebaseConfig = {
//         apiKey: "AIzaSyBO31TRNBwxFYa9boxMowe8CytZJxI05PQ",
//         authDomain: "matemcof1poule.firebaseapp.com",
//         databaseURL: "https://matemcof1poule.firebaseio.com",
//         projectId: "matemcof1poule",
//         storageBucket: "matemcof1poule.appspot.com",
//         messagingSenderId: "359154718841",
//         appId: "1:359154718841:web:26320c8554ca3317e6dca8"
//     };
//     firebase.initializeApp(firebaseConfig);

//     // Get elements
//     const preObject = document.getElementById('object');

//     // Create references
//     const dbRefObject = firebase.database().ref().child('object');

//     // Sync object changes
//     dbRefObject.on('value', snap => console.log(snap.val()));

// }());