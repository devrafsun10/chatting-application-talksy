import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Chatbox from '../ChatBox/Chatbox'
import Friendmsg from '../Friendmsg/Friendmsg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Message = () => {
  const data = useSelector((selector) => selector?.userInfo?.value?.user);
   const navigate = useNavigate();

  useEffect(()=> {
    if(!data){
      navigate("/login")
    }
  },[])
  return (
     <div>
      <div className='flex '>
        <Sidebar active="message"/>
        <div className=' w-[430px] z-[99]'>
          <Friendmsg/>
        </div>
        <div className=' w-[689px]'>
         <Chatbox/>
        </div>
      </div>
    </div>
  )
}

export default Message