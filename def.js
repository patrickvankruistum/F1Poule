const navigator = document.querySelector('#navigator');
const backButton = document.getElementById('backButton');
const loginId = document.getElementById('loginId');
var currentUsr = '';

var delta;

var intervalId;

function TimeLeft(futureDate) {

    let currentDate = new Date();

    var delta = Math.abs(futureDate - currentDate) / 1000;


    this.days = String(Math.floor(delta / 86400)).padStart(2, '0');
    delta -= this.days * 86400;


    this.hours = String(Math.floor(delta / 3600) % 24).padStart(2, '0');
    delta -= this.hours * 3600;


    this.minutes = String(Math.floor(delta / 60) % 60).padStart(2, '0');
    delta -= this.minutes * 60;

    this.seconds = String(Math.floor(delta % 60)).padStart(2, '0');

}

function TimeLeftDelta(delta) {

    this.days = String(Math.floor(delta / 86400)).padStart(2, '0');
    delta -= this.days * 86400;


    this.hours = String(Math.floor(delta / 3600) % 24).padStart(2, '0');
    delta -= this.hours * 3600;


    this.minutes = String(Math.floor(delta / 60) % 60).padStart(2, '0');
    delta -= this.minutes * 60;

    this.seconds = String(Math.floor(delta % 60)).padStart(2, '0');

}

function UpdateTimeLeft() {
    let timeLeft = new TimeLeftDelta(delta);
    console.log('fire', timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds);
    document.getElementById('countDownSeconds').innerHTML = timeLeft.seconds;
    console.log(document.getElementById('countDownSeconds').innerHTML);
}

function StopTimer() {
    console.log('attempting to stop timer');
    clearInterval(intervalId);
    intervalId = null;
}


var puntenSysteem = [{
    'id': 'FL',
    'points': 5
}, {
    'id': 'PP',
    'points': 5,
}, {
    'id': '1',
    'points': 25,
}, {
    'id': '2',
    'points': 18,
}, {
    'id': '3',
    'points': 15,
}, {
    'id': '4',
    'points': 12,
}, {
    'id': '5',
    'points': 10,
}, {
    'id': '6',
    'points': 8,
}, {
    'id': '7',
    'points': 6,
}, {
    'id': '8',
    'points': 4,
}, {
    'id': '9',
    'points': 2,
}, {
    'id': '10',
    'points': 1,
}]

function GetPointValue(result) {
    let lookUpValue = puntenSysteem.find(x => x.id === result);
    return lookUpValue.points + 'pt.';
}