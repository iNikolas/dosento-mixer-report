import React from "react";
import DatePicker, {
  registerLocale,
  ReactDatePickerProps,
} from "react-datepicker";
import { uk } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import { Input } from "./components";

registerLocale("uk", uk);

export function ReactDatePicker(props: ReactDatePickerProps) {
  return (
    <DatePicker
      showTimeSelect
      dateFormat="Pp"
      isClearable
      customInput={<Input />}
      locale="uk"
      {...props}
    />
  );
}
