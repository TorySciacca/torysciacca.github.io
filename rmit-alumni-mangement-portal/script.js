let baseURL = 'https://itsec-backend.herokuapp.com';

function refreshPage() {
    location.reload();
  }  

// Function to handle logout
function logout() {
    // Redirect to the login.html page
    window.location.href = 'login.html';
}

// Login Function
function login() {
    const usernameOrEmail = document.getElementById('username_email').value;
    const password = document.getElementById('password').value;

    const data = {
        username: usernameOrEmail,
        password: password
    };

    fetch(baseURL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 200) {
            // User logged in successfully, perform actions
            return response.json();
        } else {
            throw new Error('Invalid username or password');
        }
    })
    .then(result => {
        // Redirect to the user.html page with the username
        window.location.href = 'user.html?username=' + usernameOrEmail;
    })
    .catch(error => {
        // Handle error or invalid credentials
        console.error('Error:', error);
        const errorElement = document.querySelector('.error');
        errorElement.textContent = 'Invalid username or password';
    });
}

  // Register Function
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const data = {
      username: username,
      password: password,
      user_type: 'alumni'
    };
  
    fetch(baseURL + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 201) {
          // User registered successfully
          return response.json();
        } else if (response.status === 409) {
          throw new Error('Username already exists');
        } else {
          throw new Error('Invalid request');
        }
      })
      .then(result => {
        // Handle successful registration response
        // Redirect or perform any necessary actions
        console.log(result.message);
        window.location.href = 'login.html';
      })
      .catch(error => {
        // Handle error or invalid request
        console.error('Error:', error);
        const errorElement = document.querySelector('.error');
        errorElement.textContent = error.message;
      });
  }

  function getUser(username) {
    fetch(baseURL + `/user?username=${username}`, {
        method: 'GET'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to retrieve user data.');
        }
    })
    .then(data => {
        // Handle retrieved user data
        console.log(data);
        const userDetails = document.getElementById('user-details');
        userDetails.textContent = `Username: ${data.username}`;
        const transcriptBtn = document.getElementById('transcriptBtn');
        const certificateBtn = document.getElementById('certificateBtn');

        if (data.transcript_link === null) {
					transcriptBtn.disabled = true;
			} else {
					transcriptBtn.disabled = false;
					transcriptBtn.addEventListener('click', () => {
							downloadImage(data.transcript_link);
					});
			}

			if (data.graduate_certificate_link === null) {
					certificateBtn.disabled = true;
			} else {
					certificateBtn.disabled = false;
					certificateBtn.addEventListener('click', () => {
							downloadImage(data.graduate_certificate_link);
					});
			}
	})
    .catch(error => {
        console.error(error.message);
    });
}

function downloadImage(imageURL) {
  const link = document.createElement('a');
    link.href = data.transcript_link;
    link.download = 'transcript.png';
    link.click();
}

//update users in database
function updateUser(username, transcriptLink, graduateCertificateLink, uniqueCertificateNumber) {
  const data = {
    username: username,
    transcript_link: transcriptLink,
    graduate_certificate_link: graduateCertificateLink,
    unique_certificate_number: uniqueCertificateNumber
  };

  fetch(baseURL +'/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update user.');
      }
    })
    .then(result => {
      console.log(result.message);
      // Handle successful update
    })
    .catch(error => {
      console.error(error.message);
      // Handle error
    });
}

function showValidation(event) {
  event.preventDefault();

  var UCN = document.getElementById("UCN").value;

  fetch(baseURL + `/verify?ucn=${UCN}`, {
    method: 'GET'
  })
  .then(response => {
    if (response.status === 200) {
      document.getElementById("validationText").textContent = "Certificate is Valid";
      document.getElementById("validationText").style.backgroundColor = "#5eb85c";
    } else {
      document.getElementById("validationText").textContent = "Certificate is Invalid";
      document.getElementById("validationText").style.backgroundColor = "#e61e2a";
    }
  })
  .catch(error => {
    console.error(error);
    document.getElementById("validationText").textContent = "An error has occured";
    document.getElementById("validationText").style.backgroundColor = "#fff";
  });
}