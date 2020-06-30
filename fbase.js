const database = firebase.database();

function eraseDatabaseToken() {
    var c = readCookie('token');
    if (c == null) return;

    var r = database.ref('tokens');
    database.ref('tokens').orderByChild('token').equalTo(c).once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if (data.key != null) {
                r.child(data.key).remove();
            }
        });
    });

}

function RemoveOldTokensFromDatabase() {
    var r = database.ref('tokens');
    database.ref('tokens').once("value", function(snapshot) {
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

            let ref2 = database.ref('/predictions/' + record + '/' + currentUsr);
            ref2.once("value", snapshot2 => {

                let arr;

                if (snapshot2.exists()) {
                    arr = snapshot2.val();
                    arr = Object.entries(arr);
                }

                page.innerHTML = ConstructRacePage(raceData, snapshot.key, arr);

                SetTitle(raceData.Land);

                ons.ready(function() {
                    navigator.pushPage('mainRace.html');

                    ToggleBackButton(true);
                });

            });

        }

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

    let text = '';
    database.ref('drivers').orderByChild('sorting').once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if (data.key != null) {
                let driver = snapshot.child(data.key).val();
                // text += '<div style="display: none">'
                text += '<ons-list-item style="display: visible" id="driverItemList' + data.key + '" data-initials="' + data.key + '" data-firstname="' + driver.firstname + '" data-lastname="' + driver.lastname + '" data-team="' + driver.teamname + '" data-country="' + driver.country + '" data-color="' + driver.teamcolor + '" class="driverSelectMenuItem" onclick=DriverSelected(this) tappable>'
                text += '<div class="driverSelectMainContainer">';
                text += '<div class="driverSelectNumber"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + driver.number + '.png" style="max-width: 35px"/></div>'
                text += '<div class="driverSelectHelmet"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + String(driver.lastname).toLowerCase() + '_helmet.png" style="max-width: 35px"/></div>'
                text += '<div class="driverSelectColor" style="color:' + driver.teamcolor + '">' + '|' + '</div>';

                text += '<div id="driverInitials" data-initials="' + String(data.key).toUpperCase() + '" class="driverSelectInitials">' + String(driver.lastname).toUpperCase() + '</div>';

                text += '</div>';
                text += '</ons-list-item>';
                // text += '</div>'


            }
        });
        ConstructDriverMenu(text);
    });
}

function DriverSelected(sender) {
    let element = document.getElementById("popoverDriverSelect");
    let targetElement = document.getElementById(element.dataset.sender);

    let code = String(targetElement.id.replace('predictionDriver', ''));
    let driver = sender.dataset.initials;

    if (code === '' || driver === '' || currentUsr === '') return;

    InjectNewDriverInfo(code, driver);

    let ref = database.ref('/predictions/' + currentRaceOpened + '/' + currentUsr);
    ref.child(code).set(driver);

    hideDriverSelect();
}



function deselectDriver(sender) {

    let code = sender.id.replace('predictionDriverCarouselDeselectButton', '');

    if (code === '' || currentRaceOpened === '' || currentUsr === '') return;
    let ref = database.ref('/predictions/' + currentRaceOpened + '/' + currentUsr + '/');
    ref.child(ref.child(code).key).remove();
    DestructDriverInfo(code);
    // DeleteDriverCarousel(code);
}

// function AddTimeDateOfFp1() {

//     return;

//     let race = '01';
//     let day = 3;
//     let month = 7;
//     let year = 2020;
//     let hour = 11;
//     let minute = 00;

//     let d = new Date(year, month - 1, day, hour, minute, 0, 0);

//     let ref = database.ref('/races/' + race);


//     //let newMessageRef = ref.push();
//     ref.update({
//         'FP1': d.toGMTString()
//     });




// }