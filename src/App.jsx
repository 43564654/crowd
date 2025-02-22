import React, { useState } from "react"; // 从React库中导入React
import { Route, Routes } from "react-router-dom"; // 从react-router-dom库中导入Route和Routes组件
import { Sidebar, Navbar } from "./components"; // 从本地组件文件夹中导入Sidebar和Navbar组件
import {
  CampaignDetails,
  CreateCampaign,
  Home,
  Home1,
  Profile,
  ModelEdit,
  SearchModelsShow,
  AIsearchshow,
  PurchasedModels,
  MypurchaseModelDetails,
  UserStatisticsPage,
} from "./pages"; // 从本地页面文件夹中导入页面组件

const App = () => {
  const [theme, setTheme] = useState("dark");

  // 切换主题的方法
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    
    <div
      className={`relative sm:-8 p-4 min-h-screen flex flex-row ${
        theme === "dark" ? "bg-[#13131a] text-white" : "bg-white text-black"
      }`}
    >
      {/* 侧边栏 */}
      <div
        className={`sm:flex hidden mr-10 relative ${
          theme === "dark" ? "bg-[#13131a] text-white" : "bg-white text-black"
        }`}
      >
        <Sidebar toggleTheme={toggleTheme} theme={theme} />{" "}
        
      </div>

      {/* 主内容区域 */}
      <div
         className={`flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 ${
          theme === "dark" ? "bg-[#13131a] text-white" : "bg-white text-black"
        }`} 
      >
        {/* 导航栏 */}
        {/* <Navbar toggleTheme={toggleTheme} theme={theme} /> */}  
        {/* 路由配置 */}
        <Routes>
          <Route path="/model/edit/:id" element={<ModelEdit theme={theme} />} />
          <Route
            path="/ai-search-show"
            element={<AIsearchshow theme={theme} />}
          />
          <Route path="/" element={<Home1  />} />
          
          <Route path="/home" element={<Home theme={theme} />} />{" "}
          {/* 配置主页路由 */}
          <Route path="/profile" element={<Profile theme={theme} />} />
          <Route
            path="/search-results"
            element={<SearchModelsShow theme={theme} />}
          />
          <Route
            path="/UserStatisticsPage"
            element={<UserStatisticsPage theme={theme} />}
          />
          <Route
            path="/PurchasedModels"
            element={<PurchasedModels theme={theme} />}
          />
          <Route
            path="/MypurchaseModelDetails/:id"
            element={<MypurchaseModelDetails theme={theme} />}
          />
          <Route
            path="/CreateCampaign"
            element={<CreateCampaign theme={theme} />}
          />
          <Route
            path="/campaign-details/:id"
            element={<CampaignDetails theme={theme} />}
          />
        </Routes>
        {/* 底部板块 */}
        <footer
          className={`py-4 text-center ${
            theme === "dark"
              ? "bg-[#1c1c24] text-gray-300"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {/* 上半部分 - 链接和分割线 */}
          <div className="flex justify-center items-center space-x-6 pb-4">
            <div className="flex justify-between max-w-4xl mx-auto py-8">
              {/* 左侧 */}
              <div className="max-w-sm text-left">
                <h5 className="text-lg font-semibold mb-4">社区规则</h5>
                <ul className="space-y-3">
                  <li>
                    <a
                      href=" "
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      捐赠
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      反馈
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      公众号
                    </a>
                  </li>
                </ul>
              </div>

              {/* 分割线 */}
              <div className="border-l border-gray-500 h-auto mx-8"></div>

              {/* 右侧 */}
              <div className="max-w-sm text-left">
                <h5 className="text-lg font-semibold mb-4">关于我们</h5>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      联系电话
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      商业合作
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 下半部分 - 分割线和版权声明 */}
          <div className="border-t border-gray-500 pt-4 mt-4">
            <p>如有侵权，请立即联系我们，我们将在24小时内处理。</p>
            <p>2023-2024© 智研汇 版权所有</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
