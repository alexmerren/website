var divCurrentlyOpen = false;
var lastOpenDiv;

function showPane(name) {
    if (!divCurrentlyOpen) {
        // If there is nothing up, go into normal opening and closing.
        var elementName = name + 'Div';
        var element = document.getElementById(elementName);

        if (element.style.height == '50vh') {
            element.style.height = '0vh';
            element.style.display = '';
        } else {
            element.style.height = '50vh';
            element.style.display = 'block';
            lastOpenDiv = name;
            divCurrentlyOpen = true;
        }
    } else {
        // If there is something else open, go through all of the other 
        // content boxes and close them before opening the new one.
        var allElements = document.getElementsByClassName('content');
        var allElementsLength = allElements.length;

        // Loop through all of the elements with content as the class,
        // and close them as in the else statement above.
        for (var i = 0; i < allElementsLength; i++) {
            allElements[i].style.height = '0vh';
            allElements[i].style.display = '';
        } 

        // All divs are closed after this, so that if the last button pressed
        // is different than the one open on screen, it opens the new div.
        // Hope that makes sense?
        divCurrentlyOpen = false;
        if ( lastOpenDiv != name) {
            showPane(name);
        }
    }
}
