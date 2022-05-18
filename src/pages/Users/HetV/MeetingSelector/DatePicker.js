import React, { Fragment, useState } from "react";

function DatePicker(props) {
  const [startDate, setStartDate] = useState("2022-04-05");
  const [endDate, setEndDate] = useState("2022-05-05");

  const startDateHandler = (event) => {
    setStartDate(event.target.value);
  };
  const endDateHandler = (event) => {
    setEndDate(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.dayHandler(true, startDate, endDate); //event.target.start.value, event.target.end.value);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="date"
          id="start"
          placeholder="Start Date"
          onChange={startDateHandler}
        />
        <input
          type="date"
          id="end"
          placeholder="End Date"
          onChange={endDateHandler}
        />
        <input type="submit" />
      </form>
    </>
  );
}

export default DatePicker;
