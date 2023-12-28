"use client";
import { useState, createContext } from "react";
import { Toaster } from "react-hot-toast";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [auth, setIsAuth] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        auth,
        setIsAuth,
        posts,
        setPosts,
        user,
        setUser,
        refresh,
        setRefresh,
        userPosts,
        setUserPosts,
      }}
    >
      {children}
      <Toaster />
    </Context.Provider>
  );
};
