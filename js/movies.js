const moviesGrid = document.getElementById("movies-grid");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const moviesHeading = document.getElementById("movies-heading");

function showMovies(query) {
    moviesGrid.innerHTML = '<p class="status">Loading movies...</p>';
    moviesHeading.textContent = query ? "Results for \"" + query + "\"" : "Now Showing";

    MovieAPI.load(query)
        .then(function (movies) {
            moviesGrid.dataset.ready = "1";
            renderMovieGrid(moviesGrid, movies.slice(0, 18));
        })
        .catch(function () {
            showLoadError(moviesGrid);
        });
}

function loadMovies() {
    if (moviesGrid.dataset.ready === "1") {
        return;
    }
    showMovies("");
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    showMovies(searchInput.value.trim());
});
