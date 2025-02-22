import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const SearchModelsShow = ({ theme }) => {
  // 接收 theme 作为 prop
  const { state } = useLocation();
  const { getModelsByCategory, getModelsByPriceRange, contract } =
    useStateContext();
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchModels = async () => {
    setIsLoading(true);
    try {
      let result = [];
      if (state.type === "category") {
        result = await getModelsByCategory(state.query);
      } else if (state.type === "price") {
        const { minPrice, maxPrice } = state.query;
        result = await getModelsByPriceRange(minPrice, maxPrice);
      }

      // 调试输出，检查返回的数据结构
      console.log("Fetched models:", result);

      setModels(result);
    } catch (error) {
      console.error("Failed to fetch models", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchModels();
    }
  }, [contract, state]);

  return (
    <DisplayCampaigns
      title="Search Results"
      isLoading={isLoading}
      campaigns={models}
      theme={theme} // 将 theme 传递给 DisplayCampaigns
    />
  );
};

export default SearchModelsShow;
