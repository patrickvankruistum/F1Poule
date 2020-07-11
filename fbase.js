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
    let pastRaceHeader = false;
    let currentRaceHeader = false;
    let futureRaceHeader = false;
    let circuits = '';
    let pastCircuits = '';
    r.once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            let result = snapshot.child(data.key).val().result;

            let fp1Date = Date.parse(snapshot.child(data.key).val().FP1);

            if (fp1Date < Date.now() && result === undefined || fp1Date < Date.now() && Object.keys(result).length < 12) {
                if (currentRaceHeader === false) {
                    circuits += '<ons-list-header><div class="predictionHeaders">Actuele Grand-Prix</div></ons-list-header>';
                    currentRaceHeader = true;
                }
                circuits += CreateCircuitElement(snapshot.child(data.key).val(), data.key);
            } else if (fp1Date < Date.now() && result != undefined && Object.keys(result).length === 12) {
                if (pastRaceHeader === false) {
                    pastCircuits += '<ons-list-header><div class="predictionHeaders">Verreden Grand-Prix</div></ons-list-header>';
                    pastRaceHeader = true;
                }
                pastCircuits += CreateCircuitElement(snapshot.child(data.key).val(), data.key);
            } else {
                if (futureRaceHeader === false) {
                    circuits += '<ons-list-header><div class="predictionHeaders">Aankomende Grand-Prix</div></ons-list-header>';
                    futureRaceHeader = true;
                }
                circuits += CreateCircuitElement(snapshot.child(data.key).val(), data.key);
            }


        });
        circuits += pastCircuits;
        nav.innerHTML = ConstructMainPage(circuits);

        navigator.pushPage('main.html');

    });
}

function GetRacePage(sender) {
    ToggleBusyIndicator(true);
    let page = document.getElementById('race.html');
    let record = sender.getAttribute('record');
    let ref = database.ref('/races/' + record);

    ref.once("value", snapshot => {
        if (snapshot.exists()) {

            const raceData = snapshot.val();

            let ref2 = database.ref('/races/' + record + '/predictions/' + currentUsr);
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
                    ToggleBusyIndicator(false);
                });

            });

            ConstructMainRaceResult(snapshot.val().result);

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

    if (code === '' || driver === '' || currentUsr === '' || currentRaceOpened === '') return;

    let raceRef = database.ref('/races/' + currentRaceOpened);

    raceRef.once("value", snapshot => {
        if (snapshot.exists()) {

            const raceData = snapshot.val();

            let expirationDate = Date.parse(new Date(raceData.FP1));
            let currentDate = Date.parse(new Date());

            if (expirationDate <= currentDate) {
                ons.notification.toast('Kan deze race niet meer aanpassen.', { timeout: 2000, modifier: 'thick' });
            } else {
                InjectNewDriverInfo(code, driver);

                let ref = database.ref('/races/' + currentRaceOpened + '/predictions/' + currentUsr);
                ref.child(code).set(driver);

            }
        }
    });

    hideDriverSelect();
}



function deselectDriver(sender) {

    let code = sender.id.replace('predictionDriverCarouselDeselectButton', '');

    if (code === '' || currentRaceOpened === '' || currentUsr === '') return;

    let raceRef = database.ref('/races/' + currentRaceOpened);

    raceRef.once("value", snapshot => {
        if (snapshot.exists()) {

            const raceData = snapshot.val();

            let expirationDate = Date.parse(new Date(raceData.FP1));
            let currentDate = Date.parse(new Date());

            if (expirationDate <= currentDate) {
                ons.notification.toast('Kan deze race niet meer aanpassen.', { timeout: 2000, modifier: 'thick' });
            } else {
                let ref = database.ref('/races/' + currentRaceOpened + '/predictions/' + currentUsr + '/');
                ref.child(ref.child(code).key).remove();
                DestructDriverInfo(code);
            }
        }

    });
}

function GetPoints(pos, prediction, result) {
    if (pos === '' || prediction === '' || result === '' || pos === undefined || prediction === undefined || result === undefined)
        return 0;

    if (prediction === result) {
        return parseInt(GetPointValue(pos).replace('pt.', ''));
    } else {
        return 0;
    }
}

function GetContestants() {

    let totalPlayerPoints = [];

    let raceReference = database.ref('/races/');
    raceReference.once("value").then(function(snapshot) {
        snapshot.forEach(function(data) {
            let raceData = snapshot.child(data.key).val();

            if (raceData.result != undefined) {

                if (raceData.predictions != undefined) {

                    let predictionEntries = Object.entries(raceData.predictions);

                    for (i = 0; i <= Object.keys(raceData.predictions).length - 1; i++) {

                        let playerInitials = predictionEntries[i][0]
                        let playerPrediction = predictionEntries[i][1];


                        let playerPoints = 0;
                        playerPoints += GetPoints('PP', playerPrediction['PP'], raceData.result['PP']);
                        playerPoints += GetPoints('FL', playerPrediction['FL'], raceData.result['FL']);
                        playerPoints += GetPoints('1', playerPrediction['1'], raceData.result['1']);
                        playerPoints += GetPoints('2', playerPrediction['2'], raceData.result['2']);
                        playerPoints += GetPoints('3', playerPrediction['3'], raceData.result['3']);
                        playerPoints += GetPoints('4', playerPrediction['4'], raceData.result['4']);
                        playerPoints += GetPoints('5', playerPrediction['5'], raceData.result['5']);
                        playerPoints += GetPoints('6', playerPrediction['6'], raceData.result['6']);
                        playerPoints += GetPoints('7', playerPrediction['7'], raceData.result['7']);
                        playerPoints += GetPoints('8', playerPrediction['8'], raceData.result['8']);
                        playerPoints += GetPoints('9', playerPrediction['9'], raceData.result['9']);
                        playerPoints += GetPoints('10', playerPrediction['10'], raceData.result['10']);

                        var findPlayerPoints = totalPlayerPoints.find(x => x.initials === playerInitials);

                        if (findPlayerPoints === undefined) {
                            totalPlayerPoints.push({ initials: playerInitials, points: playerPoints, firstname: '' });
                        } else {
                            findPlayerPoints.points += playerPoints;
                        }

                    }
                }

            }

        });


    });

    let playerReference = database.ref('players');
    playerReference.once("value").then(function(snapshot) {
        snapshot.forEach(function(data) {
            var findPlayerPoints = totalPlayerPoints.find(x => x.initials === data.key);
            if (findPlayerPoints != undefined) findPlayerPoints.firstname = snapshot.child(data.key).val().firstname;
        });
        let sortedPoints = totalPlayerPoints.sort((a, b) => b.points - a.points);
        ConstructStandPoule(sortedPoints);
    });










    // let playerReference = database.ref('/players/');






    // //console.log('NEXT');

    // playerReference.once("value", function(snapshot) {
    //     console.log('Reading playerReference');
    //     let contestants = [];

    //     snapshot.forEach(function(data) {
    //         if (data.key != null) {
    //             //console.log('name:', data.key);



    //             //console.log(contestants);

    //             contestants.push({ initials: data.key, name: snapshot.child(data.key).val().firstname, points: 0 })
    //         }
    //     });
    //     //console.log(contestants);


    //     //console.log('GOGOGO');
    //     //navigator.popPage({ 'refresh': true });
    //     document.getElementById('standPoule.html').innerHTML = '';
    //     ConstructStandPoule(contestants);

    // });



    //console.log('LEAVE');
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