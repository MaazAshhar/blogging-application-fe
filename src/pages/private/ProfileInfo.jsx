import React, { useEffect, useState } from "react";
import { getCurrentUserDetails } from "../../auth";
import ProfileContent from "../../components/ProfileContent";

const ProfileInfo = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getCurrentUserDetails()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex flex-col h-full items-center justify-center overflow-y-scroll main-content">
      <div className="rounded-lg border shadow shadow-gray-100 p-8 m-3 w-4/5 sm:w-[400px] md:w-[500px] lg:w-[600px]">
        <h1 className="text-2xl font-medium text-center sm:mt-5 mb-3 underline">Profile Info</h1>
        <ProfileContent user={user} />
      </div>
    </div>
  );
};

export default ProfileInfo;
