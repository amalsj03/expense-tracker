import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/layout/inputs/input';
import ProfilePhotoSelector from '../../components/layout/inputs/profilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/usercontext';
import AuthLayout from '../../components/layout/authlayout';
import axiosInstance from '../../utils/axiosinstance'; // make sure this exists
import { API_PATHS } from '../../utils/apipath'; // make sure this exists

// Optional: function to upload image (must be defined somewhere)
async function uploadImages(file) {
  // dummy example: replace with your actual upload logic
  return { imageUrl: 'https://example.com/image.png' };
}

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError('Please enter your full name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setError('');

    try {
      // Upload profile image if exists
      let profileImageUrl = '';
      if (profilePic) {
        const imgUploadRes = await uploadImages(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl || '';
      }

      // Signup API call
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user); // update context
        navigate('/dashboard');
      }
    } catch (err) {
      // Fix semicolon & optional chaining
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-start min-h-screen px-8 bg-gray-50">
        <div className="max-w-md w-full">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Create an Account</h3>
          <p className="text-gray-600 mb-6">Join us today by entering your details below</p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
              />
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="amal@example.com"
                type="email"
              />
              <div className="col-span-2">
                <Input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label="Password"
                  placeholder="Enter password (min 8 characters)"
                  type="password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md border border-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              SIGN UP
            </button>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?{' '}
              <Link className="text-indigo-600 hover:underline font-medium" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
