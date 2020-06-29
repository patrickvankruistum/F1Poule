var refern = (function thename() {
    let menuHTML = '<ons-list>';
    menuHTML += '<ons-list-header class="menuItem" id="loginId">null</ons-list-header>';
    menuHTML += '<ons-list-item class="menuItem" onclick=SignOut() tappable>Afmelden</ons-list-item>';

    if (currentUsr === 'PKM') {
        menuHTML += '<ons-list-item class="menuItem" onclick=OnAddUserClick(this) tappable>Gebruiker toevoegen</ons-list-item>';
    }

    menuHTML += '<ons-list-item class="menuItem" onclick=hidePopover() tappable>Menu sluiten</ons-list-item>';
    menuHTML += '</ons-list>';

    document.getElementById('divPopover').innerHTML = menuHTML;
    document.getElementById('loginId').innerHTML = currentUsr;
    document.getElementById('menuButton').setAttribute('onclick', 'showPopover(this)');

    return thename;
}());

var ConstructAnotherMenu;
(ConstructAnotherMenu = function() {

    let menuHTML = '<ons-list>';
    menuHTML += '<ons-list-header class="menuItem" id="loginId">Gebruiker toevoegen</ons-list-header>';
    menuHTML += '<ons-input id="addUserInitials" placeholder="Initialen" modifier="underbar" style="width: 100%; padding-left: 10px"></ons-input>';
    menuHTML += '<ons-input id="addUserFirstName" placeholder="Voornaam" modifier="underbar" style="width: 100%; padding-left: 10px"></ons-input>';
    menuHTML += '<ons-input id="addUserPassword" placeholder="Wachtwoord" modifier="underbar" style="width: 100%; padding-left: 10px"></ons-input>';
    menuHTML += '<ons-list-item class="menuItem" onclick=OnAddUserSave() tappable style="color: green">Opslaan</ons-list-item>';
    menuHTML += '<ons-list-item class="menuItem" onclick=hidePopoverAddUser() tappable style="color: red">Annuleren</ons-list-item>';
    menuHTML += '</ons-list>';

    document.getElementById('divPopoverAddUser').innerHTML = menuHTML;
})();

function ConstructDriverMenu(drivers) {
    let menuHTML = '<ons-list>';
    menuHTML += '<ons-list-header id="driverSelect"><div id="driverSelectDescriptionContainer"><div id="driverSelectDescription">Selecteer</div><div id="driverSelectVerwijder" onclick="deselectDriver()">Verwijder</div></div></ons-list-header>';
    menuHTML += '<div style="margin-top:25px;">';

    // menuHTML += '<ons-list-header><div">Selecteer</div>></ons-list-header>';
    menuHTML += drivers;
    menuHTML += '</div>';
    menuHTML += '</ons-list>';

    document.getElementById('divPopoverAddDriver').innerHTML = menuHTML;
}

function showPopover(target) {
    if (currentUsr == '') return;
    document.getElementById('popover').show(target);
}

function hidePopover() {
    document.getElementById('popover').hide();
}

function showPopoverAddUser(target) {
    document.getElementById('popoverAddUser').show(target);
}

function hidePopoverAddUser() {
    let eleInitialen = document.getElementById('addUserInitials');
    let eleFirstName = document.getElementById('addUserFirstName');
    let elePassword = document.getElementById('addUserPassword');

    eleInitialen.value = '';
    eleFirstName.value = '';
    elePassword.value = '';

    document.getElementById('popoverAddUser').hide();
}

function showDriverSelect(target) {

    let driverItemLists = document.getElementsByClassName('driverSelectMenuItem');
    for (var i = 0; i <= driverItemLists.length - 1; i++) {
        driverItemLists[i].style.display = 'block';
    }

    if (target.id != 'driverPP' && target.id != 'driverFL') {
        for (var i = 1; i <= 10; i++) {
            let loopElement = document.getElementById('driverBar' + i);
            let initials = loopElement.dataset.initials;
            if (initials != '' && initials != undefined) {
                let findElement = document.getElementById('driverItemList' + initials);
                findElement.style.display = 'none';

            }
        }
    }

    let element = document.getElementById('popoverDriverSelect');
    element.setAttribute('data-sender', target.id);

    let newTarget = document.getElementById('toolbarTitle')

    element.show(newTarget);
}

function hideDriverSelect() {
    document.getElementById('popoverDriverSelect').hide();
}

function OnAddUserClick(target) {
    hidePopover();
    document.getElementById('popoverAddUser').show(target);
}

function OnAddUserSave() {
    let eleInitialen = document.getElementById('addUserInitials');
    let eleFirstName = document.getElementById('addUserFirstName');
    let elePassword = document.getElementById('addUserPassword');

    if (eleInitialen.value === '' || eleFirstName === '' || elePassword === '') return;
    else if (eleInitialen.value.length != 3) return;

    CreateNewUser(eleInitialen.value.toUpperCase(), eleFirstName.value, elePassword.value);
    hidePopoverAddUser();
}

backButton.addEventListener('click', function(event) {
    var id = navigator.topPage.id;
    if (id == 'mainRacePage') {
        document.querySelector('#navigator').popPage({ refresh: true });
        StopTimer();
        ToggleBackButton(false);
        SetTitle('Matemco F1 2020');
        navigator.pushPage('main.html');
        // location.reload();

    }
})