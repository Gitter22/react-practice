import React, { Fragment, useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import DayPicker from "./DayPicker";

function MeetingDisplay() {
  const [isEntered, setIsEntered] = useState(false);
  const [startDate, setStartDate] = useState(null);
  // console.log("start: ", startDate);
  const [endDate, setEndDate] = useState(null);

  const dayHandler = (entered, start = null, end = null) => {
    setIsEntered(entered);
    setStartDate(start);
    setEndDate(end);
  };

  const selectedDatesHandler = (dayList) => {
    const date = new Date(startDate);
    console.log(date);
    const dates = [];
    while (date <= endDate) {
      dates.concat(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    console.log(dates);
  };

  return (
    <Fragment>
      <DatePicker dayHandler={dayHandler} />
      <br />
      <br />
      {isEntered && (
        <DayPicker
          start={startDate}
          end={endDate}
          selectedDatesHandler={selectedDatesHandler}
        />
      )}
    </Fragment>
  );
}

export default MeetingDisplay;
