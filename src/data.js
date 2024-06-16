// data.js
import React from "react";

export default function Data({ data, index, handleDataChange }) {
  const { Name, DateOfBirth, Salary, Address } = data;

  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            value={Name}
            onChange={(e) => handleDataChange(e, index, "Name")}
          />
        </td>
        <td>
          <input
            type="date"
            value={DateOfBirth.split("T")[0]}
            onChange={(e) => handleDataChange(e, index, "DateOfBirth")}
          />
        </td>
        <td>
          <input
            type="range"
            min={0}
            max={100000}
            value={Salary}
            onChange={(e) => handleDataChange(e, index, "Salary")}
          />
        </td>
        <td>
          <input
            type="text"
            value={Address}
            onChange={(e) => handleDataChange(e, index, "Address")}
          />
        </td>
      </tr>
    </>
  );
}
