function ConstructStandPoule() {

    let h = document.getElementById('toolbar').getBoundingClientRect().height;
    let html = '';

    html = '<ons-page id="standPoule">'
    html += '<ons-list-header  style="margin-top:' + (h) + 'px"><div class="predictionHeaders">HALL OF FAME</div></ons-list-header>';
    html += '<ons-list id="mainList">';

    html += GetHallOfFame();

    html += '</ons-list>';
    html += '<ons-list-header><div class="predictionHeaders">Stand poule 2020</div></ons-list-header>';
    html += '</ons-page>';

    let page = document.getElementById('standPoule.html');
    page.innerHTML = html;
}

function GetHallOfFame() {
    let html = '';
    html += '<ons-list-item class="predictionDriverListItem">';

    html += '<div class="hallOfFamePerson">'
    html += '<div class="hallOfFamePersonTrophy"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/trophy.png" style="max-width: 50px"/></div>'
    html += '<div class="hallOfFamePersonYear">' + '2019' + '</div>' // BIG NUMBER

    html += '<div class="hallOfFamePersonName">Harold</div>';
    html += '<div class="hallOfFameTeamName">TEAMLEIDER ENGINEERING</div>';
    html += '</div>';

    html += '</div>';
    html += '</ons-list-item>';
    return html;
}