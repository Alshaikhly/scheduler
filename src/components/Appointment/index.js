import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE= "CREATE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log('props.interview', props.interview)
  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={props.onAdd} />}
        {mode === SHOW && (
          <Show
            key={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
)}
      {/* {props.interview ? <Show key={props.id} student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> } */}
    </article>
  )
}