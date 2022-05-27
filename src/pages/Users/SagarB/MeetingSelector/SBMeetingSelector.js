import React from "react";
import DateSelector from "./DateSelector";

const SBMeetingSelector = () => {
  return (
    <div
      style={{
        display: "block",
        width: "96rem",
        padding: 30,
      }}
    >
      <h4 style={{ fontSize: 30, fontFamily: "initial" }}>Meeting Selector</h4>
      <DateSelector />
    </div>
  );
};

export default SBMeetingSelector;
