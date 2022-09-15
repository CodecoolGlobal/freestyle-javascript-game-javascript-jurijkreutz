from flask import Flask, request, redirect, url_for, render_template, session, request
import json

import data_manager
import password_worktool

app = Flask(__name__)
app.secret_key = b'\x1c\xee\r*\xfb?\xdc\xa3\xa5b$\x7f\x1d\xf2q.'



@app.route("/")
def index():
    username = None
    if "username" in session:
        username = session['username']

    return render_template('index.html', username=username)

    # score_data = data_manager.get_highscore()
    # return render_template('score_test.html', score_data=score_data)



@app.route("/login")
def login():
    return render_template('login.html')


@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == "GET":
        return render_template('register.html')

    if request.method == "POST":
        username = request.form["name"]
        password = request.form["password"]
        password_hashed = password_worktool.hash_password(password)
        data_manager.user_data_to_db(username, password_hashed)
        session["username"] = username
        print(session["username"])

        return redirect('/')


@app.route("/game")
def game():
    return render_template('game.html')


@app.route("/save_score", methods=['GET', 'POST'])
def save_score():
    data = request.data.decode('utf8')
    score = json.loads(data).get('score')
    print(score)
    return render_template('game.html')

@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )


