import React, { useEffect, useState } from "react";
import { topMeels } from "./topMeel";
import { useDispatch, useSelector } from "react-redux";
import { getAllFood } from "../State/Food/Action";
import Food from "./Food";
import { useTheme } from "@mui/material";

export const Category = () => {
    const dispatch = useDispatch();
    const foods = useSelector((store) => store.foods.foods); // Lấy danh sách món ăn từ Redux
    const [selectedCategory, setSelectedCategory] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        console.log("Dispatching getAllFood");
        dispatch(getAllFood()); // Lấy danh sách món ăn khi component được mount
    }, [dispatch]);

    const handleCategoryClick = (category) => {
        const normalizedCategory = category.trim().toLowerCase(); 
        console.log("Normalized Category clicked:", normalizedCategory);
        setSelectedCategory(normalizedCategory); 
        console.log("Selected Category after click:", normalizedCategory);
    };

    const filteredFoods = Array.isArray(foods) 
        ? (selectedCategory 
            ? foods.filter(food => {
                const foodCategoryName = food.foodcategory?.name?.trim().toLowerCase();
                console.log("Food Category Name:", foodCategoryName);
                console.log("Comparing:", foodCategoryName, "with:", selectedCategory);
                return foodCategoryName === selectedCategory;
            }) 
            : foods) // Hiển thị tất cả sản phẩm nếu không có category được chọn
        : [];

    console.log("Filtered Foods Length:", filteredFoods.length); 
    console.log("Filtered Foods:", filteredFoods); 
    console.log("All Foods Data:", foods);

    return (
        <div>

        
        <div className="grid grid-cols-3 gap-3 p-4">
            {topMeels.map((cate) => (
                <div className="flex justify-center" key={cate.id} onClick={() => handleCategoryClick(cate.title)}>
                    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-0 transition-transform duration-300 hover:scale-105 w-full max-w-xl mx-2">
                        <div className="flex-none w-full relative overflow-hidden rounded-lg border-none">
                            <img 
                                src={cate.image} 
                                alt={cate.title} 
                                className="w-full h-60 object-cover" 
                                loading="lazy" 
                            />
                            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center text-white font-semibold bg-black bg-opacity-50 p-2">
                                {cate.title}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
           
        </div>
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10" style={{ color: theme.palette.text.secondary }}>Top Meels</p>

        {selectedCategory && (
                <p className="text-center col-span-3 font-bold">
                    Danh mục đã chọn: {selectedCategory}
                </p>
            )}
        <div className="grid grid-cols-4 gap-3 p-3">
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => (
                        <Food key={food.id} food={food} />
                    ))
                ) : (
                    <p className="text-center col-span-3">Không có món ăn nào trong danh mục này.</p>
                )}
            </div>
        </div>
    );
};
