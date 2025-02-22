import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { loader } from "../assets";

const DisplayMypurchaseModel = ({
  title,
  isLoading,
  campaigns,
  handleEdit,
  currentUser,
  theme, // 接收 theme 作为 prop
}) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    console.log("进入MypurchaseModelDetails导航:");
    navigate(`/MypurchaseModelDetails/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1
        className={`font-epilogue font-semibold text-[18px] text-left ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {title} ({campaigns?.length || 0}) {/* 使用 ?. 确保安全访问 */}
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p
            className={`font-epilogue font-semibold text-[14px] leading-[30px] ${
              theme === "dark" ? "text-[#818183]" : "text-gray-600"
            }`}
          >
            抱歉，你还没有购买模型
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={uuidv4()} // 保证每个卡片有唯一的key
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
              handleEdit={handleEdit ? () => handleEdit(campaign) : null} // 处理编辑
              currentUser={currentUser} // 传递当前用户
              theme={theme} // 传递 theme 给 FundCard
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayMypurchaseModel;
