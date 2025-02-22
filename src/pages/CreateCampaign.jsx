import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";

const CreateModel = ({ theme }) => {
  const navigate = useNavigate();
  const { createSale } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    version: "",
    modelURL: "",
    image: "",
    price: "",
    category: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        try {
          await createSale({
            ...form,
            price: ethers.utils.parseUnits(form.price, "ether").toString(),
          });
          setIsLoading(false);
          navigate("/");
        } catch (error) {
          console.error("Error creating sale:", error);
          setIsLoading(false);
        }
      } else {
        alert("Provide a valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div
      className={`flex justify-center items-center flex-col rounded-[20px] sm:p-12 p-6 ${theme === "dark" ? "bg-[#181818]" : "bg-[#f5f5f5]"}`}
    >
      {isLoading && <Loader />}
      <div
        className={`flex justify-center items-center p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 ${
          theme === "dark" ? "bg-[#2d2d34]" : "bg-[#f1f1f1]"
        }`}
      >
        <h1
          className={`font-semibold text-2xl sm:text-3xl ${theme === "dark" ? "text-white" : "text-[#333]"}`}
        >
          上传我的数字科研工具
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-8 flex flex-col gap-6"
      >
        <div className="flex flex-wrap gap-10">
          <FormField
            labelName="模型名字*"
            placeholder="请输入模型名字"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
            theme={theme}
            className="transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2]"
          />
          <FormField
            labelName="模型版本*"
            placeholder="请输入模型版本"
            inputType="text"
            value={form.version}
            handleChange={(e) => handleFormFieldChange("version", e)}
            theme={theme}
            className="transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2]"
          />
        </div>

        <FormField
          labelName="模型描述*"
          placeholder="请输入模型描述"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
          theme={theme}
          className="transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2]"
        />

        <FormField
          labelName="模型URL*"
          placeholder="请输入模型文件的URL"
          inputType="url"
          value={form.modelURL}
          handleChange={(e) => handleFormFieldChange("modelURL", e)}
          theme={theme}
          className="transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2]"
        />

        <FormField
          labelName="模型图片URL*"
          placeholder="请输入模型图片的URL"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
          theme={theme}
          className="transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2]"
        />

        <FormField
          labelName="模型价格* (ETH)"
          placeholder="请输入模型价格"
          inputType="text"
          value={form.price}
          handleChange={(e) => handleFormFieldChange("price", e)}
          theme={theme}
          className="transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2]"
        />

        <FormField
          labelName="模型种类*"
          placeholder="请输入模型种类 (例如: 教育, 科技, 医疗)"
          inputType="text"
          value={form.category}
          handleChange={(e) => handleFormFieldChange("category", e)}
          theme={theme}
          className="transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2]"
        />

        <div className="flex justify-center items-center mt-12">
          <CustomButton
            btnType="submit"
            title="创建新模型"
            styles={`w-full sm:w-[250px] py-3 px-6 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
              theme === "dark" ? "bg-[#1dc071] text-white" : "bg-[#1e40af] text-white"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateModel;
