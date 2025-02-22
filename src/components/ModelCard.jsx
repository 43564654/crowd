import React from "react";
import { tagType, thirdweb } from "../assets";
import { ethers } from "ethers";

const ModelCard = ({
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
  status, // 添加 status 作为 prop
}) => {
  const BigNumber = ethers.BigNumber;
  const formattedPrice = ethers.utils.formatEther(price); // 在这里进行格式化
  const formattedRating = rating.toString(); // 确保 rating 也是字符串
  const targetStatus = BigNumber.from(1216); // 创建一个目标状态的 BigNumber
  console.log(status.toString());
  console.log(name);
  console.log("我要开始调试了");
  // 根据 status 值定义状态信息和对应的样式
  const getStatusLabel = () => {
    switch (status._hex) {
      case "0x00":
        return {
          label: "未审核",
          color: theme === "dark" ? "bg-yellow-500" : "bg-yellow-300",
        };
      case "0x01":
        return {
          label: "审核通过",
          color: theme === "dark" ? "bg-green-500" : "bg-green-300",
        };
      case "0x02":
        return {
          label: "不合规,请重新修改",
          color: theme === "dark" ? "bg-red-500" : "bg-red-300",
        };
      default:
        return {
          label: "出错了，请联系管理员",
          color: theme === "dark" ? "bg-red-500" : "bg-red-300",
        };
    }
  };

  const { label, color } = getStatusLabel(); // 获取状态标签和颜色

  return (
    <div
      className={`sm:w-[288px] w-full rounded-[15px] cursor-pointer ${
        theme === "dark" ? "bg-[#1c1c24]" : "bg-white"
      }`}
      onClick={handleEdit}
    >
      <img
        src={image}
        alt="model"
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
            className={`font-epilogue font-semibold text-[16px] leading-[26px] truncate text-left ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {name}
          </h3>
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

        {/* 状态显示部分 */}
        <div
          className={`mt-[15px] p-2 rounded-md text-center font-semibold text-white ${color}`}
        >
          {label}
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
              className={`p-2 rounded-md ${
                theme === "dark"
                  ? "bg-[#1dc071] text-[#b2b3bd]"
                  : "bg-green-500 text-black"
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

export default ModelCard;
