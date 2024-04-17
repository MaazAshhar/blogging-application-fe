import React from 'react'

const ProfileContent = ({user}) => {
  return (
    <>
    <div>
        <div className="flex justify-start items-center gap-4">
            <h1 className="font-medium">Name:</h1>
            <p className="">{user.name}</p>
        </div>
    </div>
    <div>
        <div className="flex justify-start items-center gap-4">
            <h1 className="font-medium">email:</h1>
            <p className="">{user.email}</p>
        </div>
    </div>
    <div>
        <div className="flex justify-start items-center gap-4">
            <h1 className="font-medium">phone:</h1>
            <p className="">{user.phone}</p>
        </div>
    </div>
    <div>
        <div className="flex justify-start items-center gap-4">
            <h1 className="font-medium">about:</h1>
            <p className="">{user.about}</p>
        </div>
    </div>
    <div>
        <div className="flex justify-start items-center gap-4">
            <h1 className="font-medium">city:</h1>
            <p className="">{user.city}</p>
        </div>
    </div>
    </>
  )
}

export default ProfileContent