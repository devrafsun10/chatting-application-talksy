import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Friends from '../Friends/Friends'
import Chatbox from '../ChatBox/Chatbox'

const Message = () => {
  return (
     <div>
      <div className='flex '>
        <Sidebar active="message"/>
        <div className=' w-[430px] z-[99]'>
          <Friends/>
        </div>
        <div className='  w-[689px]'>
         <Chatbox/>
        </div>
      </div>
    </div>
  )
}

export default Message