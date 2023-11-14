const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');

// Get notes - GET /api/notes
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.status(200).json(notes);
});

// Set note - POST /api/notes
const setNote = asyncHandler(async (req, res) => {
  if (req.body.title === undefined) {
    res.status(400);
    throw new Error('Please add a title field');
  }
  if (req.body.content === undefined) {
    res.status(400);
    throw new Error('Please add a content field');
  }

  const note = await Note.create({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id,
  });

  res.status(200).json(note);
});

// Update note - PUT /api/notes/:id
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Note not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (note.user.toString() != req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

// Delete note - DELETE /api/notes/:id
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Note not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (note.user.toString() != req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await Note.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
};
