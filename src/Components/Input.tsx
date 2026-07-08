import { type ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  id: string;
  change: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({ id, label, change, ...props }: InputProps) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        id={id}
        name={id}
        onChange={({ currentTarget }) => {
          change(currentTarget.value);
        }}
      />
    </div>
  );
};

export default Input;
