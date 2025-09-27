import React, { useState, useEffect } from "react";
import "./AddNotes.css"; // reuse same CSS as AddNotes
import { useNavigate, useParams } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import api from "../api/api";
import { toast } from "react-toastify";
import useDotAnimation from "../hooks/useDotAnimation";

const EditNote = () => {
  const { slug } = useParams(); // later you'll fetch note by slug
  const navigate = useNavigate();

  // Local state (prefilled with dummy values for now)
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const categories = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // You’ll later replace this with api.get(`/notes/${slug}`)
  useEffect(() => {
    api
      .get(`notes/${slug}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setBody(res.data.body);
        setSelectedCategory(res.data.category);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 404) {
          toast.error("Note not found.");
          navigate("/");
        } else {
          toast.error("An error occurred");
        }
        console.log(err.message);
      });
  }, [slug]);

  const resetForm = () => {
    setTitle("");
    setBody("");
    setSelectedCategory("");
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Updated values:", { title, body, selectedCategory });
    api
      .put(`/notes/${slug}/`, { title, body, category: selectedCategory })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        resetForm();
        toast.success("Updated successfully");
        setTimeout(() => {
          navigate(`/notes/${res.data.slug}`);
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error("An error occurred");
      });
  };

  const dots = useDotAnimation();

  return (
    <form className="add-note-form" onSubmit={handleSubmit}>
      <h5>Edit Note</h5>

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
          disabled={loading}
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
          disabled={loading}
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
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
          disabled={loading}
        >
          <option value="">-- Pick a category --</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? `Saving${dots}` : "Update Note"}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={() => navigate(-1)} // go back
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditNote;
