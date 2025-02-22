
import Carousel from '../components/Carousel'; 
// Home.jsx
import React from 'react';
import Navbar1 from '../components/Navbar1'; // 导入 Navbar 组件
import MainSection from '../components/MainSection'; // 导入 MainSection 组件

import { image } from '../assets'; // 导入图片

const Home1 = ({ theme }) => {
  return (
    <div>
      <Navbar1 />
      
      {/* 替换轮播图为静态图片，确保图片宽度填满屏幕，去除左右空隙 */}
      <div className="w-screen">
        <img 
          src={image} 
          alt="Static Image" 
          className="w-screen h-auto object-cover" 
        />
      </div>

      <MainSection />
    </div>
  );
};

export default Home1;





/* const Home1 = ({ theme }) => {

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
    <div>
      <Navbar1 />
      <Carousel slides={slides} theme={theme} />
      <MainSection />
    </div>
  );
};

export default Home1; */

