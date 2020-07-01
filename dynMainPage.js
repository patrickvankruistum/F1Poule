function CreateCircuitElement(data, key) {
    let circuit = data.Circuit.toString().toUpperCase();
    let land = data.Land.toString();
    let dagen = data.Dagen.toString();
    let maand = data.Maand.toString().toUpperCase();
    let text = '';

    text += '<ons-list-item class="raceButton" record="' + key + '" tappable onclick=GetRacePage(this)>'; //onclick=GetRacePage(this)
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

function ConstructMainPage(circuits) {
    let text = '';
    text += '<ons-page id="races")>';
    text += ConstructMainPageContent(circuits);
    //text += ConstructMainTab();
    text += '</ons-page>'
    return text;
}

function ConstructMainPageContent(circuits) {
    let text = '';
    text += ConstructMainPageList(circuits);
    //text += ConstructMainTab();
    return text;
}

function ConstructMainPageList(circuits) {
    let h = document.getElementById('toolbar').getBoundingClientRect().height;

    let text = '';
    text += '<ons-list id="mainList" style="margin-top:' + (h) + 'px">';
    text += ConstructMainPageListUpcomingRaces(circuits);
    text += '</ons-list>'
    return text;
}

function ConstructMainPageListUpcomingRaces(circuits) {
    let text = ''
    text += '<ons-list-header><div class="predictionHeaders">Aankomende Grand-Prix</div></ons-list-header>';
    text += circuits;
    return text;
}