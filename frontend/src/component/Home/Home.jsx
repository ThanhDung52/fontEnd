// import React, { useEffect } from "react";
// import "./Home.css"
// import MultiItemCarousel from "./MultilitemCarousel";
// import RestaurantCart from "../Restaurant/RestaurantCart";
// import { Auth } from "../Auth/Auth";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllRestaurantsAction } from "../State/Restaurant/Action";
// import { useNavigate } from "react-router-dom";
// import { findCart } from "../State/Cart/Action";
// import { getAllFood } from "../State/Food/Action";
// import Food from "./Food";
// import { useTheme } from "@mui/material";
// import { Category } from "./Category";
// import { Footer } from "./footer";

// const restaurants = [1,1,1,1,1,1,1,1,1,1]

// export const Home = () => {
//     const dispatch = useDispatch()
//     const jwt = localStorage.getItem("jwt")
//     const {restaurant,foods} = useSelector(store =>store)
//     const theme = useTheme(); // Lấy theme hiện t
//     useEffect(()=>{
//         dispatch(getAllFood())
//     },[])
// console.log("food", foods);

//     console.log("restaurant", restaurant);
    

//     useEffect(()=>{
//         dispatch(getAllRestaurantsAction(jwt))
      
//     },[jwt])

//     const newFoods = foods.foods
//     ?.filter((food) => food.available) // Lọc các món ăn khả dụng
//     .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)); // Sắp xếp theo ngày tạo




//     return (
//         <div>
//         <div className="pb-10">
//         <section className="banner -z-50 relative flex flex-col justify-center items-center">
//             <div className="w-[50vw] z-10 text-center">
//                 <p className="text-2xl lg:text-6xl font-bold z-10 py-5">TTD Food</p>
//                 <p className="z-10 text-gray-300 text-xl lg:text-4xl" style={{ color: theme.palette.text.secondary }} >Taste the convenience: Food, Fast and Deliverde. </p>
//             </div>
//             <div className="cover absolute top-0 left-0 right-0">

//             </div>

//             <div className="fadout">

//             </div>
//         </section>
//         <section className="p-10 lg:py-5 lg:px-10">
//             <h2 className="text-2xl font-semibold">
//             Danh mục món ăn 
//             </h2>
//         </section>
        

//         <section>
//             <Category/>
//         </section>
//         {/* <section className="p-10 lg:py-10 lg:px-20">
//             <p className="text-2xl font-semibold text-gray-400 py-3 pb-10" style={{ color: theme.palette.text.secondary }}>Top Meels</p>
//             <div className="flex flex-wrap items-center justify-start  gap-5 ">
//             {
//             foods.foods?.map((food)=> <Food key={food.id}  food={food} /> )
//            }
//            </div>
          
//         </section> */}
//        <section className="px-5 lg:px-20 pt-10">
//     <h1 className="text-2xl font-semiboldpy-3" style={{ color: theme.palette.text.secondary }}>
//         Order From Our Handpicked Favorites
//     </h1>
//     <div className="flex flex-wrap items-center justify-center gap-5"> {/* Thay justify-around bằng justify-center */}
//         {
//             restaurant.restaurants.map((item) => <RestaurantCart key={item.id} item={item} />) // Thêm key cho phần tử
//         }
//     </div>
// </section>


//         </div>

//         <Footer/>
//         </div>
//     )
// }


import React, { useEffect, useMemo } from "react";
import "./Home.css";
import MultiItemCarousel from "./MultilitemCarousel";
import RestaurantCart from "../Restaurant/RestaurantCart";
import { Auth } from "../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../State/Restaurant/Action";
import { useNavigate } from "react-router-dom";
import { findCart } from "../State/Cart/Action";
import { getAllFood, getTopOrderedFoods } from "../State/Food/Action";
import Food from "./Food";
import { useTheme } from "@mui/material";
import { Category } from "./Category";
import { Footer } from "./footer";
import TopOrder from "./TopOrder";
import { FaStar } from "react-icons/fa"; 

export const Home = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, foods } = useSelector((store) => store);
    const theme = useTheme(); // Lấy theme hiện tại
    

    useEffect(() => {
        dispatch(getAllFood());
    }, []);

    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt));
    }, [jwt]);

    useEffect(() => {
        dispatch(getTopOrderedFoods(0, 2));  // Truyền tham số trang và kích thước
    }, [dispatch]);
    console.log("toporder", foods.topOrderedFoods);
    

    // Lọc và sắp xếp danh sách món ăn mới
    const newFoods = useMemo(() => {
        return foods.foods
           ?.filter((food) => food.name)
           .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    }, [foods.foods]);
    
    return (
        <div>
            <div className="pb-10">
                <section className="banner -z-50 relative flex flex-col justify-center items-center">
                    <div className="w-[50vw] z-10 text-center">
                        <p className="text-2xl lg:text-6xl font-bold z-10 py-5">TTD Food</p>
                        <p
                            className="z-10 text-gray-300 text-xl lg:text-4xl"
                            style={{ color: theme.palette.text.secondary }}
                        >
                            Taste the convenience: Food, Fast and Delivered.
                        </p>
                    </div>
                </section>
                {/* <section className="p-10 lg:py-10 lg:px-20">
                <h2 className="text-2xl font-semibold text-gray-400 py-3 pb-10">
                    Món ăn được đặt nhiều nhất
                </h2>
                <div className="flex flex-wrap items-center justify-start gap-5">
                    {foods.topOrderedFoods?.map((food) => (
                        <TopOrder key={food.id} food={food} specialCard={true} />
                    ))}
                </div>
            </section> */}
 <section className="p-10 lg:py-10 lg:px-20">
            <h2 className="text-2xl font-semibold text-gray-400 py-3 pb-10">
                Món ăn được đặt nhiều nhất
            </h2>
            <div className="flex flex-wrap items-center justify-between gap-5">
                {foods.topOrderedFoods?.slice(0, 2).map((food) => (
                    <div
                        key={food.id}
                        className="relative w-full sm:w-[48%] lg:w-[48%] h-64 rounded-lg overflow-hidden"
                    >
                        {/* Hình ảnh sản phẩm */}
                        <img
                            src={food.images}
                            alt={food.name}
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Biểu tượng ở góc trên bên phải */}
                        <div className="absolute top-3 right-3 text-[#e91e63]">
                            <FaStar size={40} />
                        </div>

                        {/* Chữ "Hoi" nổi trên ảnh */}
                        <div
                            className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50"
                            style={{ borderRadius: "12px" }}
                        >
                            <h3 className="text-white text-2xl font-bold">{food.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>

                 {/* Món ăn mới */}

                 <section className="p-10 lg:py-10 lg:px-20">
                    <h2
                        className="text-2xl font-semibold text-gray-400 py-3 pb-10"
                        style={{ color: theme.palette.text.secondary }}
                    >
                        Món ăn mới nhất
                    </h2>
                    <div className="flex flex-wrap items-center justify-start gap-5">
                        <div className="grid grid-cols-4 gap-5">
                        {newFoods.slice(0, 4).map((food) => (
                            <Food key={food.id} food={food} />
                        ))}
                        </div>                   
                    </div>
                </section>
                <section className="p-10 lg:py-5 lg:px-10">
                    <h2 className="text-2xl font-semibold">Danh mục món ăn</h2>
                </section>

                <section>
                    <Category />
                </section>

               

                <section className="px-5 lg:px-20 pt-10">
                    <h1
                        className="text-2xl font-semibold py-3"
                        style={{ color: theme.palette.text.secondary }}
                    >
                        Order From Our Handpicked Favorites
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-5">
                        {restaurant.restaurants.map((item) => (
                            <RestaurantCart key={item.id} item={item} />
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};
