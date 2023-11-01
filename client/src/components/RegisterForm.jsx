import { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="authForm" method="" onSubmit={onSubmit}>
      <p>register</p>
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="passwordConfirm"
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder="confirm password"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <button className="login-submit" type="submit">
          sign up
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
