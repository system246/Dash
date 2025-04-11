import { useState } from "react";
import { registerUser } from "../LoginHooks/Sign-up";
import { useNavigate } from "react-router-dom";  
import { FaArrowLeft } from "react-icons/fa";
import dow from '../../assets/myu.jpg';


//---->for create new user

const Signup = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState(""); // Use lowercase 'Password' for consistency
  const [emailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const navigate = useNavigate();  
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/; // Only alphabet+number@gmail.com
    if (!emailRegex.test(value)) {
      setEmailError("Email must be in 'alphabet or number@gmail.com' format");
    } else {
      setEmailError("");
    }
  };

   
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{6,}$/;
    if (!PasswordRegex.test(value)) {
      setPasswordError("Password must be at least 6 characters with at least one letter and one number");
    } else {
      setPasswordError("");
    }
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !Password) {
      alert("Please fill in all fields");
      return;
    }

    if (emailError || PasswordError) {
      alert("Please fix errors before submitting");
      return;
    }

    const formData = { email, Password };

    try {
      const response = await registerUser(formData);
      alert(response.message || "User registered successfully!");
      
      // Reset Fields
      setEmail("");
      setPassword("");
      
      navigate('/signin'); // Navigate to login page

    } catch (error) {
      if (error.message === "This email is already registered.") {
        alert("This email is already registered. Please use another email.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };
  return (
    <div className="flex justify-center  items-center min-h-screen bg-gray-900">
      {/* <div className="logo absolute top-0 left-0 m-4 bg-amber-50 p-4 rounded-full cursor-pointer" onClick={()=>navigate('/')}> <FaArrowLeft />  </div> */}
      <div className="bg-gray-800 p-8 flex gap-8 justify-center items-center rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-900">

          <div className="form">
          <h2 className="text-white text-3xl underline font-mono text-center mb-4">Create Account</h2>

          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-300 block mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your email" 
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="email"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-300 block mb-1">Password</label>
            <input 
              type="Password"  
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your Password" 
              value={Password}
              onChange={handlePasswordChange}
              required
              autoComplete="current-Password"
            />
            {PasswordError && <p className="text-red-500 text-sm mt-1">{PasswordError}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Create
          </button>
        </form>
        <h1 className="pt-5 text-white text-center text-lg" onClick={()=>navigate('/signin')}>Already have Account <span className="text-blue-400 hover:text-blue-700 underline cursor-pointer">Sign_in</span></h1>

          </div>
          <div className="image">
           <img src={dow} alt="" />
          </div>

      </div>
     
      
    </div>
  );
};

export default Signup;
