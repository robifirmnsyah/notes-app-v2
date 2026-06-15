import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const getNotes = async () => {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (data) => {
  try {
    const response = await api.post('/notes', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (id, data) => {
  try {
    const response = await api.put(`/notes/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
