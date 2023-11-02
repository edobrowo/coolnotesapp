import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../features/notes/authService';

function LoginForm({ user, onUserChanged }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const userResult = await authService.login({
      email: email,
      password: password,
    });

    onUserChanged(userResult);
  }

  return (
    <form method="" onSubmit={onSubmit}>
      <p>login</p>
      <div className="form-group">
        <input
          type="email"
          name="email"
          id="login-email"
          value={email}
          placeholder="email"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          id="login-password"
          value={password}
          placeholder="password"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <button className="login-submit" type="submit">
          sign in
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
