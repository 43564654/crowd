import React from "react";

// 定义一个通用的表单输入组件，可以是文本输入框或文本区域
const FormField = ({
  labelName, // 表单标签名称
  placeholder, // 输入框提示信息
  inputType, // 输入框类型
  isTextArea, // 是否为文本区域
  value, // 输入框的值
  handleChange, // 输入值变化时的处理函数
  theme, // 接收主题信息
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span
          className={`font-epilogue font-medium text-[14px] leading-[22px] mb-[10px] ${
            theme === "dark" ? "text-[#808191]" : "text-gray-700"
          }`}
        >
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] rounded-[10px] sm:min-w-[300px] ${
            theme === "dark"
              ? "border-[#3a3a43] bg-transparent text-white placeholder:text-[#4b5264]"
              : "border-gray-300 bg-white text-black placeholder:text-gray-400"
          }`}
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] rounded-[10px] sm:min-w-[300px] ${
            theme === "dark"
              ? "border-[#3a3a43] bg-transparent text-white placeholder:text-[#4b5264]"
              : "border-gray-300 bg-white text-black placeholder:text-gray-400"
          }`}
        />
      )}
    </label>
  );
};

export default FormField;
