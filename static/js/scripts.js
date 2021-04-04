// The 'main' function when the document is loaded
$(document).ready(function() {

    // Check if the users prefers dark or light theme to start
    if (
        localStorage.getItem('color-mode') === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('color-mode'))
    ) {
        $('html').attr('color-mode', 'dark');
    }

    // Activate the onScroll() function for the document
    $(document).on('scroll', onScroll)

    // Smooth scrolling function
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off('scroll');

        $('a').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        var target = this.hash;
        $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 300, function() {
            window.location.has = target;
            $(document).on('scroll', onScroll);
        });
    });
});

// Function to change the highlighted section in navbar 
function onScroll() {
    var scrollPos = $(document).scrollTop();
    $('.nav a').each(function () {
        var currentLink = $(this);
        var refElement = $(currentLink.attr('href'));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav a').removeClass('active');
            currentLink.addClass('active');
        } else {
            currentLink.removeClass('active');
        }
    });
}

// Function to toggle dark mode
function toggleTheme() {
    if ($('html').attr('color-mode') == 'light') {
        $('html').attr('color-mode', 'dark');
        localStorage.setItem("color-mode", "dark");
    } else if ($('html').attr('color-mode') == 'dark') {
        $('html').attr('color-mode', 'light');
        localStorage.setItem("color-mode", "light");
    }
}

