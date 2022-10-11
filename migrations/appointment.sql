CREATE TABLE appointment (
	id serial PRIMARY KEY,
	time TIMESTAMP,
  day_id integer REFERENCES day(id)
);
