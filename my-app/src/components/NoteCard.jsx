import { FaNoteSticky, FaTrash } from "react-icons/fa6";
import { MdMarkunread } from "react-icons/md";
import { Link } from "react-router-dom";

const NoteCard = ({ title, date, content, color }) => {
  return (
    <div className="col-md-4 col-12 single-note-item mb-4">
      <div className="card card-body shadow-sm border-0 rounded-3 h-100">
        {/* Colored stick */}
        <span className="side-stick" style={{ backgroundColor: color }}></span>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <FaNoteSticky style={{ color }} />
          <span className="text-muted small">{date}</span>
        </div>

        {/* Title + Content */}
        <h5 className="fw-bold text-truncate">{title}</h5>
        <p className="text-muted small">{content}</p>

        {/* Actions */}
        <div className="d-flex align-items-center mt-auto">
          <Link to="/notes-detail" className="me-3 text-decoration-none">
            <MdMarkunread style={{ fontSize: "22px", color }} />
          </Link>

          <FaTrash style={{ fontSize: "18px", cursor: "pointer", color: "red" }} />

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
              <li><button className="dropdown-item text-success">Business</button></li>
              <li><button className="dropdown-item text-info">Social</button></li>
              <li><button className="dropdown-item text-danger">Important</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
