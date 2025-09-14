import React, { useState } from "react";
import NoteCard from "./NoteCard";

const NoteCardContainer = () => {
  const dummyNotes = [
    {
      id: 1,
      title: "Book a Ticket for Movie",
      date: "11 March 2009",
      content: "Blandit tempus porttitor. Integer posuere erat...",
      color: "green",
    },
    {
      id: 2,
      title: "Read Chapter 5",
      date: "12 March 2009",
      content: "Finish the assigned reading for class...",
      color: "blue",
    },
    {
      id: 3,
      title: "Prepare Presentation",
      date: "15 March 2009",
      content: "Work on the project slides for Monday...",
      color: "purple",
    },
  ]
  return (
    <div className="container my-4">
        <div className="note-has-grid row gx-5">
            {
                dummyNotes.map((note) => (
                    <NoteCard
                        key={note.id}
                        title={note.title}
                        date={note.date}
                        content={note.content}
                        color={note.color}
                    />
                ))
            }
        </div>
    </div>
  )
};

export default NoteCardContainer;
