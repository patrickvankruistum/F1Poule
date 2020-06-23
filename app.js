const userName = document.getElementById('userName');
const password = document.getElementById('password');
const signInBtn = document.getElementById('signIn');

const database = firebase.database();

signInBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (userName.value === '' || password.value === '') return;

    var ref = database.ref('/players/' + userName.value);

    ref.once("value", snapshot => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.password === password.value) {
                console.log('login');

                const navigator = document.querySelector('#navigator');
                navigator.resetToPage('upcomingraces.html');

                let loginId = document.getElementById('wtf');
                loginId.innerHTML = userName.value;
                console.log(loginId.innerHTML);

            } else {
                console.log('no login for the wicked');
            }
        } else {
            console.log('no such user');
            return;
        }
    });

})


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