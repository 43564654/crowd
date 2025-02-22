import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ModelCard from "./ModelCard";
import { loader } from "../assets";

const DisplayMyModel = ({
  title,
  isLoading,
  campaigns = [], // 设置默认值为空数组
  handleEdit,
  currentUser,
  theme, // 接收 theme 作为 prop
}) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/model/edit/${campaign.saleId}`);
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
            抱歉，你还没有上传数字科研工具。
          </p>
        )}

        {!isLoading && campaigns.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {campaigns.map((campaign) => (
              <ModelCard
                key={uuidv4()} // 保证每个卡片有唯一的 key
                {...campaign} // 传递单个 campaign 对象的所有属性
                handleEdit={() => handleNavigate(campaign)} // 处理编辑
                currentUser={currentUser} // 传递当前用户
                theme={theme} // 传递 theme 给 ModelCard
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayMyModel;
