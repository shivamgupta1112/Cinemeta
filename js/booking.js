function prepareBooking() {
    const user = Store.currentUser();
    const movie = Store.readMovie();

    if (!user) {
        location.hash = "login";
        return;
    }
    if (!movie || !movie.title) {
        location.hash = "movies";
        return;
    }

    document.getElementById("book-title").textContent = movie.title;
    document.getElementById("book-meta").textContent = [movie.year, movie.rating ? movie.rating + " / 10" : ""]
        .filter(Boolean)
        .join(" · ");
    document.getElementById("book-poster").src = movie.poster || "assets/poster.svg";
    document.getElementById("book-poster").alt = movie.title + " poster";
    document.getElementById("guest-name").value = user.name;
    document.getElementById("booking-message").textContent = "";
}

document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const user = Store.currentUser();
    const movie = Store.readMovie();
    const tickets = Number(document.getElementById("tickets").value);
    const message = document.getElementById("booking-message");

    if (!user || !movie) {
        location.hash = user ? "movies" : "login";
        return;
    }
    if (!tickets || tickets < 1 || tickets > 8) {
        message.textContent = "Choose between 1 and 8 tickets.";
        return;
    }

    Store.saveBooking({
        title: movie.title,
        poster: movie.poster,
        showtime: document.getElementById("showtime").value,
        tickets: tickets,
        name: document.getElementById("guest-name").value.trim(),
        email: user.email
    });

    location.hash = "thanks";
});
