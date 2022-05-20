import React, { useState } from "react";
import { Card } from "antd";

const DayPicker = (props) => {
  const [dayItem, setDayItem] = useState({ days: [], response: [] });

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const { days } = dayItem;
    console.log("devdas", days);

    if (checked) {
      setDayItem({
        days: [...days, value],
        response: [...days, value],
      });
    } else {
      setDayItem({
        days: days.filter((e) => e !== value),
        response: days.filter((e) => e !== value),
      });
    }
  };

  const submitHandler = () => {};

  return (
    <>
      <Card>
        <form>
          <h2>Days : </h2>
          <div>
            <input
              type="checkbox"
              name="days"
              value="Monday"
              onChange={handleChange}
            />
            <label>Monday</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="days"
              value="Tuesday"
              onChange={handleChange}
            />
            <label>Tuesday</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="days"
              value="Wensday"
              onChange={handleChange}
            />
            <label>Wensday</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="days"
              value="Thursday"
              onChange={handleChange}
            />
            <label>Thursday</label>
          </div>
          <div className="col-md-6">
            <div>
              <input
                type="checkbox"
                name="days"
                value="Friday"
                onChange={handleChange}
              />
              <label>Friday</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="days"
                value="Saturday"
                onChange={handleChange}
              />
              <label>Saturday</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="days"
                value="Sunday"
                onChange={handleChange}
              />
              <label>Sunday</label>
            </div>
            <input type="submit" onClick={submitHandler} />
          </div>

          <div>
            <textarea
              name="response"
              value={dayItem.response}
              style={{ height: "50px" }}
              onChange={handleChange}
            />
          </div>
        </form>
      </Card>
    </>
  );
};

export default DayPicker;
