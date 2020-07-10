import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE= "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE)
  };

  function onCancel() {
    back()
  };

  function onSave() {
    transition(SAVING)
  };

  function onComplete() {
    transition(SAVING)
  };

  function onEdit() {
    transition(EDIT)
  };

  function onDelete() {
    transition(CONFIRM)
  };

  function onConfirm() {
    transition(DELETING)
  };

  function onComplete() {
    transition(EMPTY)
  };

  // console.log('props.interview', props.interview)
  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
            key={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {mode === CREATE && (
          <Form
          interviewers={ [] }
          onSave={onSave}
          onCancel={onCancel}
          
          />
        )}
      {/* {props.interview ? <Show key={props.id} student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> } */}
    </article>
  )
}