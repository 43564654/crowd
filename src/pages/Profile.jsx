import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { DisplayMyModel, Loader } from "../components";
import { useStateContext } from "../context";

const Profile = ({ theme }) => {
  // 接收 theme 作为 prop
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate(); // 使用 useNavigate 钩子来实现导航

  const { address, contract, getUserSales } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserSales();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const handleEditClick = (campaign) => {
    navigate(`/model/edit/${campaign.saleId}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <DisplayMyModel
        title="我所上传的数字科研工具"
        isLoading={isLoading}
        campaigns={campaigns}
        handleEdit={handleEditClick}
        currentUser={address} // 传递当前用户
        theme={theme} // 传递 theme 给 DisplayMyModel
      />
    </>
  );
};

export default Profile;
