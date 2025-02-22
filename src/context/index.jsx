import React, { createContext, useContext, useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";

// 创建一个新的上下文
const StateContext = createContext();

// 定义StateContextProvider组件，用于提供全局状态
export const StateContextProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const address = useAddress(); // 使用useAddress钩子获取当前用户地址
  const [isInitialized, setIsInitialized] = useState(false);
  const connect = useMetamask(); // 使用useMetamask钩子定义一个连接Metamask的方法
  const disconnect = useDisconnect(); // 使用useDisconnect钩子定义一个断开连接的方法
  const [theme, setTheme] = useState("dark"); // 增加主题状态

  const contractABI = [
    // 合约的ABI定义

    {
      inputs: [],
      name: "getPurchasedModels",
      outputs: [
        {
          components: [
            { internalType: "string", name: "name", type: "string" },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "string", name: "version", type: "string" },
            { internalType: "bytes32", name: "modelHash", type: "bytes32" },
            { internalType: "string", name: "image", type: "string" },
            { internalType: "uint256", name: "price", type: "uint256" },
            { internalType: "uint256", name: "rating", type: "uint256" },
            { internalType: "uint256", name: "ratingCount", type: "uint256" },
            { internalType: "string", name: "category", type: "string" },
          ],
          internalType: "struct AIModelMarketplace.Model[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },

    {
      inputs: [{ internalType: "string", name: "_category", type: "string" }],
      name: "getModelsByCategory",
      outputs: [
        {
          components: [
            { internalType: "address", name: "owner", type: "address" },
            {
              components: [
                { internalType: "string", name: "name", type: "string" },
                { internalType: "string", name: "description", type: "string" },
                { internalType: "string", name: "version", type: "string" },
                { internalType: "bytes32", name: "modelHash", type: "bytes32" },
                { internalType: "string", name: "image", type: "string" },
                { internalType: "uint256", name: "price", type: "uint256" },
                { internalType: "uint256", name: "rating", type: "uint256" },
                {
                  internalType: "uint256",
                  name: "ratingCount",
                  type: "uint256",
                },
                { internalType: "string", name: "category", type: "string" },
              ],
              internalType: "struct AIModelMarketplace.Model",
              name: "model",
              type: "tuple",
            },
            {
              internalType: "uint256",
              name: "amountCollected",
              type: "uint256",
            },
            { internalType: "address[]", name: "buyers", type: "address[]" },
            { internalType: "uint256[]", name: "payments", type: "uint256[]" },
            {
              components: [
                { internalType: "address", name: "buyer", type: "address" },
                { internalType: "string", name: "content", type: "string" },
                { internalType: "uint256", name: "rating", type: "uint256" },
              ],
              internalType: "struct AIModelMarketplace.Comment[]",
              name: "comments",
              type: "tuple[]",
            },
          ],
          internalType: "struct AIModelMarketplace.Sale[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "minPrice", type: "uint256" },
        { internalType: "uint256", name: "maxPrice", type: "uint256" },
      ],
      name: "getModelsByPriceRange",
      outputs: [
        {
          components: [
            { internalType: "address", name: "owner", type: "address" },
            {
              components: [
                { internalType: "string", name: "name", type: "string" },
                { internalType: "string", name: "description", type: "string" },
                { internalType: "string", name: "version", type: "string" },
                { internalType: "bytes32", name: "modelHash", type: "bytes32" },
                { internalType: "string", name: "image", type: "string" },
                { internalType: "uint256", name: "price", type: "uint256" },
                { internalType: "uint256", name: "rating", type: "uint256" },
                {
                  internalType: "uint256",
                  name: "ratingCount",
                  type: "uint256",
                },
                { internalType: "string", name: "category", type: "string" },
              ],
              internalType: "struct AIModelMarketplace.Model",
              name: "model",
              type: "tuple",
            },
            {
              internalType: "uint256",
              name: "amountCollected",
              type: "uint256",
            },
            { internalType: "address[]", name: "buyers", type: "address[]" },
            { internalType: "uint256[]", name: "payments", type: "uint256[]" },
            {
              components: [
                { internalType: "address", name: "buyer", type: "address" },
                { internalType: "string", name: "content", type: "string" },
                { internalType: "uint256", name: "rating", type: "uint256" },
              ],
              internalType: "struct AIModelMarketplace.Comment[]",
              name: "comments",
              type: "tuple[]",
            },
          ],
          internalType: "struct AIModelMarketplace.Sale[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "saleId", type: "uint256" }],
      name: "getModelDetails",
      outputs: [
        { internalType: "string", name: "", type: "string" },
        { internalType: "string", name: "", type: "string" },
        { internalType: "string", name: "", type: "string" },
        { internalType: "bytes32", name: "", type: "bytes32" },
        { internalType: "string", name: "", type: "string" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "string", name: "", type: "string" },
        { internalType: "string", name: "", type: "string" },
        { internalType: "uint8", name: "", type: "uint8" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_owner", type: "address" },
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_description", type: "string" },
        { internalType: "string", name: "_version", type: "string" },
        { internalType: "string", name: "_modelURL", type: "string" },
        { internalType: "string", name: "_image", type: "string" },
        { internalType: "uint256", name: "_price", type: "uint256" },
        { internalType: "string", name: "_category", type: "string" },
      ],
      name: "createSale",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "saleId", type: "uint256" }],
      name: "purchaseModel",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "saleId", type: "uint256" }],
      name: "getBuyers",
      outputs: [
        { internalType: "address[]", name: "", type: "address[]" },
        { internalType: "uint256[]", name: "", type: "uint256[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "saleId", type: "uint256" }],
      name: "getComments",
      outputs: [
        {
          components: [
            { internalType: "address", name: "buyer", type: "address" },
            { internalType: "string", name: "content", type: "string" },
            { internalType: "uint256", name: "rating", type: "uint256" },
          ],
          internalType: "struct AIModelMarketplace.Comment[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "saleId", type: "uint256" },
        { internalType: "string", name: "comment", type: "string" },
        { internalType: "uint256", name: "rating", type: "uint256" },
      ],
      name: "addComment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getSales",
      outputs: [
        {
          components: [
            { internalType: "address", name: "owner", type: "address" },
            {
              components: [
                { internalType: "string", name: "name", type: "string" },
                { internalType: "string", name: "description", type: "string" },
                { internalType: "string", name: "version", type: "string" },
                { internalType: "bytes32", name: "modelHash", type: "bytes32" },
                { internalType: "string", name: "image", type: "string" },
                { internalType: "uint256", name: "price", type: "uint256" },
                { internalType: "uint256", name: "rating", type: "uint256" },
                {
                  internalType: "uint256",
                  name: "ratingCount",
                  type: "uint256",
                },
                { internalType: "string", name: "category", type: "string" },
                { internalType: "string", name: "modelURL", type: "string" },
                { internalType: "uint256", name: "status", type: "uint256" }, // 将 status 字段类型改为 uint256
              ],
              internalType: "struct AIModelMarketplace.Model",
              name: "model",
              type: "tuple",
            },
            {
              internalType: "uint256",
              name: "amountCollected",
              type: "uint256",
            },
            { internalType: "address[]", name: "buyers", type: "address[]" },
            { internalType: "uint256[]", name: "payments", type: "uint256[]" },
            {
              components: [
                { internalType: "address", name: "buyer", type: "address" },
                { internalType: "string", name: "content", type: "string" },
                { internalType: "uint256", name: "rating", type: "uint256" },
              ],
              internalType: "struct AIModelMarketplace.Comment[]",
              name: "comments",
              type: "tuple[]",
            },
          ],
          internalType: "struct AIModelMarketplace.Sale[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },

    {
      inputs: [
        { internalType: "uint256", name: "saleId", type: "uint256" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "description", type: "string" },
        { internalType: "string", name: "version", type: "string" },
        { internalType: "string", name: "modelURL", type: "string" },
        { internalType: "string", name: "image", type: "string" },
        { internalType: "uint256", name: "price", type: "uint256" },
        { internalType: "string", name: "category", type: "string" },
      ],
      name: "updateModel",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllModelsInfo",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "string", name: "category", type: "string" },
            { internalType: "uint256", name: "price", type: "uint256" },
          ],
          internalType: "struct AIModelMarketplace.ModelInfo[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256[]", name: "_ids", type: "uint256[]" }],
      name: "getSalesByIds",
      outputs: [
        {
          components: [
            { internalType: "address", name: "owner", type: "address" },
            {
              components: [
                { internalType: "string", name: "name", type: "string" },
                { internalType: "string", name: "description", type: "string" },
                { internalType: "string", name: "version", type: "string" },
                { internalType: "bytes32", name: "modelHash", type: "bytes32" },
                { internalType: "string", name: "image", type: "string" },
                { internalType: "uint256", name: "price", type: "uint256" },
                { internalType: "uint256", name: "rating", type: "uint256" },
                {
                  internalType: "uint256",
                  name: "ratingCount",
                  type: "uint256",
                },
                { internalType: "string", name: "category", type: "string" },
              ],
              internalType: "struct AIModelMarketplace.Model",
              name: "model",
              type: "tuple",
            },
            {
              internalType: "uint256",
              name: "amountCollected",
              type: "uint256",
            },
            { internalType: "address[]", name: "buyers", type: "address[]" },
            { internalType: "uint256[]", name: "payments", type: "uint256[]" },
            {
              components: [
                { internalType: "address", name: "buyer", type: "address" },
                { internalType: "string", name: "content", type: "string" },
                { internalType: "uint256", name: "rating", type: "uint256" },
              ],
              internalType: "struct AIModelMarketplace.Comment[]",
              name: "comments",
              type: "tuple[]",
            },
          ],
          internalType: "struct AIModelMarketplace.Sale[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
      name: "getModelURL",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // 使用 useEffect 钩子在组件加载时初始化合约
  useEffect(() => {
    const initializeContract = async () => {
      console.log("Executing initializeContract.");
      try {
        console.log("Executing try.");
        // 初始化 Thirdweb SDK 并连接到指定网络
        const sdk = new ThirdwebSDK("https://rpc.ankr.com/eth_sepolia");

        // 确保Metamask已经连接
        if (!address) {
          console.error("Please connect to Metamask.");
          return;
        }

        // 使用Metamask的provider作为SDK的签名者
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        sdk.updateSignerOrProvider(signer);

        // 设置合约地址
        // 0x4f7A78a4136DE68FDb157C861a76f6ae44eA513b
        //zzg
        //const contractAddress = "0x4966edF30E7eE9902Ba68C260E2e221AfafFAB67";
        //const contractAddress = "0x4f7A78a4136DE68FDb157C861a76f6ae44eA513b";
        //lgr
        const contractAddress = "0x3C9058F6cD027660eF3992ed0B471b0E25b11fF7";
        const contractInstance = await sdk.getContractFromAbi(
          contractAddress,
          contractABI
        );

        // 设置合约实例到状态
        setIsInitialized(true); // 合约初始化成功后设置为true
        setContract(contractInstance);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    initializeContract();
  }, [address]);

  // 处理合约的其他函数调用
  const createSale = async (form) => {
    console.log(form.price);
    console.log(form.version);
    console.log("你好");
    if (!contract) {
      console.error("Contract not initialized");
      return;
    }
    console.log(address);
    let missingFields = [];
    console.log("你好1");
    if (!form.name) missingFields.push("name");
    if (!form.description) missingFields.push("description");
    if (!form.version) missingFields.push("version");
    if (!form.modelURL) missingFields.push("modelURL");
    if (!form.image) missingFields.push("image");
    if (!form.price) missingFields.push("price");
    if (!form.category) missingFields.push("category");

    if (missingFields.length > 0) {
      console.error("Missing fields: ", missingFields.join(", "));
      return;
    }
    console.log("你好2");
    try {
      const priceWei = parseFloat(form.price);
      if (
        isNaN(priceWei) ||
        priceWei <= 0 ||
        priceWei > ethers.utils.parseUnits("1000", "ether")
      ) {
        // 设置价格的合理范围，例如0到1000 ETH（转换为Wei后的值）
        console.error(
          "Invalid price. Please enter a value between 0 and 1000 ETH in Wei."
        );
        return;
      }
      console.log("你好3");
      const data = await contract.call(
        "createSale",
        address,
        form.name,
        form.description,
        form.version,
        form.modelURL,
        form.image,
        form.price, // 直接使用传入的price，因为它已经是Wei单位
        form.category
      );
      console.log("你好4");
      console.log("Contract call success", data);
    } catch (error) {
      console.error("Contract call failure", error);
    }
  };

  const updateModel = async (form, saleId) => {
    console.log(saleId);
    console.log(form.price);
    console.log(form.version);
    if (!contract) {
      console.error("Contract not initialized");
      return;
    }
    console.log(address);

    try {
      const priceWei = parseFloat(form.price);
      if (
        isNaN(priceWei) ||
        priceWei <= 0 ||
        priceWei > ethers.utils.parseUnits("1000", "ether")
      ) {
        console.error(
          "Invalid price. Please enter a value between 0 and 1000 ETH in Wei."
        );
        return;
      }

      await contract.call(
        "updateModel",
        saleId,
        form.name,
        form.description,
        form.version,
        form.modelURL,
        form.image,
        form.price,
        form.category
      );

      console.log("Model updated successfully");
    } catch (error) {
      console.error("Failed to update model", error);
    }
  };

  const getSales = async () => {
    if (!contract) {
      console.error("Contract not initialized");
      return [];
    }

    try {
      const sales = await contract.call("getSales");
      const parsedSales = sales.map((sale, i) => ({
        owner: sale.owner,
        name: sale.model.name,
        description: sale.model.description,
        modelHash: sale.model.modelHash,
        image: sale.model.image,
        price: sale.model.price, // 确保 price 是 BigNumber
        rating: sale.model.rating,
        ratingCount: sale.model.ratingCount,
        category: sale.model.category,
        amountCollected: sale.amountCollected, // 确保 amountCollected 是 BigNumber
        buyers: sale.buyers,
        payments: sale.payments.map((payment) => payment), // 确保 payments 是 BigNumber
        comments: sale.comments,
        saleId: i,
        status: sale.model.status,
      }));
      return parsedSales;
    } catch (error) {
      console.error("Failed to fetch sales", error);
      return [];
    }
  };

  const getUserSales = async () => {
    const allSales = await getSales();

    const filteredSales = allSales.filter((sale) => sale.owner === address);

    return filteredSales;
  };

  const purchaseModel = async (saleId) => {
    // 修改函数参数
    if (!contract) {
      console.error("Contract not initialized");
      return;
    }

    try {
      // 从合约中获取模型价格
      const modelDetails = await contract.call("getModelDetails", saleId);
      const price = modelDetails[5]; // 模型价格在 getModelDetails 的返回值中

      const transactionResponse = await contract.call("purchaseModel", saleId, {
        value: price,
      });

      console.log("Transaction sent. Hash:", transactionResponse.hash);
      const receipt = await transactionResponse.wait();
      console.log("Transaction confirmed. Block number:", receipt.blockNumber);
    } catch (error) {
      console.error("Purchase failed with error:", error);
    }
  };

  const getBuyers = async (saleId) => {
    const buyers = await contract.call("getBuyers", [saleId]);
    const numberOfBuyers = buyers[0].length;
    const parsedBuyers = [];

    for (let i = 0; i < numberOfBuyers; i++) {
      parsedBuyers.push({
        buyer: buyers[0][i],
        payment: ethers.utils.formatEther(buyers[1][i].toString()),
      });
    }

    return parsedBuyers;
  };

  const getComments = async (saleId) => {
    const comments = await contract.call("getComments", [saleId]);
    return comments;
  };

  const addComment = async (saleId, comment, rating) => {
    if (!contract) {
      console.error("Contract not initialized");
      return;
    }

    try {
      await contract.call("addComment", saleId, comment, rating);
      console.log("Comment added successfully");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  const getModelsByCategory = async (category) => {
    if (!contract) {
      console.error("Contract not initialized");
      return [];
    }

    try {
      const sales = await contract.call("getModelsByCategory", category);
      console.log("Fetched sales:", sales);

      const parsedSales = sales.map((sale, i) => ({
        owner: sale.owner,
        name: sale.model.name,
        description: sale.model.description,
        version: sale.model.version,
        modelHash: sale.model.modelHash,
        image: sale.model.image,
        price: sale.model.price, // 保留 BigNumber 类型
        rating: sale.model.rating,
        ratingCount: sale.model.ratingCount,
        category: sale.model.category,
        amountCollected: sale.amountCollected, // 保留 BigNumber 类型
        buyers: sale.buyers,
        payments: sale.payments,
        comments: sale.comments,
        saleId: i,
      }));
      return parsedSales;
    } catch (error) {
      console.error("Failed to fetch sales by category", error);
      return [];
    }
  };

  const getModelsByPriceRange = async (minPrice, maxPrice) => {
    if (!contract) {
      console.error("Contract not initialized");
      return [];
    }

    try {
      const sales = await contract.call(
        "getModelsByPriceRange",
        ethers.utils.parseUnits(minPrice.toString(), "ether"),
        ethers.utils.parseUnits(maxPrice.toString(), "ether")
      );
      console.log("Fetched sales:", sales);

      const parsedSales = sales.map((sale, i) => ({
        owner: sale.owner,
        name: sale.model.name,
        description: sale.model.description,
        version: sale.model.version,
        modelHash: sale.model.modelHash,
        image: sale.model.image,
        price: sale.model.price, // 保留 BigNumber 类型
        rating: sale.model.rating,
        ratingCount: sale.model.ratingCount,
        category: sale.model.category,
        amountCollected: sale.amountCollected, // 保留 BigNumber 类型
        buyers: sale.buyers,
        payments: sale.payments,
        comments: sale.comments,
        saleId: i,
      }));
      return parsedSales;
    } catch (error) {
      console.error("Failed to fetch sales by price range", error);
      return [];
    }
  };

  const getModelDetails = async (saleId) => {
    if (!contract) {
      console.error("Contract not initialized");
      return null;
    }

    try {
      const details = await contract.call("getModelDetails", saleId);
      const parsedDetails = {
        name: details[0],
        description: details[1],
        version: details[2],
        modelHash: details[3],
        image: details[4],
        price: ethers.utils.formatEther(details[5].toString()),
        rating: details[6],
        category: details[7],
      };
      return parsedDetails;
    } catch (error) {
      console.error("Failed to fetch model details", error);
      return null;
    }
  };

  const getAllModelsInfo = async () => {
    if (!contract) {
      console.error("Contract not initialized");
      return [];
    }

    try {
      const modelsInfo = await contract.call("getAllModelsInfo");
      return modelsInfo;
    } catch (error) {
      console.error("Failed to fetch models info", error);
      return [];
    }
  };

  const getSalesByIds = async (ids) => {
    if (!contract) {
      console.error("Contract not initialized");
      return [];
    }

    try {
      const sales = await contract.call("getSalesByIds", ids);
      const parsedSales = sales.map((sale, i) => ({
        owner: sale.owner,
        name: sale.model.name,
        description: sale.model.description,
        version: sale.model.version,
        modelHash: sale.model.modelHash,
        image: sale.model.image,
        price: sale.model.price, // 确保 price 是 BigNumber
        rating: sale.model.rating,
        ratingCount: sale.model.ratingCount,
        category: sale.model.category,
        amountCollected: sale.amountCollected, // 确保 amountCollected 是 BigNumber
        buyers: sale.buyers,
        payments: sale.payments.map((payment) => payment), // 确保 payments 是 BigNumber
        comments: sale.comments,
        saleId: i,
      }));
      return parsedSales;
    } catch (error) {
      console.error("Failed to fetch sales by ids", error);
      return [];
    }
  };

  const logout = () => {
    disconnect();
    console.log("User has logged out successfully.");
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.className = theme;
    console.log("点击了切换背景");
  }, [theme]);

  const getPurchasedModels = async () => {
    if (!contract) {
      console.error("Contract not initialized");
      return [];
    }

    try {
      const purchasedModels = await contract.call("getPurchasedModels");
      const parsedModels = purchasedModels.map((model, i) => ({
        name: model.name,
        description: model.description,
        version: model.version,
        modelHash: model.modelHash,
        image: model.image,
        price: ethers.utils.formatEther(model.price.toString()), // 确保 price 是格式化后的数值
        rating: model.rating,
        ratingCount: model.ratingCount,
        category: model.category,
        modelId: i,
      }));
      return parsedModels;
    } catch (error) {
      console.error("Failed to fetch purchased models", error);
      return [];
    }
  };
  const getUserModelBuyers = async () => {
    if (!contract) {
      console.error("Contract not initialized");
      return [];
    }

    try {
      // 获取当前用户的所有售卖活动
      const allSales = await getUserSales();

      let allBuyers = [];
      // 遍历当前用户的所有售卖活动，收集买家信息
      allSales.forEach((sale) => {
        allBuyers = allBuyers.concat(sale.buyers);
      });

      // 去重买家地址
      const uniqueBuyers = [...new Set(allBuyers)];

      return uniqueBuyers;
    } catch (error) {
      console.error("Failed to fetch user model buyers", error);
      return [];
    }
  };

  const getUserTotalEarnings = async () => {
    if (!contract) {
      console.error("Contract not initialized");
      return ethers.utils.formatEther("0");
    }

    try {
      // 获取当前用户的所有售卖活动
      const allSales = await getUserSales();

      let totalEarnings = ethers.BigNumber.from(0);

      // 累加用户每个模型的总收益
      allSales.forEach((sale) => {
        totalEarnings = totalEarnings.add(sale.amountCollected);
      });

      // 将收益格式化为以太币单位
      return ethers.utils.formatEther(totalEarnings.toString());
    } catch (error) {
      console.error("Failed to fetch user total earnings", error);
      return ethers.utils.formatEther("0");
    }
  };
  const getModelURL = async (saleId) => {
    try {
      // 调用合约的 getModelURL 函数，传入 saleId
      const modelURL = await contract.call("getModelURL", [saleId]);

      // 返回模型的地址
      return modelURL;
    } catch (error) {
      console.error("Error fetching model URL:", error);
      throw error; // 可以根据实际情况处理错误
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createSale,
        updateModel,
        getSales,
        getUserSales,
        purchaseModel,
        getBuyers,
        getComments,
        addComment,
        getModelsByCategory,
        getModelsByPriceRange,
        getModelDetails,
        getAllModelsInfo,
        getSalesByIds,
        logout,
        theme,
        getPurchasedModels,
        toggleTheme,
        getUserModelBuyers,
        getUserTotalEarnings,
        getModelURL,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
