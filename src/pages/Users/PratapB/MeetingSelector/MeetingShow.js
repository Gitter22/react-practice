import React, { useState } from "react";
import DatePicker from "./DatePicker";
import DayPicker from "./DayPicker";


const MeetingShow = (props) => {
  const [enter, setEnter] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [day, setDay] = useState("");

  const dateHandler = (enter, start = null, end = null) => {
    setEnter(enter);
    setStartDate(start);
    setEndDate(end);
  };

  const dayHandler = (dayItem) => {
    setDay(dayItem);
  };

  const selectedDatesHandler = (dayItem) => {
    const date = new Date(startDate);
    console.log(date);
    const dates = [];
    while (date <= endDate) {
      dates.concat(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    console.log(dates);
  };

  const dateDisplay =
    startDate && endDate !== "" ? (
      <textarea
        value={`your selected dates is ${startDate} to ${endDate} and days is ${day}`}
        style={{ height: "100px", width: "400px" }}
        onChange={dateHandler}
      ></textarea>
    ) : (
      // <p>
      //   date : {startDate} to {endDate}
      // </p>
      <p>Please Select Date ... </p>
    );

  return (
    <>
      <DatePicker day={day} dateHandler={dateHandler} />
      <br />
      {enter && (
        <DayPicker
          start={startDate}
          end={endDate}
          dayHandler={dayHandler}
          selectedDatesHandler={selectedDatesHandler}
        />
      )}
      <br />
      {enter && dateDisplay}
    </>
  );
};

export default MeetingShow;
