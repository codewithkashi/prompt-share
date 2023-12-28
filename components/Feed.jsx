"use client";
import { useState, useEffect, useContext } from "react";
import PromptCard from "./PromptCard";
import axios from "axios";
import { Context } from "./Clients";
import { useRouter } from "next/navigation";

const Feed = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [tempPosts, setTempPosts] = useState([]);
  const { auth, setIsAuth, posts, setPosts, refresh } = useContext(Context);
  const handlerSearchChange = (e) => {
    if (e?.target.value.length === 0) {
      setPosts(tempPosts);
      return;
    }
    const filteredPosts = tempPosts.filter((item) => {
      const { prompt, tag, creator } = item;
      return (
        prompt.includes(searchText) ||
        tag.includes(searchText) ||
        creator.includes(searchText)
      );
    });
    setPosts(filteredPosts);
  };

  const handleTagClick = (data) => {
    const filteredPosts = tempPosts.filter((item) => item.tag === data);
    setSearchText(data);
    setPosts(filteredPosts);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/prompt/all");
      response.data.success
        ? (setPosts(response.data.allPosts),
          setIsAuth(true),
          setTempPosts(response.data.allPosts))
        : (setPosts([]), router.push("/login"), setIsAuth(false));
    };
    fetchPosts();
  }, [refresh, auth]);

  return (
    <section className="feed">
      <form className="realtive w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            handlerSearchChange(e);
          }}
          className="search_input peer"
        />
      </form>
      <div className="mt-16 prompt_layout ">
        {posts.map((e) => (
          <PromptCard key={e._id} post={e} handleTagClick={handleTagClick} />
        ))}
      </div>
    </section>
  );
};

export default Feed;
