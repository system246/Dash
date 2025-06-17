import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png'; // Assuming you have a logo image

const Login_pg = () => {
  const [email, setEmail] = useState('admin@234.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    const hardcodedEmail = 'admin@234.com';
    const hardcodedPassword = '123456';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/Dashboard'); // Navigate to the dashboard on successful login
      toast.success('Login successful!');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-10">
      <ToastContainer />
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left */}
        <div className="md:w-1/2 w-full bg-gradient-to-br from-blue-300 to-blue-500 p-10 text-white relative overflow-hidden">
          {/* <h2 className="text-4xl font-bold mb-4">WELCOME</h2> */}
          <img src={logo} alt="" />
          <p className="text-lg mt-4">Nice to see you again! Enter your details to sign in.</p>
        </div>

        {/* Right */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Sign in</h2>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSignIn}
            className="bg-blue-900 cursor-pointer text-white w-full py-2 rounded-md hover:bg-blue-800 transition duration-300"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login_pg;





// import React, { useState } from 'react';

// const Login_pg = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = () => {
//     console.log('Email:', email);
//     console.log('Password:', password);
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <div className="flex flex-wrap justify-center items-center gap-10 p-10 min-h-screen bg-gradient-to-br from-blue-950 to-blue-700">
//       {/* Login Form */}
//       <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md space-y-6">
//         <h2 className="text-4xl font-extrabold text-center text-blue-900">Login</h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleSignIn}
//           className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
//         >
//           Sign In
//         </button>
//       </div>

//       {/* Image Section */}
//       <div className="bg-white rounded-2xl shadow-2xl p-6 w-[300px] h-[300px] flex items-center justify-center">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
//           alt="Login Icon"
//           className="w-full h-full object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default Login_pg;
