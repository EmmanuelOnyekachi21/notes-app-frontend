import React from "react";
import "./AddNotes.css";

const AddNotes = () => {
  return (
    <form className="add-note-form">
      <h5>Add New Note</h5>

      {/* Title */}
      <div className="mb-3">
        <label htmlFor="noteTitle" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="noteTitle"
          placeholder="Enter note's title"
        />
      </div>

      {/* Content */}
      <div className="mb-3">
        <label htmlFor="noteContent" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="noteContent"
          rows={4}
          placeholder="Enter note's content"
        ></textarea>
      </div>

      {/* Category */}
      <div className="mb-3">
        <label htmlFor="noteCategory" className="form-label">
          Note's category
        </label>
        <select
          id="noteCategory"
          className="form-select"
          aria-label="Select category"
        >
          <option defaultValue="">Pick a category</option>
          <option value="business">Business</option>
          <option value="personal">Personal</option>
          <option value="important">Important</option>
        </select>
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary w-100">
        Add Note
      </button>
    </form>
  );
};

export default AddNotes;
