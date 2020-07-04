import uuid
from datetime import datetime, timedelta
from functools import wraps

import jwt
import sqlite3
from dal import SqliteDal
from flask import Flask, jsonify, request, make_response, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["SECRET_KEY"] = str(uuid.uuid4())
CORS(app)
dal = SqliteDal()


def data_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        data = request.get_json()

        if data:
            return func(data, *args, **kwargs)

        return make_response("Missing parameters!", 401)

    return decorated


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        if "x-access-token" in request.headers:
            token = request.headers["x-access-token"]

            try:
                data = jwt.decode(token, app.config["SECRET_KEY"])
                user = dal.get_user_by_id(data["user_id"])

                if user:
                    return func(user, *args, **kwargs)

                return make_response("Token is invalid!", 401)
            except Exception as e:
                return make_response("Token is invalid!", 401)

        return make_response("Token is missing", 401)

    return decorated


@app.route("/")
def get_index():
    return send_from_directory("", 'assets/index.html')


@app.route("/<path:path>", methods=["GET"])
def get_index_script(path):
    return send_from_directory("", f"assets/{path}")


@app.route("/get-messages", methods=["GET"])
@token_required
def get_messages(current_user):
    return jsonify({
        "sent_messages": list(dal.get_sent_messages(current_user["id"])),
        "received_messages": list(dal.get_received_messages(current_user["id"]))
    })



@app.route("/write-message", methods=["POST"])
@data_required
@token_required
def write_message(current_user, data):
    sender_name = data["sender"]
    receiver_name = data["receiver"]

    sender = dal.get_user(sender_name)
    receiver = dal.get_user(receiver_name)

    if sender and receiver and sender["id"] == current_user["id"]:
        dal.add_message(sender["id"], receiver["id"],
                        data["content"], data["subject"])

        return jsonify({
            "Message": "Success!"
        })

    return make_response("Invalid sender or receiver!", 401)


@app.route("/delete-message", methods=["DELETE"])
@data_required
@token_required
def delete_message(current_user, data):
    if "message_id" in data:
        dal.delete_message(data["message_id"])

        return jsonify({
            "Message": "Success"
        })

    return make_response("Missing Message ID!", 401)


@app.route("/signup", methods=["POST"])
@data_required
def signup(user):
    if not user["username"] or not user["password"]:
        return make_response("Missing parameters", 403)

    try:
        dal.add_user(user["username"], generate_password_hash(user["password"]))
    except sqlite3.IntegrityError:
        return make_response("Username is occupied", 403)

    return jsonify({
        "Message": "Success!"
    })


@app.route("/login", methods=["POST"])
@data_required
def login(creds):
    if not creds["username"] or not creds["password"]:
        return make_response("Could not verify!", 401)

    user = dal.get_user(creds["username"])

    if not user or not check_password_hash(user["password"], creds["password"]):
        return make_response("Verification Failed!", 401)

    token = jwt.encode({
        "user_id": user["id"],
        "exp": datetime.utcnow() + timedelta(minutes=15)
    }, app.config["SECRET_KEY"])

    return jsonify({
        "token": token.decode("utf-8")
    })


def main():
    app.run(host="0.0.0.0", port=80)


if __name__ == "__main__":
    main()
