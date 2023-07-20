CREATE DATABASE templhs;

CREATE TABLE personnel (
  personnel_id SERIAL PRIMARY KEY,
  personnel_fullName VARCHAR(255) NOT NULL,
  personnel_email VARCHAR(255) NOT NULL,
  personnel_description TEXT NOT NULL,
  personnel_jobType VARCHAR(150) NOT NULL,
  personnel_position VARCHAR(150) NOT NULL,
  personnel_visitType VARCHAR(100) NOT NULL,
  personnel_image VARCHAR(255) NOT NULL
);


CREATE TABLE availability (
  availability_id SERIAL PRIMARY KEY,
  personnel_id INTEGER NOT NULL,
  ava_time JSONB NOT NULL,

  FOREIGN KEY (personnel_id) REFERENCES personnel (personnel_id)
);


CREATE TABLE appointment (
  appointment_id SERIAL PRIMARY KEY,
  availability_id INTEGER NOT NULL,
  patient_id INTEGER NOT NULL,
  FOREIGN KEY (personnel_id) REFERENCES personnel (personnel_id)
);
