-- SELECT day.id, name, time, COUNT (name) AS spot
--       FROM day
--       LEFT JOIN appointment
--       ON appointment.day_id = day.id
--       GROUP BY day.id , appointment.time, name;

SELECT day.id, day.name, COUNT (time)::INT AS spots
FROM appointment
LEFT JOIN day
ON appointment.day_id = day.id
GROUP BY  day.id, day.name;
