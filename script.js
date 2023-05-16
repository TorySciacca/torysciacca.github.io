window.onload = function() {
    var sections = document.querySelectorAll('section');
    var links = document.querySelectorAll('nav a');

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();

            for (var j = 0; j < sections.length; j++) {
                sections[j].style.display = 'none';
            }

            var target = this.getAttribute('href