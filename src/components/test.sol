// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

// 定义一个AIModelMarketplace合约，继承自Ownable
contract AIModelMarketplace is Ownable {
    // 定义事件，用于记录售卖活动的创建
    event SaleCreated(
        uint256 saleId,
        address indexed owner,
        string name,
        string description,
        string version,
        bytes32 modelHash,
        string image,
        uint256 price,
        string category
    );

    // 定义事件，用于记录模型的购买
    event ModelPurchased(uint256 saleId, address indexed buyer, uint256 amount);

    // 定义事件，用于记录模型信息的更新
    event ModelUpdated(
        uint256 saleId,
        string name,
        string description,
        string version,
        bytes32 modelHash,
        string image,
        uint256 price,
        string category
    );

    // 定义事件，用于记录售卖活动的删除
    event SaleDeleted(uint256 saleId);

    // 定义事件，用于记录评论的添加
    event CommentAdded(
        uint256 saleId,
        address indexed buyer,
        string comment,
        uint256 rating
    );

    // 定义一个结构体，用于存储模型的信息
    struct Model {
        string name; // 模型名称
        string description; // 模型描述
        string version; // 模型版本
        bytes32 modelHash; // 模型哈希值
        string image; // 模型图片URL
        uint256 price; // 模型价格
        uint256 rating; // 模型评分
        uint256 ratingCount; // 评分数量
        string category; // 模型种类
    }

    // 定义一个结构体，用于返回模型的部分信息
    struct ModelInfo {
        uint256 id; // 增加Sale的编号
        string description; // 模型描述
        string category; // 模型种类
        uint256 price; // 模型价格
    }

    // 定义一个结构体，用于存储售卖活动的信息
    struct Sale {
        address owner; // 模型所有者的地址
        Model model; // 模型信息
        uint256 amountCollected; // 已筹集金额
        address[] buyers; // 购买者地址数组
        uint256[] payments; // 支付金额数组
        Comment[] comments; // 评论数组
    }
    //新增一个函数遍历该结构体，这样就能够得到当前购买者的所有售卖活动。
    //getsales，同时还需要得到当前用户的地址，这样就可以筛选。

    // 定义一个结构体，用于存储评论的信息
    struct Comment {
        address buyer; // 评论者地址
        string content; // 评论内容
        uint256 rating; // 评论评分
    }

    // 使用mapping存储所有售卖活动，key为活动ID，value为Sale结构体
    mapping(uint256 => Sale) public sales;

    // 使用mapping存储每个用户购买的模型，key为用户地址，value为购买的模型ID数组
    mapping(address => uint256[]) public purchasedModels;

    // 记录活动的总数量
    uint256 public numberOfSales = 0;

    // 构造函数，初始化合约所有者
    constructor() Ownable(msg.sender) {}

    // 创建新售卖活动的函数
    function createSale(
        address _owner,
        string memory _name,
        string memory _description,
        string memory _version,
        string memory _modelURL,
        string memory _image,
        uint256 _price,
        string memory _category
    ) public returns (uint256) {
        // 移除onlyOwner修饰符
        // 创建一个新的Sale结构体，并存储在mapping中
        Sale storage sale = sales[numberOfSales];

        // 计算模型URL的哈希值
        bytes32 modelHash = keccak256(abi.encodePacked(_modelURL));

        // 初始化Sale结构体的各个字段
        sale.owner = _owner;
        sale.model = Model({
            name: _name,
            description: _description,
            version: _version,
            modelHash: modelHash,
            image: _image,
            price: _price,
            rating: 0,
            ratingCount: 0,
            category: _category
        });
        sale.amountCollected = 0;

        // 触发SaleCreated事件
        emit SaleCreated(
            numberOfSales,
            _owner,
            _name,
            _description,
            _version,
            modelHash,
            _image,
            _price,
            _category
        );

        // 更新活动总数量
        numberOfSales++;

        // 返回新创建的活动ID
        return numberOfSales - 1;
    }

    // 购买模型的函数
    function purchaseModel(uint256 _id) public payable {
        uint256 amount = msg.value; // 获取支付金额

        Sale storage sale = sales[_id]; // 获取指定售卖活动

        // 确保支付金额与模型价格一致
        require(amount == sale.model.price, "Incorrect payment amount.");

        // 记录购买者地址和支付金额
        sale.buyers.push(msg.sender);
        sale.payments.push(amount);

        // 将支付金额转移给模型所有者
        (bool sent, ) = payable(sale.owner).call{value: amount}("");

        // 如果转账成功，更新已筹集金额
        if (sent) {
            sale.amountCollected = sale.amountCollected + amount;

            // 记录购买者已购买的模型
            purchasedModels[msg.sender].push(_id);

            // 触发ModelPurchased事件
            emit ModelPurchased(_id, msg.sender, amount);
        }
    }

    // 获取指定售卖活动的所有购买者和支付金额的函数
    function getBuyers(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (sales[_id].buyers, sales[_id].payments);
    }

    // 获取所有售卖活动的函数
    function getSales() public view returns (Sale[] memory) {
        // 创建一个大小为numberOfSales的数组
        Sale[] memory allSales = new Sale[](numberOfSales);

        // 将mapping中的所有售卖活动复制到数组中
        for (uint i = 0; i < numberOfSales; i++) {
            Sale storage item = sales[i];
            allSales[i] = item;
        }

        // 返回所有售卖活动的数组
        return allSales;
    }

    // 获取指定模型详细信息的函数
    function getModelDetails(
        uint256 _id
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            bytes32,
            string memory,
            uint256,
            uint256,
            string memory
        )
    {
        Model memory model = sales[_id].model;
        return (
            model.name,
            model.description,
            model.version,
            model.modelHash,
            model.image,
            model.price,
            model.rating,
            model.category
        );
    }

    // 获取所有模型的部分信息的函数
    function getAllModelsInfo() public view returns (ModelInfo[] memory) {
        // 创建一个大小为numberOfSales的数组
        ModelInfo[] memory allModelInfos = new ModelInfo[](numberOfSales);

        // 将mapping中的所有模型的部分信息复制到数组中
        for (uint i = 0; i < numberOfSales; i++) {
            Model storage model = sales[i].model;
            allModelInfos[i] = ModelInfo({
                id: i, // 添加Sale的编号
                description: model.description,
                category: model.category,
                price: model.price
            });
        }

        // 返回所有模型的部分信息的数组
        return allModelInfos;
    }

    // 获取用户已购买的所有模型的函数
    function getPurchasedModels() public view returns (Model[] memory) {
        uint256[] memory purchasedIds = purchasedModels[msg.sender];
        Model[] memory userModels = new Model[](purchasedIds.length);

        for (uint256 i = 0; i < purchasedIds.length; i++) {
            userModels[i] = sales[purchasedIds[i]].model;
        }

        return userModels;
    }

    // 更新模型信息的函数
    function updateModel(
        uint256 _id,
        string memory _name,
        string memory _description,
        string memory _version,
        string memory _modelURL,
        string memory _image,
        uint256 _price,
        string memory _category
    ) public {
        Sale storage sale = sales[_id];

        // 确保只有模型所有者可以更新模型信息
        require(
            msg.sender == sale.owner,
            "Only the owner can update the model."
        );

        // 计算新的模型URL的哈希值
        bytes32 modelHash = keccak256(abi.encodePacked(_modelURL));

        // 更新模型信息
        sale.model.name = _name;
        sale.model.description = _description;
        sale.model.version = _version;
        sale.model.modelHash = modelHash;
        sale.model.image = _image;
        sale.model.price = _price;
        sale.model.category = _category;

        // 触发ModelUpdated事件
        emit ModelUpdated(
            _id,
            _name,
            _description,
            _version,
            modelHash,
            _image,
            _price,
            _category
        );
    }

    // 删除售卖活动的函数
    function deleteSale(uint256 _id) public {
        Sale storage sale = sales[_id];

        // 确保只有模型所有者可以删除售卖活动
        require(
            msg.sender == sale.owner,
            "Only the owner can delete the sale."
        );

        // 删除售卖活动
        delete sales[_id];

        // 触发SaleDeleted事件
        emit SaleDeleted(_id);
    }

    // 添加评论的函数
    function addComment(
        uint256 _id,
        string memory _comment,
        uint256 _rating
    ) public {
        Sale storage sale = sales[_id];

        // 确保评论者是模型的购买者
        bool isBuyer = false;
        for (uint i = 0; i < sale.buyers.length; i++) {
            if (sale.buyers[i] == msg.sender) {
                isBuyer = true;
                break;
            }
        }
        require(isBuyer, "Only buyers can add comments.");

        // 确保评分在1到5之间
        require(
            _rating >= 1 && _rating <= 5,
            "Rating must be between 1 and 5."
        );

        // 确保每个购买者只能评论一次
        for (uint i = 0; i < sale.comments.length; i++) {
            require(
                sale.comments[i].buyer != msg.sender,
                "You have already commented."
            );
        }

        // 添加评论
        sale.comments.push(
            Comment({buyer: msg.sender, content: _comment, rating: _rating})
        );

        // 更新模型的评分
        uint256 totalRating = 0;
        for (uint i = 0; i < sale.comments.length; i++) {
            totalRating += sale.comments[i].rating;
        }
        sale.model.rating = totalRating / sale.comments.length;
        sale.model.ratingCount++;

        // 触发CommentAdded事件
        emit CommentAdded(_id, msg.sender, _comment, _rating);
    }

    // 获取指定售卖活动的所有评论的函数
    function getComments(uint256 _id) public view returns (Comment[] memory) {
        return sales[_id].comments;
    }

    // 搜索特定种类模型的函数
    function getModelsByCategory(
        string memory _category
    ) public view returns (Sale[] memory) {
        // 计算符合条件的售卖活动数量
        uint256 count = 0;
        for (uint i = 0; i < numberOfSales; i++) {
            if (
                keccak256(abi.encodePacked(sales[i].model.category)) ==
                keccak256(abi.encodePacked(_category))
            ) {
                count++;
            }
        }

        // 创建一个大小为count的数组
        Sale[] memory categorySales = new Sale[](count);
        uint256 index = 0;
        for (uint i = 0; i < numberOfSales; i++) {
            if (
                keccak256(abi.encodePacked(sales[i].model.category)) ==
                keccak256(abi.encodePacked(_category))
            ) {
                categorySales[index] = sales[i];
                index++;
            }
        }

        // 返回特定种类的售卖活动数组
        return categorySales;
    }

    // 根据价格范围搜索模型的函数
    function getModelsByPriceRange(
        uint256 minPrice,
        uint256 maxPrice
    ) public view returns (Sale[] memory) {
        // 计算符合条件的售卖活动数量
        uint256 count = 0;
        for (uint i = 0; i < numberOfSales; i++) {
            if (
                sales[i].model.price >= minPrice &&
                sales[i].model.price <= maxPrice
            ) {
                count++;
            }
        }

        // 创建一个大小为count的数组
        Sale[] memory priceRangeSales = new Sale[](count);
        uint256 index = 0;
        for (uint i = 0; i < numberOfSales; i++) {
            if (
                sales[i].model.price >= minPrice &&
                sales[i].model.price <= maxPrice
            ) {
                priceRangeSales[index] = sales[i];
                index++;
            }
        }

        // 返回符合价格范围的售卖活动数组
        return priceRangeSales;
    }

    // 获取特定用户创建的所有模型的函数
    function getUserModels(address user) public view returns (Sale[] memory) {
        uint256 count = 0;
        for (uint i = 0; i < numberOfSales; i++) {
            if (sales[i].owner == user) {
                count++;
            }
        }

        Sale[] memory userSales = new Sale[](count);
        uint256 index = 0;
        for (uint i = 0; i < numberOfSales; i++) {
            if (sales[i].owner == user) {
                userSales[index] = sales[i];
                index++;
            }
        }

        return userSales;
    }

    // 新增根据ID数组获取Sales的函数
    function getSalesByIds(
        uint256[] memory _ids
    ) public view returns (Sale[] memory) {
        Sale[] memory filteredSales = new Sale[](_ids.length);
        for (uint i = 0; i < _ids.length; i++) {
            require(_ids[i] < numberOfSales, "Sale ID out of range");
            filteredSales[i] = sales[_ids[i]];
        }
        return filteredSales;
    }
}
