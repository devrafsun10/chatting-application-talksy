import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import friendreunion from '../../assets/friendreunion.png'
import friendsforever from '../../assets/friendsforever.png'
import cousins from '../../assets/cousins.png'


const Grouplist = () => {
  return (
    <div className='shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-[21px] w-[430px] rounded-[20px] my-[33px] '>
         <div className='flex items-center justify-between'>
            <h1 className=' font-tertiary font-semibold text-[20px]'>Groups List</h1>
            <BsThreeDotsVertical className='cursor-pointer' />
        </div>

        <div className='overflow-y-scroll h-[347px]'>
            
         <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
            <div className='mb-2'>
                <img src={friendreunion} alt="#hjh" />
            </div>

            <div className='ml-[14px]'>
                <p className=' font-tertiary font-semibold text-[18px]'>Friends Forever</p>
                <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>Good to see you.</p>
            </div>
                <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]'>Join</button>
        </div>
         <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
            <div className='mb-2'>
                <img src={friendsforever} alt="#hjh" />
            </div>

            <div className='ml-[14px]'>
                <p className=' font-tertiary font-semibold text-[18px]'>Friends Reunion</p>
                <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>Hi Guys, Wassup!</p>
            </div>
                <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]'>Join</button>
        </div>
         <div className='relative flex justify-between items-center mt-[17px]'>
            <div className='mb-2'>
                <img src={cousins} alt="#hjh" />
            </div>

            <div className='ml-[14px]'>
                <p className=' font-tertiary font-semibold text-[18px]'>Crazy Cousins</p>
                <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>What plans today?</p>
            </div>
                <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]'>Join</button>
        </div>
         <div className='relative flex justify-between items-center mt-[17px]'>
            <div className='mb-2'>
                <img src={cousins} alt="#hjh" />
            </div>

            <div className='ml-[14px]'>
                <p className=' font-tertiary font-semibold text-[18px]'>Crazy Cousins</p>
                <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>What plans today?</p>
            </div>
                <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]'>Join</button>
        </div>
        </div>

    </div>
  )
}

export default Grouplist