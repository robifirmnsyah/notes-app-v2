import React, { useState, useEffect } from 'react';

const NoteForm = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setBody(initialData.body || '');
    } else {
      setTitle('');
      setBody('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    onSubmit({ title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Title</label>
        <input
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: '12px' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Body</label>
        <textarea
          className="form-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="save-button">
          {initialData ? 'Save' : 'Add Note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
