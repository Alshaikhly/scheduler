import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


  const promiseDays = axios.get('/api/days')
  const promiseAppointments = axios.get('/api/appointments')
  const promiseInterviewers = axios.get('/api/interviewers')

  useEffect(() => {
   Promise.all([
     promiseDays,
     promiseAppointments,
     promiseInterviewers
   ]).then((all) => {
     setState(prev => ({days: all[0].data, day:[], appointments: all[1].data, interviewers: all[2].data}))
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

    const spotsDecrease = () => {
      const daysArr = [...state.days]
      daysArr.map(day => {
        for(let appointment of day.appointments) {
          if (appointment === id) {
            day.spots--;
          }
        }
        
      })
      return daysArr;
    }
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        spotsDecrease()
        setState({...state, appointments});
      })
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
        
      })
      return daysArr;
    } 
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        spotsIncrease()
        setState({...state, appointments})
      })
    
  }

  return {state, setDay, bookInterview, cancelInterview}
}