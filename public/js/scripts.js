var currentlyOpen = false;
var lastOpenDiv;

function showPane(name) {

    // Format the name so it works with the HTML.
    var elementName = name + 'Div';
    
    // Grab the actual element from the HTML.
    var element = document.getElementById(elementName);

    // If there is a div that is currently open, then go through all of the
    // content divs and "close" them.
    if (currentlyOpen) {
        var allElements = document.getElementsByClassName('content');
        for (var i = 0; i < allElements.length; i++) {
            allElements[i].style.height = '0vh';
        } 
        currentlyOpen = false;
    }

    // If the user tries to close the div that is currently open, it will close
    // that div and not open a new one. However, if the user tries to open a
    // different div, then it will be opened and close the previous one.
    if (lastOpenDiv != name) {
        element.style.height = '60vh';
        currentlyOpen = true;
        lastOpenDiv = name;
    }
}
