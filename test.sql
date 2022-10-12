SELECT interview.id, interview.student, interview.interviewer_id, interview.appointment_id FROM interview
      LEFT JOIN interviewer ON  interview.interviewer_id = interviewer.id
      LEFT JOIN appointment ON  interview.appointment_id = appointment.id
      LEFT JOIN day ON  appointment.day_id = day.id
      WHERE day.id = 1;
