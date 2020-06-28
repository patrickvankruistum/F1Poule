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

    let text = '';
    text += '<div id="mainCountDown">';
    text += '<div class="countDownBlock">' + '<div class="countDownBlockTop">' + timeLeft.days + '</div><div class="countDownBlockUnder">days</div>' + '</div>'
    text += '<div class="countDownBlockSeparator">|</div>'
    text += '<div class="countDownBlock">' + '<div class="countDownBlockTop">' + timeLeft.hours + '</div><div class="countDownBlockUnder">hrs</div>' + '</div>'
    text += '<div class="countDownBlockSeparator">|</div>'
    text += '<div class="countDownBlock">' + '<div class="countDownBlockTop">' + timeLeft.minutes + '</div><div class="countDownBlockUnder">min</div>' + '</div>'
    text += '</div>';

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

function DriverSelection(sender) {
    showDriverSelect(sender);
}