import { Card } from "antd";
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import DayPicker from "./DayPicker";

const DisplayResult = () => {
  const [isEntered, setIsEntered] = useState(false);
  const [startDate, setStartdate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [day, setDay] = useState(null);

  const dateHandler = (entered, start = null, end = null) => {
    setIsEntered(entered);
    setStartdate(start);
    setEndDate(end);

    if (Date.parse(startDate) >= Date.parse(endDate)) {
      alert("End date should be greater than Start date");
      setEndDate("");
    }
  };

  const dayHandler = (dayInfo = null) => {
    setDay(dayInfo);
    // console.log("day", day);
  };

  // console.log("day", day);

  const result =
    startDate && endDate !== "" ? (
      <p>
        your selected date is {startDate} to {endDate}
      </p>
    ) : (
      <p> select date is </p>
    );

  return (
    <>
      <DatePicker dateSubmit={dateHandler} />
      <br />
      <p>select Day for meeting</p>
      {isEntered && (
        <DayPicker start={startDate} end={endDate} dayHandler={dayHandler} />
      )}
      <br />
      {isEntered && <Card>{result}</Card>}
    </>
  );
};

export default DisplayResult;
