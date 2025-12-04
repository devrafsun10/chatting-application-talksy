import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import frnd1 from '../../assets/friend1.png'
import { useSelector } from 'react-redux';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
// import frnd2 from '../../assets/friend2.png'
// import frnd3 from '../../assets/friend3.png'
// import frnd4 from '../../assets/friend4.png'

const BlockedUser = () => {

   const data = useSelector((selector) => (selector?.userInfo?.value?.user))
   const db = getDatabase()
   const [blockList, setBlockList] = useState([])

    useEffect(() => {
           const blockRef = ref(db, "block");
           onValue(blockRef, (snapshot) => {
             let arr = [];
             snapshot.forEach((item) => {
              
              if( data.uid == item.val().blockById){

                arr.push({...item.val(),key: item.key});
              }
             });
            setBlockList(arr);
           });
         }, []);
         console.log(blockList);

         const handleUnblock = (item) => {
          console.log(item);
          remove(ref(db, "block/" + item.key))
          
         }

  return (
     <div className='shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-[21px] w-[410px] rounded-[20px] my-[33px]  '>
                         <div className='flex items-center justify-between'>
                            <h1 className=' font-tertiary font-semibold text-[20px]'>Block User</h1>
                            <BsThreeDotsVertical className='cursor-pointer' />
                        </div>
                
                        <div className='overflow-y-scroll h-[347px]'>
                          {
                            blockList.map((item)=>(
                               <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
                            
                            <div className='flex'>
                                <div className='mb-2 mr-[10px]'>
                                <img src={frnd1} alt="#hjh" />
                            </div>
                
                            <div className='ml-[14px]'>
                                <p className=' font-tertiary font-semibold text-[14px]'> {item.blockedName}</p>
                                <p className='font-tertiary font-medium text-[10px] text-[#4D4D4D]/75'>Dinner?</p>
                            </div>
                            </div>
                                
                               <div className=' cursor-pointer'>
                                 <button onClick={()=>handleUnblock(item)}
                                  className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] ml-[51px]'>unblock</button>
                               </div>
                                
                        </div>
                            ))
                          }
                            
                         {/* <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
                           <div className='flex'>
                             <div className='mb-2 mr-[10px]'>
                                <img src={frnd2} alt="#hjh" />
                            </div>
                
                            <div className='ml-[14px]'>
                                <p className=' font-tertiary font-semibold text-[14px]'>Swathi</p>
                                <p className='font-tertiary font-medium text-[10px] text-[#4D4D4D]/75'>Sure!</p>
                            </div>
                           </div>
                                 <div className=' cursor-pointer'>
                                 <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] ml-[51px]'>unblock</button>
                               </div>
                        </div>
                         <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
                           <div className='flex'>
                             <div className='mb-2 mr-[10px]'>
                                <img src={frnd3} alt="#hjh" />
                            </div>
                
                            <div className='ml-[14px]'>
                                <p className=' font-tertiary font-semibold text-[14px]'>Kiran</p>
                                <p className='font-tertiary font-medium text-[10px] text-[#4D4D4D]/75'>Hi.....</p>
                            </div>
                           </div>
                                <div className=' cursor-pointer'>
                                 <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] ml-[51px]'>unblock</button>
                               </div>
                        </div>
                         <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
                           <div className='flex'>
                             <div className='mb-2 mr-[10px]'>
                                <img src={frnd4} alt="#hjh" />
                            </div>
                
                            <div className='ml-[14px]'>
                                <p className=' font-tertiary font-semibold text-[14px]'>Tejeshwini C</p>
                                <p className='font-tertiary font-medium text-[10px] text-[#4D4D4D]/75'>I will call him today.</p>
                            </div>
                           </div>
                               <div className=' cursor-pointer'>
                                 <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] ml-[51px]'>unblock</button>
                               </div>
                        </div>
                         <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
                           <div className='flex'>
                             <div className='mb-2 mr-[10px]'>
                                <img src={frnd4} alt="#hjh" />
                            </div>
                
                            <div className='ml-[14px]'>
                                <p className=' font-tertiary font-semibold text-[14px]'>Tejeshwini C</p>
                                <p className='font-tertiary font-medium text-[10px] text-[#4D4D4D]/75'>Hi.....</p>
                            </div>
                           </div>
                              <div className=' cursor-pointer'>
                                 <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] ml-[51px]'>unblock</button>
                               </div>
                        </div> */}
                        </div>
                
                    </div>
  )
}

export default BlockedUser