const express = require('express');
const app = express();
const port = 8000;

////
const dayRoute = require('./routes/dayRoute');

app.use(express.json());

app.use('/', dayRoute);
////

const { Pool } = require('pg');

app.get('/interviews/day/:name', (req, res) => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'final_project',
    password: 'Majiro0130!',
    port: 5432,
  });
  pool
    .query(
      `SELECT appointment.id, appointment.time, interview.student, interviewer.id AS interviewer_id, interviewer.name, interviewer.avatar  FROM appointment
      LEFT JOIN interview ON appointment.id = interview.appointment_id
      LEFT JOIN interviewer ON interviewer.id = interview.interviewer_id
      LEFT JOIN day ON day.id = appointment.day_id
      WHERE day.name = '${req.params.name}'
      ORDER BY appointment.id;`
    )
    .then((result) => result.rows)
    .then((interviewers) => {
      const resultJSON = {};
      interviewers.forEach((element) => {
        const newObject = {};
        newObject.id = element.id;
        newObject.time = element.time;
        if (element.student) {
          const objectInterview = {};
          objectInterview.student = element.student;
          objectInterview.interviewer = {};
          if (element.interviewer_id) {
            objectInterview.interviewer.id = element.interviewer_id;
            objectInterview.interviewer.name = element.name;
            objectInterview.interviewer.avatar = element.avatar;
          }
          newObject.interview = objectInterview;
        }
        resultJSON[element.id] = newObject;
      });
      res.json(resultJSON);
    })
    .catch((err) => console.log('err', err))
    .finally(() => pool.end());
});

app.get('/available/interviewers/day/:name', (req, res) => {
  console.log('check request', req.params.name);
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'final_project',
    password: 'Majiro0130!',
    port: 5432,
  });
  pool
    .query(
      `SELECT interviewer.id, interviewer.name, interviewer.avatar FROM interviewer
      LEFT JOIN available_interviewer ON  interviewer.id = available_interviewer.interviewer_id
      LEFT JOIN day ON  available_interviewer.day_id = day.id
      WHERE day.name = '${req.params.name}';`
    )
    .then((result) => result.rows)
    .then((available_interviewer) => res.json(available_interviewer))
    .catch((err) => console.log('err'))
    .finally(() => pool.end());
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
