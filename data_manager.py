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
def save_score_to_db(cursor, user_score, username):
    query = """
    UPDATE scores
    SET score = %s
    WHERE username = %s"""

    cursor.execute(query, (user_score, username))


@connection_handler
def get_user_score(cursor, username):
    query = """
    SELECT score
    FROM scores
    WHERE username = %s;"""

    cursor.execute(query, (username,))
    return cursor.fetchone()['score']


@connection_handler
def get_user_names(cursor):
    query = """
    SELECT username
    FROM scores
    """
    cursor.execute(query)
    return cursor.fetchall()
    

def get_user_names_list():
    real_dict_row = get_user_names()
    list_usernames = []
    for row in real_dict_row:
        list_usernames.append(row['username'])
    return list_usernames