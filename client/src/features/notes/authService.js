import axios from 'axios';

const API_URL = '/api/users/';

async function register(userData) {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

async function login(userData) {
  try {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
    }
    return null;
  }
}

async function logout() {
  localStorage.removeItem('user');
}

const authService = {
  register,
  login,
  logout,
};

export default authService;
