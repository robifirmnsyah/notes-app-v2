import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return <div style={{ padding: '24px 32px', color: '#555' }}>No notes found. Create one!</div>;
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteList;
