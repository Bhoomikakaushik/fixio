import React, { useContext,useState } from "react";
import { UserDataContext } from "../../context/userContext.jsx";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";
  

const RegisterUser = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData,setUserData] = useState({})

  const navigate = useNavigate();
  const {user,setUser} = useContext(UserDataContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, firstName,lastName);


    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`, newUser)
      // console.log(response.data);

      if(response.status === 201){
          const data = response.data
          setUser(data.user)
          localStorage.setItem('token', data.token)
          navigate('/')
        } else {
          console.error("Registration failed");
        }

      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    }
     
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Image */}
      <div className="w-1/2 bg-blue-100 flex items-center justify-center ">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Signup"
          className="object-cover h-3/4 rounded-xl shadow-lg"
        />
      </div>
      {/* Right: Form */}
      <div className="w-1/2 flex items-center justify-center flex-col  bg-white gap-4">
        <form
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Sign Up</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value )}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value )}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Sign Up
          </button>
        </form>
        <div className="w-full max-w-md text-center mt-4">
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-user" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
        <div className="w-full max-w-md text-center mt-4">
          <p className="text-center mt-4">
            Want to register as a captain?{" "}
            <Link to="/register-captain" className="text-blue-600 hover:underline">
              Register as Captain
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;