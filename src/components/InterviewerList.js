import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import classnames from "classnames";

export default function InterviewerList(props) {
  
  const interviewers = props.interviewers.map(interviewer => {

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)} 
      />
    )
  })

  const InterviewerClass = classnames("interviewers", {
    "interviewers__item--selected": props.selected
  });

  return (
    <section className={InterviewerClass}>
      <h4 className="interviewers__header text--light">interviewers</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )

}

