
// Smooth scrolling function
$(document).ready( function() {
    if (
        localStorage.getItem("color-mode") === "dark" ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches &&
            !localStorage.getItem("color-mode"))
    ) {
        $("html").attr("color-mode", "dark");
    }

    $(document).on("scroll", onScroll);

    $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $("a").each(function () {
            $(this).removeClass("active");
        });
        $(this).addClass("active");

        var target = this.hash;
        $target = $(target);

        $("html, body").stop().animate(
            { scrollTop: $target.offset().top + 2 },
            300,
            function () {
                window.location.has = target;
                $(document).on("scroll", onScroll);
            }
        );
    });
    
});

// Function to change the highlighted section in navbar
function onScroll() {
    var scrollPos = $(document).scrollTop() + ($(window).height())/2;
    $(".nav a").slice(1, 5).each(function () {
        var currentLink = $(this);
        var refElement = $(currentLink.attr("href"));
        if (scrollPos >= refElement.position().top) {
            $(".nav a").removeClass("active");
            currentLink.addClass("active");
        } else {
            currentLink.removeClass("active");
        }
    });
}

// Function to toggle dark mode
function toggleTheme() {
    if ($("html").attr("color-mode") == "light") {
        $("html").attr("color-mode", "dark");
    } else {
        $("html").attr("color-mode", "light");
    }
    localStorage.setItem("color-mode", $("html").attr("color-mode"));
}

$(document).ready( function() {
    updateTable();
});

function updateTable() {
    let dataURL = "https://api.github.com/users/alexmerren/repos"
    let name, description, last_updated, url, language;

    $.getJSON(dataURL, function(data) {
        for (let iter in data) {
            let entry = data[iter];

            if (entry.name == "alexmerren") {}
            else {
                name = entry.name;
                description = entry.description;
                last_updated = entry.pushed_at;
                language = entry.language;
                url = entry.html_url;
                //console.log(`${name}, ${description}, ${last_updated}, ${language}, ${url}`)
            }
        }
    });
}
