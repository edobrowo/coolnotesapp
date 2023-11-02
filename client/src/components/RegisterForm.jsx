import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../features/notes/authService';

function RegisterForm({ user, onUserChanged }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const { name, email, password, passwordConfirm } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  function onChange(e) {
    setErrorMessage('');
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (name === '') {
      setErrorMessage('name field cannot be empty');
      return;
    }

    if (email === '') {
      setErrorMessage('email field cannot be empty');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage('passwords do not match');
      return;
    }

    const userResult = await authService.register({
      name: name,
      email: email,
      password: password,
    });

    onUserChanged(userResult);
  }

  return (
    <form method="" onSubmit={onSubmit}>
      <p>register</p>
      <div className="form-group">
        <input
          type="text"
          name="name"
          id="register-name"
          value={name}
          placeholder="name"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          id="register-email"
          value={email}
          placeholder="email"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          id="register-password"
          value={password}
          placeholder="password"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="passwordConfirm"
          id="register-passwordConfirm"
          value={passwordConfirm}
          placeholder="confirm password"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="register-submit">
          sign up
        </button>
      </div>
      <div className="form-group register-error">
        <p>{errorMessage}</p>
      </div>
    </form>
  );
}

export default RegisterForm;
