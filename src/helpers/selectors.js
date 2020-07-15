
// return an array of apointments to let us map through it and show each appointment
export function getAppointmentsForDay(state, day) {
  let appointmentsArray = []
  const appointmentData = []
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      appointmentsArray = dayObj.appointments
    }
  })
  for(let appointment of appointmentsArray) {
    for(const [key,value] of Object.entries(state.appointments)) {
      if (appointment.toString() === key) {
        appointmentData.push(value)
      }

    }
       
  }
  
  return appointmentData;
}

// return an array of interviewers to let us map through it and show each interviewer
export function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  const interviewerData = [];

  state.days.map(dayObj => {
    if (dayObj.name === day) {
      interviewersArray = dayObj.interviewers
    }
  })
  for(let interviewer of interviewersArray) {
    for(const [key,value] of Object.entries(state.interviewers)) {
      if (interviewer.toString() === key) {
        interviewerData.push(value)
      }

    }
       
  }
  return interviewerData;
}

export function getInterview(state, interview) {

  return (interview && {...interview, interviewer: state.interviewers[interview.interviewer]})

}