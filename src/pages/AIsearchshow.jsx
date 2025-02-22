import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DisplayCampaigns, Loader } from "../components"; // 导入 Loader 组件
import { useStateContext } from "../context";

const AISearchShow = () => {
  const { state } = useLocation();
  const { getSalesByIds, contract } = useStateContext();
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(state)

  const fetchModels = async () => {
    setIsLoading(true);
    try {
      const result = await getSalesByIds(state.recommendedIds);
      console.log("Fetched models:", result);
      setModels(result);
    } catch (error) {
      console.error("Failed to fetch models", error);
    }
    setIsLoading(false);
  };

/*   useEffect(() => {
    if (contract && state.recommendedIds) {
      fetchModels();
    }
  }, [contract, state]); */

  useEffect(() => {
    console.log('Recommended IDs:', state.recommendedIds);
    console.log('Contract:', contract);
    if (contract && state.recommendedIds) {
      fetchModels();
    }
  }, [contract, state]);

  return (
    <>
      {isLoading && <Loader />} {/* 在加载过程中显示 Loader */}
      <DisplayCampaigns
        title="hello"
        isLoading={isLoading}
        campaigns={models}
      />
    </>
  );
};

export default AISearchShow;
