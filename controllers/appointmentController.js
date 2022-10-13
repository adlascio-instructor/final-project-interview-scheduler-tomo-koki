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
    .query('SELECT * FROM appointment WHERE day_id = 2')
    .then((appointments) => res.json(appointments.rows))
    .catch((err) => console.log('ERROR', err))
    .finally(() => pool.end());
};

module.exports = {
  getAppointment,
};
