DROP TABLE IF EXISTS public.scores;
CREATE TABLE scores (
    id serial NOT NULL,
    username text,
    pw text,
    score integer
);
INSERT INTO
public.scores
(id, username, pw, score)
VALUES (DEFAULT, 'testuser', '$2a$12$RlHTldh/duzYQADU.5b5ceT77MnXcl9EOuuPeqsg2mT5SXYSeXqnW', 100)

INSERT INTO
public.scores
(id, username, pw, score)
VALUES (DEFAULT, 'another_testuser', '$2a$12$0QhLbnPETVNKuVIzo7MQoeuKLqJIjf/RvGstzu.W3TJmYguQzT7.2', 200)