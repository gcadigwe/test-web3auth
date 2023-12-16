import React from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import styles from "./style.module.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
const DatePicker = ({ value, onChange }: { value: Date; onChange: any }) => {
  return (
    <div>
      <DateTimePicker
        calendarClassName={styles.calender}
        calendarIcon={<Icon as={AiTwotoneCalendar} />}
        clearIcon={null}
        // clockClassName={styles.clock}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default DatePicker;
