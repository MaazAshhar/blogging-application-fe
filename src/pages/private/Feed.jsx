import React, { useEffect, useRef, useState } from "react";
import FeedContent from "../../components/FeedContent";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../auth";
import { toast } from "react-toastify";
import { addComment, deletePost } from "../../services/post_service";
import swal from "sweetalert";

const Feed = ({ getPost, wantDeleteButton = false }) => {
  const parentFeed = useRef();
  const [allPost, setAllPost] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    getPost()
      .then(({ data }) => {
        setAllPost(data.content);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("unauthorized please login again");
          doLogout(() => navigate("/"));
        }
      });
  }

  const handleDelete = async(postId) => {
    const confirm = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete the post?",
      icon: "warning",
      buttons: true
    });
    if (confirm) {
      deletePost(postId)
        .then(({data}) => {
          toast.success('Post deleted successfully');
          fetchData();
        })
        .catch(error => console.error(error));
    }
  }

  const addCommentToPost = async(postId, body) => {
    addComment(postId, body)
        .then(({data}) => {
          fetchData();
        })
        .catch((error) => console.error(error));
  }

  return (
    <>
      {allPost.length === 0 && (
        <div className="flex flex-col rounded items-center justify-center mx-auto w-[200px] h-fit mt-20 shadow p-6 gap-y-12">
          <p className="font-semibold">No post available</p>
          <button
            className="bg-green-600 text-white hover:scale-105 hover:bg-green-500 duration-300 rounded-full px-4 py-2"
            onClick={() => navigate("/create-post")}>
            Post now
          </button>
        </div>
      )}
      <div className="flex flex-col gap-6 my-5" ref={parentFeed}>
        {/* all post */}
        {allPost.map((post, index) => (
            <FeedContent
              title={post.title}
              content={post.content}
              user={post.user}
              comments={post.comments}
              postId={post.postId}
              wantDeleteButton={wantDeleteButton}
              handleDelete={handleDelete}
              addCommentToPost={addCommentToPost}
              key={index}
            />
          ))}
      </div>
    </>
  );
};

export default Feed;
