import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";


export default function DayListItem(props) {

  //formatSpots decides the text that will represent the spots remaining
  const formatSpots = (spots) => {
    let finalFormat;
    
    switch (spots) {
      case 0:
        finalFormat = 'no spots remaining';
        break;
      case 1:
        finalFormat = '1 spot remaining';
        break;
      default:
        finalFormat = `${spots} spots remaining`;
        break;
    }
    return finalFormat;
  }

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots===0
  });


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
  <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}