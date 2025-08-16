import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  [key: string]: any;
};

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
  <button className={className} {...props}>{children}</button>
);

export default Button;