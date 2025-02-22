import React, { useState, useEffect } from "react";
import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

// 轮播图组件，支持主题切换
const Carousel = ({ slides, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 每3秒切换图片
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-200 mx-auto overflow-hidden">
      {/* 轮播图片 */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 h-96">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div
              className={`absolute bottom-5 left-5 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {/* 图片上的标题 */}
              {/* <h2 className="text-xl font-bold">{slide.title}</h2> */}
            </div>
          </div>
        ))}
      </div>

      {/* 手动导航按钮 */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? slides.length - 1 : currentIndex - 1
          )
        }
      >
        {"<"}
      </button>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        onClick={() =>
          setCurrentIndex(
            currentIndex === slides.length - 1 ? 0 : currentIndex + 1
          )
        }
      >
        {">"}
      </button>
    </div>
  );
};

const Home = ({ theme }) => {
  // 接收 theme 作为 prop
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState([]);

  const { address, contract, getSales } = useStateContext();

  const fetchModels = async () => {
    setIsLoading(true);
    try {
      const data = await getSales();
      console.log("Fetched models:", data);
      setModels(data);
    } catch (error) {
      console.error("Failed to fetch models:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchModels();
    }
  }, [address, contract]);

  // 轮播图数据
  const slides = [
    {
      image:
        "https://cdn.pixabay.com/photo/2018/01/02/08/11/block-chain-3055701_1280.jpg",
      title: "Slide 1",
    },
    {
      image:
        "https://media.istockphoto.com/id/953499010/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E3%83%87%E3%83%95%E3%82%A9%E3%83%BC%E3%82%AB%E3%82%B9-blockchain-%E6%8A%80%E8%A1%93%E6%A7%8B%E9%80%A0.jpg?s=1024x1024&w=is&k=20&c=-NcPkApC905SB40JgHGTZNoH7bDENm7oYDeSF53WsLc=",
      title: "Slide 2",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2022/04/04/16/42/ai-7111802_1280.jpg",
      title: "Slide 3",
    },
  ];

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "dark" ? "bg-[#13131a] text-white" : "bg-white text-black"
      }`}
    >
      {/* 轮播图板块 */}
      <Carousel slides={slides} theme={theme} />

      {/* Display campaigns */}
      <DisplayCampaigns
        title="所有数字科研工具"
        isLoading={isLoading}
        campaigns={models}
        theme={theme} // 传递 theme 到 DisplayCampaigns
      />
    </div>
  );
};

export default Home;
