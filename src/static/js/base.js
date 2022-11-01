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
}
