import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import {
  DisplayMypurchaseModel,
  DisplayCampaigns,
  Loader,
} from "../components";
import { useStateContext } from "../context";

const PurchasedModels = ({ theme }) => {
  // 接收 theme 作为 prop
  const [isLoading, setIsLoading] = useState(false);
  const [purchasedModels, setPurchasedModels] = useState([]);
  const navigate = useNavigate(); // 使用 useNavigate 钩子来实现导航

  const { address, contract, getSales } = useStateContext(); // 从上下文中获取函数

  // 获取并筛选已购买的模型
  const fetchPurchasedModels = async () => {
    try {
      setIsLoading(true);
      const allSales = await getSales(); // 从合约中获取所有销售数据
      console.log("All sales data:", allSales);

      // 筛选出用户已购买的模型，判断买家是否包含当前用户地址
      const filteredSales = allSales.filter((sale) =>
        sale.buyers.includes(address)
      );

      console.log("Purchased models filtered:", filteredSales);

      setPurchasedModels(filteredSales); // 更新已购买的模型状态
    } catch (error) {
      console.error("Error fetching purchased models:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract && address) {
      fetchPurchasedModels(); // 当合约和用户地址都存在时获取数据
    }
  }, [address, contract]);

  const handleViewClick = (model) => {
    console.log("进入MypurchaseModelDetails导航:", model);
    navigate(`/MypurchaseModelDetails`);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <DisplayMypurchaseModel
          title="所有已购买的模型"
          isLoading={isLoading}
          campaigns={purchasedModels} // 将筛选后的模型传递给组件
          handleEdit={handleViewClick}
          currentUser={address} // 传递当前用户地址
          theme={theme} // 将 theme 传递给 DisplayMypurchaseModel
        />
      )}
    </>
  );
};

export default PurchasedModels;
