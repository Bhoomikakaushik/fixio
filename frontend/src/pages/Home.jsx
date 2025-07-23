import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register-user'); // Navigate to the register page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Home</h1>
      <button
        onClick={handleRegisterClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Register
      </button>
    </div>
  );
};

export default Home