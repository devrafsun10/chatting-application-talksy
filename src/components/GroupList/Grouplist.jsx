import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import friendreunion from "../../assets/friendreunion.png";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
// import friendsforever from '../../assets/friendsforever.png'
// import cousins from '../../assets/cousins.png'

const Grouplist = () => {
  const data = useSelector((selector) => selector?.userInfo?.value?.user);
  const db = getDatabase();
  const [groupName, setGroupName] = useState("");
  const [groupTagline, setGrouptagline] = useState("");
  const [show, setShow] = useState(false);
  const [groupNameError, setGroupnameError] = useState("");
  const [groupTaglineError, setGroupTaglineError] = useState("");
  const [groupList, setGroupList] = useState([]);

  const handleToggle = () => {
    setShow(!show);
  };

  const handleCreategroup = () => {
    console.log(groupName);
    console.log(groupTagline);

    if (!groupName) {
      setGroupnameError("Group name is required");
    }
    if (!groupTagline) {
      setGroupTaglineError("Group tagline is recuired");
    }
    if (groupName && groupTagline) {
      set(push(ref(db, "grouplist/")), {
        groupName: groupName,
        groupTagline: groupTagline,
        groupCreator: data.uid,
      });
    }
    if (groupName && groupTagline){

        setGroupName("");
        setGrouptagline("");
        setShow(false);
    }
    
  };
  useEffect(() => {
    const grouplistRef = ref(db, "grouplist/");
    onValue(grouplistRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if(item.val().groupCreator !== data.uid){

            arr.push(item.val());
        }
      });
      setGroupList(arr);
    });
  }, []);

  console.log(groupList);

  return (
    <div className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-[21px] w-[430px] rounded-[20px] my-[33px] ">
      <div className="flex items-center justify-between">
        <h1 className=" font-tertiary font-semibold text-[20px]">
          Groups List
        </h1>
        {/* <BsThreeDotsVertical className='cursor-pointer' /> */}
        <div>
          {show ? (
            <button
              onClick={handleToggle}
              className=" bg-blue-950 text-white rounded px-2 py-1 font-secondary font-bold cursor-pointer"
            >
              Go back
            </button>
          ) : (
            <button
              onClick={handleToggle}
              className=" bg-[#1E1E1E] text-white rounded px-2 py-1 font-secondary font-bold cursor-pointer"
            >
              Create group
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-scroll h-[347px]">
        {show ? (
          <div className=" pt-10 absolute  left-[14%] top-[15%] bg-yellow-50 h-[300px] w-[400px] rounded-md shadow-lg">
            <div className="p-3">
              <input
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                  setGroupnameError("");
                }}
                className="border-2 px-2 rounded-md py-2 w-full  outline-none"
                type="text"
                placeholder="group name"
              />
              <p className="mt-[10px] font-primary font-semibold text-[16px] text-rose-600">
                {groupNameError}
              </p>
              <input
                value={groupTagline}
                onChange={(e) => {
                  setGrouptagline(e.target.value);
                  setGroupTaglineError("");
                }}
                className="border-2 px-2 rounded-md py-2 w-full my-5 outline-none"
                type="text"
                placeholder="group tagline"
              />
              <p className="mb-[10px] font-primary font-semibold text-[16px] text-rose-600">
                {groupTaglineError}
              </p>
              <button
                onClick={handleCreategroup}
                className="bg-[#1E1E1E] text-white rounded px-2 py-2 font-secondary font-bold cursor-pointer w-full"
              >
                Create
              </button>
            </div>
          </div>
        ) : (
          <div>
            {groupList.map((item) => (
              <div className="relative flex justify-between items-center mt-[17px] border-b-2 border-black/25">
                <div className="mb-2">
                  <img src={friendreunion} alt="#hjh" />
                </div>

                <div className="ml-[14px]">
                  <p className=" font-tertiary font-semibold text-[18px]">
                    {item.groupName}
                  </p>
                  <p className="font-tertiary font-medium text-[14px] text-[#4D4D4D]/75">
                    {item.groupTagline}
                  </p>
                </div>
                <button className=" font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]">
                  Join
                </button>
              </div>
            ))}
          </div>
        )}

        {/* <div className='relative flex justify-between items-center mt-[17px] border-b-2 border-black/25'>
            <div className='mb-2'>
                <img src={friendsforever} alt="#hjh" />
            </div>

            <div className='ml-[14px]'>
                <p className=' font-tertiary font-semibold text-[18px]'>Friends Reunion</p>
                <p className='font-tertiary font-medium text-[14px] text-[#4D4D4D]/75'>Hi Guys, Wassup!</p>
            </div>
                <button className=' font-tertiary font-semibold text-[20px] text-white bg-[#1E1E1E] px-[22px] rounded-[5px] cursor-pointer ml-[51px]'>Join</button>
        </div> */}

        {/* <div className='relative flex justify-between items-center mt-[17px]'>
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
        </div> */}
      </div>
    </div>
  );
};

export default Grouplist;
