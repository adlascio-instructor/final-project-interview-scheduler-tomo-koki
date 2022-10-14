CREATE TABLE appointment (
	id serial PRIMARY KEY,
	time TEXT,
  day_id integer REFERENCES day(id)
);
