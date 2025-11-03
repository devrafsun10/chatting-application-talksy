import React, { useState } from 'react'
import registration from '../../assets/registration.png'
import { Link, useNavigate } from 'react-router'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner'
import { getDatabase, ref, set } from "firebase/database";



const Registration = () => {

  const db = getDatabase();

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password , setPassword] = useState("")

  const navigate = useNavigate();

  const [show,setShow] = useState(false)

  const [emailError, setEmailError] = useState("")
  const [fullNameError, setFullNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
    

  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    
  }
  
  const handleSignup = () => {
    console.log(email);
    if(!email){
      setEmailError("Email is required")
    }else{
      if(!/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email)){
        setEmailError("Please enter a valid email address");
      }
    }

    console.log(fullName);
    
    if(!fullName){
      setFullNameError("Full Name is required")
    }
    if(!password){
      setPasswordError("Password is required");      
    }else{
      if(!/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)){
        setPasswordError("Password must be at least 6 characters and contain at least following: uppercase letters, lowercase letters, numbers");
      }
      // if(!/(?=.*[a-z])/.test(password)){
      //   setPasswordError("Password must conatain at least one Lowercase letter");
      // }else if(!/(?=.*[A-Z])/.test(password)){
      //   setPasswordError("Password must contain at least one Uppercase Letter ");
      // }else if(!/(?=.*[0-9])/.test(password)){
      //   setPasswordError("Password must contain at least one Digit");
      // }else if(!/(?=.*[!@#$%^&*])/.test(password)){
      //   setPasswordError("Password must contain at least one special character");
      // }else if(!/(?=.{8,})/.test(password)){
      //   setPasswordError("Password must be at least 8 characters long");
      // }
      console.log(email,fullName,password);
    } 
    if(email && fullName && password && /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email)){
      setLoading(true)
      const auth = getAuth();

       createUserWithEmailAndPassword(auth, email, password)
         .then((user) => {
          sendEmailVerification(auth.currentUser)
          toast.success("Registration Successful !")
          console.log(user,"user");

          setTimeout(()=>{
             navigate("/login")
          },3000)

          set(ref(db, 'users/' + user.user.uid ), {
    username: fullName ,
    email: email,
    
  });
         
          
           // Signed up 
          
         // ...
         })
     .catch((error) => {
      const errorCode = error.code;
      
      const errorMessage = error.message;

      console.log(errorMessage);

      toast.error("This email is already registered")

       if(errorCode == "auth/email-already-in-use"){
        setEmailError("This email is already registered")
      }
      setLoading(false)

  }).finally(()=>{
    setEmail("")
    setFullName("")
    setPassword("")
  })
    }      
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
                <h3 className='font-secondary font-bold text-[34px] text-[#11175D]'>Get started with easily register</h3>  
        <p className='font-secondary text-[20px] font-normal text-[#7F7F7F] mt-[13px] mb-[40px]'>Free register and you can enjoy it</p>  
        <div className=' relative w-[368px]'>
            <p className='absolute top-[-10px] left-[20px] px-3 bg-white tracking-[2px] font-secondary text-[13px] text-[#11175D] font-semibold'>Email Address</p>
            <input type="email"
            onChange={handleEmail}
            value={email}
            className='w-full py-[20px] pr-[66px] pl-[30px] border-2 border-[#B8BACF] rounded-[8px] outline-none'
            placeholder='Email Address' />
            <p className='mt-[10px] font-primary font-semibold text-[16px] text-rose-600'>{emailError}</p>
            </div>
        <div className=' relative w-[368px] my-[34px]'>
            <p className='absolute top-[-10px] left-[20px] px-3 bg-white tracking-[2px] font-secondary text-[13px] text-[#11175D] font-semibold'>Full Name</p>
            <input
            value={fullName}
            type="text"
            onChange={handleFullName}
            className='w-full py-[20px] pr-[66px] pl-[30px] border-2 border-[#B8BACF] rounded-[8px] outline-none '
            placeholder='Full Name' />
             <p className='mt-[10px] font-primary font-semibold text-[16px] text-rose-600'>{fullNameError}</p>
            </div>
        <div className=' relative w-[368px]'>
            <p className='absolute top-[-10px] left-[20px] px-3 bg-white tracking-[2px] font-secondary text-[13px] text-[#11175D] font-semibold'>Password</p>
            <input 
            value={password}
            type={ show ? "text" : "password"}
            onChange={handlePassword}
            className=' w-full py-[20px] pr-[66px] pl-[30px] border-2 border-[#B8BACF] rounded-[8px] outline-none'
            placeholder='Password' />

            <div onClick={()=>setShow(!show)} className=' absolute top-[25px] right-[5%] items-center cursor-pointer'>
              { show ? <FaEye  /> : <FaEyeSlash/>}
            </div>
            <p className='mt-[10px] font-primary font-semibold text-[16px] text-rose-600'>{passwordError}</p>
            </div>
           <div>
            { loading ?
            (
               <div className='w-[368px] mt-[30px] flex justify-center '>
                <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                 />              
            </div>
            ) : (
               <div className='w-[368px] mt-[30px] '>
              <button className='bg-[#1E1E1E] rounded-full w-full py-[20px] text-white font-secondary font-semibold text-[20px] relative cursor-pointer' 
              onClick={handleSignup}>
                
                <span className=' relative z-[50]'>Sign up</span>
               
                <span className=' absolute top-1/2 left-1/2 bg-[#5B36F5]/25 w-[78px] h-[40px] -translate-1/2 blur-[10px]'></span>
              </button>

               <p className=' text-center mt-[10px] font-primary font-normal text-[13px] text-[#03014C]'>Already  have an account ?
                <Link to="/login"> 
                <span className='font-bold text-[#EA6C00] cursor-pointer'>Sign In</span>
                </Link>
               
               </p>

            </div>
            )}
           </div>
            
        </div>
            
            </div>  
        </div>
        <div className='w-1/2'>
        <img className='h-screen w-full object-cover' src={registration} alt="#registration" />
        </div>
    </div>
  )
}

export default Registration