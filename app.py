from crypt import methods
from boggle import Boggle
from flask import Flask, jsonify, render_template, session, request

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"


@app.route("/")
def base_html():
    board = boggle_game.make_board()
    session['board'] = board

    return render_template("base.html", board=board)


@app.route("/check_valid_word")
def check_valid_word():
    word = request.args["guess"]
    board = session['board']
    response = boggle_game.check_valid_word(board, word)

    return jsonify({"result": response})
