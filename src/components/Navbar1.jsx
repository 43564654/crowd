import React, { useState, useRef } from 'react';
import '../css/Navbar.css'; // 导入样式文件
import { logo, menu, thirdweb } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { CustomButton } from "./";
import { navlinks } from "../constants";

const Navbar1 = ({ theme }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const closeTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { connect, address } = useStateContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const handleMouseEnter = (menu) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  const menuItems = [
    {
      title: "功能",
      link: "/",
      subLinks: [
        { title: "购买工具", link: "/Home" },
        { title: "上传工具", link: "/CreateCampaign" },
        { title: "我的工具", link: "/PurchasedModels" },
        { title: "我的上传", link: "/profile" },
      ],
    },
    {
      title: "关于我们",
      link: "/",
      subLinks: [
        { title: "Item 1", link: "/about/sub1" },
        { title: "Item 2", link: "/about/sub2" },
      ],
    },
    {
      title: "联系我们",
      link: "/contact",
      subLinks: [
        { title: "Sub Item 1", link: "/contact/sub1" },
        { title: "Sub Item 2", link: "/contact/sub2" },
      ],
    },
  ];

  return (
    <header className="bg-gray-800 text-white p-6 w-full fixed top-0 left-0 z-50 shadow-md transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-4" />
          <span className="font-bold text-2xl">My Website</span>
        </div>

        <nav className="space-x-8 hidden sm:flex">
          <ul className="flex space-x-6">
            {menuItems.map((menuItem, index) => (
              <li
                key={index}
                onMouseEnter={() => handleMouseEnter(menuItem.title)}
                onMouseLeave={handleMouseLeave}
                className="relative"
                style={{ minWidth: '200px' }}
              >
                <a
                  href={menuItem.link}
                  className="block px-4 py-2 text-white hover:text-orange-500 transition-all duration-300 flex items-center"
                >
                  {menuItem.title}
                  <span className="ml-2 arrow-icon"></span> {/* 下方箭头 */}
                </a>
                <div
                  className={`absolute left-0 mt-2 bg-white shadow-lg transition-opacity duration-300 ${
                    activeMenu === menuItem.title ? 'block opacity-100' : 'hidden opacity-0'
                  }`}
                  style={{ minWidth: '200px' }}
                >
                  <ul className="space-y-4 m-0 p-0">
                    {menuItem.subLinks.map((subLink, idx) => (
                      <li key={idx} className="w-full">
                        <a
                          href={subLink.link}
                          className="block px-0 py-2 text-black hover:bg-orange-500 hover:text-white transition-all duration-300 rounded w-full font-kai"
                          style={{ paddingLeft: '16px', paddingRight: '16px' }}
                        >
                          {subLink.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:hidden flex items-center gap-4">
          <button
            onClick={() => setToggleDrawer(!toggleDrawer)}
            className="text-white"
          >
            <img src={menu} alt="menu" className="w-6 h-6" />
          </button>
        </div>

        <div className="sm:flex hidden flex-row justify-end gap-4">
          <CustomButton
            btnType="button"
            title={address ? "上传模型" : "登录"}
            styles={`w-full mt-2 ${theme === "dark" ? "bg-[#8c6dfd]" : "bg-blue-500"}`}
            handleClick={() => {
              if (address) navigate("create-campaign");
              else connect();
            }}
          />
          <Link to="/profile">
            <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
              <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
            </div>
          </Link>
        </div>
      </div>

      {toggleDrawer && (
        <div className="sm:hidden fixed top-0 left-0 right-0 bg-gray-800 p-4 z-40">
          <ul className="space-y-4">
            {menuItems.map((menuItem, index) => (
              <li key={index}>
                <a href={menuItem.link} className="text-white block hover:bg-gray-600 p-2 rounded">
                  {menuItem.title}
                </a>
                <ul className="space-y-4 pl-4">
                  {menuItem.subLinks.map((subLink, idx) => (
                    <li key={idx}>
                      <a href={subLink.link} className="text-white block hover:bg-gray-600 p-2 rounded font-kai">
                        {subLink.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar1;
