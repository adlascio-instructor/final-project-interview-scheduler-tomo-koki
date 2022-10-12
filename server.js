const express = require("express");
const app = express();
const port = 8000;
const { Pool } = require("pg");

app.get("/interviews/day/:id", (req, res) => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "final_project",
    password: "Majiro0130!",
    port: 5432,
  });
  pool
    .query(
      `SELECT interview.id, interview.student, interview.interviewer_id, interview.appointment_id FROM interview
      LEFT JOIN interviewer ON  interview.interviewer_id = interviewer.id
      LEFT JOIN appointment ON  interview.appointment_id = appointment.id
      LEFT JOIN day ON  appointment.day_id = day.id
      WHERE day.id = ${req.params.id};`
    )
    .then((result) => result.rows)
    .then((interviewer) => res.json(interviewer))
    .catch((err) => console.log("err"))
    .finally(() => pool.end());
});

app.get("/available/interviewers/:id", (req, res) => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "final_project",
    password: "Majiro0130!",
    port: 5432,
  });
  pool
    .query(
      `SELECT interviewer.id, interviewer.name, interviewer.avatar FROM interviewer
      LEFT JOIN available_interviewer ON  interviewer.id = available_interviewer.interviewer_id
      LEFT JOIN day ON  available_interviewer.day_id = day.id
      WHERE day.id = ${req.params.id};`
    )
    .then((result) => result.rows)
    .then((available_interviewer) => res.json(available_interviewer))
    .catch((err) => console.log("err"))
    .finally(() => pool.end());
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
