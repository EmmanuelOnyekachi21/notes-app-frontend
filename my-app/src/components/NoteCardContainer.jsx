import React, { useState } from "react";
import NoteCard from "./NoteCard";
import SkeletonNoteCard from "./SkeletonNoteCard";

const NoteCardContainer = ({ notes, loading }) => {
  // const dummyNotes = [
  //   {
  //     id: 1,
  //     title: "Book a Ticket for Movie",
  //     date: "11 March 2009",
  //     content: "Blandit tempus porttitor. Integer posuere erat...",
  //     color: "green",
  //   },
  //   {
  //     id: 2,
  //     title: "Read Chapter 5",
  //     date: "12 March 2009",
  //     content: "Finish the assigned reading for class...",
  //     color: "blue",
  //   },
  //   {
  //     id: 3,
  //     title: "Prepare Presentation",
  //     date: "15 March 2009",
  //     content: "Work on the project slides for Monday...",
  //     color: "purple",
  //   },
  // ]
  return (
    <div className="container my-4">
      <div className="note-has-grid row">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonNoteCard key={i} />
            ))
          : notes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                date={note.updated}
                content={note.body}
                color={note.color}
                loading={loading}
                slug={note.slug}
              />
            ))}
      </div>
    </div>
  );
};

export default NoteCardContainer;
