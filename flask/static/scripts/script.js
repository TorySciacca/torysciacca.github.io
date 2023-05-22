/*
function requestDocuments(value) { //change to request data from back-end

  if (value == "Transcript") {
      console.log('download transcript') 
  } else if (value == "Graduate Certificate") {
    console.log('download Graduate Certificate')
  }
}
*/
// log out function

function logout() {
  fetch('/logout', { method: 'GET' })
      .then(response => {
          if (response.ok) {
              window.location.href = '/login';  // Redirect to login page after successful logout
          } else {
              // Handle logout error
              console.log('Logout failed');
          }
      })
      .catch(error => {
          // Handle logout error
          console.log('Logout failed:', error);
      });
}

//validates certificate

function showValidation(event) {
  event.preventDefault();
  
  var UCN = document.getElementById("UCN").value.trim();
  var validationText = document.getElementById("validationText");

  fetch('/validate_ucn', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UCN: UCN })
  })
  .then(response => response.json())
  .then(data => {
      if (data.valid) {
          validationText.textContent = "Certificate is Valid";
          validationText.style.backgroundColor = "#5eb85c";
      } else {
          validationText.textContent = "Certificate is Invalid";
          validationText.style.backgroundColor = "#e61e2a";
      }
  })
  .catch(error => {
      console.log('Error:', error);
  });
}