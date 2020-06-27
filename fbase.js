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

function ReadCircuits() {
    let nav = document.getElementById('races.html');
    let r = database.ref('races');
    let circuits = '';
    r.once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            circuits += CreateCircuitElement(snapshot.child(data.key).val(), data.key);
        });
        nav.innerHTML = ConstructMainPage(circuits);

        // let element = document.getElementById('mainTab1');
        // let element2 = document.getElementById('mainTab2');

        // element.setAttribute('page', 'main.html')
        // element2.setAttribute('page', 'login.html')

        // console.log(element.getAttribute('page'));



        // element.innerHTML = '<ons-tab label="Tab 1"></ons-tab>'
        // console.log(element.innerHTML);
        //document.getElementById('mainTab').innerHTML = '<ons-tab id="mainTab1" page="" label="Tab 1" active></ons-tab>';
        //navigator.pushPage('main.html');
        navigator.pushPage('main.html');
    });
}

// function ConstructMainTab() {
//     let text = '';
//     text += '<ons-tabbar>'
//     text += '<ons-tab page="main.html" label="Races" icon="ion-home, material:md-home" active></ons-tab>'
//     text += '<ons-tab page="main.html" label="Stand poule" icon="ion-home, material:md-home"></ons-tab>'
//     text += '</ons-tabbar>'
//     return text;
// }



//ddddddddddddddd

function GetRacePage(sender) {
    let page = document.getElementById('race.html');
    let record = sender.getAttribute('record');

    let ref = database.ref('/races/' + record);
    ref.once("value", snapshot => {
        if (snapshot.exists()) {
            const raceData = snapshot.val();
            page.innerHTML = ConstructRacePage(raceData);
        }
        navigator.pushPage('race.html');
        ToggleBackButton(true);
    });
}

function ConstructRacePage(raceData) {
    return '<ons-page id="race">' + ConstructRaceSpecificPage(raceData) + '</ons-page>'
}

function ConstructRaceSpecificPage(raceData) {
    let text = '';
    text += '<div style="margin-top:60px">' + raceData.Land + '</div>'
    text += '<div>';
    text += '<ons-select id="choose-sel" onchange="editSelects(event)"><option value="basic">Basic</option><option value="material">Material</option><option value="underbar">Underbar</option></ons-select>';
    text += '</div>';

    return text;
}

function CreateNewUser(userName, firstName, password) {

    if (userName === '' || firstName === '' || password === '') return;

    database.ref('/players/' + userName.toUpperCase()).set({
        firstname: firstName,
        password: password
    });
}