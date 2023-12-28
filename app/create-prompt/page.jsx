"use client";
import { useEffect, useState } from "react";
import Form from "@components/Form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Context } from "@components/Clients";

const CreatePrompt = () => {
  const { auth } = useContext(Context);
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    tag: "",
  });
  const submitHanler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/prompt/new",
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
          ? (toast.success(response.data.message),
            setPost({ prompt: "", tag: "" }))
          : toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth]);
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        handleSubmit={submitHanler}
      />
    </div>
  );
};

export default CreatePrompt;
