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
    console.log('fire readcircuits');
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
            SetTitle(raceData.Land);
        }

        ons.ready(function() {
            navigator.pushPage('mainRace.html');
            ToggleBackButton(true);
        });

    });

}

function CreateNewUser(userName, firstName, password) {

    if (userName === '' || firstName === '' || password === '') return;

    database.ref('/players/' + userName.toUpperCase()).set({
        firstname: firstName,
        password: password
    });
}

function GetDrivers() {

    let text = ''
        // let ref = database.ref('/drivers/');
    database.ref('drivers').orderByChild('sorting').on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if (data.key != null) {
                console.log(snapshot.child(data.key).val().lastname);
                let lastname = snapshot.child(data.key).val().lastname;
                text += '<ons-list-item class="menuItem" onclick=DriverSelected(this) tappable><div><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + lastname.toLowerCase() + '_helmet.png" style="max-width: 35px"/></div>' + '<div>' + data.key + '</div></ons-list-item>';
            }
        });
        ConstructDriverMenu(text);
    });


}

function AddTimeDateOfFp1() {

    return;

    let race = '01';
    let day = 3;
    let month = 7;
    let year = 2020;
    let hour = 11;
    let minute = 00;

    let d = new Date(year, month - 1, day, hour, minute, 0, 0);

    let ref = database.ref('/races/' + race);


    //let newMessageRef = ref.push();
    ref.update({
        'FP1': d.toGMTString()
    });




}