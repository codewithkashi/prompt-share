"use client";
import { useEffect, useContext } from "react";
import { Context } from "@components/Clients";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import axios from "axios";
import { toast } from "react-hot-toast";

const Me = () => {
  const { auth, setIsAuth, posts, user, setUser, userPosts, setUserPosts } =
    useContext(Context);
  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        response.data.success
          ? (setUser(response.data.user), setIsAuth(true))
          : (setUser({}), router.push("/login"));
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    try {
      setUserPosts(posts.filter((post) => post.creator === user.username));
    } catch (error) {}
  }, [auth, posts, user]);
  return (
    <div>
      <Profile
        name={user?.username}
        desc="Welcome to your personalized profile page"
        data={userPosts}
      />
    </div>
  );
};

export default Me;
