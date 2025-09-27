import React, { useEffect, useState } from 'react'
import api from '../api/api';

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("categories")
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to load categories");
      });
  }, [])
  return categories;
}
