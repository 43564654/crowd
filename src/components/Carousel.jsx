import React from "react";
import { useState, useEffect } from "react";

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
    <div className="relative w-full h-[400px] mx-auto overflow-hidden mt-[100px]"> {/* 向下移动轮播图 */}
      {/* 轮播图片 */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 h-[400px]"> {/* 保证宽度适应 */}
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

export default Carousel;
