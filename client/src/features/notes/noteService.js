import axios from 'axios';

const API_URL = '/api/notes/';

async function retrieveNotes(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
}

async function createNote(noteData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);

  return response.data;
}

async function removeNote(noteId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + noteId, config);

  return response.data;
}

async function editNote(noteData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + noteData._id, noteData, config);

  return response.data;
}

const noteService = {
  createNote,
  retrieveNotes,
  removeNote,
  editNote,
};

export default noteService;
