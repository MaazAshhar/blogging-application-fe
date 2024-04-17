import React, { useEffect, useRef, useState } from "react";
import FeedContent from "../../components/FeedContent";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../auth";
import { toast } from "react-toastify";
import { addComment, deletePost } from "../../services/post_service";
import swal from "sweetalert";
import InfiniteScroll from "react-infinite-scroll-component";

const Feed = ({ getPost, wantDeleteButton = false }) => {
  const [allPost, setAllPost] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = (pageNumber=0) => {
    getPost(pageNumber)
      .then(({ data }) => {
        if (pageNumber === 0) {
          setAllPost(data.content);
        } else {
          setAllPost([...allPost, ...data.content]);
        }
        setPageNumber(data.pageNumber);
        setLastPage(data.lastPage);
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
          setPageNumber(0);
          fetchData();
        })
        .catch(error => console.error(error));
    }
  }

  const addCommentToPost = async(postId, body) => {
    addComment(postId, body)
        .then(({data}) => {
          setPageNumber(0);
          fetchData();
        })
        .catch((error) => console.error(error));
  }

  const infiniteScroll = () => {
    fetchData(pageNumber+1);
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
      <div id="scrollableDiv" className="flex flex-col gap-6 my-3 overflow-y-scroll">
        {/* all post */}
        <InfiniteScroll
          dataLength={allPost.length}
          next={infiniteScroll}
          hasMore={!lastPage}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          scrollThreshold="200px"
        >
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
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Feed;
