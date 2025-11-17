import React, { useState } from 'react'
import login from '../../assets/login.jpg'
import google from '../../assets/google.png'
import { Link, useNavigate } from 'react-router'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userInfo } from '../../slices/userSlice';

const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("")
  const [password , setPassword] = useState("")

  const [show,setShow] = useState(false)

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

   const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    
  }

   const handleLogin = () => {
    console.log(email);
    if(!email){
      setEmailError("Email is required")
    }else{
      if(!/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email)){
        setEmailError("Please enter a valid email address");
      }
    }
    
    if(!password){
      setPasswordError("Password is required");      
    }else{
      if(!/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)){
        setPasswordError("Password must be at least 6 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers");
      }
      console.log(email,password);
    }
    
    if(email && password && /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email)){
      signInWithEmailAndPassword(auth, email, password)
  .then((user) => {
    console.log(user,"login");
    dispatch(userInfo(user))
    localStorage.setItem("userInfo", JSON.stringify(user))
    setTimeout(()=>{
      navigate("/")
    }, 2000)
    toast.success("Login Successful")
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
    
    if(errorCode.includes("auth/invalid-credential")){
      toast.error("Please provide right email and password")
    }
  });
    }
    
  }

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
  .then((user) => {
    console.log(user);
    toast.success("Login Successful") 
    
  }).catch((error) => {
    const errorCode = error.code;
  console.log(errorCode);
  
  });
  }

  return (
     <div className='flex items-center '>
        <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
      />
            <div className='w-1/2'>
            <div className='flex justify-end mr-[70px]'>
                <div>
                    <h3 className='font-secondary font-bold text-[34px] text-[#11175D]'>Login to your account!</h3>  
            <img className=' mt-[13px] mb-[40px] cursor-pointer' onClick={handleGoogleSignIn} src={google} alt="#google" /> 
            <div className=' relative w-[368px]'>
                <p className='absolute top-[-10px] left-[20px] px-3 bg-white tracking-[2px] font-secondary text-[13px] text-[#11175D] font-semibold'>Email Address</p>
                <input type="email"
                 onChange={handleEmail}
                 value={email}
                className='w-full py-[20px] pr-[66px] pl-[30px] border-b-2 border-[#B8BACF] rounded-[8px] outline-none'
                placeholder='Your Email Address' />
                 <p className='mt-[0px] mb-3 font-primary font-semibold text-[16px] text-rose-600'>{emailError}</p>               
                </div>
                 
            <div className=' relative w-[368px]  mt-[30px]'>
                <p className='absolute top-[-10px] left-[20px] px-3 bg-white tracking-[2px] font-secondary text-[13px] text-[#11175D] font-semibold'>Password</p>
                <input 
                type={ show ? "text" : "password"}
                onChange={handlePassword}
                className='w-full py-[20px] pr-[66px] pl-[30px] border-b-2 border-[#B8BACF] rounded-[8px] outline-none'
                placeholder='Password' />
                <div onClick={()=>setShow(!show)} className=' absolute top-[25px] right-[5%] items-center cursor-pointer'>
              { show ? <FaEye  /> : <FaEyeSlash/>}
               </div>
                <p className='mt-[10px] font-primary font-semibold text-[16px] text-rose-600'>{passwordError}</p>
                </div>
                <div className='w-[368px] mt-[30px] '>
                  <button className='bg-[#1E1E1E] rounded-full w-full py-[20px] text-white font-secondary font-semibold text-[20px] relative cursor-pointer'
                  onClick={handleLogin}>
                    <span className=' relative z-[50]'>Login to Continue</span>
                   
                    <span className=' absolute top-1/2 left-1/2 bg-[#5B36F5]/25 w-[179px] h-[40px] -translate-1/2 blur-[10px]'></span>
                  </button>
    
                   <Link to="/forgotpassword">
                   <p className=' text-center mt-[10px] font-primary font-bold text-[13px] text-[#EA6C00] cursor-pointer '>Forgot Password ? 
                    </p>
                    </Link>
                   <p className=' text-center mt-[10px] font-primary font-normal text-[13px] text-[#03014C]'>Don’t have an account ? 
                   <Link to="/registration">
                    <span className='font-bold text-[#EA6C00] cursor-pointer'>Sign Up</span>
                    </Link>
                    </p>
    
                </div>
                
            </div>
                
                </div>  
            </div>
            <div className='w-1/2'>
            <img className='h-screen w-full object-cover' src={login} alt="#login" />
            </div>
        </div>
  )
}

export default Login