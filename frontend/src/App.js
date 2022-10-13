import React, { useState, useEffect } from "react";
import "./App.scss";
import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
import daysData from "./components/__mocks__/days.json";
import axios from "axios";

export default function Application() {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState(daysData);
  const [appointments, setAppointments] = useState("");
  const [availableInterviewers, setAvailableInterviewers] = useState([]);

  useEffect(() => {
    axios.get(`/interviews/day/${day}`).then((response) => {
      setAppointments(response.data);
    });
    axios.get(`/available/interviewers/day/${day}`).then((response) => {
      setAvailableInterviewers(response.data);
    });
  }, [day]);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const isEdit = appointments[id].interview;
    setAppointments((prev) => {
      const appointment = {
        ...prev[id],
        interview: { ...interview },
      };
      const appointments = {
        ...prev,
        [id]: appointment,
      };
      return appointments;
    });
    if (!isEdit) {
      setDays((prev) => {
        const updatedDay = {
          ...prev[day],
          spots: prev[day].spots - 1,
        };
        const days = {
          ...prev,
          [day]: updatedDay,
        };
        return days;
      });
    }
  }
  function cancelInterview(id) {
    setAppointments((prev) => {
      const updatedAppointment = {
        ...prev[id],
        interview: null,
      };
      const appointments = {
        ...prev,
        [id]: updatedAppointment,
      };
      return appointments;
    });
    setDays((prev) => {
      const updatedDay = {
        ...prev[day],
        spots: prev[day].spots + 1,
      };
      const days = {
        ...prev,
        [day]: updatedDay,
      };
      return days;
    });
  }
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (
          <Appointment
            key={appointment.id}
            {...appointment}
            bookInterview={(interview) =>
              bookInterview(appointment.id, interview)
            }
            cancelInterview={cancelInterview}
            availableInterviewers={availableInterviewers}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
