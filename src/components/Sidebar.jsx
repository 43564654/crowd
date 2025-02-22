import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context"; // 导入 useStateContext
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // 导入图标

const Icon = ({
  styles,
  name,
  imgUrl,
  isActive,
  handleClick,
  theme,
  isExpanded,
}) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center cursor-pointer ${styles}
      ${
        isActive === name
          ? theme === "dark"
            ? "bg-[#2c2f32]"
            : "bg-gray-300"
          : theme === "dark"
          ? "hover:bg-[#3a3a43]"
          : "hover:bg-gray-200"
      } 
      ${
        isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-300`} // 只控制图标显示和隐藏
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt={name}
      className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
    />
  </div>
);

const Sidebar = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true); // 控制折叠状态
  const [isActive, setIsActive] = useState("dashboard");
  const { logout } = useStateContext(); // 获取登出函数

  const handleLogout = () => {
    logout(); // 调用登出函数
    navigate("/"); // 重定向到初始主页
  };

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded); // 切换折叠状态
  };

  return (
    <div
      className={`flex justify-between items-center flex-col sticky top-5 h-[93vh] transition-all duration-300 w-[50px] 
       
      `} // 控制背景颜色和阴影效果
    >
      <Link
        to="/"
        className={`${
          isExpanded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <Icon
          styles={`w-[52px] h-[52px] ${
            theme === "dark" ? "bg-[#2c2f32]" : "bg-gray-200"
          }`}
          imgUrl={logo}
          theme={theme} // 传递 theme
          isExpanded={isExpanded} // 传递折叠状态
        />
      </Link>

      <div
        className={`flex-1 flex flex-col justify-between items-center rounded-[20px] py-4 w-[50px] mt-12 
    ${
      isExpanded
        ? theme === "dark"
          ? "bg-[#1c1c24]"
          : "bg-gray-100" //未折叠白色
        : theme === "dark"
        ? "bg-[#13131a]"
        : "bg-white" //折叠白色
    }`} // 根据 isExpanded 状态和主题动态应用背景颜色
      >
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              theme={theme} // 传递 theme
              isExpanded={isExpanded} // 传递折叠状态
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  if (link.name === "logout") {
                    handleLogout();
                  } else {
                    navigate(link.link);
                  }
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles={`${
            theme === "dark"
              ? "bg-[#1c1c24]" // Dark 模式下的背景颜色
              : "bg-gray-150" // Light 模式下的背景颜色
          } hover:${
            theme === "dark"
              ? "bg-[#2c2f32] shadow-secondary" // hover 时在 dark 模式下显示阴影
              : "bg-gray-300 shadow-secondary" // hover 时在 light 模式下显示阴影
          }`}
          imgUrl={sun}
          handleClick={toggleTheme} // 点击时切换主题
          theme={theme}
          isActive={false} // 强制传递为 notActive
          isExpanded={isExpanded} // 传递折叠状态
        />
      </div>

      {/* 折叠/展开按钮 */}
      <div
        className={`p-2 cursor-pointer ${
          theme === "dark" ? "bg-[#2c2f32]" : "bg-gray-100"
        } rounded-full mt-4`}
        onClick={handleToggleSidebar} // 处理折叠切换
      >
        {isExpanded ? (
          <FiChevronLeft size={24} />
        ) : (
          <FiChevronRight size={24} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
