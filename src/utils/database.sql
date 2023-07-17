-- CREATE DATABASE templehs;

-- CREATE TABLE personnel(
--  personnel_id SERIAL PRIMARY KEY INTEGER,
--   personnel_email VARCHAR(255) NOT NULL,
--   personnel_visitType VARCHAR(255) NOT NULL,
--   personnel_image VARCHAR(1000) NOT NULL,
--   personnel_description VARCHAR(1000) NOT NULL,
--   personnel_jobType VARCHAR(355) NOT NULL
--   availability_id INTEGER REFERENCES availability (ava_id)
-- );

-- CREATE TABLE availability (
--   ava_id SERIAL PRIMARY KEY,
--   personnel_id INTEGER REFERENCES personnel (personnel_id),
--   ava_time JSONB
-- );

-- CREATE TABLE appointment (
--   appoint_id SERIAL PRIMARY KEY,
--   ava_id INTEGER REFERENCES availability (ava_id),
--   user_id INTEGER 
-- );
