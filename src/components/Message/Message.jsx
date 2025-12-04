import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Chatbox from '../ChatBox/Chatbox'
import Friendmsg from '../Friendmsg/Friendmsg'

const Message = () => {
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