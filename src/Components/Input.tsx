import { type ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
};

const Input = (InputProps: InputProps) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={InputProps.label}>{InputProps.label}</label>
      <input {...InputProps} id={InputProps.label} name={InputProps.label} />
    </div>
  );
};

export default Input;
