import { Card } from "antd";
import React, { useState } from "react";

const DatePicker = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const startHandler = (e) => {
    setStartDate(e.target.value);
  };

  const endHandler = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dateSubmit(true, startDate, endDate);
  };

  const submitData = () => {};

  return (
    <>
      <Card>
        <h3>select Date for meeting</h3>
        <br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="startdate">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={startHandler}
            // disable={[
            //   new Date(),
            //   { daysOfWeek: [0, 6] },
            //   { before: new Date() },
            // ]}
          />
          <br />
          <br />
          <label htmlFor="enddate">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={endHandler}
            min={startDate}
            // disable={[
            //   new Date(),
            //   { daysOfWeek: [0, 6] },
            //   { before: new Date() },
            // ]}

            // min={disablePastDate()}
          />
          <br />
          <br />

          <input type="submit" onSubmit={submitData} />
        </form>
      </Card>
    </>
  );
};

export default DatePicker;
