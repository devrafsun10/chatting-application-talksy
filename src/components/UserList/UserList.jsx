import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import frnd1 from "../../assets/friend1.png";
// import frnd2 from '../../assets/friend2.png'
// import frnd3 from '../../assets/friend3.png'
// import frnd4 from '../../assets/friend4.png'
import { MdAddBox, MdPersonRemove } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { MdBlock } from "react-icons/md";


const UserList = () => {
  const data = useSelector((selector) => selector?.userInfo?.value?.user);
  console.log(data?.uid, "UID");

  const db = getDatabase();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const useRef = ref(db, "users");
    onValue(useRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data?.uid !== item.key) {
          arr.push({ ...item?.val(), userId: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);
  console.log(userList);

  const handlefrndRequest = (item) => {
    console.log(item);

    set(push(ref(db, "frienRequest/")), {
      senderName: data.displayName,
      senderId: data?.uid,
      reciverName: item.username,
      reciverId: item.userId,
    });
  };

  const [friendRequest, setfriendRequest] = useState([]);

  useEffect(() => {
    const friendRequestRef = ref(db, "frienRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().reciverId + item.val().senderId);
      });
      setfriendRequest(arr);
    });
  }, []);
  console.log(friendRequest);
  console.log(userList);

  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, "friend");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().reciverId + item.val().senderId);
      });
      setFriendList(arr);
    });
  }, []);

  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
         arr.push(item.val().reciverId + item.val().senderId);
        // if (data.uid == item.val().reciverId || data.uid == item.val().senderId) {
        //   arr.push({ ...item.val(), key: item.key });
        // }
      });
      setBlockList(arr);
    });
  }, []);
  console.log(blockList);

  return (
    <div className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-[21px] w-[344px] rounded-[20px] my-[33px]  ">
      <div className="flex items-center justify-between">
        <h1 className=" font-tertiary font-semibold text-[20px]">User List</h1>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>

      <div className="overflow-y-scroll h-[347px]">
        {userList.map((user) => (
          <div className="relative flex justify-between items-center mt-[17px] border-b-2 border-black/25">
            <div className="flex">
              <div className="mb-2 mr-[10px]">
                <img src={frnd1} alt="#hjh" />
              </div>

              <div className="ml-[14px]">
                <p className=" font-tertiary font-semibold text-[18px]">
                  {user.username}
                </p>
                <p className="font-tertiary font-medium text-[14px] text-[#4D4D4D]/75">
                  {user.email}
                </p>
              </div>
            </div>

            {
              blockList.includes(data?.uid + user.userId) ||
              blockList.includes(user?.userId + data?.uid) ?
                 <div className="text-[20px] text-red-500 cursor-pointer">
                <MdBlock />
              </div>
              
              :
            friendList.includes(data?.uid + user.userId) ||
            friendList.includes(user?.userId + data?.uid) ? (
              <div className="text-[20px] text-green-500 cursor-pointer">
                <FaUserFriends />
              </div>
            ) : friendRequest.includes(data?.uid + user.userId) ||
              friendRequest.includes(user?.userId + data?.uid) ? (
              <div className="text-[30px] cursor-pointer">
                <MdPersonRemove />
              </div>
            ) : (
              <div className="text-[30px] cursor-pointer">
                <MdAddBox onClick={() => handlefrndRequest(user)} />
              </div>
            )}
          </div>
        ))}

        {/* <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
                   <div className='flex'>
                     <div className='mb-2 mr-[10px]'>
                        <img src={frnd2} alt="#hjh" />
                    </div>
        
                    <div className='ml-[14px]'>
                        <p className=' font-tertiary font-semibold text-[18px]'>Swathi</p>
                        <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>Today, 2:31pm</p>
                    </div>
                   </div>
                         <div className='text-[30px] cursor-pointer'>
                         <MdAddBox/>
                       </div>
                </div>
                 <div className='relative flex justify-between items-center mt-[17px]'>
                   <div className='flex'>
                     <div className='mb-2 mr-[10px]'>
                        <img src={frnd3} alt="#hjh" />
                    </div>
        
                    <div className='ml-[14px]'>
                        <p className=' font-tertiary font-semibold text-[18px]'>Kiran</p>
                        <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>Yesterday, 6:22pm</p>
                    </div>
                   </div>
                         <div className='text-[30px] cursor-pointer'>
                         <MdAddBox/>
                       </div>
                </div>
                 <div className='relative flex justify-between items-center mt-[17px]'>
                   <div className='flex'>
                     <div className='mb-2 mr-[10px]'>
                        <img src={frnd4} alt="#hjh" />
                    </div>
        
                    <div className='ml-[14px]'>
                        <p className=' font-tertiary font-semibold text-[18px]'>Tejeshwini C</p>
                        <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>Today, 12:22pm</p>
                    </div>
                   </div>
                        <div className='text-[30px] cursor-pointer'>
                         <MdAddBox/>
                       </div>
                </div>
                 <div className='relative flex justify-between items-center mt-[17px]'>
                   <div className='flex'>
                     <div className='mb-2 mr-[10px]'>
                        <img src={frnd4} alt="#hjh" />
                    </div>
        
                    <div className='ml-[14px]'>
                        <p className=' font-tertiary font-semibold text-[18px]'>Tejeshwini C</p>
                        <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>Today, 8:56pm</p>
                    </div>
                   </div>
                        <div className='text-[30px] cursor-pointer'>
                         <MdAddBox/>
                       </div>
                </div> */}
      </div>
    </div>
  );
};

export default UserList;
