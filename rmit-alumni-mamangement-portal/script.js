let baseURL = 'http://itsec-backend.herokuapp.com/';

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
        }
        else{
          transcriptBtn.disabled = false;
        }

        if (data.graduate_certificate_link === null) {
            certificateBtn.disabled = true;
        }
        else{
          certificateBtn.disabled = false;
        }
    })
    .catch(error => {
        console.error(error.message);
    });
}
window.addEventListener('DOMContentLoaded', function() {
    // Retrieve the username from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    // Call the get_user() function with the retrieved username
    getUser(username);
});
