function ConstructStandPoule(contestants) {

    let h = document.getElementById('toolbar').getBoundingClientRect().height;
    let html = '';

    html = '<ons-page id="standPoule">';
    //html += '<ons-pull-hook class="pullHookContainer" id="pullHook"><div class="pullHookChild"><ons-progress-circular indeterminate></ons-progress-circular></div></ons-pull-hook>';
    html += '<ons-list-header  style="margin-top:' + (h) + 'px"><div class="predictionHeaders">HALL OF FAME</div></ons-list-header>';

    html += GetHallOfFame();

    html += '<ons-list-header><div class="predictionHeaders">Stand poule 2020</div></ons-list-header>';

    html += '<ons-list id="contestantList">';


    let positionNumber = 0;;

    for (i = 0; i <= contestants.length - 1; i++) {
        positionNumber += 1;
        let contestant = contestants[i];
        let positionString;
        if (i === 0) {
            positionString = positionNumber.toString();
        } else {
            if (contestants[i - 1].points === contestant.points) positionString = '=';
            else positionString = (positionNumber).toString();
        }

        html += ConstructContestantBar(positionString, contestants[i].initials, contestants[i].firstname, contestants[i].points);
    }

    html += '</ons-list>';


    html += '</ons-page>';

    let page = document.getElementById('standPoule.html');
    page.innerHTML = html;

}

function GetHallOfFame() {
    let html = '<ons-list id="hallOfFameList">';
    html += '<ons-list-item class="predictionDriverListItem">';

    html += '<div class="hallOfFamePerson">'
    html += '<div class="hallOfFamePersonTrophy"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/trophy.png" style="max-width: 50px"/></div>'
    html += '<div class="hallOfFamePersonYear">' + '2019' + '</div>' // BIG NUMBER

    html += '<div class="hallOfFamePersonName">Harold</div>';
    html += '<div class="hallOfFameTeamName">THE COMEBACK KID</div>';
    html += '</div>';

    html += '</div>';
    html += '</ons-list-item>';
    html += '</ons-list>';
    return html;
}

function ConstructContestantBar(positie, initials, name, points) {
    let html = '<ons-list-item class="predictionDriverListItem">';

    html += '<div class="hallOfFamePerson">'
    html += '<div class="contestantPosition">' + positie + '</div>'
    html += '<div class="hallOfFamePersonYear">' + initials + '</div>' // BIG NUMBER

    html += '<div class="hallOfFamePersonName">' + name + '</div>';
    // html += '<div class="hallOfFamePersonPoints">' + '0pt.' + '</div>';
    html += '<div class="hallOfFameTeamName">' + points + ' punten' + '</div>';
    html += '</div>';

    html += '</div>';
    html += '</ons-list-item>';
    return html;
}