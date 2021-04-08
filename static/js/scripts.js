
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
    let data = cleanRepoData();
});

function cleanRepoData() {
    var dataURL = "https://api.github.com/users/alexmerren/repos"
    let cleanedData = [];

    $.getJSON(dataURL, function(data) {
        console.log(data);
        data.forEach(function(item) {
            if (item.full_name == "alexmerren/alexmerren") {}
            else {
                let object = {
                    'name' : item.name,
                    'description' : item.description,
                    'url' : item.url,
                    'last_update' : item.pushed_at,
                    'language' : item.language
                };

                cleanedData.push(object);
            }
        });
    });

    return cleanedData;
}