import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Auth() {
  return (
    <div className="auth">
      <div className="content">
        <section className="register">
          <RegisterForm />
        </section>
        <section className="login">
          <LoginForm />
        </section>
      </div>
    </div>
  );
}

export default Auth;
