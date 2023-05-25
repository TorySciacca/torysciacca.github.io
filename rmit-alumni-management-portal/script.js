let baseURL = 'https://itsec-backend.herokuapp.com';

function refreshPage() {
    location.reload();
  }  

// Function to handle logout
function logout() {
  // Redirect to the login.html page
  window.location.href = 'login.html';
  clearAllStorage()
}

// Login Function
function login() {
    const usernameOrEmail = cleanUpInput(document.getElementById('username_email').value);
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
        storeEncryptedUsername(usernameOrEmail)
        window.location.href = 'user.html' //?username=' + storeEncryptedUsername(usernameOrEmail)
        //window.location.href = 'user.html?username=' + usernameOrEmail;
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
    const username = cleanUpInput(document.getElementById('username').value);
    const password = document.getElementById('password').value;
  
    try {
      validateUsername(username)
      validatePassword(password);
  
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
          alert(`${username} successfully registered`); // Alerts user to success
          window.location.href = 'login.html'; // Redirects to homepage
        })
        .catch(error => {
          // Handle error or invalid request
          console.error('Error:', error);
          const errorElement = document.querySelector('.error');
          errorElement.textContent = error.message;
        });
    } catch (error) {
      // Handle password validation error
      console.error('Error:', error);
      const errorElement = document.querySelector('.error');
      errorElement.textContent = error.message;
    }
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
        //console.log(data);
        const userDetails = document.getElementById('user-details');
        userDetails.textContent = `${data.username} ${data.name}`;
        const transcriptBtn = document.getElementById('transcriptBtn');
        const certificateBtn = document.getElementById('certificateBtn');
        storeEncryptedType(data.user_type)

        if (data.transcript_link === null || data.transcript_link === ' ') { //null or empty string, may patch out later
					transcriptBtn.disabled = true;
			} else {
					transcriptBtn.disabled = false;
					transcriptBtn.addEventListener('click', () => {
							downloadImage(data.transcript_link,'transcript',data.username);
					});
			}

			if (data.graduate_certificate_link === null || data.graduate_certificate_link === ' ') {
					certificateBtn.disabled = true;
			} else {
					certificateBtn.disabled = false;
					certificateBtn.addEventListener('click', () => {
							downloadImage(data.graduate_certificate_link,'graduate-cetificate',data.username);
					});
			}
	})
    .catch(error => {
        console.error(error.message)
        logout();
    });
}

function downloadImage(imageURL, fileType, username) {
  const fileExtension = getFileExtension(imageURL);
  const fileName = `${fileType}_${username}.${fileExtension}`;

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = fileName;
  link.click();
}

function getFileExtension(filename) {
  return filename.split('.').pop();
}
//update users in database
function updateUser(username, email, name, transcriptLink, graduateCertificateLink, uniqueCertificateNumber) {

  if (getDecryptedType() != 'admin'){
    throw new Error('WARNING: ONLY LOGGED IN ADMINS CAN USE THIS FUNCTION')
  }

  const data = {
    username: username,
    email: email,
    name: name,
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
      return response.json(); // Parse response body as JSON
    } else {
      throw new Error("Certificate is Invalid");
    }
  })
  .then(data => {
    document.getElementById("validationText").textContent = `${data.username}'s Certificate is Valid.`;
    document.getElementById("validationText").style.backgroundColor = "#5eb85c";
  })
  .catch(error => {
    console.error(error);
    document.getElementById("validationText").textContent = "This Certificate is Invalid.";
    document.getElementById("validationText").style.backgroundColor = "#e61e2a";
  });
}

function cleanUpInput(input) {
  // Convert input to lowercase
  const lowercaseInput = input.toLowerCase();
  // Remove whitespace from the input
  const cleanedInput = lowercaseInput.trim();
  return cleanedInput;
}

function validateUsername(username) {
  const usernameRegex = /^s\d+/;

  if (!usernameRegex.test(username)) {
    throw new Error('Your username must start with a "s" followed by numbers.');
  }
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{12,}$/;

  if (!passwordRegex.test(password)) {
    throw new Error('Your password must be at least 12 characters long and contain a mix of uppercase and lowercase letters, numbers, and symbols.');
  }
}

// Encrypt the username and store it in local storage
function storeEncryptedUsername(username) { 
  localStorage.removeItem('encryptedUsername') //clear if existing
  // Encrypt the username (example: simple base64 encoding)
  var encryptedUsername = btoa(username);
  
  // Store the encrypted username in local storage
  localStorage.setItem('encryptedUsername', encryptedUsername);
  return encryptedUsername
}

// Retrieve the encrypted username from local storage and decrypt it
function getDecryptedUsername() {
  // Retrieve the encrypted username from local storage
  var encryptedUsername = localStorage.getItem('encryptedUsername');
  
  if (encryptedUsername) {
    // Decrypt the username (example: base64 decoding)
    var decryptedUsername = atob(encryptedUsername);
    return decryptedUsername;
  }
  
  return null; // No encrypted username found in local storage
}

// Clear all storage (both local storage and session storage)
function clearAllStorage() {
  localStorage.clear();
  sessionStorage.clear();
}

function storeEncryptedType(type) { 
  localStorage.removeItem('encryptedType') //clear if existing
  // Encrypt the type
  var encryptedType = btoa(type);
  
  // Store the encrypted type in local storage
  localStorage.setItem('encryptedType', encryptedType);
}

// Retrieve the encrypted username from local storage and decrypt it
function getDecryptedType() {
  // Retrieve the encrypted username from local storage
  var encryptedType = localStorage.getItem('encryptedType');
  
  if (encryptedType) {
    // Decrypt the username (example: base64 decoding)
    var deencryptedType = atob(encryptedType);
    return deencryptedType;
  }
  
  return null; // No encrypted username found in local storage
}
