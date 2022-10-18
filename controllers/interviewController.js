require('dotenv').config();

const { Pool } = require('pg');

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const getInterviews = (req, res) => {
  const pool = new Pool(dbCredentials);
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
};

const addInterview = (req, res) => {
  const pool = new Pool(dbCredentials);
  // console.log(req.body);
  const id = req.body.id;
  const student = req.body.interview.student;
  const interviewer = req.body.interview.interviewer;
  // pool
  //   .query(
  //     `INSERT INTO interview (id, student, interviewer_id, appointment_id) VALUES (9,${student}, ${interviewer.id}, ${id});`
  //   )
  //   .then((result) => result.rows)
  //   .catch((err) => console.log('err', err))
  //   .finally(() => pool.end());
};

module.exports = {
  getInterviews,
  addInterview,
};
