import React from "react";
import { tagType, thirdweb } from "../assets";
import { ethers } from "ethers";

const FundCard = ({
  owner,
  name,
  description,
  image,
  price,
  rating,
  category,
  address,
  handleClick,
  handleEdit,
  theme, // 接收 theme 作为 prop
}) => {
  const formattedPrice = ethers.utils.formatEther(price); // 格式化价格
  const formattedRating = rating.toString(); // 确保rating是字符串

  return (
    <div
      className={`sm:w-[288px] w-full rounded-[15px] cursor-pointer ${
        theme === "dark" ? "bg-[#1c1c24]" : "bg-white"
      }`}
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p
            className={`ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] ${
              theme === "dark" ? "text-[#808191]" : "text-gray-600"
            }`}
          >
            {category}
          </p>
        </div>

        <div className="block">
          <h3
            className={`font-epilogue font-semibold text-[16px] text-left leading-[26px] truncate ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {name}
          </h3>
          <p
            className={`mt-[5px] font-epilogue font-normal text-left leading-[18px] truncate ${
              theme === "dark" ? "text-[#808191]" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4
              className={`font-epilogue font-semibold text-[14px] leading-[22px] ${
                theme === "dark" ? "text-[#b2b3bd]" : "text-black"
              }`}
            >
              {formattedPrice} ETH
            </h4>
            <p
              className={`mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate ${
                theme === "dark" ? "text-[#808191]" : "text-gray-600"
              }`}
            >
              价格
            </p>
          </div>
          <div className="flex flex-col">
            <h4
              className={`font-epilogue font-semibold text-[14px] leading-[22px] ${
                theme === "dark" ? "text-[#b2b3bd]" : "text-black"
              }`}
            >
              {formattedRating}
            </h4>
            <p
              className={`mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate ${
                theme === "dark" ? "text-[#808191]" : "text-gray-600"
              }`}
            >
              评分
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div
            className={`w-[30px] h-[30px] rounded-full flex justify-center items-center ${
              theme === "dark" ? "bg-[#13131a]" : "bg-gray-200"
            }`}
          >
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p
            className={`flex-1 font-epilogue font-normal text-[12px] truncate ${
              theme === "dark" ? "text-[#808191]" : "text-gray-600"
            }`}
          >
            by{" "}
            <span
              className={`${
                theme === "dark" ? "text-[#b2b3bd]" : "text-black"
              }`}
            >
              {owner}
            </span>
          </p>
          {owner === address && (
            <button
              className={`text-[#b2b3bd] bg-[#1dc071] p-2 rounded-md ${
                theme === "dark" ? "bg-[#1dc071]" : "bg-green-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundCard;
