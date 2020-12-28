function makeActive(name) {
    // Format the element name properly.
    var elementName = name + '-link';

    // Get an object of all the elements that have the classname page-link.
    var allNavElements = document.getElementsByClassName('page-link');

    for (var i = 0; i < allNavElements.length; i++) {
        // Loop through all the elements found with page-link as the class,
        // and set the background color as defined in the main.css.
        var currentElement = allNavElements[i];
        currentElement.style.backgroundColor = '';
    }
    
    // Set the current (desired) nav element to bright-pink from main.css.
    var desiredActiveElement = document.getElementById(elementName);
    desiredActiveElement.style.backgroundColor = 'var(--bright-pink)';
}

