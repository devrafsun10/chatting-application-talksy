import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import frnd1 from '../../assets/friend1.png'
// import frnd2 from '../../assets/friend2.png'
// import frnd3 from '../../assets/friend3.png'
// import frnd4 from '../../assets/friend4.png'
import { getDatabase, onValue,  ref } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { activeInfo } from '../../slices/activeSlice';

const Friendmsg = () => {

    const data = useSelector((selector) => (selector?.userInfo?.value?.user))
    const db = getDatabase()
    const dispatch = useDispatch()
    const [friendList, setFriendList] = useState([])

     useEffect(() => {
        const friendRef = ref(db, "friend");
        onValue(friendRef, (snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {

            if(data.uid == item.val().reciverId || data.uid == item.val().senderId){

                arr.push({...item.val(),key: item.key});
            }                   
          });
         setFriendList(arr);
        });
      },[]);
      console.log(friendList);

      const handleMsg = (item) => {
        console.log("ok",item);
        if(data.uid == item.senderId){
            dispatch(activeInfo({
                name: item.reciverName,
                id: item.reciverId
            }))
        }else{
             dispatch(activeInfo({
                name:item.senderName,
                id:item.senderId
            }))
        }
        // dispatch(activeInfo(item))
        
      }


  return (
    <div className='shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-[21px] w-[344px] rounded-[20px] my-[33px]   '>
             <div className='flex items-center justify-between'>
                <h1 className=' font-tertiary font-semibold text-[20px]'>Friends</h1>
                <BsThreeDotsVertical className='cursor-pointer' />
            </div>
    
            <div className='overflow-y-scroll h-[347px]'>
                {
                    friendList.map((item)=>(

                 <div key={item.key}
                  className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
                <div className='mb-2'>
                    <img src={frnd1} alt="#hjh" />
                </div>
    
                <div className='ml-[14px]'>
                    <p className=' font-tertiary font-semibold text-[18px]'>
                        {data.uid == item.reciverId ? item.senderName : item.reciverName}
                    </p>
                    <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>Good to see you.</p>
                </div>
                    <button
                    onClick={()=>handleMsg(item)}
                     className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]'>Message</button>
            </div>
                    ))
                }
             {/* <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
                <div className='mb-2'>
                    <img src={frnd2} alt="#hjh" />
                </div>
    
                <div className='ml-[14px]'>
                    <p className=' font-tertiary font-semibold text-[18px]'>Swathi</p>
                    <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>Hi Guys, Wassup!</p>
                </div>
                    <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]'>Join</button>
            </div>
             <div className='relative flex justify-between items-center mt-[17px]'>
                <div className='mb-2'>
                    <img src={frnd3} alt="#hjh" />
                </div>
    
                <div className='ml-[14px]'>
                    <p className=' font-tertiary font-semibold text-[18px]'>Kiran</p>
                    <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>What plans today?</p>
                </div>
                    <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]'>Join</button>
            </div>
             <div className='relative flex justify-between items-center mt-[17px]'>
                <div className='mb-2'>
                    <img src={frnd4} alt="#hjh" />
                </div>
    
                <div className='ml-[14px]'>
                    <p className=' font-tertiary font-semibold text-[18px]'>Tejeshwini C</p>
                    <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>What plans today?</p>
                </div>
                    <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]'>Join</button>
            </div> */}
            </div>
    
        </div>
  )
}

export default Friendmsg