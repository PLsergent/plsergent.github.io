window.onload = function () {
    var cards = document.getElementsByClassName('card');

    for (var i=0; i<cards.length; i++){
        let card = cards[i]
        card.addEventListener('click', event => {
            postUrl = card.getAttribute('data-href');
            window.location = postUrl;
        });
    }
}