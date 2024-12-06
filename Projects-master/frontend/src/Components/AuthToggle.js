

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useGoogleLogin } from '@react-oauth/google';
// import '../Components/AuthToggle.css'; // Add your CSS here

// const AuthToggle = () => {
//   const [isSignup, setIsSignup] = useState(false); // State for toggling between Login and Signup
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [otp, setOtp] = useState(''); // OTP state
//   const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP was sent
//   const [googleUser, setGoogleUser] = useState(null);
//   const navigate = useNavigate();

//   // Toggle between Login and Signup views
//   const toggleAuthView = () => {
//     setIsSignup(!isSignup);
//     setEmail('');
//     setPassword('');
//     setFirstName('');
//     setLastName('');
//     setOtp('');
//     setIsOtpSent(false);
//   };

//   // Handle OTP Send Request
//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/otp/send-otp', { email });
//       if (response.data.success) {
//         alert('OTP sent to your email.');
//         setIsOtpSent(true);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       alert('Failed to send OTP. Please try again.');
//     }
//   };

//   // Handle OTP Verification
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/otp/verify-otp', { email, otp });
//       if (response.data.success) {
//         alert('OTP verified successfully! Proceeding with account creation.');
//         handleManualSignUp();
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       alert('Failed to verify OTP. Please try again.');
//     }
//   };

//   // Handle Manual Signup
//   const handleManualSignUp = async () => {
//     // Password validation regex
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       alert(
//         'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.'
//       );
//       return;
//     }

//     // Send data to backend (no bcrypt here)
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/signup', {
//         firstName,
//         lastName,
//         email,
//         password, // send plain password
//       });

//       if (response.status === 200) {
//         alert('User created successfully!');
//         navigate('/home');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error signing up, please try again.');
//     }
//   };

//   // Handle Login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

//       const { token, userId } = response.data;

//       // Store JWT token and userId
//       localStorage.setItem('userId', userId);
//       localStorage.setItem('token', token);

//       alert('Login successful!');
//       navigate('/home');
//     } catch (error) {
//       console.error('Error logging in:', error);
//       alert('Error logging in. Please check your credentials.');
//     }
//   };

//   // Google login handler
//   const googleLogin = useGoogleLogin({
//     onSuccess: (response) => setGoogleUser(response),
//     onError: (error) => console.error('Google Login Failed:', error),
//   });

//   // Fetch Google Profile
//   useEffect(() => {
//     if (googleUser) {
//       const fetchGoogleProfile = async () => {
//         try {
//           const profileResponse = await axios.get(
//             `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${googleUser.access_token}`,
//                 Accept: 'application/json',
//               },
//             }
//           );

//           const { email, name } = profileResponse.data;

//           const response = await axios.post('http://localhost:5000/api/users/google-signup', {
//             email,
//             name,
//           });

//           if (response.status === 200) {
//             alert('Logged in successfully!');
//             navigate('/home');
//           }
//         } catch (error) {
//           console.error('Google profile fetch failed:', error);
//           alert('Failed to fetch Google profile.');
//         }
//       };

//       fetchGoogleProfile();
//     }
//   }, [googleUser]);

//   return (
//     <div className="auth-container">
//       <div className="form-wrapper">
//         {isSignup ? (
//           <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="signup-form">
//             <h2>Sign Up</h2>

//             {!isOtpSent && (
//               <>
//                 <div className="name-inputs">
//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     required
//                   />
//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />

//                 <input
//                   type="password"
//                   placeholder="Create a password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </>
//             )}

//             {isOtpSent && (
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//             )}

//             <button type="submit">{isOtpSent ? 'Verify OTP' : 'Send OTP'}</button>
//           </form>
//         ) : (
//           <form onSubmit={handleLogin} className="login-form">
//             <h2>Login</h2>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit">Login</button>
//           </form>
//         )}

//         <div className="create-account-link">
//           <span>
//             {isSignup ? (
//               <p>Already have an account? <span className="toggle-link" onClick={toggleAuthView}>Login</span></p>
//             ) : (
//               <p>Don't have an account? <span className="toggle-link" onClick={toggleAuthView}>Sign Up</span></p>
//             )}
//           </span>
//         </div>

//         <div className="divider">
//           <span>or</span>
//         </div>

//         <div className="social-login">
//           <button className="google-btn" onClick={googleLogin}>
//             Login with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthToggle;









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import '../Components/AuthToggle.css'; // Add your CSS here

const AuthToggle = () => {
  const [isSignup, setIsSignup] = useState(false); // State for toggling between Login and Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otp, setOtp] = useState(''); // OTP state
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP was sent
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();

  // Toggle between Login and Signup views
  const toggleAuthView = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setOtp('');
    setIsOtpSent(false);
  };

  // Handle OTP Send Request
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/otp/send-otp', { email });
      if (response.data.success) {
        alert('OTP sent to your email.');
        setIsOtpSent(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/otp/verify-otp', { email, otp });
      if (response.data.success) {
        alert('OTP verified successfully! Proceeding with account creation.');
        handleManualSignUp();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP. Please try again.');
    }
  };

  // Handle Manual Signup
  const handleManualSignUp = async () => {
    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    // Send data to backend (no bcrypt here)
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        firstName,
        lastName,
        email,
        password, // send plain password
      });

      if (response.status === 200) {
        alert('User created successfully!');
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
      alert('Error signing up, please try again.');
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, userId } = response.data;

      // Store JWT token and userId
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);

      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please check your credentials.');
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    const email = prompt('Enter your email to reset your password:');
    if (email) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
        if (response.data.success) {
          alert('Password reset link sent to your email!');
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error sending password reset link:', error);
        alert('Error sending password reset link. Please try again.');
      }
    }
  };

  // Google login handler
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => setGoogleUser(response),
    onError: (error) => console.error('Google Login Failed:', error),
  });

  // Fetch Google Profile
  useEffect(() => {
    if (googleUser) {
      const fetchGoogleProfile = async () => {
        try {
          const profileResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${googleUser.access_token}`,
                Accept: 'application/json',
              },
            }
          );

          const { email, name } = profileResponse.data;

          const response = await axios.post('http://localhost:5000/api/users/google-signup', {
            email,
            name,
          });

          if (response.status === 200) {
            alert('Logged in successfully!');
            navigate('/home');
          }
        } catch (error) {
          console.error('Google profile fetch failed:', error);
          alert('Failed to fetch Google profile.');
        }
      };

      fetchGoogleProfile();
    }
  }, [googleUser]);

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        {isSignup ? (
          <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="signup-form">
            <h2>Sign Up</h2>
            {!isOtpSent && (
              <>
                <div className="name-inputs">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </>
            )}
            {isOtpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            )}
            <button type="submit">{isOtpSent ? 'Verify OTP' : 'Send OTP'}</button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>

            <p>
              <span
                className="forgot-password-link"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </span>
            </p>
          </form>
        )}

        <div className="create-account-link">
          <span>
            {isSignup ? (
              <p>Already have an account? <span className="toggle-link" onClick={toggleAuthView}>Login</span></p>
            ) : (
              <p>Don't have an account? <span className="toggle-link" onClick={toggleAuthView}>Sign Up</span></p>
            )}
          </span>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button className="google-btn" onClick={googleLogin}>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthToggle;
