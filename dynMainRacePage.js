var currentRaceOpened = '';

function ConstructRacePage(raceData, key, arr) {
    if (key != '') currentRaceOpened = key;
    return '<ons-page id="race">' + ConstructMainRacePageList(raceData, arr) + '</ons-page>';
}

function ConstructMainRacePageList(raceData, arr) {
    let h = document.getElementById('toolbar').getBoundingClientRect().height;

    let text = '';
    text += '<ons-list id="mainList" style="margin-top:' + (h) + 'px">';
    text += ConstructMainRacePageListVoorspelling(raceData, arr);
    text += '</ons-list>';

    return text;
}

function ConstructMainRacePageListVoorspelling(raceData, arr) {

    let expirationDate = Date.parse(new Date(raceData.FP1));
    let currentDate = Date.parse(new Date());

    let allowModify = true;
    if (currentDate >= expirationDate)
        allowModify = false;

    let text = ConstructCountDownBlock(raceData, allowModify);
    text += '<ons-list-header><div class="predictionHeaders">Pole Position</div></ons-list-header>';
    text += TestCarousel('PP', arr, allowModify);

    text += '<ons-list-header><div class="predictionHeaders">Snelste Race Ronde</div></ons-list-header>';
    text += TestCarousel('FL', arr, allowModify);
    text += '<ons-list-header><div class="predictionHeaders">Uitslag race</div></ons-list-header>';

    var i;
    for (i = 1; i <= 10; i++) {
        text += TestCarousel(i.toString(), arr, allowModify);
    }

    return text;
}

function ConstructCountDownBlock(raceData, allowModify) {
    let fp1Date = new Date(raceData.FP1);
    delta = fp1Date - new Date();
    let timeLeft = new TimeLeft(fp1Date);

    if (!allowModify) {
        timeLeft.days = "00";
        timeLeft.hours = "00";
        timeLeft.minutes = "00";
    }

    let text = '';
    text += '<div id="mainCountDown">';
    text += '<div class="countDownBlock">' + '<div class="countDownBlockTop">' + timeLeft.days + '</div><div class="countDownBlockUnder">days</div>' + '</div>'
    text += '<div class="countDownBlockSeparator">|</div>'
    text += '<div class="countDownBlock">' + '<div class="countDownBlockTop">' + timeLeft.hours + '</div><div class="countDownBlockUnder">hrs</div>' + '</div>'
    text += '<div class="countDownBlockSeparator">|</div>'
    text += '<div class="countDownBlock">' + '<div class="countDownBlockTop">' + timeLeft.minutes + '</div><div class="countDownBlockUnder">min</div>' + '</div>'
    text += '</div>';
    return text;
}

// THE BETTER CODE

function TestCarousel(no, arr, allowModify) {

    if (arr == undefined) arr = [];

    let driver;
    var found = arr.find(function(element) {
        return element[0] === no;
    });

    if (found != null) {
        driver = found[1];
    }


    let swipeable = 'swipeable';
    let initials = ''

    if (driver === undefined) {
        swipeable = '';
    } else initials = driver;

    let onClickEvent = 'onclick="showDriverSelect(this)"';
    let tappable = 'tappable'
    if (!allowModify) {
        swipeable = '';
        onClickEvent = '';
        tappable = '';
    }

    let text = '<ons-carousel id="predictionDriverCarousel' + no + '" class="predictionDriverCarousel" ' + swipeable + ' style="height: 72px;" initial-index="1" auto-scroll>'

    text += '<ons-carousel-item class="predictionDriverCarouselDeselect">'
    text += '<input id="predictionDriverCarouselDeselectButton' + no + '" class="predictionDriverCarouselDeselectButton" type="image" src="https://patrickvankruistum.github.io/F1Poule/lib/img/trash.png" width="30px"  onclick="deselectDriver(this)"/>'
    text += '</ons-carousel-item>'

    text += '<ons-carousel-item class="predictionDriverCarouselSelect">'
    text += '<ons-list-item id="' + 'predictionDriver' + no + '" class="predictionDriverListItem" data-initials="' + initials + '" ' + onClickEvent + ' ' + tappable + '>';

    text += '<div class="predictionDriverTypePointContainer">'
    text += '<div class="predictionDriverType">' + no // BIG NUMBER
    text += '</div>'; // END BIG NUMBER
    text += '<div class="predictionDriverPoints">' + GetPointValue(no); // POINTS
    text += '</div>'; // END POINTS
    text += '</div>'; // END CONTAINER FOR NUMBER AND SCORE

    let driverInfo = GetDriverInfoFromDriverSelectionList(driver);

    if (driverInfo == null) {
        text += '<div id="predictionDriverSelectContainer' + no + '" class="predictionDriverSelectContainer" style="display: none">';
        text += '<div id="' + 'predictionDriverPicture' + no + '" class="predictionDriverPicture"><img src="" style="max-width: 60px"/></div>'; // DRIVER PICTURE
        text += '<div id="' + 'predictionDriverColor' + no + '" class="predictionDriverColor">|</div>'; // DRIVER COLOR
        text += '<div class="predictionDriverInfo">'; // DRIVER INFO
        text += '<div id="' + 'predictionDriverInfoName' + no + '" class="predictionDriverInfoName"></div>'; // DRIVER INFO NAME
        text += '<div id="' + 'predictionDriverTeamName' + no + '" class="predictionDriverTeamName"></div>'; // DRIVER INFO TEAM
        text += '</div>'; // DRIVER INFO
        text += '<div class="predictionDriverFlag"><img id="' + 'predictionDriverFlag' + no + '"  src="" style="max-width: 35px"/></div>'; // DRIVER FLAG
        text += '</div>';
        text += '<div id="' + 'predictionDriverEmpty' + no + '" class="predictionDriverEmpty" style="display: inline-block">selecteer coureur</div>'
    } else {
        text += '<div id="predictionDriverSelectContainer' + no + '" class="predictionDriverSelectContainer" style="display: inline-block">';
        text += '<div id="' + 'predictionDriverPicture' + no + '" class="predictionDriverPicture"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + driverInfo.lastName.toLowerCase() + '.png" style="max-width: 60px"/></div>'; // DRIVER PICTURE
        text += '<div id="' + 'predictionDriverColor' + no + '" class="predictionDriverColor" style="color:' + driverInfo.color + '">|</div>'; // DRIVER COLOR
        text += '<div class="predictionDriverInfo">'; // DRIVER INFO
        text += '<div id="' + 'predictionDriverInfoName' + no + '" class="predictionDriverInfoName">' + driverInfo.firstName + ' ' + driverInfo.lastName.toUpperCase() + '</div>'; // DRIVER INFO NAME
        text += '<div id="' + 'predictionDriverTeamName' + no + '" class="predictionDriverTeamName">' + driverInfo.team.toUpperCase() + '</div>'; // DRIVER INFO TEAM
        text += '</div>'; // DRIVER INFO
        text += '<div class="predictionDriverFlag"><img id="' + 'predictionDriverFlag' + no + '"  src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + driverInfo.country.toLowerCase() + '.jpg" style="max-width: 35px"/></div>'; // DRIVER FLAG
        text += '</div>';
        text += '<div id="' + 'predictionDriverEmpty' + no + '" class="predictionDriverEmpty" style="display: none">selecteer coureur</div>'
    }

    text += '</ons-list-item>';
    text += '</ons-carousel-item>'
    text += '</ons-carousel>'
    return text;
}

function GetDriverInfoFromDriverSelectionList(driver) {
    let element = document.getElementById('driverItemList' + driver);
    if (element === null) return;

    var obj = {
        firstName: element.dataset.firstname,
        lastName: element.dataset.lastname,
        team: element.dataset.team,
        country: String(element.dataset.country).toLowerCase().replace('ë', 'e'),
        color: element.dataset.color,
        initials: element.dataset.initials
    };
    return obj;
}

function InjectNewDriverInfo(no, driver) {
    let driverInfo = GetDriverInfoFromDriverSelectionList(driver);
    document.getElementById('predictionDriverPicture' + no).innerHTML = '<img src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + driverInfo.lastName.toLowerCase() + '.png" style="max-width: 60px"/>';
    document.getElementById('predictionDriverColor' + no).style.color = driverInfo.color;
    document.getElementById('predictionDriverInfoName' + no).innerHTML = driverInfo.firstName + ' ' + driverInfo.lastName.toUpperCase();
    document.getElementById('predictionDriverTeamName' + no).innerHTML = driverInfo.team.toUpperCase();
    document.getElementById('predictionDriverFlag' + no).src = 'https://patrickvankruistum.github.io/F1Poule/lib/img/' + driverInfo.country.toLowerCase() + '.jpg';

    document.getElementById('predictionDriverSelectContainer' + no).style.display = 'inline-block';
    document.getElementById('predictionDriverEmpty' + no).style.display = 'none';

    document.getElementById('predictionDriver' + no).dataset.initials = driver;
    document.getElementById('predictionDriverCarousel' + no).swipeable = true;
}

function DestructDriverInfo(no) {
    document.getElementById('predictionDriverPicture' + no).innerHTML = '<img src="" style="max-width: 60px"/>';
    document.getElementById('predictionDriverColor' + no).style.color = '';
    document.getElementById('predictionDriverInfoName' + no).innerHTML = '';
    document.getElementById('predictionDriverTeamName' + no).innerHTML = '';
    document.getElementById('predictionDriverFlag' + no).src = '';

    document.getElementById('predictionDriverEmpty' + no).style.display = 'inline-block';
    document.getElementById('predictionDriver' + no).dataset.initials = '';

    document.getElementById('predictionDriver' + no).dataset.initials = '';
    document.getElementById('predictionDriverCarousel' + no).swipeable = false;

    document.getElementById('predictionDriverCarousel' + no).setActiveIndex(1)

    document.getElementById('predictionDriverSelectContainer' + no).style.display = 'none';
}