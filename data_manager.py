from database_common import connection_handler
from psycopg2.extras import RealDictCursor
from psycopg2 import sql
from flask import session


@connection_handler
def get_highscore(cursor,):
    query = """
        SELECT username, score
        FROM scores
        ORDER BY score DESC;
        """
    cursor.execute(query)
    return cursor.fetchall()


@connection_handler
def user_data_to_db(cursor, username, password):
    query = """
        INSERT INTO scores (username, pw, score)
        VALUES(%s, %s, 0)
        """
    cursor.execute(query, (username, password))

@connection_handler
def get_user_data(cursor, username):
    query = """
    SELECT pw
    FROM scores
    WHERE username = %s;"""

    cursor.execute(query, (username,))
    return cursor.fetchone()

@connection_handler
def save_score_to_db(cursor, user_score, username, high_score):
    query = """
    INSERT INTO scores (score)
    VALUES (%s)
    WHERE username = %s AND score < %s"""

    cursor.execute(query, (user_score, username, high_score))


@connection_handler
def get_user_score(cursor, username):
    query = """
    SELECT score
    FROM scores
    WHERE username = %s;"""

    cursor.execute(query, (username,))
    return cursor.fetchone()['score']





# @connection_handler
# def add_question(cursor: RealDictCursor, title: str, message: str, file: str):
#     timestamp = datetime.now().replace(microsecond=0)
#     query = """
#         INSERT INTO question(submission_time, view_number, vote_number, title, message, image, user_id)
#         VALUES (%(timestamp)s, 0, 0, %(title)s, %(message)s, %(file)s, %(user_id)s);
#         UPDATE user_list
#         SET questions_number = questions_number +1
#         WHERE id = %(user_id)s;
#         """
#     args = {'timestamp': timestamp,
#             'title': title,
#             'message': message,
#             'file': file,
#             'user_id': session['user_id']
#             }
#     cursor.execute(query, args)


