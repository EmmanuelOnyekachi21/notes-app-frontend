import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

const useDeletePage = () => {
  const navigate = useNavigate();

  const handleDelete = (slug, setLoading=false) => {
    if (!window.confirm("Are you sure you want to delete this note? ")) return;

    setLoading(true);
    api.delete(`notes/${slug}/`)
      .then(res => {
        setLoading(false)
        console.log(res)
        toast.success("Note deleted")
        navigate("/")
      })
      .catch(err => {
        setLoading(false)
        console.log(err);
        toast.error("An error occurred");
      })
  }
  return handleDelete;
}

export default useDeletePage