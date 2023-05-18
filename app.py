from flask import Flask, render_template, request, redirect

app = Flask(__name__)

# Simple user database (for demonstration purposes only)
users = {
    'john': 'password123',
    'jane': 'secret456'
}

@app.route('/')
def home():
    return render_template('rmit-alumni-management-portal.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if username in users and users[username] == password:
        return f"Welcome back, {username}!"
    else:
        return "Invalid username or password. Please try again."

@app.route('/register', methods=['POST'])
def register():
    name = request.form['Name']
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']

    if username in users:
        return "Username already exists. Please choose a different username."

    # Save user information to the database or perform necessary actions
    # For demonstration purposes, we will just display the user details
    return f"Registration successful! Name: {name}, Username: {username}, Email: {email}"

if __name__ == '__main__':
    app.run(debug=True)