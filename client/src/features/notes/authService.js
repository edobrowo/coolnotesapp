async function register(userData) {
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  return userData;
}

async function login(userData) {
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  return userData;
}

function logout() {
  localStorage.removeItem('user');
}

const authService = {
  register,
  login,
  logout,
};

export default authService;
