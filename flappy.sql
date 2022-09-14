DROP TABLE IF EXISTS public.scores;
CREATE TABLE scores (
    id serial NOT NULL,
    username text,
    pw text,
    score integer
);