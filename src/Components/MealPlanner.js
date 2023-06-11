import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDay, fetchMeals } from "../store";

const MealPlanner = () => {
  const { meals } = useSelector((state) => state);

  const [date, setDate] = React.useState(dayjs("2022-04-17"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDay(date));
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <DemoItem label="Calendar">
          <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MealPlanner;
