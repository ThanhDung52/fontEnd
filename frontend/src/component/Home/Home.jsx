import React, { useEffect } from "react";
import "./Home.css"
import MultiItemCarousel from "./MultilitemCarousel";
import RestaurantCart from "../Restaurant/RestaurantCart";
import { Auth } from "../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../State/Restaurant/Action";
import { useNavigate } from "react-router-dom";
import { findCart } from "../State/Cart/Action";
import { getAllFood } from "../State/Food/Action";
import Food from "./Food";
import { useTheme } from "@mui/material";
import { Category } from "./Category";
import { Footer } from "./footer";

const restaurants = [1,1,1,1,1,1,1,1,1,1]

export const Home = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const {restaurant,foods} = useSelector(store =>store)
    const theme = useTheme(); // Lấy theme hiện t
    useEffect(()=>{
        dispatch(getAllFood())
    },[])
console.log("food", foods);

    console.log("restaurant", restaurant);
    

    useEffect(()=>{
        dispatch(getAllRestaurantsAction(jwt))
      
    },[jwt])



    return (
        <div>
        <div className="pb-10">
        <section className="banner -z-50 relative flex flex-col justify-center items-center">
            <div className="w-[50vw] z-10 text-center">
                <p className="text-2xl lg:text-6xl font-bold z-10 py-5">TTD Food</p>
                <p className="z-10 text-gray-300 text-xl lg:text-4xl" style={{ color: theme.palette.text.secondary }} >Taste the convenience: Food, Fast and Deliverde. </p>
            </div>
            <div className="cover absolute top-0 left-0 right-0">

            </div>

            <div className="fadout">

            </div>
        </section>
        <section className="p-10 lg:py-5 lg:px-10">
            <h2 className="text-2xl font-semibold">
            Danh mục món ăn 
        </h2>
        </section>
        

        <section>
            <Category/>
        </section>
        {/* <section className="p-10 lg:py-10 lg:px-20">
            <p className="text-2xl font-semibold text-gray-400 py-3 pb-10" style={{ color: theme.palette.text.secondary }}>Top Meels</p>
            <div className="flex flex-wrap items-center justify-start  gap-5 ">
            {
            foods.foods?.map((food)=> <Food key={food.id}  food={food} /> )
           }
           </div>
          
        </section> */}
        
        <section className="px-5 lg:px-20" pt-10>
           <h1 className="text-2xl font-semibold text-gray-400 py-3" style={{ color: theme.palette.text.secondary }}>Order From Our Handpicked Favorites</h1>
           <div className="flex flex-wrap items-center justify-around gap-5">
                {
                    restaurant.restaurants.map((item) => <RestaurantCart item={item}/>)
                }
           </div>
        </section>

        </div>

        <Footer/>
        </div>
    )
}