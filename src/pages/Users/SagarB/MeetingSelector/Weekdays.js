import React from "react";
import classes from "./SBMeetingSelector.module.css";

const Weekdays = (props) => {
  const { weekDays, changeCheck } = props;

  return (
    <div className={classes.weekdays}>
      {weekDays.map((obj, index) => (
        <label htmlFor={obj.p_name} key={obj.p_id}>
          <input
            id={obj.p_id}
            type="checkbox"
            disabled={!obj.isDisabled}
            onChange={() => {
              changeCheck(obj.p_id);
            }}
            style={{
              transform: "scale(1.2)",
            }}
          />
          <span> {obj.p_name}</span>
        </label>
      ))}
    </div>
  );
};

export default Weekdays;
