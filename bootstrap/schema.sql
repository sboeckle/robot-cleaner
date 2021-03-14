CREATE TABLE IF NOT EXISTS executions (
    id serial PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    commmands INTEGER NOT NULL,
    result INTEGER NOT NULL,
    duration DECIMAL NOT NULL
);