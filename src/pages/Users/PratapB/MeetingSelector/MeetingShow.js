import React, { useState } from "react";
import DatePicker from "./DatePicker";
import DayPicker from "./DayPicker";
import { Card } from "antd";

const MeetingShow = (props) => {
  const [enter, setEnter] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const dayHandler = (enter, start = null, end = null) => {
    setEnter(enter);
    setStartDate(start);
    setEndDate(end);
  };
  const selectedDatesHandler = (dayItem) => {
    const date = new Date(startDate);
    console.log(date);
    const dates = [];
    while (date <= endDate) {
      dates.concat(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  };

  const dateDisplay =
    startDate && endDate !== "" ? (
      <p>
        date : {startDate} to {endDate}
      </p>
    ) : (
      <p>day {dayHandler}</p>
    );

  return (
    <>
      <DatePicker dayHandler={dayHandler} />
      <br />
      {enter && (
        <DayPicker
          start={startDate}
          end={endDate}
          selectedDatesHandler={selectedDatesHandler}
        />
      )}
      <br />
      {enter && <Card>{dateDisplay}</Card>}
    </>
  );
};

export default MeetingShow;
