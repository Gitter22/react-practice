import { Alert, Button, Input } from "antd";
import React, { useRef, useState, useEffect } from "react";
import Result from "./Result";
import classes from "./SBMeetingSelector.module.css";
import Weekdays from "./Weekdays";

const DateSelector = (props) => {
  let data = [
    {
      p_id: 0,
      p_name: "Sun",
      isDisabled: false,
    },
    {
      p_id: 1,
      p_name: "Mon",
      isDisabled: false,
    },
    {
      p_id: 2,
      p_name: "Tue",
      isDisabled: false,
    },
    {
      p_id: 3,
      p_name: "Wed",
      isDisabled: false,
    },
    {
      p_id: 4,
      p_name: "Thu",
      isDisabled: false,
    },
    {
      p_id: 5,
      p_name: "Fri",
      isDisabled: false,
    },
    {
      p_id: 6,
      p_name: "Sat",
      isDisabled: false,
    },
  ];

  const startDate = useRef();
  const endDate = useRef();
  const [DateList, setDateList] = useState([]);
  const [DateSelectorList, setDateSelectorList] = useState([]);
  const [DateValidation, setDateValidation] = useState();
  const [weekDays, setWeekDays] = useState(data);
  const [daysChecked, setDaysChecked] = useState([]);
  const [daysUnchecked, setDaysUnchecked] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [DisableDays, setDisableDays] = useState([]);

  const changeCheck = (id) => {
    const indexOfDay = daysChecked.findIndex((day) => day === id);
    if (indexOfDay === -1) {
      setDaysChecked([...daysChecked, id]);
    } else {
      setDaysChecked(daysChecked.filter((day) => day !== id));
    }
  };

  const enumerateDaysBetweenDates = function (start, end) {
    var arr = new Array(),
      arr2 = new Array(),
      dt = new Date(start);

    while (dt <= end) {
      arr2.push(new Date(dt).getDay());
      if (
        daysChecked.length > 0 &&
        daysChecked.includes(new Date(dt).getDay())
      ) {
        arr.push(new Date(dt));
      }
      dt.setDate(dt.getDate() + 1);
    }
    setDateList(arr);
    setDateSelectorList(arr2);
    return arr;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const startdate = new Date(startDate.current.value);
    const enddate = new Date(endDate.current.value);
    const time_diff = enddate - startdate;
    if (DateSelectorList.length === 0) {
      setDateValidation("Please select startDate and endDate.!");
    }
    if (time_diff < 0) {
      setDateValidation("Start date should be less than enddate.!");
    } else {
      setDateValidation("");
      enumerateDaysBetweenDates(startdate, enddate);
    }
    const weekdaysList = [];
    data.map((newObj, number) => {
      let isAdd = false;
      DateSelectorList.map((obj, index) => {
        if (number === obj) {
          if (!isAdd) {
            newObj.isDisabled = true;
            weekdaysList.push(newObj);
            isAdd = true;
          }
        }
      });
      if (!isAdd) {
        newObj.isDisabled = false;
        weekdaysList.push(newObj);
      }
    });
    setWeekDays(weekdaysList);
    // let diff = daysUnchecked.filter((x) => !DateSelectorList.includes(x));
  };

  return (
    <div className={classes.pagination}>
      {DateValidation && (
        <Alert
          message={DateValidation}
          type="error"
          style={{ width: "76rem" }}
        />
      )}
      <form className={classes.pagination_div} onSubmit={submitHandler}>
        <div className={classes.date_input}>
          <label>Start Date :</label>
          <input
            type="date"
            style={{ marginLeft: 12 }}
            ref={startDate}
            required
          />
          <label style={{ marginLeft: "13px" }}>End Date :</label>
          <input
            type="date"
            style={{ marginLeft: 12 }}
            ref={endDate}
            onChange={submitHandler}
            required
          />
          <Weekdays weekDays={weekDays} changeCheck={changeCheck} />
          <Input
            style={{ marginLeft: "-5px", width: "8rem" }}
            type="submit"
            value="Submit"
          />
        </div>
      </form>
      <Result daysChecked={daysChecked} DateList={DateList} />
    </div>
  );
};

export default DateSelector;
