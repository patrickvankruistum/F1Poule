const userId = document.getElementById('userId');
const password = document.getElementById('password');
const addBtn = document.getElementById('addBtn');

const database = firebase.database();

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    database.ref('/players/' + userId.value).set({
        password: password.value
    })
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