import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from "../util/categorizeingredient";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";
import Notification from "../../AdminComponent/Notification/Notification";



const demo = [
    {
        category: "Nuts & seeds",
        ingredients: ["Cashews"]
    },
    {
        category: "Protein",
        ingredients: ["Ground beef", "Bacon strips"]
    }
]

const MenuCart = ({ item }) => {
    const [selectedIngredients, setselectrdIngredients] = useState([])
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const { loading, error } = useSelector((store) => store);


    const handleCheckBoxChange = (itemName) => {
        // console.log("value", itemName);

        if (selectedIngredients.includes(itemName)) {
            setselectrdIngredients(selectedIngredients.filter((item) => item !== itemName))
        } else {
            setselectrdIngredients([...selectedIngredients, itemName])
        }

    }
    const handleAddItemToCart = (e) => {
        e.preventDefault()
        const reqData = {

            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity: 1,
                ingredients: selectedIngredients,
            }
        }
        dispatch(addItemToCart(reqData))
        // console.log("reqData", reqData);

        if (!error) {
            setMessage("Thêm giỏ hàng thành công");
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
               
            }, 2000);
        } else {
            setMessage("Thêm giỏ hàng  không thành công. Vui lòng thử lại.");
            setShowNotification(true);
        }

    }


    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div className="lg:flex items-center justify-between">
                    <div className="lg:flex items-center lg:gap-5">
                        <img className="w-[7rem] h-[7rem] object-cover"
                            src={item.images[0]}
                            alt="" />
                        <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                            <p className="font-semibold text-xl">{item.name}</p>
                            <p>{item.price}</p>
                            <p className="text-gray-400">{item.description}</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleAddItemToCart}>
                    <div className="flex gap-5 flex-wrap">
                        {
                            Object.keys(categorizeIngredients(item.ingredientsItems)).map((category) =>

                                <div>
                                    <p>{category}</p>
                                    <FormGroup>
                                        {categorizeIngredients(item.ingredientsItems)[category].map((item) => <FormControlLabel key={item.id}
                                            control={<Checkbox
                                                onChange={() => handleCheckBoxChange(item.name)} />} label={item.name} />)}

                                    </FormGroup>
                                </div>
                            )}

                    </div>
                    <div className="pt-5">
                        <Button variant="contained" disabled={false} type="submit">
                            {true ? "Add To Cart" : "Out Of Cart"}
                        </Button>
                        {showNotification && (
                            <Notification
                                message={message}
                                type={error ? "error" : "success"}
                                onClose={() => setShowNotification(false)}
                            />
                        )}
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}
export default MenuCart