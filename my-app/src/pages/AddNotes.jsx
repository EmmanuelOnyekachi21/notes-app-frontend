import React, { useEffect, useState } from "react";
import "./AddNotes.css";
import api from "../api/api";

const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    api.get('categories')
    .then(res => {
      console.log(res.data)
      setCategories(res.data)
      console.log(categories)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])

  console.log(`title: ${title}`)
  console.log(`body: ${body}`)
  console.log(`selectedCategory: ${selectedCategory}`)
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={body}
          onChange={(e) => setBody(e.target.value)}
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
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>-- Pick a category --</option>
          {
            categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))
          }
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
