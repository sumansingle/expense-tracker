import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function FirstComponent({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Call the callback function with the selected date
    // console.log(
    //   "Selected Date in FirstComponent:",
    //   dayjs(date).format("MM-DD-YYYY")
    // ); // Log the selected date in FirstComponent
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange} // Attach the event handler
      />
    </LocalizationProvider>
  );
}
