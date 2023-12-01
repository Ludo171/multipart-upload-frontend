import { ChangeEventHandler } from "react";

type ParamInputProps = {
  title: string;
  value: string;
  handleValueChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  type?: "text" | "number" | "password" | undefined;
};

export const ParamInputComponent = ({
  title,
  value,
  handleValueChange,
  type = "text",
}: ParamInputProps) => {
  return (
    <div className="paramInput">
      <span>{title}</span>
      <input type={type} value={value} onChange={handleValueChange} />
    </div>
  );
};
