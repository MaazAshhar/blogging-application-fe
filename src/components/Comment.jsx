import React, { useState } from 'react'
import { IoMdSend } from 'react-icons/io';
import { addComment } from '../services/post_service';
import { useNavigate } from 'react-router-dom';

const Comment = ({comments, postId}) => {
    const navigate = useNavigate();
    const [myComment, setMyComment] = useState('');
    const [allComments, setAllComments] = useState(false);
    const handleSubmit = () => {
        const body = {content: myComment};
        addComment(postId, body)
            .then(({data}) => {
                setMyComment('');
                comments.push(data);
                navigate('/feed');
            })
            .catch((error) => console.error(error));
    }
  return (
    <>
      <div className="flex flex-col gap-2 bg-slate-50 p-3">
        <div className="rounded-2xl border flex flex-row">
          <input
            className="focus:outline-none w-full rounded-2xl p-2"
            placeholder="Write a comment"
            type="text"
            name="comment"
            id="comment"
            value={myComment}
            onChange={(e) => setMyComment(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter') handleSubmit();
            }}
          />
          <button className="mr-5" type="submit" onClick={handleSubmit}>
            <IoMdSend />
          </button>
        </div>
        {comments && (
          <div className="rounded">
            {comments.map((comment, i, allComment) => (
              <div key={i}>
                {((allComments || i===allComment.length-1) && <div
                    className="rounded-md shadow-lg border shadow-slate-50 bg-white p-2">
                    <div className='flex flex-row gap-2 p-1'>
                    <div className="rounded-full w-6 overflow-hidden items-center">
                        <img
                        src="https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg"
                        alt="profile"
                        />
                    </div>
                    {comment.user && <span className='font-medium'>{comment.user.name}</span>}
                    </div>
                    <div className='px-2'>
                        {comment.content}
                    </div>
                </div>)}
              </div>
            ))}
            {((!allComments && comments.length >= 1) && <span className='cursor-pointer text-blue-300 px-2' onClick={(e) => setAllComments(!allComments)}>Show all comments</span>)}
            {((allComments && comments.length >=1) && <span className='cursor-pointer text-blue-300 px-2' onClick={(e) => setAllComments(!allComments)}>Show less</span> )
            }
          </div>
        )}
      </div>
    </>
  );
}

export default Comment