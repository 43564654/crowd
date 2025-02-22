import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { FormField, CustomButton, Loader } from "../components";
import { useStateContext } from "../context";

const ModelEdit = ({ theme }) => {
  // 接收 theme 作为 prop
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
  const { id } = useParams(); // 获取路由参数
  const navigate = useNavigate();
  const { updateModel, getModelDetails } = useStateContext();

  useEffect(() => {
    const fetchModelDetails = async () => {
      if (id) {
        setIsLoading(true);
        const modelDetails = await getModelDetails(id);
        setForm({
          name: modelDetails.name,
          description: modelDetails.description,
          version: modelDetails.version,
          modelURL: "", // 根据需求更新
          image: modelDetails.image,
          price: modelDetails.price,
          category: modelDetails.category,
        });
        setIsLoading(false);
      }
    };

    fetchModelDetails();
  }, [id, getModelDetails]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateModel(
        {
          ...form,
          price: ethers.utils.parseUnits(form.price, "ether").toString(),
        },
        id
      );
      navigate("/profile");
    } catch (error) {
      console.error("Error updating model:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={`flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 ${
          theme === "dark" ? "bg-[#1c1c24]" : "bg-white"
        }`}
      >
        <div
          className={`flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px] ${
            theme === "dark" ? "bg-[#3a3a43]" : "bg-gray-300"
          }`}
        >
          <h1
            className={`font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Edit Model
          </h1>
        </div>

        <form
          onSubmit={handleUpdate}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="模型名字*"
              placeholder="请输入模型名字"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange("name", e)}
              theme={theme} // 传递 theme 给 FormField
            />
            <FormField
              labelName="模型版本*"
              placeholder="请输入模型版本"
              inputType="text"
              value={form.version}
              handleChange={(e) => handleFormFieldChange("version", e)}
              theme={theme} // 传递 theme 给 FormField
            />
          </div>

          <FormField
            labelName="模型描述*"
            placeholder="请输入模型描述"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange("description", e)}
            theme={theme} // 传递 theme 给 FormField
          />

          <FormField
            labelName="模型URL*"
            placeholder="请输入模型文件的URL"
            inputType="url"
            value={form.modelURL}
            handleChange={(e) => handleFormFieldChange("modelURL", e)}
            theme={theme} // 传递 theme 给 FormField
          />

          <FormField
            labelName="模型图片URL*"
            placeholder="请输入模型图片的URL"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
            theme={theme} // 传递 theme 给 FormField
          />

          <FormField
            labelName="模型价格* (ETH)"
            placeholder="请输入模型价格"
            inputType="text"
            value={form.price}
            handleChange={(e) => handleFormFieldChange("price", e)}
            theme={theme} // 传递 theme 给 FormField
          />

          <FormField
            labelName="模型种类*"
            placeholder="请输入模型种类 (例如: 教育, 科技, 医疗)"
            inputType="text"
            value={form.category}
            handleChange={(e) => handleFormFieldChange("category", e)}
            theme={theme} // 传递 theme 给 FormField
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="更新模型"
              styles={`bg-[#1dc071] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ModelEdit;
