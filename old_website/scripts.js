$(document).ready(function () {
    // Clicking a link to a section on the page, use this function. 
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
  let dataURL = "https://api.github.com/users/alexmerren/repos";
  let $table = $(".repos");
  $table.empty();

  $table.append(
      '<thead class="repos__title"><th>Name</th><th>Description</th><th>Language</th></thead>'
  );
  $table.append("<tbody>");

  $.getJSON(dataURL, function (data) {
    let entry = data[0];
      for (let iter in data) {
        entry = data[iter];
        let name = entry.name;
        let description = entry.description;
        let language = entry.language;
        let url = entry.html_url;
        $(".repos >tbody").append(
            `<tr><td><a href="${url}">${name}</a></td><td>${description}</td><td>${language}</td></tr>`
        );
    }
  });
}

// Function to format date from github repo JSON.
function formatDate(date) {
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
}
