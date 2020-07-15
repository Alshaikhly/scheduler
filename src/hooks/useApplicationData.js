import { useState, useEffect } from "react";
import axios from 'axios';


// this function creates all the main states for our application and keeps track of their history

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


  const promiseDays = axios.get('/api/days');
  const promiseAppointments = axios.get('/api/appointments');
  const promiseInterviewers = axios.get('/api/interviewers');

  useEffect(() => {
   Promise.all([
     promiseDays,
     promiseAppointments,
     promiseInterviewers
   ]).then((all) => {
     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
   })
  },[]);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // this function is called after we get a positive feedback from the server request to decrease the number of spots
    const spotsDecrease = () => {
      const daysArr = [...state.days]
      daysArr.map(day => {
        for(let appointment of day.appointments) {
          if (appointment === id) {
            day.spots--;
          };
        };
        
      });
      return daysArr;
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        spotsDecrease()
        setState({...state, appointments});
      });
  };

  // this function was created to avoid decreasing the spots after a confirmed edit
  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({...state, appointments});
      });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spotsIncrease = () => {
      const daysArr = [...state.days]
      daysArr.map(day => {
        for(let appointment of day.appointments) {
          if (appointment === id) {
            day.spots++;
          }
        }
        
      });
      return daysArr;
    };
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        spotsIncrease()
        setState({...state, appointments})
      });
    
  };

  return {state, setDay, bookInterview, cancelInterview, editInterview};
};