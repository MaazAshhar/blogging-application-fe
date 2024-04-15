import React, { useEffect, useState } from 'react'
import FeedContent from '../../components/FeedContent'
import { Navigate, useNavigate } from 'react-router-dom';

const Feed = ({getPost}) => {
  const [allPost, setAllPost] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getPost()
      .then(({data}) => {
        setAllPost(data.content);
      })
      .catch((error) => console.error(error));
  }, [getPost])
  
  return (
    <>
        {allPost.length === 0 && (<div className='flex flex-col rounded items-center justify-center mx-auto w-[200px] h-fit mt-20 shadow p-6 gap-y-12'>
          <p className='font-semibold'>No post available</p>
          <button className="bg-green-600 text-white hover:scale-105 hover:bg-green-500 duration-300 rounded-full px-4 py-2" onClick={() => (navigate('/create-post'))}>Post now</button>
        </div>)}
        <div className="flex flex-col gap-6 my-5">
          {allPost.map((post, index) => (<FeedContent title={post.title} content={post.content} user={post.user} comments={post.comments} postId={post.postId} key={index} />))}
        </div>
    </>
  )
}

export default Feed