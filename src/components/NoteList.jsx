import React from "react";
import PropTypes from "prop-types";
import NoteCard from "./NoteCard.jsx";
import EmptyState from "./EmptyState.jsx";

export default function NoteList({
  notes,
  onDelete,
  onArchive,
  onUnarchive,
  emptyMessage,
}) {
  if (!notes.length) {
    return <EmptyState message={emptyMessage} />;
  }
  return (
    <div className="grid">
      {notes.map((n) => (
        <NoteCard
          key={n.id}
          id={n.id}
          title={n.title}
          body={n.body}
          createdAt={n.createdAt}
          archived={n.archived}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
};
