import React from "react";

import { loader } from "../assets";
//这是在使用ai搜索时的加载动画
const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={loader}
        alt="loader"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        以按照您的需求为您搜索模型 <br /> 请稍等片刻
      </p>
    </div>
  );
};

export default Loader_ai;
