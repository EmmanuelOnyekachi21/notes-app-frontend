import React, { useState, useEffect } from "react";
import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";
import api from "../api/api";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    api
      .get("http://127.0.0.1:8000/notes")
      .then((res) => {
        setIsloading(false);
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err.message);
      });
  }, []);

  if (!isloading && notes.length === 0) {
    return (
      <div className="">
      <p className="text-center text-muted my-5">
        No notes yet. Try adding one!
      </p>
    </div>
    );
  }

  return (
    <>
      <Filter />
      <NoteCardContainer notes={notes} setNotes={setNotes} loading={isloading} />
    </>
  );
};

export default HomePage;
