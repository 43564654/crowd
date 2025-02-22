import React from "react";

import { loader } from "../assets";

// 这是在交易时的等待界面，接受两个字符串作为参数
const Loader = ({ messageLine1, messageLine2 }) => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={loader}
        alt="loader"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        {messageLine1} <br /> {messageLine2}
      </p>
    </div>
  );
};

export default Loader;
