/*
window.onload = function() {
    var sections = document.querySelectorAll('section');
    var links = document.querySelectorAll('nav a');

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();

            for (var j = 0; j < sections.length; j++) {
                sections[j].style.display = 'none';
            }

            var target = this.getAttribute('href');
            document.querySelector(target).style.display = 'block';
        });
    }

    document.querySelector('nav a').click();
};
*/

window.onload = function() {
    showSection('login'); // Shows the login by default when the page loads
  };

function showSection(sectionId) {
    // Hide all sections
    var sections = document.getElementsByClassName("section");
    for (var i = 0; i < sections.length; i++) {
      sections[i].style.display = "none";
    }
    
    // Show the selected section
    var section = document.getElementById(sectionId);
    section.style.display = "block";
  }

  function validateLogin(event) {
    event.preventDefault(); // Prevent form submission and page reload
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Perform login validation (replace this with your own validation logic)
    if (username === "admin" && password === "password") {
      showSection('user'); // Display the success section
    } else {
      alert("Invalid login details. Please try again."); // Display an error message
    }
  }

  function showValidation(event) {
    event.preventDefault()
    

    // Hide all sections
    var UCN = document.getElementById("UCN").value;
    var isValid = false
    var validationText = document.getElementById("validationText");

    if (UCN === "asd123") { //default for testing
        isValid = true; //set true
      } else {
        isValid = false; //set false
      }
    
    if (isValid == true) {
        validationText.textContent = "Certificate is Valid"; 
        validationText.style.backgroundColor = "#5eb85c";
    } else {
        validationText.textContent = "Certificate is Invalid";
        validationText.style.backgroundColor = "#e61e2a";
    }

  }

  function refreshPage() {
    location.reload();
  }