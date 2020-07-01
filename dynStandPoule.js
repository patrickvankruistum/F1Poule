function ConstructStandPoule(contestants) {

    let h = document.getElementById('toolbar').getBoundingClientRect().height;
    let html = '';

    html = '<ons-page id="standPoule">'
    html += '<ons-list-header  style="margin-top:' + (h) + 'px"><div class="predictionHeaders">HALL OF FAME</div></ons-list-header>';

    html += GetHallOfFame();

    html += '<ons-list-header><div class="predictionHeaders">Stand poule 2020</div></ons-list-header>';

    html += '<ons-list id="contestantList">';


    let positionNumber;

    for (i = 0; i <= contestants.length - 1; i++) {
        let contestant = contestants[i];
        let positionString;
        if (i === 0) {
            positionNumber = 1;
            positionString = positionNumber.toString();
        } else {
            if (contestants[i - 1].position === contestant.position) positionString = '=';
            else positionString = (positionNumber += 1).toString();
        }

        html += ConstructContestantBar(positionString, contestants[i].initials, contestants[i].name);
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
    html += '<div class="hallOfFameTeamName">TEAMLEIDER ENGINEERING</div>';
    html += '</div>';

    html += '</div>';
    html += '</ons-list-item>';
    html += '</ons-list>';
    return html;
}

function ConstructContestantBar(positie, initials, name) {
    let html = '<ons-list-item class="predictionDriverListItem">';

    html += '<div class="hallOfFamePerson">'
    html += '<div class="contestantPosition">' + positie + '</div>'
    html += '<div class="hallOfFamePersonYear">' + initials + '</div>' // BIG NUMBER

    html += '<div class="hallOfFamePersonName">' + name + '</div>';
    html += '<div class="hallOfFameTeamName">TEKST HIER</div>';
    html += '</div>';

    html += '</div>';
    html += '</ons-list-item>';
    return html;
}