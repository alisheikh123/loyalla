import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

const InputField = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
      ...field,
    ...otherProps,
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error){
      configTextField.error = true;
      configTextField.helperText = meta.error;
  }
  return <TextField {...configTextField} />;
};

export default InputField;
