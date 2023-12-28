"use client";
import { useState, useContext, useEffect } from "react";
import Form from "@components/Form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import { Context } from "@components/Clients";
import { useRouter } from "next/navigation";
const UpdatePost = () => {
  const router = useRouter();
  const { refresh, setRefresh, auth } = useContext(Context);
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    tag: "",
  });
  const submitHanler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/prompt/action/${id}`,
        {
          prompt: post.prompt,
          tag: post.tag,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      {
        response.data.success
          ? (toast.success(response.data.message), setRefresh(!refresh))
          : (toast.error(response.data.message), router.push("/"));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getPostData = async (id) => {
      const response = await axios.get(`/api/prompt/action/${id}`);
      response.data.success
        ? setPost({
            prompt: response.data.userPrompt.prompt,
            tag: response.data.userPrompt.tag,
          })
        : (setPost({ prompt: "", tag: "" }), router.push("/login"));
    };
    getPostData(id);
  }, [auth]);

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        handleSubmit={submitHanler}
      />
    </div>
  );
};

export default UpdatePost;
