import React, { useState } from "react";
import { useField } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import startsWith from "lodash.startswith";

export default function PhoneField(props) {
  const [field, meta] = useField(props.name);
  const [value, setValue] = useState();

  if (meta && meta.touched && meta.error) {
    // configTextField.error = true;
    // configTextField.helperText = meta.error;
  }

  return (
    <PhoneInput
      country={null}
      value={value}
      onChange={setValue}
      inputProps={{
        name: props.name,
        // value: field.value,
        // onChange: field.onChange,
        onBlur: field.onChange,
        required: true
      }}
      isValid={(inputNumber, country, countries) => {
        return countries.some((country) => {
          return (
            startsWith(inputNumber, country.dialCode) ||
            startsWith(country.dialCode, inputNumber)
          );
        });
      }}
      inputStyle={{ width: "100%" }}
      defaultErrorMessage="Required"
    />
  );
}
