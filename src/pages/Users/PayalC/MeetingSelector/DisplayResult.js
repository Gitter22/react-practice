import { Card } from "antd";
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import DayPicker from "./DayPicker";

const DisplayResult = () => {
  const [isEntered, setIsEntered] = useState(false);
  const [startDate, setStartdate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [day, setDay] = useState("");

  const dateHandler = (entered, start = null, end = null) => {
    setIsEntered(entered);
    setStartdate(start);
    setEndDate(end);

    if (Date.parse(startDate) >= Date.parse(endDate)) {
      alert("End date should be greater than Start date");
      setEndDate("");
    }
  };

  const dayHandler = (dayInfo) => {
    setDay(dayInfo);
  };

  const result =
    startDate && endDate && day !== "" ? (
      <textarea
        value={`your selected dates is ${startDate} to ${endDate} and days is ${day}`}
        style={{ height: "100px", width: "400px" }}
        onChange={dateHandler}
      ></textarea>
    ) : (
      <p> select date is </p>
    );

  return (
    <>
      <DatePicker day={day} dateSubmit={dateHandler} />
      <br />
      {isEntered && (
        <DayPicker start={startDate} end={endDate} dayHandler={dayHandler} />
      )}
      <br />
      {isEntered && <Card>{result}</Card>}
    </>
  );
};

export default DisplayResult;
