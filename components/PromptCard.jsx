"use client";
import { useState, useContext, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { Context } from "./Clients";
import { usePathname, redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick }) => {
  const [copied, setCopied] = useState("");
  const router = useRouter();
  const {
    auth,
    setIsAuth,
    refresh,
    setRefresh,
    posts,
    setPosts,
    userPosts,
    setUserPosts,
  } = useContext(Context);
  const pathName = usePathname();
  const handleEdit = (id) => {
    // router.push(`/update-prompt/${id}`);
    console.log(id);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/prompt/action/${id}`);
      response.data.success
        ? (toast.success(response.data.message), setRefresh(!refresh))
        : (toast.error(response.data.message), setRefresh(!refresh));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const goToProfile = (e) => {
    router.push(`/user/${e}`);
    console.log(e);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/prompt/all");
      response.data.success
        ? (setPosts(response.data.allPosts), setIsAuth(true))
        : setPosts([]);
    };
    fetchPosts();
  }, [refresh]);

  useEffect(() => {
    if (!auth) return redirect("/login");
    else {
      try {
        setUserPosts(posts.filter((post) => post.creator === user.username));
      } catch (error) {}
    }
  }, [auth, posts, userPosts]);
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <FaUserCircle />
          <h3
            className="font-satoshi font-semibold text-gray-900"
            onClick={(e) => goToProfile(post.creator)}
          >
            {post.creator}
          </h3>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt="Copy"
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {pathName == "/profile" ? (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(post._id)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PromptCard;
