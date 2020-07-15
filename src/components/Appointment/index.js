import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

// these variales are used for tranisitioning between components
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE= "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROE_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // functions used for transitioning based on actions taken by the user
  function onAdd() {
    transition(CREATE);
  };

  function onCancel() {
    back();
  };

  function onEdit() {
    transition(EDIT);
  };

  function onConfirm() {
    transition(CONFIRM);
  };

  function edit(name, interviewer){
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.editInterview(props.id, interview)
     .then(() => transition(SHOW))
     .catch(() => transition(ERROR_SAVE, true))
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
     .then(() => transition(SHOW))
     .catch(() => transition(ERROR_SAVE, true))
  };

  // checks to see if the warning messgae is shown or not to perform the delete action based on the user choice
  function onDelete() {
    if (mode === SHOW) { 
    onConfirm();
    }
    if (mode === CONFIRM) {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
    }
  };

  return (
    <article className="appointment" data-testid="appointment">
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
          interviewers={ props.interviewers }
          onSave={save}
          onCancel={onCancel}
          
          />
        )}
        {mode === SAVING && (
          <Status message="Saving" />
        )}
        {mode === DELETING && (
          <Status message="Deleting" />
        )}
        {mode === CONFIRM && (
          <Confirm onCancel={onCancel} onConfirm={onDelete} message="Are you sure you would like to delete?" />
        )}
        {mode === EDIT && (
          <Form
          interviewers={ props.interviewers }
          onSave={edit}
          onCancel={onCancel}
          name={ props.interview.student }
          interviewer= { props.interview.interviewer.id }
          />
        )}
        {mode === ERROR_SAVE && (
          <Error message="Could not save appointment" onClose={() => back() } />
        )}
        {mode === ERROR_DELETE && (
          <Error message="Could not delete appointment" onClose={ onCancel } />
        )}
      {/* {props.interview ? <Show key={props.id} student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> } */}
    </article>
  )
}