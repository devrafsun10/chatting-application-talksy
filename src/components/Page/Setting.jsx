import Sidebar from '../Sidebar/Sidebar'
import Chatbox from '../ChatBox/Chatbox'
import Friendmsg from '../Friendmsg/Friendmsg'
import SettingInfo from '../Setting/SettingInfo'

const Setting = () => {
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