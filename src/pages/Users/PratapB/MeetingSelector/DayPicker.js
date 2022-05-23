import React, { useState } from "react";
import { Card } from "antd";

const DayPicker = (props) => {
  const [dayItem, setDayItem] = useState({ days: [], response: [] });

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const { days } = dayItem;

    // if (event.currentTarget.checked === false) {
    //   setDayItem(
    //     dayItem.filter((item) => {
    //       return item !== event.currentTarget.name;
    //     })
    //   );
    // }

    // if (dayItem.indexOf(event.currentTarget.name) === -1) {
    //   setDayItem(dayItem.concat(event.currentTarget.name));
    // }

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

  const submitHandler = (e) => {
    e.preventDefault();
    props.dayHandler(dayItem.days);
  };

  return (
    <>
      <Card>
        <form>
          <h2>Days : </h2>
          <div>
            <input
              type="checkbox"
              name="Monday"
              value="Monday"
              onChange={handleChange}
            />
            <label>Monday</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Tuesday"
              value="Tuesday"
              onChange={handleChange}
            />
            <label>Tuesday</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Wednesday"
              value="Wednesday"
              onChange={handleChange}
            />
            <label>Wensday</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Thursday"
              value="Thursday"
              onChange={handleChange}
            />
            <label>Thursday</label>
          </div>
          <div className="col-md-6">
            <div>
              <input
                type="checkbox"
                name="Friday"
                value="Friday"
                onChange={handleChange}
              />
              <label>Friday</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Saturday"
                value="Saturday"
                onChange={handleChange}
              />
              <label>Saturday</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Sunday"
                value="Sunday"
                onChange={handleChange}
              />
              <label>Sunday</label>
            </div>
            <input type="submit" onClick={submitHandler} />
          </div>
        </form>
      </Card>
    </>
  );
};

export default DayPicker;
