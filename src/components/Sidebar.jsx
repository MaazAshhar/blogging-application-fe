import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = ({children}) => {
    const navigate = useNavigate();
  return (
    <>
        <div className="flex flex-col sm:flex-row">
            <div className='flex flex:row sm:flex-col w-screen sm:w-[200px] lg:w-[400px] bg-orange-300 sm:min-h-screen gap-3 justify-center items-center py-3 ps-3'>
                <div className='w-[100px] lg:w-[150px] rounded-full border overflow-hidden cursor-pointer' onClick={() => {
                    navigate('/profile')
                }}>
                    <img src="https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg" alt="profile" />
                </div>
                <div className='flex flex-row sm:flex-col gap-4 w-full items-center font-medium'>
                    <Link to="/feed">Feed</Link>
                    <Link to="/create-post">Create Post</Link>
                    <Link to="/my-post">My Post</Link>
                </div>
            </div>
            <div className="w-full overflow-y-scroll max-h-screen">
                {children}
            </div>
        </div>
    </>
  )
}

export default Sidebar