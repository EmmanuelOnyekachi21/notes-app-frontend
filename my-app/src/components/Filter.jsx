import React from 'react'

const Filter = () => {
  return (
    <div className="d-flex justify-content-center my-4">
      <select
        className="form-select shadow-sm"
        style={{ maxWidth: "400px", height: "45px", borderRadius: "10px" }}
        defaultValue=""
      >
        <option value="" disabled>
          Filter Notes
        </option>
        <option value="business">Business</option>
        <option value="personal">Personal</option>
        <option value="important">Important</option>
      </select>
    </div>
  );
};

export default Filter;
