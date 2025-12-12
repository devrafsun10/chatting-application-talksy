import Sidebar from '../Sidebar/Sidebar'
import Chatbox from '../ChatBox/Chatbox'
import Friendmsg from '../Friendmsg/Friendmsg'
import SettingInfo from '../Setting/SettingInfo'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const Setting = () => {
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
        <Sidebar active="setting"/>
        <div className=' w-[430px] z-[99]'>
          <SettingInfo/>
        </div>
        <div className=' w-[689px]'>
        </div>
      </div>
    </div>
  )
}
export default Setting