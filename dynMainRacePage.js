function ConstructRacePage(raceData) {
    return '<ons-page id="race">' + ConstructRaceSpecificPage(raceData) + '</ons-page>'
}

function ConstructRaceSpecificPage(raceData) {
    return ConstructMainRacePageList(raceData);
}

function ConstructMainRacePageList(raceData) {
    let h = document.getElementById('toolbar').getBoundingClientRect().height;

    let text = '';
    text += '<ons-list id="mainList" style="margin-top:' + (h) + 'px">';
    text += ConstructMainRacePageListVoorspelling(raceData);
    text += '</ons-list>'
    return text;
}

function ConstructMainRacePageListVoorspelling(raceData) {
    let fp1Date = new Date(raceData.FP1);
    delta = fp1Date - new Date();
    let timeLeft = new TimeLeft(fp1Date);

    // let differenceInTime = fp1Date.getTime() - currentDate.getTime();
    // let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    // let differenceInHours = Math.floor((differenceInTime / 36e5) - (differenceInDays * 24));
    // let differenceInMinutes = Math.floor((differenceInTime))
    // console.log(differenceInDays, differenceInHours);





    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();
    // var n = String(today.getMinutes()).padStart(2, '0');
    // var s = String(today.getSeconds()).padStart(2, '0');



    //console.log(asdf.getFullYear());
    let text = '';
    // text += '<ons-list-header>';

    // text += '<div class="raceDate">' + raceData.Dagen + ' ' + raceData.Maand + '</div>';
    // text += '<div class="raceWindowDescription">jouw voorspelling</div>';
    // text += '<div><div class="raceWindowDescription">jouw voorspelling</div>';
    // text += '<div id="countDown">' + initialString + '</div>';
    // text += '</div>';
    // text += '</div>';
    // text += '</ons-list-header>';
    // text += '<ons-list-header><div>jouw voorspelling</div></ons-list-header>';
    text += '<div id="mainCountDown">';
    text += '<div class="countDownBlock">' + '<div class="countDownBlockTop">' + timeLeft.days + '</div><div class="countDownBlockUnder">days</div>' + '</div>'
        // text += '<div class="countDownBlock">' + days + '</div>'
    text += '<div class="countDownBlockSeparator">|</div>'
        // text += '<div class="countDownBlock">' + hours + '</div>'
    text += '<div class="countDownBlock">' + '<div class="countDownBlockTop">' + timeLeft.hours + '</div><div class="countDownBlockUnder">hrs</div>' + '</div>'
    text += '<div class="countDownBlockSeparator">|</div>'
        // text += '<div class="countDownBlock">' + minutes + '</div>'
    text += '<div class="countDownBlock">' + '<div class="countDownBlockTop">' + timeLeft.minutes + '</div><div class="countDownBlockUnder">min</div>' + '</div>'
        // text += '<div class="countDownBlockSeparator">|</div>'
        // text += '<div class="countDownBlock">' + '<div id="countDownSeconds" class="countDownBlockTop">' + '</div><div class="countDownBlockUnder">sec</div>' + '</div>'
        // text += '<div class="countDownBlock">' + seconds + '</div>'
    text += '</div>';
    // text += '<div class="raceHeader">jouw voorspelling</div>';
    text += '<ons-list-header><div>Pole Position</div></ons-list-header>';
    text += ConstructMainRacePageListItem('PP', false);

    text += '<ons-list-header><div>Snelste Race Ronde</div></ons-list-header>';
    text += ConstructMainRacePageListItem('FL', true);
    text += '<ons-list-header><div>Uitslag race</div></ons-list-header>';

    var i;
    for (i = 1; i <= 10; i++) {
        text += ConstructMainRacePageListItem(i.toString(), true);
    }

    return text;
}

function ConstructMainRacePageListItem(no, empty) {
    let text = '';
    text += '<ons-list-item id="driver' + no + '" points="' + no + '" class="selectDriverButton" tappable onclick="DriverSelection(this)">';
    text += ConstructTheBar(no, empty);
    text += '</ons-list-item>';

    return text;
}

function ConstructTheBar(no, empty) {
    let text = '';
    text += '<div class="completeBar">'; // COMPLETE BAR
    text += '<div class="bigNumberPointContainer">'
    text += '<div class="bigNumber">' + no; // BIG NUMBER
    text += '</div>'; // END BIG NUMBER
    text += '<div class="points">' + GetPointValue(no); // POINTS
    text += '</div>'; // END POINTS
    text += '</div>'; // END CONTAINER FOR NUMBER AND SCORE
    if (!empty) text += ConstructEmptyDriverBar(no);
    else text += ConstructEmptyDriverBar(no);
    text += '</div>'; // COMPLETE BAR
    return text;
}

function ConstructEmptyDriverBar(no) {
    console.log(no);
    let text = '';
    text += '<div id="driverBar' + no + '" class="driverBarEmpty">selecteer een coureur'; // DRIVER BAR
    text += '</div>'; // DRIVER BAR
    return text;
}

function ConstructDriverBar(elementId, firstName, lastName, team, country, color) {
    let c = String(country).toLowerCase().replace('ë', 'e');
    let newId = elementId.replace('driver', 'driverBar');

    let element = document.getElementById(newId);
    element.setAttribute('class', 'driverBar');

    let text = '';

    text += '<div class="driverPicture"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + String(lastName).toLowerCase() + '.png" style="max-width: 50px"/></div>'; // DRIVER PICTURE
    text += '<div class="driverColorContainer" style="color:' + color + '">|</div>'; // DRIVER COLOR
    text += '<div class="driverInfo">'; // DRIVER INFO
    text += '<div class="driverInfoUp">' + firstName + ' ' + lastName + '</div>'; // DRIVER INFO NAME
    text += '<div class="driverInfoDown">' + team + '</div>'; // DRIVER INFO TEAM
    text += '</div>'; // DRIVER INFO
    text += '<div class="driverFlag"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + c + '.jpg" style="max-width: 35px"/></div>'; // DRIVER FLAG


    element.innerHTML = text;
}

// function ConstructDriverBar() {
//     let text = '';
//     text += '<div class="driverBar">'; // DRIVER BAR
//     text += '<div class="driverPicture"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/verstappen.png" style="max-width: 50px"/></div>'; // DRIVER PICTURE
//     text += '<div class="driverColorContainer">|</div>'; // DRIVER COLOR
//     text += '<div class="driverInfo">'; // DRIVER INFO
//     text += '<div class="driverInfoUp">Max VERSTAPPEN</div>'; // DRIVER INFO NAME
//     text += '<div class="driverInfoDown">RED BULL RACING</div>'; // DRIVER INFO TEAM
//     text += '</div>'; // DRIVER INFO
//     text += '<div class="driverFlag"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/nederland.jpg" style="max-width: 35px"/></div>'; // DRIVER FLAG
//     text += '</div>'; // DRIVER BAR

//     return text;
// }

function DriverSelection(sender) {
    // let element = document.getElementById(sender.id);
    // let attribute = element.getAttribute('points');
    // element.innerHTML = ConstructTheBar(attribute, false);
    showDriverSelect(sender);

}