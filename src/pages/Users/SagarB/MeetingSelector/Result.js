import React, { useRef, useState } from "react";

const Result = (props) => {
  const { daysChecked, DateList } = props;

  return (
    <>
      <h3>#Result :-</h3>
      <br />
      {daysChecked.length > 0 &&
        DateList.map((date) => {
          var day = date.getDay();
          switch (day) {
            case 0:
              day = "Sun";
              break;
            case 1:
              day = "Mon";
              break;
            case 2:
              day = "Tue";
              break;
            case 3:
              day = "Wed";
              break;
            case 4:
              day = "Thu";
              break;
            case 5:
              day = "Fri";
              break;
            case 6:
              day = "Sat";
              break;
            default:
              break;
          }
          return (
            <p key={date}>
              {day}, {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </p>
          );
        })}
    </>
  );
};

export default Result;
