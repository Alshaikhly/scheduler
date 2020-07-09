export function getAppointmentsForDay(state, day) {
  let appointmentsArray = []
  const appointmentData = []
  const days = state.days.map(dayObj => {
    if (dayObj.name === day) {
      appointmentsArray = dayObj.appointments
    }
  })
  for(let appointment of appointmentsArray) {
    for(const [key,value] of Object.entries(state.appointments)) {
      if (appointment == key) {
        appointmentData.push(value)
      }

    }
       
  }
  
  return appointmentData;
}