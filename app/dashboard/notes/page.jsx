'use client';
import React, { useState } from 'react';
import useStore from '../../../store';

const NotesPage = () => {
  const notes = useStore((state) => state.notes);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const createNote = (event) => {
    event.preventDefault();
    const newNote = {
      id: Date.now().toString(),
      title: title,
      description: description,
      date: date,
    };
    useStore((state) => state.addNote(newNote));
    setTitle('');
    setDescription('');
    setDate('');
  };

  const deleteNote = (id) => {
    useStore((state) => state.deleteNote(id));
  };

  return (
    <div className="bg-image flex flex-row">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center mt-8">
          Welcome to your Notes!
        </h1>
        <div className="form-container mt-8">
          <form onSubmit={createNote} className="flex flex-col space-y-4">
            <div className="form-field">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-field">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-field">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input
                type="text"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
              />
            </div>
            <button type="submit" className="form-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2">
        <div className="notes-container">
          {notes.map((note) => (
            <div key={note.id} className="note">
              <h2 className="note-title">{note.title}</h2>
              <p className="note-description">{note.description}</p>
              <p className="note-date">{note.date}</p>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;

