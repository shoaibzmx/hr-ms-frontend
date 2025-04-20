import React from "react";

const Select = ({ children, className, ...props }) => {
  return (
    <select className={`border p-2 rounded ${className}`} {...props}>
      {children}
    </select>
  );
};

export default Select;
