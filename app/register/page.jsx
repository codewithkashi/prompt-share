"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submitHanler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      {
        response.data.success
          ? (toast.success(response.data.message), router.push("/login"))
          : toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="glassmorphism p-40 min-w-[200px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[600px]">
      <form className="" onSubmit={submitHanler}>
        <h1 className="head_text blue_gradient pb-10 text-center">Sign up</h1>
        <input
          className="search_input my-5"
          type="text"
          placeholder="Username >=8 special characters not allowed(except ._)"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="search_input my-5"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="search_input my-5 "
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col md:flex-row justify-center items-center my-10 md:space-x-5">
          <button className="outline_btn my-3">Sign up</button>
          <p className="text-gradient-700 font-semibold my-3">OR</p>{" "}
          <Link href={"/login"} className="black_btn my-3">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
