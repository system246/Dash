import { useState } from "react";
import { checkUser } from "../LoginHooks/Sign-in";
import { useNavigate } from "react-router-dom";  
 

//for user login<-----------------


const Signin = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !Password) {
      alert("Please fill in both fields!");
      return;
    }
  
    const formData = { email, Password };
  
    try {
      const response = await checkUser(formData);
  
      if (response?.message) {
        alert(response.message);
        localStorage.setItem("isLoggedIn", "true"); // ✅ Set login flag
        navigate("/Dash");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "User not found. Please sign up first!");
      navigate("/");
    }
  };
  


  return (
    <div className="flex justify-center  items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-2xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-300 block mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-300 block mb-1">Password</label>
            <input 
              type="Password"  
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your Password" 
              value={Password}  
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
        <h1 className="pt-5 text-white text-center text-lg" onClick={()=>navigate('/')}>Doesn't have Account <span className="text-blue-400 hover:text-blue-700 underline cursor-pointer">Sign_up</span></h1>

      </div>
    </div>
  );
};

export default Signin;
