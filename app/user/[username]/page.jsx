"use client";
import { useEffect, useContext, useState } from "react";
import { Context } from "@components/Clients";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

import { useParams } from "next/navigation";
const Me = () => {
  const { username } = useParams();
  const router = useRouter();
  const [profilePosts, setProfilePosts] = useState([]);
  const { auth, posts, user } = useContext(Context);
  useEffect(() => {
    if (username === user.username) return router.push("/profile");

    if (!auth) return router.push("/login");
    else {
      try {
        const filtered = posts.filter((post) => post.creator === username);
        setProfilePosts(filtered);
      } catch (error) {}
    }
  }, []);

  return (
    <div>
      <Profile
        name={username}
        desc="Welcome to your personalized profile page"
        data={profilePosts}
      />
    </div>
  );
};

export default Me;
