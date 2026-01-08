import React, { useState } from 'react'
import { Link } from 'react-router'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {

    const auth = getAuth();
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

     const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const handleResetpassword = () => {
    console.log(email);
        if(!email){
          setEmailError("Email is required")
        }else{
          if(!/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email)){
            setEmailError("Please enter a valid email address");
          }
        }
         if(email && /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email)){
          sendPasswordResetEmail(auth, email)
           .then((user) => {
            console.log(user);
            
          })
         .catch((error) => {
          const errorCode = error.code;
           const errorMessage = error.message;

           console.log(errorCode);
           console.log(errorMessage);
           
           
    
       });
         }
    
  }


  return (
    <div className='w-full h-screen bg-black text-black flex justify-center items-center font-primary'>
        <div className='bg-white py-10 px-10 w-1/2 rounded-lg'> 
        <h2 className='text-2xl font-bold mb-10'>Forgot Password</h2>
         <div className=' relative w-[368px]'>
                <p className='absolute top-[-10px] left-[20px] px-3 bg-white tracking-[2px] font-secondary text-[13px] text-[#11175D] font-semibold'>Email Address</p>
                <input type="email"
                 onChange={handleEmail}
                 value={email}
                className='w-full py-[20px] pr-[66px] pl-[30px] border-b-2 border-[#B8BACF] rounded-[8px] outline-none'
                placeholder='Your Email Address' />
                 <p className='mt-[0px] mb-3 font-primary font-semibold text-[16px] text-rose-600'>{emailError}</p>               
                </div>
               <div className='mt-5'>
                 <button className='bg-[#1E1E1E] rounded-lg px-2  py-2 text-white font-secondary font-semibold text-base relative cursor-pointer'
                  onClick={handleResetpassword}>
                    <span className=' relative z-[50]'>Reset Password</span>
                  </button>
                <Link to="/Login">
                <button className='bg-[#1E1E1E] ml-5 rounded-lg px-2  py-2 text-white font-secondary font-semibold text-base relative cursor-pointer'
                  onClick={handleResetpassword}>
                    <span className=' relative z-[50]'>Go Back</span>
                  </button>
                </Link>
               </div>
        </div>
    </div>
  )
}

export default ForgotPassword