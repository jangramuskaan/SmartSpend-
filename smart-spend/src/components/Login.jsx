import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate('/');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="card">
        <h2>Welcome to SmartSpend</h2>
        <p>Log in to manage your expenses.</p>
        <button type="submit" className="btn primary-btn">Login to Continue</button>
      </form>
    </div>
  );
};

export default Login;