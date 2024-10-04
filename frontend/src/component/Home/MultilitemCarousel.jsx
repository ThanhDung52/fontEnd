import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouseItem from "./CarouseItem";
import { topMeels } from "./topMeel";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../State/Restaurant/Action";



const MultiItemCarousel = () =>{
    const {restaurant } = useSelector((store) => store)
    const dispacth = useDispatch()
    const jwt = localStorage.getItem("jwt")

    useEffect(()=>{
        dispacth(getAllRestaurantsAction(jwt))
    },[])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay:true,
        autoplaySqeed:2000,
        arrows:false
      };
    return (
       <div>
            <Slider {...settings}>
                {restaurant.restaurants?.map((item) => 
                <CarouseItem 
                image={item.images[2]}  
                title={item.name} 
                />)
                }
            </Slider>
       </div> 
    )
}
export default MultiItemCarousel