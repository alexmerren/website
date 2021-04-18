$(document).ready(function () {
    // Making the arrow bounce up and down at the bottom of the home div
    setInterval(function () {
        $('#title__down-arrow').show();
        setInterval(function () {
            $('#title__down-arrow').effect(
                'bounce',
                { times: 3, distance: 15 },
                'slow'
            );
        }, 1000);
    }, 5000);

    // Checking and setting color theme
    if (
        localStorage.getItem('color-mode') === 'dark' ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches &&
            !localStorage.getItem('color-mode'))
    ) {
        $('html').attr('color-mode', 'dark');
    }

    // Whenever scrolling, use the onScroll function
    $(document).on('scroll', onScroll);

    // Whenever clicking on a link that points inside the web page,
    // use this custom function.
    $("a[href^='#']").on('click', function (e) {
        e.preventDefault();
        $(document).off('scroll');

        $('nav a').slice(0).each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        let target = this.hash;
        $target = $(target);

        $('html, body')
            .stop()
            .animate({ scrollTop: $target.offset().top }, 200, function () {
                window.location.has = target;
                $(document).on('scroll', onScroll);
            });
    });
});

// Function to change the highlighted section in navbar
function onScroll() {
    let currentLink, refElement, scrollPos;
    scrollPos = $(document).scrollTop() + $(window).height() / 2;

    $('.nav a')
        .slice(1)
        .each(function () {
            currentLink = $(this);
            refElement = $(currentLink.attr('href'));
            if (
                refElement.position().top <= scrollPos &&
                currentLink.offset().top + refElement.height() > scrollPos
            ) {
                $('.nav a').removeClass('active');
                currentLink.addClass('active');
            } else {
                currentLink.removeClass('active');
            }
        });
}

function updateTable() {
    let iter, entry, name, description, last_updated, url, language;
    let dataURL = 'https://api.github.com/users/alexmerren/repos';
    let $table = $('.repos');
    $table.empty();

    $table.append('<thead class="repos__title"><th>Name</th><th>Description</th><th>Language</th><th>Last Update</th></thead>');
    $table.append('<tbody>');
    $.getJSON(dataURL, function (data) {
        entry = data[0];

        for (iter in data) {
            entry = data[iter];
            if (entry.name === 'alexmerren') {} 
            else {
                name = entry.name;
                description = entry.description;
                last_updated = formatDate(entry.pushed_at);
                language = entry.language;
                url = entry.html_url;
                $('.repos >tbody').append(`<tr><td><a href="${url}">${name}</a></td><td>${description}</td><td>${language}</td><td>${last_updated}</td></tr>`);
            }
        }
    });
}

// Function to toggle dark mode.
function toggleTheme() {
    if ($('html').attr('color-mode') == 'light') {
        $('html').attr('color-mode', 'dark');
    } else {
        $('html').attr('color-mode', 'light');
    }
    localStorage.setItem('color-mode', $('html').attr('color-mode'));
}

// Function to format date from github repo JSON.
function formatDate(date) {
    let day, month, year, shortDate;
    year = date.slice(0,4);
    month = date.slice(5,7);
    day = date.slice(8,10);
    shortDate = day + '/' + month + '/' + year;
    return shortDate;
}
