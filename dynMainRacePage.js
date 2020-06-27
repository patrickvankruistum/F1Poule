function ConstructRacePage(raceData) {
    return '<ons-page id="race">' + ConstructRaceSpecificPage(raceData) + '</ons-page>'
}

function ConstructRaceSpecificPage(raceData) {
    let text = '';
    text += ConstructMainRacePageList(raceData);
    // text += '<ons-list-header><div class="raceHeader">Voorspelling</div></ons-list-header>';
    // text += '<div style="margin-top:60px">' + raceData.Land + '</div>'
    // text += '<div>';
    // text += '<ons-select id="choose-sel" onchange="editSelects(event)"><option value="basic">Basic</option><option value="material">Material</option><option value="underbar">Underbar</option></ons-select>';
    // text += '</div>';

    return text;
}

function ConstructMainRacePageList(raceData) {
    let h = document.getElementById('toolbar').getBoundingClientRect().height;
    let text = '';
    text += '<ons-list id="mainList" style="margin-top:' + h + 'px">';
    text += ConstructMainRacePageListVoorspelling(raceData);
    text += '</ons-list>'
    return text;
}

function ConstructMainRacePageListVoorspelling(raceData) {
    let text = ''
    text += '<ons-list-header><div class="raceHeader">' + raceData.Land + '</div></ons-list-header>';
    text += '<ons-list-header><div>Pole Position</div></ons-list-header>';
    text += ConstructMainRacePageListItem('1.');
    // text += '<ons-list-header><div>Snelste ronde race</div></ons-list-header>';
    // text += ConstructMainRacePageListItem('1.');
    // text += '<ons-list-header><div>Uitslag race</div></ons-list-header>';

    // var i;
    // for (i = 1; i <= 10; i++) {
    //     text += ConstructMainRacePageListItem(i.toString() + '.');
    // }

    return text;
}

function ConstructMainRacePageListItem(no) {
    let text = '';
    text += '<ons-list-item class="raceButton" tappable>';
    // text += '<div class="raceAllInfo">';
    text += '<div class="completeBar">'; // COMPLETE BAR
    text += '<div class="bigNumber">' + no; // BIG NUMBER
    text += '</div>'; // BIG NUMBER
    text += ConstructDriverBar();
    // text += '</div>';

    text += '</div>'; // COMPLETE BAR
    text += '</ons-list-item>';

    // let circuit = data.Circuit.toString().toUpperCase();
    // let land = data.Land.toString();
    // let dagen = data.Dagen.toString();
    // let maand = data.Maand.toString().toUpperCase();
    // let text = '';

    // text += '<ons-list-item class="raceButton" record="' + 'asdf' + '" tappable>';
    // text += '<div class="raceAllInfo" style=background-color:green>';
    // text += '<div class="raceFirstInfo" style="background-color:white">';
    // text += '<div>' + 'asdf' + '</div>';
    // text += '<div class="raceSecondInfo">';
    // text += '<div>' + 'asdf' + '</div>';
    // text += '<div class="raceCircuitName">' + 'asdf' + '</div>';
    // text += '</div>';
    // text += '</div>';
    // text += '</ons-list-item>';

    return text;

    function ConstructDriverBar() {
        let text = '';
        text += '<div class="driverBar">'; // DRIVER BAR
        text += '<div class="driverPicture"></div>'; // DRIVER PICTURE
        text += '<div class="driverColorContainer">|</div>'; // DRIVER COLOR
        text += '<div class="driverInfo">'; // DRIVER INFO
        text += '<div class="driverInfoUp">Max VERSTAPPEN</div>'; // DRIVER INFO NAME
        text += '<div class="driverInfoDown">RED BULL RACING</div>'; // DRIVER INFO TEAM
        text += '</div>'; // DRIVER INFO
        text += '<div class="driverFlag"></div>'; // DRIVER FLAG
        text += '</div>'; // DRIVER BAR

        //text += '';

        return text;
    }
}