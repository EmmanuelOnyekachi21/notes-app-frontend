import { useState } from "react";
import { FaNoteSticky, FaTrash } from "react-icons/fa6";
import { MdMarkunread } from "react-icons/md";
import { Link } from "react-router-dom";
import FormatDate from "../hooks/FormatDate";

const MAX_LENGTH = 170;

const NoteCard = ({ title, date, content, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // const toggleXpand = () => setExpanded((prev) => !prev);

  const [showModal, setShowModal] = useState(false)

  const displayText = expanded
    ? content
    : content.length > MAX_LENGTH
    ? content.slice(0, MAX_LENGTH) + "..."
    : content;
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
          to="/note-detail"
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
          <Link to="/notes-detail" className="me-3 text-decoration-none">
            <MdMarkunread style={{ fontSize: "22px", color }} />
          </Link>

          <FaTrash
            style={{ fontSize: "18px", cursor: "pointer", color: "red" }}
          />

          <div className="dropdown ms-auto">
            <button
              className="btn btn-sm btn-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item text-success">Business</button>
              </li>
              <li>
                <button className="dropdown-item text-info">Social</button>
              </li>
              <li>
                <button className="dropdown-item text-danger">Important</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
         <div
            className="modal-backdrop-custom border border-danger"
          />
        
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }} >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body border border-primary scrollable-modal-body">
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
