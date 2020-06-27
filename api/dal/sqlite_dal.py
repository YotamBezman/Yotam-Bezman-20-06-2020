import os
import sqlite3
import uuid
from datetime import datetime


class SqliteDal:
    def __init__(self, uri="data.db"):
        if os.path.exists(uri):
            os.remove(uri)

        self.__uri = uri
        self.__connection = sqlite3.connect(uri)

        with self.__connection:
            self.__connection.execute("CREATE TABLE Users(id text primary key, username text, password text)")
            self.__connection.execute("CREATE TABLE Messages(id text primary key, content text, subject text,"
                                      " sender_id text,"
                                      " receiver_id text,"
                                      " creation_date text,"
                                      " foreign key(sender_id) references Users(id), "
                                      " foreign key(receiver_id) references Users(id))")

    def __get_connection(self):
        connection = sqlite3.connect(self.__uri)
        connection.row_factory = sqlite3.Row

        return connection

    def __query(self, query: str):
        with self.__get_connection() as connection:
            for result in connection.execute(query).fetchall():
                yield dict(zip(result.keys(), result))

    def get_sent_messages(self, sender_id: str):
        results = self.__query(f"SELECT m.id as id, content, subject, receiver_id, creation_date as date FROM Messages m "
                               f"JOIN Users u ON m.sender_id == '{sender_id}' AND"
                               f" m.sender_id == u.id")

        for result in results:
            user = self.get_user_by_id(result["receiver_id"])
            yield {
                **result,
                "to": user["username"]
            }

    def get_received_messages(self, receiver_id: str):
        results = self.__query(f"SELECT m.id as id, content, subject, sender_id, creation_date as date FROM Messages m "
                               f"JOIN Users u ON m.receiver_id == '{receiver_id}' AND"
                               f" m.receiver_id == u.id")

        for result in results:
            user = self.get_user_by_id(result["sender_id"])
            yield {
                **result,
                "from": user["username"]
            }

    def get_user(self, username: str):
        results = list(self.__query(f"SELECT * FROM Users WHERE Users.username == '{username}'"))

        if results:
            return results[0]

    def get_user_by_id(self, user_id: str):
        results = list(self.__query(f"SELECT * FROM Users WHERE Users.id == '{user_id}'"))

        if results:
            return results[0]

    def add_user(self, username, password):
        with self.__get_connection() as connection:
            connection.execute(f"INSERT INTO Users(id, username, password)"
                               f" VALUES('{uuid.uuid4()}', '{username}', '{password}')")

    def add_message(self, sender_id, receiver_id, content, subject):
        with self.__get_connection() as connection:
            connection.execute(f"INSERT INTO Messages(id, content, subject, sender_id, receiver_id, creation_date)"
                               f"VALUES('{uuid.uuid4()}', '{content}', '{subject}', '{sender_id}', '{receiver_id}', "
                               f"'{datetime.now()}')")

    def delete_message(self, message_id):
        with self.__get_connection() as connection:
            connection.execute(f"DELETE FROM Messages WHERE Messages.id == '{message_id}'")
