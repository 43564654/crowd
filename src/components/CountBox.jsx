import React from "react";
// 这是计数框，读入数据为 title 和 value
const CountBox = ({ title, value, theme }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4
        className={`font-epilogue font-bold text-[30px] p-3 rounded-t-[10px] w-full text-center truncate ${
          theme === "dark"
            ? "text-white bg-[#1c1c24]"
            : "text-black bg-gray-200"
        }`}
      >
        {value}
      </h4>
      <p
        className={`font-epilogue font-normal text-[16px] px-3 py-2 w-full rounded-b-[10px] text-center ${
          theme === "dark"
            ? "text-[#808191] bg-[#28282e]"
            : "text-gray-600 bg-gray-300"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default CountBox;
