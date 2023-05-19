import sqlite3
import bcrypt
from flask import Flask, render_template, request, session, redirect, url_for, g, jsonify, request, send_file

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Database initialization
DATABASE = 'backend.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Home page
@app.route('/')
def home():
    return render_template('login.html')

# Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username_email = request.form.get('username_email').strip()
        password = request.form.get('password').strip()

        if username_email and password:
            conn = sqlite3.connect('backend.db')
            cursor = conn.cursor()

            # Check if the input matches either the username or email in the database
            cursor.execute("SELECT username, password FROM users WHERE username = ? OR email = ?", (username_email, username_email))
            result = cursor.fetchone()

            if result:
                stored_username, stored_password = result

                if bcrypt.checkpw(password.encode('utf-8'), stored_password):
                    session['username'] = stored_username
                    conn.close()
                    return redirect(url_for('dashboard'))
                else:
                    error = 'Invalid password'
            else:
                error = 'User does not exist'

            conn.close()
            return render_template('login.html', error=error, username_email=username_email)

    return render_template('login.html')
# Registration page
@app.route('/register', methods=['GET', 'POST'])
def register():
    db = get_db()
    cursor = db.cursor()
    if request.method == 'POST':
        name = request.form['Name']
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Check if username or email already exists in the database
        cursor.execute("SELECT username, email FROM users WHERE username = ? OR email = ?", (username, email))
        existing_user = cursor.fetchone()
        if existing_user:
            error = 'Username or email already exists. Please choose a different username or email.'
            return render_template('register.html', error=error)

        # If username and email do not exist, proceed with registration
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

        cursor.execute("INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)",
                       (name, username, email, hashed_password))
        db.commit()
        return redirect(url_for('login'))

    return render_template('register.html')

# Dashboard page
@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        username = session['username']
        conn = sqlite3.connect('backend.db')
        cursor = conn.cursor()
        cursor.execute("SELECT name, username FROM users WHERE username = ?", (username,))
        result = cursor.fetchone()
        if result:
            name, username = result
            conn.close()
            return render_template('dashboard.html', name=name, username=username)

    return redirect(url_for('login'))

@app.route('/organisation')
def organisation():
    return render_template('organisation.html')

# Logout
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/validate_ucn', methods=['POST'])
def validate_ucn():
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    ucn = data.get('UCN')

    cursor.execute("SELECT username FROM users WHERE username = ?", (ucn,))
    result = cursor.fetchone()

    return jsonify({'valid': result is not None})

# Run the application
if __name__ == '__main__':
    app.run(debug=True)