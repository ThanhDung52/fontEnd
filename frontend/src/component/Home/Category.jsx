import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFood } from "../State/Food/Action";
import Food from "./Food";
import { getAllCategory } from "../State/Category/Action";

export const Category = () => {
    const dispatch = useDispatch();
    const foods = useSelector((store) => store.foods.foods);
    const categorys = useSelector((store) => store.categorys.categorys);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isVegetarian, setIsVegetarian] = useState(null); // Trạng thái lọc món chay hoặc không chay

    useEffect(() => {
        dispatch(getAllFood());
        dispatch(getAllCategory());
    }, [dispatch]);

    const handleCategoryClick = (categoryTitle) => {
        const normalizedCategory = categoryTitle.trim().toLowerCase();
        setSelectedCategory(normalizedCategory);
    };

    const handleVegetarianFilter = (filterType) => {
        setIsVegetarian(filterType); // "vegetarian" hoặc "non-vegetarian"
    };

    const filteredFoods = Array.isArray(foods)
        ? foods.filter((food) => {
            const matchesCategory = selectedCategory
                ? food.foodcategory?.name?.trim().toLowerCase() === selectedCategory
                : true;
            const matchesVegetarian = isVegetarian === "vegetarian"
                ? food.isVegetarian
                : isVegetarian === "non-vegetarian"
                ? !food.isVegetarian
                : true;
            return matchesCategory && matchesVegetarian;
        })
        : [];

    return (
        <div className="flex flex-row gap-5 p-5">
            {/* Danh mục dọc: Lọc món chay và không chay */}
            <div className="w-1/4 shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Bộ lọc</h2>
                <ul className="flex flex-col gap-3">
                    <li
                        className={`cursor-pointer p-2 rounded-lg transition-colors ${
                            isVegetarian === null ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleVegetarianFilter(null)}
                    >
                        Tất cả món ăn
                    </li>
                    <li
                        className={`cursor-pointer p-2 rounded-lg transition-colors ${
                            isVegetarian === "vegetarian" ? "bg-green-500 text-white" : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleVegetarianFilter("vegetarian")}
                    >
                        Món chay
                    </li>
                    <li
                        className={`cursor-pointer p-2 rounded-lg transition-colors ${
                            isVegetarian === "non-vegetarian" ? "bg-red-500 text-white" : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleVegetarianFilter("non-vegetarian")}
                    >
                        Món không chay
                    </li>
                </ul>
            </div>

            {/* Phần nội dung chính */}
            <div className="flex-1">
                {/* Danh mục ngang */}
                <div className="grid grid-cols-4 gap-3 p-4">
                    {categorys?.map((cate) => (
                        <div
                            className="flex justify-center cursor-pointer"
                            key={cate.id}
                            onClick={() => handleCategoryClick(cate.name)}
                        >
                            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-0 transition-transform duration-300 hover:scale-105 w-full max-w-xl mx-2">
                                <div className="flex-none w-full relative overflow-hidden rounded-lg border-none">
                                    <img
                                        src={cate.images}
                                        alt={cate.name}
                                        className="w-full h-60 object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center text-white font-semibold bg-black bg-opacity-50 p-2">
                                        {cate.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="text-2xl font-semibold text-gray-400 py-3 pb-10">Danh sách món ăn</h2>
                <div className="grid grid-cols-3 gap-5">
                    {filteredFoods.length > 0 ? (
                        filteredFoods.map((food) => <Food key={food.id} food={food} />)
                    ) : (
                        <p className="text-center col-span-3">Không có món ăn nào phù hợp.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
