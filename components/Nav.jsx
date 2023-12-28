"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useContext } from "react";
import { Context } from "./Clients";
import "@styles/globals.css";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Nav = () => {
  const router = useRouter();
  const { auth, setIsAuth } = useContext(Context);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/user/logout");
      response.data.success
        ? (toast.success(response.data.message),
          router.push("/login"),
          setIsAuth(false))
        : toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {auth ? (
          <div className="flex gap-3 md:gap-5 items-center">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              className="outline_btn"
              onClick={handleLogout}
            >
              Sign Out
            </button>

            <Link href="/profile">
              <FaUserCircle />
            </Link>
          </div>
        ) : (
          <>
            <Link href="/login" className="outline_btn mx-2">
              Sign in
            </Link>
            <Link href={"/register"} className="black_btn mx-2">
              Sign up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {auth ? (
          <div className="flex items-center">
            <FaUserCircle onClick={() => setToggleDropdown(!toggleDropdown)} />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleLogout();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="outline_btn mx-2">
              Sign in
            </Link>
            <Link href={"/signup"} className="black_btn mx-2">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
