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


