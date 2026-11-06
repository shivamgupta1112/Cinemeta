const Store = {
    movieKey: "mt_movie",
    bookingKey: "mt_booking",
    userKey: "mt_user",
    usersKey: "mt_users",

    escape: function (value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    },

    readJson: function (storage, key, fallback) {
        try {
            const value = JSON.parse(storage.getItem(key) || "");
            return value == null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    },

    saveMovie: function (movie) {
        const record = {
            id: movie.id || "",
            title: movie.name || movie.title || "",
            poster: movie.poster ? MovieAPI.posterUrl(movie) : (movie.posterUrl || "assets/poster.svg"),
            year: movie.year || movie.releaseInfo || "",
            rating: movie.imdbRating || ""
        };
        sessionStorage.setItem(this.movieKey, JSON.stringify(record));
        return record;
    },

    readMovie: function () {
        return this.readJson(sessionStorage, this.movieKey, null);
    },

    saveBooking: function (booking) {
        sessionStorage.setItem(this.bookingKey, JSON.stringify(booking));
    },

    readBooking: function () {
        return this.readJson(sessionStorage, this.bookingKey, null);
    },

    users: function () {
        const users = this.readJson(localStorage, this.usersKey, []);
        return Array.isArray(users) ? users : [];
    },

    saveUserAccount: function (user) {
        const users = this.users().filter(function (item) {
            return item.email !== user.email;
        });
        users.push(user);
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        this.setCurrentUser(user);
    },

    findUser: function (email, password) {
        return this.users().find(function (user) {
            return user.email === email && user.password === password;
        }) || null;
    },

    setCurrentUser: function (user) {
        localStorage.setItem(this.userKey, JSON.stringify({
            name: user.name,
            email: user.email
        }));
    },

    currentUser: function () {
        return this.readJson(localStorage, this.userKey, null);
    },

    logout: function () {
        localStorage.removeItem(this.userKey);
    }
};
