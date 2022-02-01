
window.onload = function () {
    // Homepage navigation
    function navigateToSections(){
        var nextButton = document.getElementById('fixedbutton');

        var sections = ["home", "about", "experiences", "skills", "hobbies", "contact"]
    
        nextButton.addEventListener('click', event => {
            var location = window.location.href.split("#")[1]
            
            if (!sections.includes(location)) {
                window.location.href += "#about";
                return;
            }
    
            var index = sections.indexOf(location);
            
            var navTo = sections[++index];

            if (navTo == undefined) {
                window.location.href = window.location.href.split("#")[0] + "#home";
                nextButton.textContent = "Next";
                return;
            }

            window.location.href = window.location.href.split("#")[0] + "#" + navTo;

            if (window.location.href.split("#")[1] == "contact") {
                nextButton.textContent = "Top";
            }
        });
    }

    navigateToSections();
}
