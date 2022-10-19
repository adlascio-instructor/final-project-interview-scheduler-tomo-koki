import React, { useEffect, useState } from "react";
import "./App.scss";
import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
import axios from "axios";
import io from "socket.io-client";

export default function Application() {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState({});
  const [appointments, setAppointments] = useState({});
  const [availableInterviewers, setAvailableInterviewers] = useState([]);
  const socket = io.connect("http://localhost:8000");

  useEffect(() => {
    const getDays = async () => {
      await axios
        .get(`/day`)
        .then((res) => {
          setDays(res.data);
        })
        .catch((err) => {
          console.error("ERROR", err);
        });
    };

    const getSpots = async () => {
      await axios
        .get(`/appointment`)
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => {
          console.error("ERROR", err);
        });
    };

    getDays();
    getSpots();
  }, []);

  useEffect(() => {
    axios.get(`/interviews/day/${day}`).then((response) => {
      setAppointments(response.data);
    });
    axios.get(`/available/interviewers/day/${day}`).then((response) => {
      setAvailableInterviewers(response.data);
    });
  }, [day]);

  function bookInterview(id, interview) {
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

  useEffect(() => {
    socket.on("received_message", (data) => {
      bookInterview(data.id, data.interview);
      return () => {
        socket.off("received_message");
      };
    });
    socket.on("received_delete", (data) => {
      cancelInterview(data.id);
      return () => {
        socket.off("received_delete");
      };
    });
  }, [appointments]);

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
            bookInterview={(interview) => {
              socket.emit("book", { id: appointment.id, interview });
            }}
            cancelInterview={(id) => {
              cancelInterview(appointment.id);
              socket.emit("delete", { id });
            }}
            availableInterviewers={availableInterviewers}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
