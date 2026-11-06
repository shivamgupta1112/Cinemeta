function selectedMovie() {
    return Store.readMovie();
}

function goAfterAuth() {
    location.hash = selectedMovie() ? "booking" : "movies";
}

function prepareLogin() {
    const movie = selectedMovie();
    if (Store.currentUser() && movie) {
        location.hash = "booking";
        return;
    }
    document.getElementById("movie-name").textContent = movie ? movie.title : "None";
    document.getElementById("login-message").textContent = "";
}

function prepareRegister() {
    document.getElementById("register-message").textContent = "";
}

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const message = document.getElementById("login-message");
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;
    const existing = Store.users().find(function (user) {
        return user.email === email;
    });

    if (existing && existing.password !== password) {
        message.textContent = "Wrong password for that email.";
        return;
    }

    if (existing) {
        Store.setCurrentUser(existing);
    } else {
        Store.saveUserAccount({
            name: email.split("@")[0],
            email: email,
            phone: "",
            password: password
        });
    }

    goAfterAuth();
});

document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const message = document.getElementById("register-message");
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    const email = document.getElementById("register-email").value.trim().toLowerCase();
    const existing = Store.users().some(function (user) {
        return user.email === email;
    });
    if (existing) {
        message.textContent = "That email is already registered. Log in instead.";
        return;
    }

    Store.saveUserAccount({
        name: document.getElementById("name").value.trim(),
        email: email,
        phone: document.getElementById("phone").value.trim(),
        password: password
    });

    goAfterAuth();
});
