import React, { useState } from "react";

const DatePicker = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log(startDate);

  const startDateHandler = (e) => {
    setStartDate(e.target.value);
  };
  const endDateHandler = (e) => {
    setEndDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.dayHandler(true, startDate, endDate);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="date" id="start" onChange={startDateHandler} />
        <input type="date" id="end" onChange={endDateHandler} />
        <input type="submit" />
      </form>
    </>
  );
};

export default DatePicker;
