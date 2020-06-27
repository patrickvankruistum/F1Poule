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

function ReadCircuits() {
    let nav = document.getElementById('races.html');
    let r = database.ref('races');
    let circuits = '';
    r.once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            circuits += CreateCircuitElement(snapshot.child(data.key).val(), data.key);
        });
        nav.innerHTML = ConstructMainPage(circuits);

        navigator.pushPage('main.html');
    });
}

function GetRacePage(sender) {
    let page = document.getElementById('race.html');
    let record = sender.getAttribute('record');

    let ref = database.ref('/races/' + record);
    ref.once("value", snapshot => {
        if (snapshot.exists()) {
            const raceData = snapshot.val();
            page.innerHTML = ConstructRacePage(raceData);
        }
        navigator.pushPage('mainRace.html');
        ToggleBackButton(true);
    });
}



function CreateNewUser(userName, firstName, password) {

    if (userName === '' || firstName === '' || password === '') return;

    database.ref('/players/' + userName.toUpperCase()).set({
        firstname: firstName,
        password: password
    });
}