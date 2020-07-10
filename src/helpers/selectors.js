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

export function getInterview(state, interview) {
  console.log(interview)
  return (interview && {...interview, interviewer: state.interviewers[interview.interviewer]})

}