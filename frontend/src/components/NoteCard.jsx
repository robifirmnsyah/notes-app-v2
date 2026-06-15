import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  const formattedDate = new Date(note.created_at).toLocaleDateString();

  return (
    <div className="note-card">
      <div className="note-title">{note.title}</div>
      <div className="note-body">{note.body}</div>
      <div className="card-footer">
        <span style={{ fontSize: '0.8rem', color: '#888' }}>{formattedDate}</span>
        <div>
          <button className="edit-button" onClick={() => onEdit(note)} style={{ marginRight: '8px' }}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
