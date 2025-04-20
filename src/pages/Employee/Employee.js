import React from "react";
import Main from "../Main/Main";

const Employee = () => {
  return (
    <Main
      title="Employees"
      apiUrl="http://localhost:5000/api/employees"
      showStatusFilter={false} // You can use this prop to conditionally show filters
      tableHeaders={["Name", "Email", "Phone", "Position"]}
    />
  );
};

export default Employee;
