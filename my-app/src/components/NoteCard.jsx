import { useState } from "react";
import { FaNoteSticky, FaTrash } from "react-icons/fa6";
import { MdMarkunread } from "react-icons/md";
import { Link } from "react-router-dom";
import FormatDate from "../hooks/FormatDate";
import useDeletePage from "../hooks/useDeletePage";
import api from "../api/api";
import { toast } from "react-toastify";
import useCategories from "../hooks/useCategories";

const MAX_LENGTH = 170;

const NoteCard = ({
  title,
  date,
  content,
  color,
  slug,
  setNotes,
  category_display,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // const toggleXpand = () => setExpanded((prev) => !prev);

  const [showModal, setShowModal] = useState(false);
  // Get Categories using hook
  const getCategories = useCategories();

  const [selectedCategory, setSelectedCategory] = useState(category_display);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const handleCategoryChange = (newSelectedCategory) => {
    setSelectedCategory(newSelectedCategory);
    console.log(newSelectedCategory);
    setLoading2(true);
    setTimeout(() => {
      api
        .patch(`/notes/${slug}/`, {
          category: newSelectedCategory.toUpperCase(),
        })
        .then((res) => {
          setLoading2(false);
          console.log(res.data);
          setNotes((prevNotes) => 
            prevNotes.map(note => (
              note.slug === slug ? { ...note, category: newSelectedCategory } : note
            ))
          )
        })
        .catch((err) => {
          console.log(err.message);
          setLoading2(false);
        });
    }, 5000);
  };

  const displayText = expanded
    ? content
    : content.length > MAX_LENGTH
    ? content.slice(0, MAX_LENGTH) + "..."
    : content;
  // const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this note? ")) return;

    setLoading(true);
    api
      .delete(`notes/${slug}/`)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success("Note deleted");
        setNotes((prevNotes) => prevNotes.filter((n) => n.slug !== slug));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("An error occurred");
      });
  };
  return (
    <div className="col-md-4 border-start border-bottom col-12 single-note-item mb-4">
      <div className="card card-body shadow-sm border-0 rounded-3 h-100">
        {/* Colored stick */}
        <span className="side-stick" style={{ backgroundColor: color }}></span>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <FaNoteSticky style={{ color }} />
          <span className="text-muted small">{FormatDate(date)}</span>
        </div>

        {/* Title + Content */}
        <Link
          to={`/notes/${slug}`}
          className="note-title-link"
          style={{
            color: isHovered ? color : "black",
            textDecoration: "none",
            transition: "all 0.3s ease",
            display: "inline-block",
            transform: isHovered ? "translateY(-2px)" : "none",
            textShadow: isHovered
              ? `0 2px 8px ${color}40` // subtle shadow based on color
              : "none",
          }}
          onMouseEnter={() => setIsHovered(!isHovered)}
          onMouseLeave={() => setIsHovered(!isHovered)}
        >
          <h5 className="fw-bold text-truncate">{title}</h5>
        </Link>
        <p className="text-muted small">
          {displayText}
          {content.length > MAX_LENGTH && (
            <span
              onClick={() => setShowModal((prev) => !prev)}
              className="ms-1"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color: "rgb(var(--orange))",
              }}
            >
              {expanded ? "Show less" : "Read More"}
            </span>
          )}
        </p>

        {/* Actions */}
        <div className="d-flex align-items-center mt-auto">
          <button
            onClick={() => setShowModal((prev) => !prev)}
            className="btn btn-link p-0 me-3 text-decoration-none"
          >
            <MdMarkunread style={{ fontSize: "22px", color }} />
          </button>

          <button
            className="btn btn-link p-0"
            onClick={() => handleDelete(slug, setLoading)}
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? (
              <span className="spinner-small"></span>
            ) : (
              <FaTrash style={{ fontSize: "18px", color: "red" }} />
            )}
          </button>

          <div className="dropdown ms-auto">
            {loading2 ? (
              <span
                className="spinner-small"
                style={{ borderLeftColor: "gray" }}
              ></span>
            ) : (
              <>
                <button
                  className="btn btn-sm btn-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedCategory}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {getCategories.map((category) => (
                    <li key={category.value}>
                      <button
                        onClick={() => handleCategoryChange(category.label)}
                        className="dropdown-item"
                        style={{ color: "black" }}
                      >
                        {category.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop-custom border border-danger" />

          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1050 }}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h5 className="modal-title">{title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body scrollable-modal-body">
                  <p>{content}</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;
