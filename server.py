from flask import Flask, request, redirect, url_for, render_template, session, request, flash
import json

import data_manager
import password_worktool

app = Flask(__name__)
app.secret_key = b'\x1c\xee\r*\xfb?\xdc\xa3\xa5b$\x7f\x1d\xf2q.'



@app.route("/")
def index():
    score = None
    username = None
    if "username" in session:
        username = session['username']
        score = data_manager.get_user_score(username)
    return render_template('index.html', username=username, score=score)


@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == "GET":
        return render_template('register.html')
    if request.method == "POST":
        username = request.form["name"]
        password = request.form["password"]
        list_usernames = data_manager.get_user_names_list()
        if username not in list_usernames:
            password_hashed = password_worktool.hash_password(password)
            data_manager.user_data_to_db(username, password_hashed)
            session["username"] = username
            flash("Registered succesfully")
            return redirect('/')
        else:
            flash("This username is already taken")
            return redirect(url_for('register'))


@app.route("/game")
def game():
    high_scores = data_manager.get_highscore()
    return render_template('game.html', high_scores=high_scores)


@app.route("/scorelist")
def scorelist():
    high_scores = data_manager.get_highscore()
    return render_template('score_test.html', high_scores=high_scores)


@app.route("/save_score", methods=['GET', 'POST'])
def save_score():
    data = request.data.decode('utf8')
    score = json.loads(data).get('score')
    if "username" in session:
        username = session['username']
        db_score = data_manager.get_user_score(username)
        if db_score < score:
            data_manager.save_score_to_db(score, username)
    return render_template('game.html')


@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for("index"))


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        username = request.form['name']
        password = request.form['password']
        login_data = data_manager.get_user_data(username)
        if login_data is None:
            flash("Incorrect username, please try again")
            return redirect('/login')
        hashed_pw_from_db = login_data['pw']
        pw_is_valid = password_worktool.verify_password(password, hashed_pw_from_db)
        if pw_is_valid:
            session['username'] = username
            return redirect('/')
        else:
            flash("Incorrect password, please try again")
            return redirect(url_for('login'))


if __name__ == "__main__":
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )


