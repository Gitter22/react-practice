import { Card } from "antd";
import React, { useState } from "react";

const DayPicker = (props) => {
  const [dayInfo, setDayInfo] = useState({
    days: [],
    response: [],
  });

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { days } = dayInfo;

    if (checked) {
      setDayInfo({
        days: [...days, value],
        response: [...days, value],
      });
    } else {
      setDayInfo({
        days: days.filter((e) => e !== value),
        response: days.filter((e) => e !== value),
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.dayHandler(dayInfo.days);
  };

  return (
    <>
      <Card>
        <h3>select Day for meeting</h3>

        <form>
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
            <input type="submit" onClick={onSubmit} />
          </div>
        </form>
      </Card>
    </>
  );
};

export default DayPicker;
