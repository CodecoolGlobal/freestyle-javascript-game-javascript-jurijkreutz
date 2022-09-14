import bcrypt


def hash_password(origin_password):
    # By using bcrypt, the salt is saved into the hash itself
    hashed_bytes = bcrypt.hashpw(origin_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')
