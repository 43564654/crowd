import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { calculateBarPercentage } from "../utils";
import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader, CommentBox } from "../components";
import { thirdweb } from "../assets";

const ModelDetails = ({ theme }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    purchaseModel,
    getBuyers,
    addComment,
    getComments,
    contract,
    address,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hasPurchased, setHasPurchased] = useState(false); // 用于判断是否已购买

  const fetchBuyersAndComments = async () => {
    const buyersData = await getBuyers(state.saleId);
    const commentsData = await getComments(state.saleId);

    const formattedBuyersData = buyersData.map((buyer) => ({
      ...buyer,
      payment: ethers.BigNumber.isBigNumber(buyer.payment)
        ? buyer.payment.toString()
        : buyer.payment,
    }));

    setBuyers(formattedBuyersData);
    setComments(commentsData); // 检查当前用户是否已经购买
    const hasAlreadyPurchased = formattedBuyersData.some(
      (buyer) => buyer.buyer === address
    );
    setHasPurchased(hasAlreadyPurchased);
  };

  useEffect(() => {
    if (contract) fetchBuyersAndComments();
  }, [contract, address]);

  const handlePurchase = async () => {
    // 检查是否已经购买过
    if (hasPurchased) {
      setHasPurchased(true);
      return;
    }
    setIsLoading(true);
    try {
      await purchaseModel(state.saleId, amount);
      navigate("/");
    } catch (error) {
      console.error("购买失败", error);
    }
    setIsLoading(false);
  };

  const handleAddComment = async () => {
    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }
    setIsLoading(true);
    await addComment(state.saleId, comment, rating);
    await fetchBuyersAndComments();
    setComment("");
    setRating(0);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && (
        <Loader messageLine1="交易正在进行中" messageLine2="请稍候..." />
      )}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="model"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div
            className={`relative w-full h-[5px] ${
              theme === "dark" ? "bg-[#3a3a43]" : "bg-gray-200"
            } mt-2`}
          >
            <div
              className={`absolute h-full ${
                theme === "dark" ? "bg-[#4acd8d]" : "bg-green-400"
              }`}
              style={{
                width: `${calculateBarPercentage(
                  100,
                  ethers.BigNumber.isBigNumber(state.amountCollected)
                    ? state.amountCollected.toString()
                    : state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Total Buyers" value={buyers.length} theme={theme} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4
              className={`font-epilogue font-semibold text-[18px] uppercase ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              模型作者
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div
                className={`w-[52px] h-[52px] flex items-center justify-center rounded-full ${
                  theme === "dark" ? "bg-[#2c2f32]" : "bg-gray-300"
                } cursor-pointer`}
              >
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4
                  className={`font-epilogue font-semibold text-[14px] break-all ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {state.owner}
                </h4>
                <p
                  className={`mt-[4px] font-epilogue font-normal text-[12px] ${
                    theme === "dark" ? "text-[#808191]" : "text-gray-600"
                  }`}
                ></p>
              </div>
            </div>
          </div>

          <div>
            <h4
              className={`font-epilogue font-semibold text-[18px] uppercase ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              模型描述
            </h4>

            <div className="mt-[20px]">
              <p
                className={`font-epilogue font-normal text-[16px] leading-[26px] text-justify ${
                  theme === "dark" ? "text-[#808191]" : "text-gray-600"
                }`}
              >
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4
              className={`font-epilogue font-semibold text-[18px] uppercase ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              购买用户
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {buyers.length > 0 ? (
                buyers.map((item, index) => (
                  <div
                    key={`${item.buyer}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p
                      className={`font-epilogue font-normal text-[16px] leading-[26px] break-all ${
                        theme === "dark" ? "text-[#b2b3bd]" : "text-gray-700"
                      }`}
                    >
                      {ethers.BigNumber.isBigNumber(item.buyer)
                        ? item.buyer.toString()
                        : item.buyer}
                    </p>
                    <p
                      className={`font-epilogue font-normal text-[16px] leading-[26px] break-all ${
                        theme === "dark" ? "text-[#808191]" : "text-gray-600"
                      }`}
                    >
                      {ethers.BigNumber.isBigNumber(item.payment)
                        ? item.payment.toString()
                        : item.payment}
                    </p>
                  </div>
                ))
              ) : (
                <p
                  className={`font-epilogue font-normal text-[16px] leading-[26px] text-justify ${
                    theme === "dark" ? "text-[#808191]" : "text-gray-600"
                  }`}
                >
                  还没有用户购买，成为第一个吧。
                </p>
              )}
            </div>
          </div>

          <div>
            <h4
              className={`font-epilogue font-semibold text-[18px] uppercase ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              评论
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {comments.length > 0 ? (
                comments.map((item, index) => (
                  <CommentBox
                    key={`${item.buyer}-${index}`}
                    buyer={item.buyer}
                    comment={item.content}
                    rating={item.rating}
                    theme={theme} // 传递 theme 到 CommentBox
                  />
                ))
              ) : (
                <p
                  className={`font-epilogue font-normal text-[16px] leading-[26px] text-justify ${
                    theme === "dark" ? "text-[#808191]" : "text-gray-600"
                  }`}
                >
                  还没有用户评论，成为第一个吧。
                </p>
              )}
            </div>

            {buyers.some((buyer) => buyer.buyer === address) && (
              <div className="mt-[20px]">
                <textarea
                  className={`w-full p-2 rounded-md ${
                    theme === "dark"
                      ? "bg-[#1c1c24] text-white"
                      : "bg-white text-black"
                  }`}
                  placeholder="向其他用户描述你的使用感想吧"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <input
                  type="number"
                  className={`w-full p-2 mt-2 rounded-md ${
                    theme === "dark"
                      ? "bg-[#1c1c24] text-white"
                      : "bg-white text-black"
                  }`}
                  placeholder="Rating (1-5)"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <CustomButton
                  btnType="button"
                  title="提交评论"
                  styles={`w-full mt-2 ${
                    theme === "dark" ? "bg-[#8c6dfd]" : "bg-blue-500"
                  }`}
                  handleClick={handleAddComment}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h4
            className={`font-epilogue font-semibold text-[18px] uppercase ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            购买
          </h4>

          <div
            className={`mt-[20px] flex flex-col p-4 rounded-[10px] ${
              theme === "dark" ? "bg-[#1c1c24]" : "bg-white"
            }`}
          >
            <p
              className={`font-epilogue fount-medium text-[20px] leading-[30px] text-center ${
                theme === "dark" ? "text-[#808191]" : "text-gray-600"
              }`}
            >
              购买模型
            </p>
            <div className="mt-[30px]">
              <div
                className={`my-[20px] p-4 rounded-[10px] ${
                  theme === "dark" ? "bg-[#13131a]" : "bg-gray-200"
                }`}
              >
                <h4
                  className={`font-epilogue font-semibold text-[14px] leading-[22px] ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  购买你需要的模型
                </h4>
                <p
                  className={`mt-[20px] font-epilogue font-normal leading-[22px] ${
                    theme === "dark" ? "text-[#808191]" : "text-gray-600"
                  }`}
                >
                  通过购买模型来赞助作者
                </p>
              </div>

              <CustomButton
                btnType="button"
                title={hasPurchased ? "已购买" : "购买"}
                styles={`w-full ${
                  theme === "dark" ? "bg-[#8c6dfd]" : "bg-blue-500"
                }`}
                handleClick={handlePurchase}
                disabled={hasPurchased} // 如果已购买，禁用按钮
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
