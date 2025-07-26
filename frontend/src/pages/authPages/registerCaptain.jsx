import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";


const RegisterCaptain = () => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [services_offered, setServicesOffered] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  // Prepare FormData
  const data = new FormData();
  data.append("fullName[firstName]", firstName);
  data.append("fullName[lastName]", lastName);
  data.append("email", email);
  data.append("password", password);
  data.append("contact", contact);
  data.append("address", address);
  data.append("isAvailable", isAvailable);

  // Add each service as a separate field
  services_offered.split(",").forEach(service =>
    data.append("services_offered", service.trim())
  );

  if (profilePicture) {
    data.append("profile_picture", profilePicture);
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/captains/register-captain`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.status == 201) {

        console.log("Captain registered successfully:", response.data,response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/"); 
    } 
    else {
        console.error("Registration failed");
    }


    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setServicesOffered("");
    setContact("");
    setAddress("");
    setIsAvailable(false);
    setProfilePicture(null);


    // alert("Captain registered successfully!");

    
  } catch (error) { 
    console.error("Registration failed:", error.response?.data?.message || error.message);
    alert(error.response?.data?.message || "Something went wrong. Please try again.");

    }
};

  return (
    <div className="flex min-h-screen">
      {/* Left: Image */}
      <div className="w-1/2 bg-blue-100 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
          alt="Register Captain"
          className="object-cover h-3/4 rounded-xl shadow-lg"
        />
      </div>
      {/* Right: Form */}
      <div className="w-1/2 flex items-center justify-center flex-col bg-white gap-4">
        <form
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Register Captain
          </h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
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
          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Services Offered</label>
            <input
              type="text"
              name="services_offered"
              value={services_offered}
              onChange={(e) => setServicesOffered(e.target.value)}
              placeholder="e.g. plumbing, electrician"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <span className="text-xs text-gray-500">
              Separate multiple services with commas
            </span>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Contact</label>
            <input
              type="text"
              name="contact"
              value={contact}
              onChange={ (e) => setContact(e.target.value) }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              maxLength={10}
              minLength={10}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Profile Picture</label>
            <input
              type="file"
              name="profile_picture"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="mr-2"
            />
            <label className="font-medium">Available for Service</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCaptain;
