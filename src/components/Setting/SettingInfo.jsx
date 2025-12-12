import React, { useState } from "react";
import profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
// import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";
import { userNameUpdate, userStatusUpdate } from "../../slices/userSlice";
import { getAuth } from "firebase/auth";

const SettingInfo = () => {
  const db = getDatabase();
    const auth = getAuth();
  const dispatch = useDispatch();
  const data = useSelector((selector) => selector?.userInfo?.value?.user);

  const [show, setShow] = useState(false);
  const [showDisplayName, setShowDisplayName] = useState(data?.displayName);

  const [showStatus, setShowStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(data?.status);

  const handleEditNameShow = () => {
    setShow(!show);
  };

  const handleEditName = () => {
    console.log(showDisplayName);
    // updateProfile(auth.currentUser, {
    //   displayName: showDisplayName,
    // });

    update(ref(db, "users/" + data.uid), {
      username: showDisplayName,
      // email: data.email
    }).then(() => {
      dispatch(userNameUpdate(showDisplayName));
    });
  };

  const handleStatusShow = () => {
    setShowStatus(!showStatus);
  };

  const handleStatus = () => {
    console.log(newStatus);
     if (auth.currentUser) {
      set(ref(db, 'users/' + data?.uid + "/status"), newStatus)
        .then(() => {
          dispatch(userStatusUpdate(newStatus))
        })
        .catch(err => console.log(err))
    }

    setNewStatus("")
  }

  return (
    <div className="font-tertiary  shadow p-5 mt-10 w-[700px] rounded-lg">
      <h2 className="font-semibold text-5xl">Profile Settings</h2>
      <div className="flex items-center gap-x-5 mt-20 border-b-2 py-5 border-black/25">
        <img className="w-[100px]" src={profile} alt="" />
        <div>
          <p className="font-semibold text-2xl mb-2">{data?.displayName}</p>
          <p>{data?.status}</p>
        </div>
      </div>
      <div className="py-10">
        <p
          onClick={handleEditNameShow}
          className="font-semibold text-lg  mb-2 cursor-pointer hover:text-violet-600 duration-300"
        >
          Edit Profile Name.
        </p>
        {show && (
          <div>
            <input
              onChange={(e) => setShowDisplayName(e.target.value)}
              value={showDisplayName}
              type="text"
              placeholder={data?.displayName}
              className="border w-[300px] p-2 outline-none"
            />
            <button
              onClick={handleEditName}
              className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 font-tertiary p-2 ml-2 text-white text-lg rounded-lg cursor-pointer"
            >
              Submit
            </button>
          </div>
        )}
        <p
          onClick={handleStatusShow}
          className="font-semibold text-lg  mb-2 cursor-pointer hover:text-violet-600 duration-300"
        >
          Edit Profile Status Info.
        </p>
        {showStatus && (
          <div>
            <input
              onChange={(e) => setNewStatus(e.target.value)}
              value={newStatus}
              type="text"
              placeholder="update status"
              className="border w-[300px] p-2 outline-none"
            />

            <button
              onClick={handleStatus}
              className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 font-tertiary p-2 ml-2 text-white text-lg rounded-lg cursor-pointer"
            >
              Submit
            </button>
          </div>
        )}

        <p className="font-semibold text-lg  mb-2">Edit Profile Photo.</p>
        <p className="font-semibold text-lg  mb-2">Help.</p>
      </div>
    </div>
  );
};

export default SettingInfo;
