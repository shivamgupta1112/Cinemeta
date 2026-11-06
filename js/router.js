const routes = {
    home: function () { loadFeatured(); },
    movies: function () { loadMovies(); },
    login: function () { prepareLogin(); },
    register: function () { prepareRegister(); },
    booking: function () { prepareBooking(); },
    contact: function () {},
    thanks: function () { showThanks(); }
};

function currentRoute() {
    const name = (location.hash || "#home").replace("#", "").split("?")[0];
    return routes[name] ? name : "home";
}

function renderRoute() {
    const name = currentRoute();
    const raw = (location.hash || "#home").replace("#", "").split("?")[0];
    if (raw !== name) {
        location.hash = name;
        return;
    }

    document.body.dataset.page = name;
    Array.prototype.forEach.call(document.querySelectorAll("[data-view]"), function (view) {
        view.hidden = view.getAttribute("data-view") !== name;
    });
    renderLayout();
    routes[name]();
}

window.addEventListener("hashchange", renderRoute);
renderRoute();
