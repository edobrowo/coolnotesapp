import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Auth({ user, onUserChanged }) {
  return (
    <div className="auth">
      <div className="content">
        <section className="register">
          <RegisterForm user={user} onUserChanged={onUserChanged} />
        </section>
        <section className="login">
          <LoginForm user={user} onUserChanged={onUserChanged} />
        </section>
      </div>
    </div>
  );
}

export default Auth;
