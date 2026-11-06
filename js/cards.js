function renderMovieGrid(container, movies) {
    if (!movies.length) {
        container.innerHTML = '<p class="status">No movies found.</p>';
        return;
    }

    container.innerHTML = movies.map(function (movie) {
        const title = Store.escape(movie.name);
        const year = Store.escape(movie.year || movie.releaseInfo || "Now showing");
        const rating = movie.imdbRating ? Store.escape(movie.imdbRating) + " / 10" : "Not rated";
        const genres = Store.escape((movie.genres || []).slice(0, 2).join(" · "));
        const blurb = Store.escape((movie.description || "Book tickets for this showing.").slice(0, 100));
        const poster = Store.escape(MovieAPI.posterUrl(movie));
        const href = Store.currentUser() ? "#booking" : "#login";

        return (
            '<article class="movie-card">' +
                '<img src="' + poster + '" alt="' + title + ' poster" onerror="this.onerror=null;this.src=\'assets/poster.svg\'">' +
                "<h3>" + title + "</h3>" +
                '<p class="movie-meta">' + year + " · " + rating + (genres ? " · " + genres : "") + "</p>" +
                "<p>" + blurb + "</p>" +
                '<a class="btn" data-book="' + Store.escape(movie.id) + '" href="' + href + '">Book Now</a>' +
            "</article>"
        );
    }).join("");

    Array.prototype.forEach.call(container.querySelectorAll("[data-book]"), function (link) {
        link.addEventListener("click", function () {
            const id = link.getAttribute("data-book");
            const movie = movies.find(function (item) {
                return item.id === id;
            });
            if (movie) {
                Store.saveMovie(movie);
            }
        });
    });
}

function showLoadError(container) {
    container.innerHTML = '<p class="status">Could not load movies. Check your internet connection and refresh the page.</p>';
}
