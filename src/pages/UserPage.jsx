import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useStateContext } from "../context"; // 从上下文中获取需要的数据和函数
import { Loader } from "../components"; // 你现有的 Loader 组件

const UserStatisticsPage = ({ theme = "light" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(ethers.BigNumber.from(0)); // 初始值为 BigNumber
  const [modelsData, setModelsData] = useState([]); // 存储每个模型的详细信息

  const { address, getUserModelBuyers, getUserTotalEarnings, getUserSales } =
    useStateContext();

  const fetchStatistics = async () => {
    try {
      setIsLoading(true);

      const userBuyers = await getUserModelBuyers();
      setBuyers(userBuyers || []);

      const earnings = await getUserTotalEarnings();
      setTotalEarnings(ethers.utils.parseEther(earnings.toString()));

      const userModels = await getUserSales();
      setModelsData(userModels);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user statistics:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      console.log("请稍等...");
      fetchStatistics();
    } else {
      console.warn("地址不存在，请确保使用MetaMask进行登录.");
    }
  }, [address]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`p-8 min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">我的数据</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 显示总收益 */}
          <div
            className={`p-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">总收益</h2>
            <p className="text-3xl font-bold text-indigo-500">
              {ethers.utils.formatEther(totalEarnings)} ETH
            </p>
          </div>

          {/* 显示买家列表 */}
          <div
            className={`p-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">所有买家</h2>
            {buyers.length > 0 ? (
              <ul className="space-y-3">
                {buyers.map((buyer, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-md transition-all duration-300 hover:shadow-md ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <span className="font-medium">Buyer Address:</span> {buyer}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No buyers found yet.</p>
            )}
          </div>
        </div>

        {/* 显示每个模型的详细收入和买家信息 */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">详细收益</h2>
          {modelsData.length > 0 ? (
            modelsData.map((model, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg shadow-lg mb-8 transition-transform duration-300 transform hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{model.name}</h3>
                <p className="text-gray-500 mb-2">描述: {model.description}</p>
                <p className="text-gray-500 mb-2">
                  价格: {ethers.utils.formatEther(model.price)} ETH
                </p>
                <p className="text-gray-500 mb-2">种类: {model.category}</p>
                <p className="text-gray-500 mb-4">
                  总收益: {ethers.utils.formatEther(model.amountCollected)} ETH
                </p>

                {model.buyers.length > 0 ? (
                  <div>
                    <h4 className="font-semibold text-xl mt-4 mb-2">用户</h4>
                    <ul className="space-y-2">
                      {model.buyers.map((buyer, idx) => (
                        <li
                          key={idx}
                          className={`p-3 rounded-md transition-all duration-300 hover:shadow-md ${
                            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <span className="font-medium">地址:</span> {buyer}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500">该模型还没有用户购买.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No models found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsPage;