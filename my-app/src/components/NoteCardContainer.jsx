import React, { useState } from "react";
import NoteCard from "./NoteCard";
import SkeletonNoteCard from "./SkeletonNoteCard";

const NoteCardContainer = ({ notes, setNotes, loading }) => {
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
                slug={note.slug}
                category_display={note.category_display}
                setNotes={setNotes}
              />
            ))}
      </div>
    </div>
  );
};

export default NoteCardContainer;
