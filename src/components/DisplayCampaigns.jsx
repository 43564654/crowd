import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { loader } from "../assets";
import { ethers } from "ethers";

const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns,
  handleEdit,
  currentUser,
  theme, // 接收 theme 作为 prop
}) => {
  const navigate = useNavigate();
  const BigNumber = ethers.BigNumber;
  const targetStatus = BigNumber.from(1); // 创建一个目标状态的 BigNumber

  // 打印原始数据
  console.log('Campaigns:', campaigns);

  // 过滤出符合条件的模型（例如：状态为 1 的）
  const filteredCampaigns = campaigns.filter((campaign) => {
    // 确保 campaign.status 存在并且是 BigNumber
    if (campaign.status && BigNumber.isBigNumber(campaign.status)) {
      // 使用 eq() 方法比较 BigNumber
      return campaign.status.eq(targetStatus); // 比较 status 是否等于 1
    }
    return false;
  });

  console.log('Filtered Campaigns:', filteredCampaigns); // 打印过滤后的模型数据

  // 导航到详细页面
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1
        className={`font-epilogue font-semibold text-[18px] text-left ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {title} ({filteredCampaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && filteredCampaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            抱歉，本链目前还没有模型上传
          </p>
        )}

        {!isLoading && filteredCampaigns.length > 0 && (
          <div className="grid grid-cols-4 gap-4">
            {filteredCampaigns.map((campaign) => (
              <FundCard
                key={uuidv4()} // 保证每个卡片有唯一的 key
                {...campaign} // 传递单个 campaign 对象的所有属性
                handleClick={() => handleNavigate(campaign)}
                handleEdit={handleEdit ? () => handleEdit(campaign) : null}
                currentUser={currentUser}
                theme={theme} // 传递 theme 给 FundCard
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
