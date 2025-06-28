import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = process.env.REACT_APP_API_URL
      ? `${process.env.REACT_APP_API_URL}/auth/google`
      : '/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          aria-label="Sign in with Google"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;