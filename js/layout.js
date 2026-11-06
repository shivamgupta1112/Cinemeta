function renderLayout() {
    const page = document.body.dataset.page || "home";
    const user = Store.currentUser();
    const links = [
        ["#home", "Home", "home"],
        ["#movies", "Movies", "movies"],
        ["#contact", "Contact", "contact"]
    ];

    const items = links.map(function (link) {
        const active = page === link[2] ? "active" : "";
        return '<li><a href="' + link[0] + '" class="' + active + '">' + link[1] + "</a></li>";
    }).join("");

    const account = user
        ? '<li><span class="nav-user">' + Store.escape(user.name) + '</span></li><li><button type="button" id="logout-btn" class="nav-btn">Logout</button></li>'
        : '<li><a class="nav-btn' + (page === "login" ? " active" : "") + '" href="#login">Login</a></li>';

    document.getElementById("app-header").innerHTML =
        "<header>" +
            '<a class="logo" href="#home"><h1>Movie Tickets</h1></a>' +
            "<nav><ul>" + items + account + "</ul></nav>" +
        "</header>";

    document.getElementById("app-footer").innerHTML =
        "<footer><p>&copy; 2026 Movie Ticket Booking. All rights reserved.</p></footer>";

    const logout = document.getElementById("logout-btn");
    if (logout) {
        logout.addEventListener("click", function () {
            Store.logout();
            location.hash = "home";
            if (document.body.dataset.page === "home") {
                renderRoute();
            }
        });
    }
}
