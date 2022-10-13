-- SELECT interview.id, interview.student, interview.interviewer_id, interview.appointment_id FROM interview
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

DELETE FROM available_interviewer;