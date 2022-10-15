require('dotenv').config();

const { Pool } = require('pg');

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const getAppointment = async (req, res) => {
  const pool = new Pool(dbCredentials);

  pool
    .query(
      `
    SELECT * FROM appointment
    JOIN interview
    ON appointment.id = interview.appointment_id
    JOIN interviewer
    ON interview.interviewer_id = interviewer.id
    `
    )
    .then((data) => {
      const appointmentList = data.rows.map((interview) => ({
        [interview.id]: {
          id: interview.id,
          time: interview.time,
          interview: {
            student: interview.student,
            interviewer: {
              id: interview.interviewer_id,
              name: interview.name,
              avatar: interview.avatar,
            },
          },
        },
      }));

      const appointmentsData = appointmentList.reduce(
        (interviews, interview) => ({
          ...interviews,
          ...interview,
        })
      );
      return appointmentsData;
    })
    .then((appointments) => res.json(appointments))
    .catch((err) => console.log('ERROR', err))
    .finally(() => pool.end());
};

module.exports = {
  getAppointment,
};
