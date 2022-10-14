SELECT * FROM available_interviewer;
--       LEFT JOIN interviewer ON  interview.interviewer_id = interviewer.id
--       LEFT JOIN appointment ON  interview.appointment_id = appointment.id
--       LEFT JOIN day ON  appointment.day_id = day.id
--       WHERE day.id = 1;

-- SELECT appointment.id, appointment.time AS time, interview.student AS student, interviewer.id, interviewer.name AS name, interviewer.avatar AS avatar FROM interviewer
-- LEFT JOIN interview ON interview.interviewer_id = interviewer.id
-- LEFT JOIN appointment ON interview.appointment_id = appointment.id
-- WHERE appointment.day_id = 1;

-- "id": 2,
--     "time": "1pm",
--     "interview": {
--       "student": "Lydia Miller-Jones",
--       "interviewer": {
--         "id": 3,
--         "name": "Sylvia Palmer",
--         "avatar": "https://i.imgur.com/LpaY82x.png"


-- SELECT appointment.id, appointment.time, interview.student, interviewer.id, interviewer.name, interviewer.avatar  FROM appointment
-- LEFT JOIN interview ON appointment.id = interview.appointment_id
-- LEFT JOIN interviewer ON interviewer.id = interview.interviewer_id
-- WHERE appointment.day_id = 1
-- ORDER BY appointment.id;

<<<<<<< HEAD
-- DELETE FROM available_interviewer;
=======
-- SELECT appointment.id, appointment.time, interview.student, interviewer.id, interviewer.name, interviewer.avatar  FROM appointment
-- LEFT JOIN interview ON appointment.id = interview.appointment_id
-- LEFT JOIN interviewer ON interviewer.id = interview.interviewer_id
-- WHERE appointment.day_id = 1
-- ORDER BY appointment.id;

-- DELETE FROM available_interviewer;

-- INSERT INTO interview (id, student, interviewer_id, appointment_id) VALUES (8, 'Arthur', 2, 18);

-- DELETE FROM interview where id = 7;
>>>>>>> 3dcc2119b1e3ba85cf6778f4381826c676ace44c
