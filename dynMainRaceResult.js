function ConstructMainRaceResult(result, predictions) {
    let page = document.getElementById('raceUitslag.html');
    let h = document.getElementById('toolbar').getBoundingClientRect().height;

    let text = '';
    text += '<ons-page id="raceResult">';

    //text += '<ons-list-header style="margin-top:' + (h) + 'px"><div class="predictionHeaders">Pole Position</div></ons-list-header>';

    text += '<ons-list id="raceResultList" style="margin-top:' + (h) + 'px">';
    text += '<ons-list-header><div class="predictionHeaders">Pole Position</div></ons-list-header>';
    text += ConstructMainRaceResultEmptyBar(result, "PP", Object.entries(predictions));
    text += '<ons-list-header><div class="predictionHeaders">Snelste Race Ronde</div></ons-list-header>';

    text += ConstructMainRaceResultEmptyBar(result, "FL", Object.entries(predictions));

    text += '<ons-list-header><div class="predictionHeaders">Uitslag race</div></ons-list-header>';

    var i;
    for (i = 1; i <= 10; i++) {
        text += ConstructMainRaceResultEmptyBar(result, i.toString(), Object.entries(predictions));
    }

    text += '</ons-list>';
    text += '</ons-page>';

    page.innerHTML = text;
}

function ConstructMainRaceResultEmptyBar(result, no, predictions) {
    let text = '';
    let correctCount = 0;
    let driver = '';

    let correctPredictionsBy = [];

    if (result != undefined) {

        //let asdf = Object.keys(result).map(no => result[no])
        //console.log('test', asdf);

        // if (no in result) {
        //     console.log('booyah');

        // }
        let r = result[no];
        if (r != undefined) {
            driver = r;

            if (predictions != undefined) {
                for (i = 0; i <= predictions.length - 1; i++) {
                    if (predictions[i][1][no] == driver) {
                        correctPredictionsBy.push(predictions[i][0]);
                        correctCount += 1;
                    }
                }
            }


        }


        // var found = result.find(function(element) {
        //     return element[0] === no;
        // });

        // if (found != null) {
        //     driver = found[1];
        // }
    }

    if (correctCount > 0) {
        text += "<ons-list-item class='predictionDriverListItem' onclick='OnShowCorrectGuesses(\"" + correctPredictionsBy + "\")' + ' tappable>";
    } else {
        text += '<ons-list-item class="predictionDriverListItem">';
    }


    text += '<div class="predictionDriverTypePointContainer">';
    text += '<div class="predictionDriverType">' + no + '</div>'; // + no // BIG NUMBER
    text += '<div class="predictionDriverPoints">' + GetF1PointValue(no) + '</div>'; // POINTS
    text += '</div>'; // END CONTAINER FOR NUMBER AND SCORE

    let driverInfo = GetDriverInfoFromDriverSelectionList(driver);

    if (driverInfo == null) {
        text += '<div class="predictionDriverSelectContainer" style="display: none">';
        text += '<div class="predictionDriverPicture"><img src="" style="max-width: 60px"/></div>'; // DRIVER PICTURE
        text += '<div class="predictionDriverColor">|</div>'; // DRIVER COLOR
        text += '<div class="predictionDriverInfo">'; // DRIVER INFO
        text += '<div class="predictionDriverInfoName"></div>'; // DRIVER INFO NAME
        text += '<div class="predictionDriverTeamName"></div>'; // DRIVER INFO TEAM
        text += '</div>'; // DRIVER INFO
        text += '<div class="predictionDriverFlag"><img  style="max-width: 35px"/></div>'; // DRIVER FLAG
        text += '</div>';
        text += '<div class="predictionDriverEmpty" style="display: inline-block">in afwachting</div>'
    } else {
        text += '<div class="predictionDriverSelectContainer" style="display: inline-block">';
        text += '<div class="predictionDriverPicture"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + driverInfo.lastName.toLowerCase() + '.png" style="max-width: 60px"/></div>'; // DRIVER PICTURE
        text += '<div class="predictionDriverColor" style="color:' + driverInfo.color + '">|</div>'; // DRIVER COLOR
        text += '<div class="predictionDriverInfo">'; // DRIVER INFO
        text += '<div class="predictionDriverInfoName">' + driverInfo.firstName + ' ' + driverInfo.lastName.toUpperCase() + '</div>'; // DRIVER INFO NAME
        text += '<div class="predictionDriverTeamName">' + driverInfo.team.toUpperCase() + '</div>'; // DRIVER INFO TEAM
        if (correctCount > 0) text += '<div class="correctPredictionCount">' + correctCount + 'x goed' + '</div>';
        text += '</div>'; // DRIVER INFO
        text += '<div class="predictionDriverFlag"><img src="https://patrickvankruistum.github.io/F1Poule/lib/img/' + driverInfo.country.toLowerCase() + '.jpg" style="max-width: 35px"/></div>'; // DRIVER FLAG
        text += '</div>';
        text += '<div class="predictionDriverEmpty" style="display: none">selecteer coureur</div>'
    }






    // text += '<div id="predictionDriverSelectContainer' + no + '" class="predictionDriverSelectContainer" style="display: none">';
    // text += '<div id="' + 'predictionDriverPicture' + no + '" class="predictionDriverPicture"><img src="" style="max-width: 60px"/></div>'; // DRIVER PICTURE
    // text += '<div id="' + 'predictionDriverColor' + no + '" class="predictionDriverColor">|</div>'; // DRIVER COLOR
    // text += '<div class="predictionDriverInfo">'; // DRIVER INFO
    // text += '<div id="' + 'predictionDriverInfoName' + no + '" class="predictionDriverInfoName"></div>'; // DRIVER INFO NAME
    // text += '<div id="' + 'predictionDriverTeamName' + no + '" class="predictionDriverTeamName"></div>'; // DRIVER INFO TEAM
    // text += '</div>'; // DRIVER INFO
    // text += '<div class="predictionDriverFlag"><img id="' + 'predictionDriverFlag' + no + '"  src="" style="max-width: 35px"/></div>'; // DRIVER FLAG
    // text += '</div>';







    //text += '<div id="' + 'predictionDriverEmpty' + no + '" class="predictionDriverEmpty" style="display: inline-block">in afwachting</div>';

    text += '</ons-list-item>';
    return text;
}