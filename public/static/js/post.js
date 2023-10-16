window.onload = function () {
    var topButton = document.getElementById('fixedbutton');

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    topButton.addEventListener('click', () => {
        topFunction();
    });

    // on scroll
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }

    window.onscroll = function() {scrollFunction()};
}

