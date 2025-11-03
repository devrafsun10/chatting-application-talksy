import React from 'react'
import profile from '../../assets/profile.png'
import { GoHome } from "react-icons/go";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { getAuth, signOut } from 'firebase/auth';

const Sidebar = () => {

    const handleLogout = () => {

    const auth = getAuth();

  signOut(auth).then(() => {
    
      localStorage.clear();
      window.location.reload();
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
    }
  return (
    <div className='bg-[#1E1E1E] font-primary  w-[186px] h-[180vh] m-[35px] rounded-lg'>
        <div className='flex justify-center pt-[38px]'>
            <img src={profile} alt="" />
        </div>
        <div className=" relative after:absolute after:content-[''] after:top-0 after:left-0 after:w-[167px] after:h-full after:bg-white after:z-[-1] z-1 after:ml-[20px] after:rounded-lg 
        before:absolute before:contemt-[''] before:top-0 before:right-[0px] before:h-full before:w-[10px] before:bg-[#1E1E1E] before:rounded-tl-lg before:rounded-bl-lg before:shadow-2xs/90 before:shadow-[-2px_0px_4px_0px_rgba(0,0,0,0.25)] mt-[78px] py-[20px] flex justify-center cursor-pointer   ">
            <GoHome className='text-5xl font-primary' />
        </div>
        <div className=" mt-[78px] py-[20px] flex justify-center cursor-pointer   ">
            <AiTwotoneMessage className='text-5xl font-primary ' />
        </div>
        <div className=" mt-[78px] py-[20px] flex justify-center cursor-pointer   ">
            <IoSettingsOutline  className='text-5xl font-primary text-[#FFFFFF]' />
        </div>
        <div className=" py-[200px] flex justify-center cursor-pointer   ">
            <ImExit onClick={handleLogout}   className='text-5xl text-white font-primary' />
        </div>

    </div>
  )
}

export default Sidebar