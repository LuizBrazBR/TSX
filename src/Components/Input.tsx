import { type ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  id: string;
};

const Input = ({ id, label, ...props }: InputProps) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id} name={id} />
    </div>
  );
};

export default Input;
