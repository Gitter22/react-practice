import React, { useState } from "react";

function DayPicker(props) {
  const [dayList, setDayList] = useState([]);

  const dayListHandler = (event) => {
    // console.log("day: ", event.currentTarget.checked, event.currentTarget.name);
    if (event.currentTarget.checked === false) {
      // console.log("false aya");
      setDayList(
        dayList.filter((item) => {
          // console.log("item: ", item);
          return item !== event.currentTarget.name;
        })
      );
    }
    if (dayList.indexOf(event.currentTarget.name) === -1) {
      setDayList(dayList.concat(event.currentTarget.name));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.selectedDatesHandler(dayList);
  };

  return (
    <>
      <form>
        <input
          type="checkbox"
          name="mon"
          onChange={(event) => {
            dayListHandler.bind(event);
          }}
        />
        Mon
        <input
          type="checkbox"
          name="tue"
          onChange={(event) => {
            dayListHandler(event);
          }}
        />
        Tue
        <input
          type="checkbox"
          name="wed"
          onChange={(event) => {
            dayListHandler(event);
          }}
        />
        Wed
        <input
          type="checkbox"
          name="thu"
          onChange={(event) => {
            dayListHandler(event);
          }}
        />
        Thu
        <input
          type="checkbox"
          name="fri"
          onChange={(event) => {
            dayListHandler(event);
          }}
        />
        Fri
        <input
          type="checkbox"
          name="sat"
          onChange={(event) => {
            dayListHandler(event);
          }}
        />
        Sat
        <input
          type="checkbox"
          name="sun"
          onChange={(event) => {
            dayListHandler(event);
          }}
        />
        Sun
        <input type="submit" onClick={submitHandler} />
      </form>
    </>
  );
}

export default DayPicker;
