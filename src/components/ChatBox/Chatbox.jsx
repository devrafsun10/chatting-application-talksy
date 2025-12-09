import React, { useEffect, useState } from "react";
import User from "../../assets/profile.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbTriangleFilled } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";

const Chatbox = () => {
  const data = useSelector((selector) => selector?.userInfo?.value?.user);
  const db = getDatabase();
  const activeData = useSelector((state) => state.activeChatInfo.value);
  // console.log(activeData);

  const [msg, setMsg] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleMsg = () => {
    if (!msg.trim()) {
      return;
    }

    console.log(msg);
    set(push(ref(db, "msg")), {
      senderId: data.uid,
      senderName: data.displayName,
      reciverId: activeData.id,
      reciverName: activeData.name,
      message: msg,
      date: moment().format(),
    });

    setMsg("");
  };

  const [msgList, setMsgList] = useState([]);
  useEffect(() => {
    const messageRef = ref(db, "msg");
    onValue(messageRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (data.uid == item.val().senderId &&
            activeData.id == item.val().reciverId) ||
          (data.uid == item.val().reciverId &&
            activeData.id == item.val().senderId)
        )
          arr.push(item.val());
      });
      setMsgList(arr);
    });
  }, [activeData.id]);
  console.log(msgList);

  const handleEmoji = (emoji) =>{
    setMsg(msg + emoji.emoji);
  }

  return (
    <div className=" shadow-lg  px-[50px] py-[24px]  rounded-[20px] my-[33px] ">
      <div className="flex justify-between items-center border-b-2 pb-[20px]  border-black/25">
        <div className="flex items-center font-tertiary">
          <div>
            <img src={User} alt="" />
          </div>
          <div className="ml-[33px]">
            {activeData ? (
              <h2 className="font-semibold text-[24px] text-[#000000]">
                {activeData.name}
              </h2>
            ) : (
              <h2 className="font-semibold text-[24px] text-[#000000]">
                Unknown
              </h2>
            )}
            <p className="font-normal text-[14px]">Online</p>
          </div>
        </div>
        <div>
          <BsThreeDotsVertical className="text-2xl" />
        </div>
      </div>

      <div className="py-[56px] overflow-y-scroll overflow-x-hidden h-[53vh]">
        {msgList.map((item) =>
          data.uid == item.senderId ? (
            <div className="my-2 text-end">
              <div className=" relative">
                <p className="py-[13px] px-[52px] bg-[#1E1E1E] inline-block font-tertiary font-medium text-[16px] text-white rounded-lg ">
                  {item?.message}
                </p>
                <div className=" absolute bottom-[-3px] right-[-9px]">
                  <TbTriangleFilled className="text-[#1E1E1E] text-2xl" />
                </div>
              </div>
              <p className="font-tertiary font-medium text-[12px] text-black/25 mt-[5px]">
                {/* {item?.date} */}
                {moment(item?.date).fromNow()}
              </p>
            </div>
          ) : (
            <div className="my-2">
              <div className=" relative">
                <p className="py-[13px] px-[52px] bg-[#F1F1F1] inline-block font-tertiary font-medium text-[16px] rounded-lg ">
                  {item?.message}
                </p>
                <div className=" absolute bottom-[-3px] left-[-11px]">
                  <TbTriangleFilled className="text-[#F1F1F1] text-2xl" />
                </div>
              </div>
              <p className="font-tertiary font-medium text-[12px] text-black/25 mt-[5px]">
                {moment(item?.date).fromNow()}
              </p>
            </div>
          )
        )}
        {/* //sendermsg */}
        {/* <div className="my-2">
          <div className=" relative">
            <p className="py-[13px] px-[52px] bg-[#F1F1F1] inline-block font-tertiary font-medium text-[16px] rounded-lg ">
              Hey There !
            </p>
            <div className=" absolute bottom-[-3px] left-[-11px]">
              <TbTriangleFilled className="text-[#F1F1F1] text-2xl" />
            </div>
          </div>
          <p className="font-tertiary font-medium text-[12px] text-black/25 mt-[5px]">
            Today, 2:01pm
          </p>
        </div> */}
        {/* recevermsg */}
        {/* <div className="my-2 text-end">
          <div className=" relative">
            <p className="py-[13px] px-[52px] bg-[#1E1E1E] inline-block font-tertiary font-medium text-[16px] text-white rounded-lg ">
              Hello...
            </p>
            <div className=" absolute bottom-[-3px] right-[-9px]">
              <TbTriangleFilled className="text-[#1E1E1E] text-2xl" />
            </div>
          </div>
          <p className="font-tertiary font-medium text-[12px] text-black/25 mt-[5px]">
            Today, 2:01pm
          </p>
        </div> */}
        {/* <div className="my-2">
          <div className=" relative">
            <p className="py-[13px] px-[52px] bg-[#F1F1F1] inline-block font-tertiary font-medium text-[16px] rounded-lg ">
              Hey There !
            </p>
            <div className=" absolute bottom-[-3px] left-[-11px]">
              <TbTriangleFilled className="text-[#F1F1F1] text-2xl" />
            </div>
          </div>
          <p className="font-tertiary font-medium text-[12px] text-black/25 mt-[5px]">
            Today, 2:01pm
          </p>
        </div>
        <div className="my-2 text-end">
          <div className=" relative">
            <p className="py-[13px] px-[52px] bg-[#1E1E1E] inline-block font-tertiary font-medium text-[16px] text-white rounded-lg ">
              Hello...
            </p>
            <div className=" absolute bottom-[-3px] right-[-9px]">
              <TbTriangleFilled className="text-[#1E1E1E] text-2xl" />
            </div>
          </div>
          <p className="font-tertiary font-medium text-[12px] text-black/25 mt-[5px]">
            Today, 2:01pm
          </p>
        </div> */}
      </div>
      <div className="border-t-2 border-black/25 pt-[20px]">
        <div className="flex items-center">
          <div className="relative">
            <input
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              onKeyDown={(e) => {
                if (e.key === "Enter" && msg.trim()) {
                  handleMsg();
                }
              }}
              type="text"
              className=" w-[537px] rounded-[10px] bg-[#F1F1F1] outline-none p-[15px]"
            />
            <div className="flex items-center gap-[10px] absolute top-[20px] right-[15px]">
              <div className="absolute top-[-470px] right-[175px]">
                {showEmoji && <EmojiPicker onEmojiClick={(emoji)=>handleEmoji(emoji)} />}
              </div>
              <MdOutlineEmojiEmotions
                onClick={() => setShowEmoji(!showEmoji)}
                className="text-[#707070] cursor-pointer"
              />
              <CiCamera className="text-[#707070] cursor-pointer" />
            </div>
          </div>
          <div>
            <IoIosSend
              onClick={handleMsg}
              className="bg-black text-white p-[15px] text-[50px] font-bold rounded-[10px] text-center ml-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
