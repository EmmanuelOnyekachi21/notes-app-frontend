import React from "react";

const SkeletonNoteCard = () => {
  return (
    <div className="col-md-4 border-start border-bottom col-12 single-note-item mb-4">
      <div className="card card-body shadow-sm border-0 rounded-3 h-100">
        {/* Fake side stick */}
        <span
          className="side-stick placeholder-glow"
          style={{ width: "4px", height: "100%", backgroundColor: "#e0e0e0" }}
        ></span>

        {/* Header placeholders */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="placeholder col-1 rounded-circle"></span>
          <span className="placeholder col-4"></span>
        </div>

        {/* Title placeholder */}
        <h5 className="fw-bold text-truncate">
          <span className="placeholder col-8"></span>
        </h5>

        {/* Content placeholder */}
        <p className="text-muted small">
          <span className="placeholder col-12"></span>
          <span className="placeholder col-10"></span>
          <span className="placeholder col-6"></span>
        </p>

        {/* Actions row placeholders */}
        <div className="d-flex align-items-center mt-auto">
          <span className="placeholder rounded col-1 me-3"></span>
          <span className="placeholder rounded col-1 me-3"></span>
          <span className="placeholder col-3 ms-auto"></span>
        </div>
      </div>
    </div>
  );
};

export default SkeletonNoteCard;
