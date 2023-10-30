import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
      <p>login</p>
      <div className="form-group">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="email"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          id="password"
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
