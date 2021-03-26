\c postgres
CREATE DATABASE journals;
\c journals

create table users (
    id NUMBER,
    PRIMARY KEY (id),
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

create table journals (
    id SERIAL PRIMARY KEY,
    u_id SERIAL FOREIGN KEY,
    entryId SERIAL FOREIGN KEY
);

create table journalEntries (
    journalID FOREIGN KEY,
    publicity BOOLEAN NOT NULL,
    category TEXT,
    date_created DATE,
    entry_body TEXT NOT NULL,
    last_modified DATE,
    activity_level INT NOT NULL,
    engagement_level INT NOT NULL,
    published BOOLEAN
);
