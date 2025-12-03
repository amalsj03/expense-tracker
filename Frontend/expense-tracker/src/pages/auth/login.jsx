import React, { useContext, useState } from 'react';
import Authlayout from '../../components/layout/authlayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/layout/inputs/input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apipath';
import { UserContext } from '../../context/usercontext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


const {updateUser} = useContext(UserContext);



  const navigate = useNavigate();

  // handle login form submit
  const handleLogin = async e => {
    e.preventDefault();
      if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }
   if (!password) {
    setError("enter the correct password")
    ;
    return;
  }
  setError("");
  //Login API call
  try{
    const response  = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
      email,
      password,
    });
    const {token,user}=response.data;
    if(token){
      localStorage.setItem("token",token);
      updateUser(user);
      navigate("/dashboard");


    }

  }catch(error){
    if(error.response && error.response.data.message){
      setError(error.response.data.message);

    }else{
      setError("something went wrong.please try again");
    }
  }
  }

  return (
    <Authlayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter the details to log in
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="amal@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter password min 8 character"
            type="password"
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <button
            type="submit"
            className="btn-primary"
          >
            LOG IN
          </button>

          <p className="text-sm text-gray-600 mt-4 text-center">
  Don&apos;t have an account?{" "}
  <Link
    className="text-indigo-600 hover:underline font-medium"
    to="/signup"
  >
    Sign Up
  </Link>
</p>

        </form>
        
      </div>
    </Authlayout>
  );
};

export default Login;
