import React from 'react';
import NoteForm from './NoteForm';

const NoteModal = ({ isOpen, onClose, note, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <NoteForm initialData={note} onSubmit={onSubmit} onCancel={onClose} />
      </div>
    </div>
  );
};

export default NoteModal;
