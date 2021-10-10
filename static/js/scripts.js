$(document).ready(function () {
    // Checking and setting color theme
    if (
        localStorage.getItem("color-mode") === "dark" ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches &&
            !localStorage.getItem("color-mode"))
    ) {
        $("html").attr("color-mode", "dark");
    }

    // Whenever clicking on a link that points inside the web page,
    // use this custom function.
    $("a[href^='#']").on("click", function (e) {
        e.preventDefault();
        $(document).off("scroll");

        let target = this.hash;
        $target = $(target);

        $("html, body")
            .stop()
            .animate({ scrollTop: $target.offset().top }, 250, function () {
                window.location.has = target;
            });
    });

    // Update the projects table.
    updateTable();
});

// Function to add items to the repos table.
function updateTable() {
    let iter,
        entry,
        name,
        description,
        last_updated,
        url,
        language,
        dataURL,
        $table;
    dataURL = "https://api.github.com/users/alexmerren/repos";
    $table = $(".repos");
    $table.empty();

    $table.append(
        '<thead class="repos__title"><th>Name</th><th>Description</th><th>Language</th><th>Last Update</th></thead>'
    );
    $table.append("<tbody>");

    $.getJSON(dataURL, function (data) {
        entry = data[0];

        for (iter in data) {
            entry = data[iter];
            if (entry.name === "alexmerren") {
            } else {
                name = entry.name;
                description = entry.description;
                last_updated = formatDate(entry.pushed_at);
                language = entry.language;
                url = entry.html_url;
                $(".repos >tbody").append(
                    `<tr><td><a href="${url}">${name}</a></td><td>${description}</td><td>${language}</td><td>${last_updated}</td></tr>`
                );
            }
        }
    });
}

// Function to format date from github repo JSON.
function formatDate(date) {
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
}
