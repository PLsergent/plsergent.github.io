window.onload = function () {
    // Clickable cards
    var cards = document.getElementsByClassName('card');

    for (var i=0; i<cards.length; i++){
        let card = cards[i]
        if (card.getAttribute('class').includes("clickable")) {
            card.addEventListener('click', event => {
                postUrl = card.getAttribute('data-href');
                window.location = postUrl;
            });
        }
    }

    // Tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}
