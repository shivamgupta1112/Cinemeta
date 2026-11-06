function showThanks() {
    const booking = Store.readBooking();
    const details = document.getElementById("ticket-details");

    if (booking) {
        details.textContent = booking.name + " booked " + booking.tickets +
            " ticket" + (booking.tickets === 1 ? "" : "s") +
            " for " + booking.title + " at " + booking.showtime + ".";
    } else {
        details.textContent = "Your booking has been confirmed.";
    }
}
