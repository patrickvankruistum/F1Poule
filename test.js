// document.addEventListener('init', function(event) {
//     var page = event.target;

//     if (page.id === 'main') {
//         console.log('main');
//     } else if (page.id === 'race1') {
//         console.log('testetst');
//         let toolbar = document.querySelector('ons-toolbar');
//         console.log(toolbar.innerHTML);
//         //document.querySelector('toolbar .center').innerHTML = page.data.title;
//         //page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
//     }
// });

var showPopover = function(target) {

    if (currentUsr == '') return;

    document
        .getElementById('popover')
        .show(target);
};

var hidePopover = function() {
    document
        .getElementById('popover')
        .hide();
};