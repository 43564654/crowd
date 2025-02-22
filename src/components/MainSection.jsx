import React from 'react';
import { Link } from 'react-router-dom';
import sampleImage1 from '../assets/logo.svg';
/* import sampleImage2 from '../assets/sampleImage2.jpg';
import sampleImage3 from '../assets/sampleImage3.jpg'; */

const MainSection = () => {
    return (
      <main className="container mx-auto p-6">
        <div className="flex flex-col gap-4"> {/* 增加区域之间的间距 */}
          
          {/* 区域 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex">
            <img src={sampleImage1} alt="Feature 1" className="w-1/3 h-60 object-cover" /> {/* 设置为 1/3 宽度 */}
            <div className="p-6 w-2/3"> {/* 设置为 2/3 宽度 */}
              <h2 className="text-2xl font-bold mb-2">Feature 1</h2>
              <p className="text-gray-600 mb-4">This is a description of the first feature. Learn more about this feature here.</p>
              <Link to="/feature1" className="text-indigo-600 hover:text-indigo-800">Learn More</Link>
            </div>
          </div>
  
          {/* 区域 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex">
            <img src={sampleImage1} alt="Feature 2" className="w-1/3 h-60 object-cover" />
            <div className="p-6 w-2/3">
              <h2 className="text-2xl font-bold mb-2">Feature 2</h2>
              <p className="text-gray-600 mb-4">This is a description of the second feature. Learn more about this feature here.</p>
              <Link to="/feature2" className="text-indigo-600 hover:text-indigo-800">Learn More</Link>
            </div>
          </div>
  
          {/* 区域 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex">
            <img src={sampleImage1} alt="Feature 3" className="w-1/3 h-60 object-cover" />
            <div className="p-6 w-2/3">
              <h2 className="text-2xl font-bold mb-2">Feature 3</h2>
              <p className="text-gray-600 mb-4">This is a description of the third feature. Learn more about this feature here.</p>
              <Link to="/feature3" className="text-indigo-600 hover:text-indigo-800">Learn More</Link>
            </div>
          </div>
        </div>
      </main>
    );
};
  

export default MainSection;
