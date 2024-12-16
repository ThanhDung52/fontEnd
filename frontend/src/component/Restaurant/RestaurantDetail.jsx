import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCart from "./MenuCart";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";


const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Non-Vegetarian", value: "non-vegetarian" },
    { label: "Seasonal", value: "seasonal" }
]

const menu =[1,1,1,1]

const RestaurantDetail = () => {
    const[foodType, setFoodType] = useState("all")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt");
    const {auth,restaurant,menu} = useSelector(store => store)
    const [selectedCategory, setSelectedCategory] = useState("")


    const {id,city} = useParams();


    const handleFilter = (e) =>{
        setFoodType(e.target.value)
        // console.log(e.target.value, e.target.name);
    }
    const handleFilterCategory = (e,value) =>{
        setSelectedCategory(value)
        console.log(e.target.value, e.target.name,value);
    }
    // console.log("restaurant", restaurant);
    
        
    useEffect (()=>{
        dispatch(getRestaurantById({jwt,restaurantId:id}))
        dispatch(getRestaurantsCategory({jwt,restaurantId:id}))
        // dispatch(getMenuItemsByRestaurantId(
        //     {jwt,
        //     restaurantId:id,
        //     vegetarian:false,
        //     nonveg:false,
        //     seasonal:false,
        //     foodCategory:""
        // }))
    },[])

    useEffect(()=>{
        dispatch(getMenuItemsByRestaurantId(
            {jwt,
            restaurantId:id,
            vegetarian:foodType ==="vegetarian",
            nonveg:foodType ==="non_vegetarian",
            seasonal:foodType ==="seasonal",
            foodCategory:selectedCategory
        })
    )
    },[selectedCategory,foodType])

    return (
        <div className="px-5 lg:px-0">
            <section>
                <h3></h3>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <img className="w-full h-[90vh] object-cover"
                                src={restaurant.restaurant?.images[1]}
                                alt=""
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="pt-3 pb-5 lg:px-10">
                    <h1 className="text-4xl font-semibold">{restaurant.restaurant?.name}</h1>
                    <p className="text-gray-500 flex items-center gap-3">
                       {restaurant.restaurant?.description}
                    </p>
                    <div className="space-y-3 mt-3">
                        <p className="text-gray-500 flex items-center gap-3">
                            <LocationOnIcon />
                            <spam>
                            {restaurant.restaurant?.address?.streetAddress},  {restaurant.restaurant?.address?.city}
                            </spam>
                        </p>
                        <p className="text-gray-500 flex items-center gap-3">
                            <CalendarTodayIcon />
                            <spam>
                            {restaurant.restaurant?.openingHours    } (Today)
                            </spam>
                        </p>
                    </div>
                </div>
            </section>
            <Divider/>
            <section className="pt-[2rem] lg:flex relative lg:px-10">
                <div className="space-y-10 lg:w-[20%] filter">
                    <div className="box space-y-5 lg:sticky top-28 p-5 shadow-md">
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Type
                            </Typography>

                            <FormControl className="py-10 space-y-5" component=
                                {"fieldset"}>
                                <RadioGroup onChange={handleFilter} name="food_Type" value={foodType}>
                                    {foodTypes.map((item) =>
                                        <FormControlLabel
                                            key={item.value}
                                            value={item.value}
                                            control={<Radio />}
                                            label={item.label} />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider/>
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Category
                            </Typography>

                            <FormControl className="py-10 space-y-5" component=
                                {"fieldset"}>
                                <RadioGroup 
                                onChange={handleFilterCategory} 
                                name="food_category" 
                                value={selectedCategory}
                                        

                                >
                                    {restaurant.categories.map((item) =>
                                        <FormControlLabel
                                            key={item}
                                            value={item.name}
                                            control={<Radio />}
                                            label={item.name} />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div className="space-y-5 lg:w-[80%] lg:pl-10">
                   {menu.menuItems.map((item)=><MenuCart key={item.id}  item={item}/>)}
                </div>

            </section>
        </div>
        
    )
}
export default RestaurantDetail