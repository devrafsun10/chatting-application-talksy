import React from 'react'
import User from "../../assets/profile.png"
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbTriangleFilled } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { useSelector } from 'react-redux';


const Chatbox = () => {
  const activeData = useSelector((state)=>state.activeChatInfo.value)
  console.log(activeData);
  

  return (
    <div className=' shadow-lg  px-[50px] py-[24px]  rounded-[20px] my-[33px] '>
      <div className='flex justify-between items-center border-b-2 pb-[20px]  border-black/25'>
         <div className='flex items-center font-tertiary'>
         <div>
            <img src={User} alt="" />
        </div>
        <div className='ml-[33px]'>
          {
            activeData?
             <h2 className='font-semibold text-[24px] text-[#000000]'>{activeData.name} </h2>
             :
              <h2 className='font-semibold text-[24px] text-[#000000]'>Unknown </h2>
          }
            <p className='font-normal text-[14px]'>Online</p>
        </div>
       </div>
       <div>
        <BsThreeDotsVertical className='text-2xl'/>
       </div>
      </div>

      <div className='py-[56px]'>
       <div className='my-2'>
         <div className=' relative'>
            <p className='py-[13px] px-[52px] bg-[#F1F1F1] inline-block font-tertiary font-medium text-[16px] rounded-lg '>Hey There !</p>
            <div className=' absolute bottom-[-3px] left-[-11px]'>
                <TbTriangleFilled className='text-[#F1F1F1] text-2xl' />
            </div>
        </div>
         <p className='font-tertiary font-medium text-[12px] text-black/25 mt-[5px]'>Today, 2:01pm</p>
       </div>
       <div className='my-2 text-end'>
         <div className=' relative'>
            <p className='py-[13px] px-[52px] bg-[#1E1E1E] inline-block font-tertiary font-medium text-[16px] text-white rounded-lg '>Hello...</p>
            <div className=' absolute bottom-[-3px] right-[-9px]'>
                <TbTriangleFilled className='text-[#1E1E1E] text-2xl' />
            </div>
        </div>
         <p className='font-tertiary font-medium text-[12px] text-black/25 mt-[5px]'>Today, 2:01pm</p>
       </div>
       <div className='my-2'>
         <div className=' relative'>
            <p className='py-[13px] px-[52px] bg-[#F1F1F1] inline-block font-tertiary font-medium text-[16px] rounded-lg '>Hey There !</p>
            <div className=' absolute bottom-[-3px] left-[-11px]'>
                <TbTriangleFilled className='text-[#F1F1F1] text-2xl' />
            </div>
        </div>
         <p className='font-tertiary font-medium text-[12px] text-black/25 mt-[5px]'>Today, 2:01pm</p>
       </div>
       <div className='my-2 text-end'>
         <div className=' relative'>
            <p className='py-[13px] px-[52px] bg-[#1E1E1E] inline-block font-tertiary font-medium text-[16px] text-white rounded-lg '>Hello...</p>
            <div className=' absolute bottom-[-3px] right-[-9px]'>
                <TbTriangleFilled className='text-[#1E1E1E] text-2xl' />
            </div>
        </div>
         <p className='font-tertiary font-medium text-[12px] text-black/25 mt-[5px]'>Today, 2:01pm</p>
       </div>
      </div>
      <div className='border-t-2 border-black/25 pt-[20px]'>
        <div className='flex items-center'>
          <div className='relative'>
            <input type="text" className=' w-[537px] rounded-[10px] bg-[#F1F1F1] outline-none p-[15px]'/>
            <div className='flex items-center gap-[10px] absolute top-[20px] right-[15px]'>
              <MdOutlineEmojiEmotions className='text-[#707070] cursor-pointer' />
              <CiCamera className='text-[#707070] cursor-pointer'  />

            </div>
          </div>
        <div>
          <IoIosSend className='bg-black text-white p-[15px] text-[50px] font-bold rounded-[10px] text-center ml-[20px]' />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbox