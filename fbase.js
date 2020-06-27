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
    let nav = document.getElementById('main.html');
    let r = database.ref('races');
    let circuit = '';
    r.once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            circuit += CreateCircuitElement(snapshot.child(data.key).val());

            //CreateCircuitElement(nav, snapshot.child(data.key).val());

        });
        nav.innerHTML = KantEnKlaar2(circuit);
        navigator.pushPage('main.html');
    });

    //console.log('Static: ' + CreateStaticCircuitElement());

    // 
    // var div = document.createElement('div');
    // div.innerHTML = 'bladiebla';

    // nav.append(div);
    // console.log(div.innerHTML);
    // var div = document.createElement('div');
    // div.innerHTML = '<ons-button>asdasd</ons-button>';
    // nav.appendChild(div);
    // console.log(nav.innerHTML);


    //nav.innerHTML += 'arasdasdg';
    //console.log('ReadCircuits: ' + KantEnKlaar2(GetCircuitMenuButtons()));

    //nav.innerHTML = KantEnKlaar();
    // nav.innerHTML += '</ons-list style></ons-page>';
    //ons.compile(nav);
}



function CreateCircuitElement(data) {
    let circuit = data.Circuit.toString().toUpperCase();
    let land = data.Land.toString();
    let dagen = data.Dagen.toString();
    let maand = data.Maand.toString().toUpperCase();
    let text = '';

    text += '<ons-list-item class="raceButton" tappable onclick=myFunction()>';
    text += '<div class="raceAllInfo">';
    text += '<div class="raceFirstInfo">';
    text += '<div>' + dagen + '</div>';
    text += '<div class="raceDateInfo">' + maand + '</div>';
    text += '</div>';
    text += '<div class="raceSecondInfo">';
    text += '<div>' + land + '</div>';
    text += '<div class="raceCircuitName">' + circuit + '</div>';
    text += '</div>';
    text += '</div>';
    text += '</ons-list-item>';

    return text;
}

function KantEnKlaar2(CircuitMenuButtons) {
    return '<ons-page id="main"><ons-list id="mainList" style="margin-top:60px"><ons-list-header><div class="raceHeader">Upcoming races</div></ons-list-header>' + CircuitMenuButtons + '</ons-list></ons-page>';
}

function KantEnKlaar3(circuits) {
    return '<ons-page id="main"><ons-list id="mainList" style="margin-top:60px"><ons-list-header><div class="raceHeader">Upcoming races</div></ons-list-header>' + CircuitMenuButtons + '<ons-list-item class="raceButton" tappable onclick=myFunction()><div class="raceAllInfo"><div class="raceFirstInfo"><div>03-05</div><div class="raceDateInfo">JUL.</div></div><div class="raceSecondInfo"><div>Oostenrijk</div><div class="raceCircuitName">RED BULL RING</div></div></div></ons-list-item></ons-list></ons-page>';
}


function CreateStaticCircuitElement() {
    var text;
    text = '<ons-list-item class="raceButton" tappable onclick=myFunction()>';
    text += '<div class="raceAllInfo">';
    text += '<div class="raceFirstInfo">';
    text += '<div>03-05</div>';
    text += '<div class="raceDateInfo">JUL.</div>';
    text += '</div>';
    text += '<div class="raceSecondInfo">';
    text += '<div>Oostenrijk</div>';
    text += '<div class="raceCircuitName">RED BULL RING</div>';
    text += '</div>';
    text += '</div>';
    text += '</ons-list-item>';
    return text;
}

function KantEnKlaar() {
    return '<ons-page id="main"><ons-list id="mainList" style="margin-top:60px"><ons-list-header><div class="raceHeader">Upcoming races</div></ons-list-header><ons-list-item class="raceButton" tappable onclick=myFunction()><div class="raceAllInfo"><div class="raceFirstInfo"><div>03-05</div><div class="raceDateInfo">JUL.</div></div><div class="raceSecondInfo"><div>Oostenrijk</div><div class="raceCircuitName">RED BULL RING</div></div></div></ons-list-item></ons-list></ons-page>';
}