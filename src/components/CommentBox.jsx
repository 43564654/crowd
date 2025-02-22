import React from "react";
import { ethers } from "ethers";

const CommentBox = ({ buyer, comment, rating, theme }) => {
  // Helper function to convert BigNumber to string if needed
  const formatBigNumber = (value) => {
    return ethers.BigNumber.isBigNumber(value) ? value.toString() : value;
  };

  return (
    <div
      className={`p-4 rounded-[10px] mb-4 ${
        theme === "dark" ? "bg-[#1c1c24] text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-epilogue font-semibold text-[14px]">{buyer}</h4>
        <p
          className={`font-epilogue font-normal text-[12px] ${
            theme === "dark" ? "text-[#808191]" : "text-gray-600"
          }`}
        >
          {formatBigNumber(rating)}
        </p>
      </div>
      <p
        className={`font-epilogue font-normal text-[14px] ${
          theme === "dark" ? "text-[#808191]" : "text-gray-600"
        }`}
      >
        {comment}
      </p>
    </div>
  );
};

export default CommentBox;
