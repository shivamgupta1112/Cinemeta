function loadFeatured() {
    const featured = document.getElementById("featured-grid");
    if (featured.dataset.ready === "1") {
        return;
    }

    MovieAPI.load()
        .then(function (movies) {
            featured.dataset.ready = "1";
            renderMovieGrid(featured, movies.slice(0, 4));
        })
        .catch(function () {
            showLoadError(featured);
        });
}
