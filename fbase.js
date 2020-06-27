(function() {

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBO31TRNBwxFYa9boxMowe8CytZJxI05PQ",
        authDomain: "matemcof1poule.firebaseapp.com",
        databaseURL: "https://matemcof1poule.firebaseio.com",
        projectId: "matemcof1poule",
        storageBucket: "matemcof1poule.appspot.com",
        messagingSenderId: "359154718841",
        appId: "1:359154718841:web:26320c8554ca3317e6dca8"
    };
    firebase.initializeApp(firebaseConfig);

    // // Get elements
    // const preObject = document.getElementById('object');

    // // Create references
    // const dbRefObject = firebase.database().ref().child('object');

    // // Sync object changes
    // dbRefObject.on('value', snap => console.log(snap.val()));

}());

const database = firebase.database();

function eraseDatabaseToken() {
    var c = readCookie('token');
    if (c == null) return;

    var r = database.ref('tokens');
    database.ref('tokens').orderByChild('token').equalTo(c).on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if (data.key != null) {
                r.child(data.key).remove();
            }
        });
    });

}

function RemoveOldTokensFromDatabase() {
    var r = database.ref('tokens');
    database.ref('tokens').on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            var date = Date.parse(snapshot.child(data.key).val().expirationDate);
            if (date < new Date()) {
                r.child(data.key).remove();
            }
        });
    });
}