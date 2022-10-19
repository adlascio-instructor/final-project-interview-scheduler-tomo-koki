CREATE TABLE day (id SERIAL PRIMARY KEY, name TEXT); 
CREATE TABLE interviewer (id SERIAL PRIMARY KEY, name TEXT, avatar TEXT ); 
CREATE TABLE appointment (id SERIAL PRIMARY KEY, time TEXT, day_id INTEGER REFERENCES day(id));
CREATE TABLE interview (id SERIAL PRIMARY KEY, student TEXT, interviewer_id INTEGER REFERENCES interviewer(id), appointment_id INTEGER REFERENCES appointment(id));
CREATE TABLE available_interviewer (id SERIAL PRIMARY KEY, name TEXT, interviewer_id INTEGER REFERENCES interviewer(id), day_id INTEGER REFERENCES day(id)); 
