import React, { useState } from "react";
import CartItem from "./CartItem";
import { Box, Button, Divider, Modal, TextField, useTheme } from "@mui/material";
import AddressCart from "./AddressCart";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";
import * as Yup from "yup";
import { removeCartItem } from "../State/Cart/Action";

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

const initialValues = {
    streetAddress: "",
    stateProvince: "",
    postalCode: "",
    city: ""
}

const validationSchema = Yup.object({
    streetAddress: Yup.string().required("Street address is required"),
    stateProvince: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal code is required"),
    city: Yup.string().required("City is required"),
});

const Cart = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const { cart, auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const theme = useTheme();
    const jwt = localStorage.getItem("jwt");

    const handleSubmit = (values) => {
        console.log("Selected Items before submission: ", cart.cartItems);
        
        if (cart.cartItems.length === 0) {
            alert("Giỏ hàng trống.");
            return;
        }
        
        const orderItems = cart.cartItems;
    
        // Nhóm sản phẩm theo nhà hàng
        const groupedByRestaurant = orderItems.reduce((acc, item) => {
            const restaurantId = item.food.restaurant.id;
            if (!acc[restaurantId]) {
                acc[restaurantId] = [];
            }
            acc[restaurantId].push(item);
            return acc;
        }, {});
    
        // Tạo một danh sách các promise cho từng đơn hàng
        const promises = Object.keys(groupedByRestaurant).map(restaurantId => {
            const items = groupedByRestaurant[restaurantId];
    
            // Dữ liệu cần gửi cho từng đơn hàng
            const data = {
                jwt, 
                order: {
                    restaurantId: restaurantId,
                    deliveryAddress: {
                        fullname: auth.user?.fullname || "Unknown",
                        streetAddress: values.streetAddress,
                        city: values.city,
                        stateProvince: values.stateProvince,
                        postalCode: values.postalCode,
                        country: "Việt Nam"
                    },
                    items: items.map(item => ({
                        foodId: item.food.id,
                        quantity: item.quantity,
                        price: item.totalPrice
                    }))
                }
            };
            
    
            // Log dữ liệu sẽ gửi đến server
            console.log("Data to send for restaurant ID:", restaurantId, data);
    
            // Gọi API để tạo đơn hàng cho từng nhà hàng
            return dispatch(createOrder(data)).then(response => {
                // Kiểm tra thông tin cụ thể trong response
                    console.log("Order created successfully:", response.data);
                    // Xóa sản phẩm khỏi giỏ hàng...
                    items.forEach(item => {
                        dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
                    });        
            });
        });
    
        // Chờ tất cả các đơn hàng được tạo
        Promise.all(promises)
            .then(() => {
                alert("Tất cả đơn hàng đã được tạo thành công.");
            })
            .catch(error => {
                console.error("Có lỗi xảy ra trong quá trình thanh toán: ", error);
                alert("Có lỗi xảy ra, vui lòng thử lại.");
            });
    };
    
    
    return (
        <div>
            <main className="lg:flex justify-between">
                <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
                    {cart.cartItems.map((item) => <CartItem
                        key={item.id}
                        item={item}
                    />)}
                    <Divider />
                    <div className="billDetails px-5 text-sm">
                        <p className="py-1.5" style={{ color: theme.palette.text.primary }}>Bill Details</p>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-400" style={{ color: theme.palette.text.primary }}>
                                <p>Item Total</p>
                                <p>${cart.cartItems.reduce((total, item) => total + item.totalPrice, 0)}</p>
                            </div>
                            <div className="flex justify-between text-gray-400" style={{ color: theme.palette.text.primary }}>
                                <p>Delivery Fee</p>
                                <p>$21</p>
                            </div>
                            <div className="flex justify-between text-gray-400" style={{ color: theme.palette.text.primary }}>
                                <p>GST and Restaurant Charges</p>
                                <p>$33</p>
                            </div>
                            <Divider />
                        </div>
                        <div className="flex justify-between text-gray-400" style={{ color: theme.palette.text.primary }}>
                            <p>Total pay</p>
                            <p>${cart.cartItems.reduce((total, item) => total + item.totalPrice, 0) + 21 + 33}</p>
                        </div>
                    </div>
                </section>
                <Divider orientation="vertical" flexItem />
                <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
                    <div>
                        <h1 className="text-center font-semibold text-2xl py-10" style={{ color: theme.palette.text.primary }}>
                            Choose Delivery Address
                        </h1>
                        <div className="flex justify-center">
                            <Button
                                variant="outlined"
                                onClick={() => setOpen(true)}
                                startIcon={<AddLocationAltIcon />}
                                style={{ color: theme.palette.primary.main, borderColor: theme.palette.primary.main }}
                            >
                                Add Address
                            </Button>
                        </div>
                        <div className="pt-5">
                            <AddressCart />
                        </div>

                        {/* Hiển thị nút thanh toán */}
                        <div className="flex justify-center pt-5">
                            <Button variant="contained" onClick={handleSubmit} color="primary">
                                Place Order
                            </Button>
                        </div>

                        {/* Modal để thêm địa chỉ */}
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={style}>
                                <h1 className="text-center font-semibold text-lg mb-5">Add Delivery Address</h1>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div>
                                                <Field
                                                    type="text"
                                                    name="streetAddress"
                                                    label="Street Address"
                                                    as={TextField}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="outlined"
                                                    required
                                                    error={Boolean(<ErrorMessage name="streetAddress" />)}
                                                    helperText={<ErrorMessage name="streetAddress" />}
                                                />
                                                <Field
                                                    type="text"
                                                    name="city"
                                                    label="City"
                                                    as={TextField}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="outlined"
                                                    required
                                                    error={Boolean(<ErrorMessage name="city" />)}
                                                    helperText={<ErrorMessage name="city" />}
                                                />
                                                <Field
                                                    type="text"
                                                    name="stateProvince"
                                                    label="State"
                                                    as={TextField}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="outlined"
                                                    required
                                                    error={Boolean(<ErrorMessage name="stateProvince" />)}
                                                    helperText={<ErrorMessage name="stateProvince" />}
                                                />
                                                <Field
                                                    type="text"
                                                    name="postalCode"
                                                    label="Postal Code"
                                                    as={TextField}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="outlined"
                                                    required
                                                    error={Boolean(<ErrorMessage name="postalCode" />)}
                                                    helperText={<ErrorMessage name="postalCode" />}
                                                />
                                            </div>
                                            <div className="flex justify-center pt-5">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    Add Address
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        </Modal>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Cart;
