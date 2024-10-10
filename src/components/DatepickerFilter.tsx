import React, { useState } from 'react';
import { Button, DatePicker, Popover } from '@shopify/polaris';
import { CalendarIcon } from '@shopify/polaris-icons';
import { SelectedDate } from '../utils/type';

interface IProps {
  selected: SelectedDate;
  setSelected: React.Dispatch<React.SetStateAction<SelectedDate>>;
}

export const DatePickerFilter: React.FC<IProps> = ({
  selected,
  setSelected,
}) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [active, setActive] = useState(false);

  const togglePopover = () => {
    setActive((prev) => !prev);
  };

  const handleChange = (value: SelectedDate) => {
    setSelected(value);
  };

  const handleMonthChange = (month: number, year: number) => {
    setMonth(month);
    setYear(year);
  };

  const activator = (
    <div className="btn-filter">
      <Button fullWidth onClick={togglePopover} icon={CalendarIcon}>
        Last 7 days
      </Button>
    </div>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={togglePopover}
      sectioned
      fullWidth
    >
      <div style={{ width: 500 }}>
        <DatePicker
          month={month}
          year={year}
          onChange={handleChange}
          onMonthChange={handleMonthChange}
          selected={selected}
          allowRange={true}
          multiMonth={true}
        />
      </div>
    </Popover>
  );
};
