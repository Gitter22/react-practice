import { Card } from "antd";
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import DayPicker from "./DayPicker";

const DisplayResult = () => {
  const [isEntered, setIsEntered] = useState(false);
  const [startDate, setStartdate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [day, setDay] = useState("");

  const dateHandler = (entered, start, end) => {
    setIsEntered(entered);
    setStartdate(start);
    setEndDate(end);
  };

  const dayHandler = (dayInfo) => {
    setDay(dayInfo);
  };

  const result =
    startDate && endDate && day !== "" ? (
      <textarea
        value={`your selected date is ${startDate} to ${endDate} and days is ${day}`}
        style={{ height: "100px", width: "400px" }}
        onChange={dateHandler}
      ></textarea>
    ) : (
      <p> select date & day </p>
    );

  return (
    <>
      <DatePicker dateSubmit={dateHandler} />
      <br />
      {isEntered && <DayPicker dayHandler={dayHandler} />}
      <br />
      {isEntered && <Card>{result}</Card>}
    </>
  );
};

export default DisplayResult;
