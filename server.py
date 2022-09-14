from flask import Flask, request, redirect, url_for, render_template, session
import data_manager

app = Flask(__name__)


@app.route("/")
def main():
    return render_template('score_test.html')



@app.route("/game")
def game():
    return render_template('game.html')

if __name__ == "__main__":
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )


