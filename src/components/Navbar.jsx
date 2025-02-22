import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { CustomButton, Loader } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";

const Navbar = ({ theme, toggleTheme }) => {
  // 接收 theme 和 toggleTheme
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address, getAllModelsInfo, getSalesByIds } =
    useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [aiInput, setAiInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (searchTerm.includes("category:")) {
      const category = searchTerm.split("category:")[1].trim();
      navigate("/search-results", {
        state: { type: "category", query: category },
      });
    } else if (searchTerm.includes("price:")) {
      const [minPrice, maxPrice] = searchTerm
        .split("price:")[1]
        .trim()
        .split("-");
      navigate("/search-results", {
        state: { type: "price", query: { minPrice, maxPrice } },
      });
    }
  };

  const handleAIInteraction = async () => {
    setIsLoading(true);
    try {
      const modelsInfo = await getAllModelsInfo();
      const modelsText = modelsInfo
        .map((model) => {
          const id = parseInt(model.id._hex, 16);
          const description = model.description;
          const category = model.category;
          const price = ethers.utils.formatUnits(model.price, "ether");
          return `编号: ${id}, 描述: ${description}, 种类: ${category}, 价格: ${price}`;
        })
        .join("\n");

      const message = `请根据以下提供的模型信息推荐适合用户需求的模型。\n${modelsText}\n用户需求：${aiInput}\n请仅返回一个包含推荐的模型ID的JSON数组，例如：{"recommended_ids": [0, 1]}。不要添加额外的文本。此外，请确保你推荐的模型符合用户的要求，谢谢你。`;

      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      console.log(response)

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (!data || !data.response || !data.response.recommended_ids) {
        throw new Error("Invalid data structure from server response");
      }

      const recommendedSaleIds = data.response.recommended_ids;

      console.log(recommendedSaleIds);

      const recommendedSales = await getSalesByIds(recommendedSaleIds);
      console.log(recommendedSales);

      navigate("/ai-search-show", {
        state: { recommendedIds: recommendedSaleIds },
      });
    } catch (error) {
      console.error("Error interacting with AI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Loader messageLine1="正在检索中" messageLine2="请稍候..." />
      )}
      <div
        className={`flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <div
          className={`lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] rounded-[100px] ${
            theme === "dark" ? "bg-[#1c1c24]" : "bg-gray-100"
          }`}
        >
          <input
            type="text"
            placeholder="搜索 (例如: category:AI 或 price:0.1-1)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] ${
              theme === "dark"
                ? "text-white bg-transparent"
                : "text-black bg-transparent"
            } outline-none`}
          />
          <div
            className={`w-[72px] h-full rounded-[20px] flex justify-center items-center cursor-pointer ${
              theme === "dark" ? "bg-[#4acd8d]" : "bg-[#4acd8d]"
            }`}
            onClick={handleSearch}
          >
            <img
              src={search}
              alt="搜索"
              className="w-[15px] h-[15px] object-contain"
            />
          </div>
        </div>

        <div
          className={`lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] rounded-[100px] ${
            theme === "dark" ? "bg-[#1c1c24]" : "bg-gray-100"
          }`}
        >
          <input
            type="text"
            placeholder="不知道使用什么工具？我是小智，和我描述你的需求吧！"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            className={`flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] ${
              theme === "dark"
                ? "text-white bg-transparent"
                : "text-black bg-transparent"
            } outline-none`}
          />
          <div
            className={`w-[72px] h-full rounded-[20px] flex justify-center items-center cursor-pointer ${
              theme === "dark" ? "bg-[#4acd8d]" : "bg-[#4acd8d]"
            }`}
            onClick={handleAIInteraction}
          >
            <img
              src={search}
              alt="交互"
              className="w-[15px] h-[15px] object-contain"
            />
          </div>
        </div>

        <div className="sm:flex hidden flex-row justify-end gap-4">
          <CustomButton
            btnType="button"
            title={address ? "上传模型" : "登录"}
            styles={`w-full mt-2 ${
              theme === "dark" ? "bg-[#8c6dfd]" : "bg-blue-500"
            }`}
            handleClick={() => {
              if (address) navigate("create-campaign");
              else connect();
            }}
          />

          <Link to="/profile">
            <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
              <img
                src={thirdweb}
                alt="user"
                className="w-[60%] h-[60%] object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Small screen navigation */}
        <div className="sm:hidden flex justify-between items-center relative">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={logo}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>

          <img
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />

          <div
            className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
              !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
            } transition-all duration-700`}
          >
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${
                    isActive === link.name && "bg-[#3a3a43]"
                  }`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${
                      isActive === link.name ? "grayscale-0" : "grayscale"
                    }`}
                  />
                  <p
                    className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                      isActive === link.name
                        ? "text-[#1dc071]"
                        : "text-[#808191]"
                    }`}
                  >
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex mx-4">
              <CustomButton
                btnType="button"
                title={address ? "创建活动" : "连接"}
                styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
                handleClick={() => {
                  if (address) navigate("create-campaign");
                  else connect();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
