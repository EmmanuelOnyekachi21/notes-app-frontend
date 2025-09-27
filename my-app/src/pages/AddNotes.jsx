import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNotes.css";
import api from "../api/api";
import useDotAnimation from "../hooks/useDotAnimation";
import { toast } from "react-toastify";
import useCategories from "../hooks/useCategories";

const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const categories = useCategories();

  console.log(`title: ${title}`);
  console.log(`body: ${body}`);
  console.log(`selectedCategory: ${selectedCategory}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body || !selectedCategory) {
      toast.warning("Please fill in the fields");
      return;
    }
    setLoading(true)
    api
      .post("create/", { title, body, category: selectedCategory })
      .then((res) => {
        console.log(res.data);
        resetForm();
        toast.success("Note added successfully");
        setTimeout(() => {
          navigate(`/notes/${res.data.slug}`);
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error("Error adding note. Try again.");
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const resetForm = () => {
    setTitle("");
    setBody("");
    setSelectedCategory("");
  };
  const dots = useDotAnimation(loading);
  return (
    <form className="add-note-form" onSubmit={handleSubmit}>
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
          <option value="" disabled>
            -- Pick a category --
          </option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? `Saving${dots}` : "Add Note"}
      </button>
    </form>
  );
};

export default AddNotes;
