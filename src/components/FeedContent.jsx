import React, { useEffect, useRef, useState } from 'react'
import Comment from './Comment'

const FeedContent = ({title,content, user, comments, postId}) => {
  const postContent = useRef();
  const post = useRef();
  const [expanded, setExpanded] = useState(false);
  const [alreadyExpanded, setAlreadyExpanded] = useState(false);
  useEffect(() => {
    if (postContent.current.scrollHeight <= postContent.current.clientHeight) {
      setExpanded(true);
      setAlreadyExpanded(true);
    }
    document.addEventListener('click', (e) => {
      if(!alreadyExpanded && !post.current.contains(e.target)) {
        setExpanded(false);
      }
    })
  }, [])
  
  return (
    <div ref={post} className="flex flex-col gap-2 p-4 rounded-md mx-auto shadow-md shadow-gray-300 w-4/5 ">
        <div className="flex flex-row mt-2 px-3 gap-3 items-center">
          <div className="rounded-full w-10 overflow-hidden">
            <img src="https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg" alt="profile" />
          </div>
          {user && <span className='font-medium'>{user.name}</span>}
        </div>
        <div id="postbody" className='bg-gray-50 py-3 rounded'>
          <h1 className="font-semibold text-2xl p-3 pt-0">{title}</h1>
          <hr />
          <div className={`pt-2 px-4 cursor-default break-words ${!expanded?'max-h-[200px] overflow-hidden':''}`} dangerouslySetInnerHTML={{__html: content}} ref={postContent} />
          {!expanded && !alreadyExpanded && (<span className='text-blue-300 cursor-pointer px-3' onClick={(e) => {e.stopPropagation();setExpanded(true);}}>.....Read more</span>)}
        </div>
        <div>
          <Comment comments={comments} postId={postId} />
        </div>
    </div>
  )
}

export default FeedContent