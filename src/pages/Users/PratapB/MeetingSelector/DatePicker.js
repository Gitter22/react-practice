import React, { useState } from "react";

const DatePicker = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const startDateHandler = (e) => {
    setStartDate(e.target.value);
  };
  const endDateHandler = (e) => {
    setEndDate(e.target.value);
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 0).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.dateHandler(true, startDate, endDate);
  };

  function Sun(date) {
    return [date.getDay() != 0, "Sunday"];
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="startdate">Start-Date : </label>
        <input
          type="date"
          id="start"
          min={disablePastDate()}
          onChange={startDateHandler}
          disabled={Sun}
          // disabled={({ date, view }) =>
          //   date.getDay() === 0 || date.getDay() === 6
          // }
        />
        <label htmlFor="enddate">- End-Date :</label>
        <input
          type="date"
          id="end"
          min={disablePastDate()}
          onChange={endDateHandler}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default DatePicker;
