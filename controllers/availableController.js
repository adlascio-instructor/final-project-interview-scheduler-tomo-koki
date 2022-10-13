require('dotenv').config();

const { Pool } = require('pg');

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const getAvailableInterviews = (req, res) => {
  const pool = new Pool(dbCredentials);
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
};

module.exports = {
  getAvailableInterviews,
};
