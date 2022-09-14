from flask import Flask, request, redirect, url_for, render_template, session, request
import json

app = Flask(__name__)


@app.route("/")
def main():

    return render_template('index.html')

    score_data = data_manager.get_highscore()
    return render_template('score_test.html', score_data=score_data)


@app.route("/register")
def register():
    return render_template('register.html')


@app.route("/game")
def game():
    return render_template('game.html')


@app.route("/save_score", methods=['GET', 'POST'])
def save_score():
    data = request.data.decode('utf8')
    score = json.loads(data).get('score')
    print(score)
    return render_template('game.html')


if __name__ == "__main__":
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )


