require('dotenv').config();

const { Pool } = require('pg');

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const getDays = (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query(
      `SELECT day.id, day.name, COUNT (time)::INT AS spots
      FROM appointment
      LEFT JOIN day
      ON appointment.day_id = day.id
      GROUP BY  day.id, day.name
      ORDER BY day.id;
      `
    )
    .then((res) => {
      const daysList = res.rows.reduce(
        (days, day) => ({ ...days, [day.name]: day }),
        {}
      );
      return daysList;
    })
    .then((days) => res.json(days))
    .catch((err) => console.log('ERROR', err))
    .finally(() => pool.end());
};

module.exports = {
  getDays,
};
