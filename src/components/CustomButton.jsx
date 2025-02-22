import React from "react";
// 自定义按钮组件
const CustomButton = ({ btnType, title, handleClick, styles, theme }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] min-h-[52px] px-4 rounded-[10px] ${
        theme === "dark" ? "text-white" : "text-black"
      } ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
