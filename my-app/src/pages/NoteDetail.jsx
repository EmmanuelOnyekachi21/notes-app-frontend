import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { FaArrowLeft, FaTrash, FaNoteSticky } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import FormatDate from "../hooks/FormatDate";
import { toast } from "react-toastify";
import useDotAnimation from "../hooks/useDotAnimation";
import handleDelete from "../hooks/useDeletePage";
import useDeletePage from "../hooks/useDeletePage";

const NoteDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const dots = useDotAnimation(loading)

  useEffect(() => {
    setLoading(true);
    api
      .get(`notes/${slug}`)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setNote(res.data);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 404){
            toast.error("Note not found.")
            navigate("/");
        } else{
            toast.error("An error occurred")
        }
        console.log(err.message);
      });
  }, [slug]);
  const handleDelete = useDeletePage();
  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0 rounded-3 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0">{note.title}</h3>
          <div className="d-flex flex-column">
            <span className="text-muted small">
              Created: {FormatDate(note.created)}
            </span>
            <span className="text-muted small">
              Last Updated: {FormatDate(note.updated)}
            </span>
          </div>
        </div>

        <div className="mb-3 d-flex align-items-center">
          <FaNoteSticky style={{ color: note.color, marginRight: "8px" }} />
          <span
            className="badge"
            style={{ backgroundColor: note.color, color: "white" }}
          >
            {note.category_display}
          </span>
        </div>

        <p className="lead">{note.body}</p>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <div>
            <button className="btn btn-warning me-2" onClick={() => navigate(`/edit-note/${slug}`)}>
              <FaEdit /> Edit
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(slug, setLoading)} disabled={loading}>
              <FaTrash /> { loading ? `Deleting${dots}` : "Delete" }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
