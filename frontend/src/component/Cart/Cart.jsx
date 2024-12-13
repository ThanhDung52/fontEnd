import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import {
  Box,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  CircularProgress,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";
import * as Yup from "yup";
import { removeCartItem } from "../State/Cart/Action";
import {
  getProvinces,
  getDistricts,
  getWards,
} from "../State/GHN_API/GhnService";

// const initialValues = {
//   streetAddress: "",
//   postalCode: "",
//   city: "",
//   country: "Việt Nam",
//   stateProvince: "",
//   provinceName: "",
//   districtName: "",
//   wardName: "",
//   district: "",
//   ward: "",
// };

// const validationSchema = Yup.object({
//   streetAddress: Yup.string().required("Street address is required"),
//   stateProvince: Yup.string().required("State is required"),
//   district: Yup.string().required("District is required"),
//   ward: Yup.string().required("Ward is required"),
//   postalCode: Yup.string().required("Postal code is required"),
// });

const initialValues = {
  streetAddress: "",
  postalCode: "",
  city: "",
  country: "Việt Nam",
  stateProvince: "",
  provinceName: "",
  districtName: "",
  wardName: "",
  district: "",
  ward: "",
  paymentMethod: "cod", // Thanh toán khi nhận hàng mặc định
};

const validationSchema = Yup.object({
  streetAddress: Yup.string().required("Street address is required"),
  stateProvince: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  ward: Yup.string().required("Ward is required"),
  postalCode: Yup.string().required("Postal code is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
});

const Cart = () => {
  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt") || auth.jwt;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoading(true);
      try {
        const response = await getProvinces();
        setProvinces(response.data.data);
      } catch (error) {
        setError("Failed to load provinces");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (event, setFieldValue) => {
    const provinceId = event.target.value;
    const selectedProvince = provinces.find(
      (province) => province.ProvinceID === provinceId
    );

    setFieldValue("stateProvince", provinceId);
    setFieldValue("provinceName", selectedProvince.ProvinceName);
    setFieldValue("district", "");
    setFieldValue("ward", "");
    setDistricts([]);
    setWards([]);

    setIsLoading(true);
    try {
      const response = await getDistricts(provinceId);
      setDistricts(response.data.data);
    } catch (error) {
      setError("Failed to load districts");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDistrictChange = async (event, setFieldValue) => {
    const districtId = event.target.value;
    const selectedDistrict = districts.find(
      (district) => district.DistrictID === districtId
    );

    setFieldValue("district", districtId);
    setFieldValue("districtName", selectedDistrict.DistrictName);
    setFieldValue("ward", "");

    setIsLoading(true);
    try {
      const response = await getWards(districtId);
      setWards(response.data.data);
    } catch (error) {
      setError("Failed to load wards");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWardChange = (event, setFieldValue) => {
    const wardId = event.target.value;
    const selectedWard = wards.find((ward) => ward.WardCode === wardId);
    setFieldValue("ward", wardId);
    setFieldValue("wardName", selectedWard.WardName);
  };

  // const handleSubmit = async (values) => {
  //   if (cart.cartItems.length === 0) {
  //     alert("Giỏ hàng trống.");
  //     return;
  //   }

  //   const orderItems = cart.cartItems;
  //   const groupedByRestaurant = orderItems.reduce((acc, item) => {
  //     const restaurantId = item.food.restaurant.id;
  //     if (!acc[restaurantId]) {
  //       acc[restaurantId] = [];
  //     }
  //     acc[restaurantId].push(item);
  //     return acc;
  //   }, {});

    

  //   try {
  //     for (const restaurantId of Object.keys(groupedByRestaurant)) {
  //       const items = groupedByRestaurant[restaurantId];
  //       const data = {
  //         order: {
  //           restaurantId,
  //           deliveryAddress: {
  //             fullname: auth.user?.fullname || "Unknown",
  //             streetAddress: values.streetAddress,
  //             stateProvince: values.stateProvince,
  //             provinceName: values.provinceName,
  //             districtName: values.districtName,
  //             wardName: values.wardName,
  //             postalCode: values.postalCode,
  //             city: values.city,
  //             country: values.country,
  //           },
  //           items: items.map((item) => ({
  //             foodId: item.food.id,
  //             quantity: item.quantity,
  //             price: item.totalPrice,
  //           })),
  //         },
  //         jwt: localStorage.getItem("jwt"),
  //       };

  //       dispatch(createOrder(data));

  //       // Xóa từng mục trong giỏ hàng sau khi tạo đơn hàng
  //       for (const item of items) {
  //         // dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
  //       }
  //     }

  //     alert("Tất cả đơn hàng đã được tạo thành công.");
  //   } catch (error) {
  //     console.error("Có lỗi xảy ra trong quá trình thanh toán: ", error);
  //     alert("Có lỗi xảy ra, vui lòng thử lại.");
  //   }
  // };

  const handleSubmit = async (values) => {
    if (cart.cartItems.length === 0) {
      alert("Giỏ hàng trống.");
      return;
    }
  
    const orderItems = cart.cartItems;
    const groupedByRestaurant = orderItems.reduce((acc, item) => {
      const restaurantId = item.food.restaurant.id;
      if (!acc[restaurantId]) {
        acc[restaurantId] = [];
      }
      acc[restaurantId].push(item);
      return acc;
    }, {});
  
    const paymentId = crypto.randomUUID();

    try {
      for (const restaurantId of Object.keys(groupedByRestaurant)) {
        const items = groupedByRestaurant[restaurantId];
        const data = {
          order: {
            restaurantId,
            deliveryAddress: {
              fullname: auth.user?.fullname || "Unknown",
              streetAddress: values.streetAddress,
              stateProvince: values.stateProvince,
              provinceName: values.provinceName,
              districtName: values.districtName,
              wardName: values.wardName,
              postalCode: values.postalCode,
              city: values.city,
              country: values.country,
            },
            items: items.map((item) => ({
              foodId: item.food.id,
              quantity: item.quantity,
              price: item.totalPrice,
            })),
            paymentMethod: values.paymentMethod,
            paymentId,
          },
          jwt: localStorage.getItem("jwt"),
          
        };
  
        dispatch(createOrder(data));
  
        if (values.paymentMethod === "online" && data.payment_url) {
          window.location.href = data.payment_url; // Chuyển hướng thanh toán online
        } else {
          alert("Đơn hàng đã được tạo thành công.");
        }
  
        // Xóa từng mục trong giỏ hàng sau khi tạo đơn hàng
        for (const item of items) {
          dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
        }
      }
    } catch (error) {
      console.error("Có lỗi xảy ra trong quá trình thanh toán: ", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  
  
  return (
    <div>
      <main className="lg:flex justify-between">
        <section className="lg:w-[50%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          <div className="billDetails  px-5 py-4 shadow-md rounded-lg text-sm">
            <h2 className="font-semibold text-lg mb-2">Bill Details</h2>
            <div className="flex justify-between border-b py-2">
              <span>Item Total:</span>
              <span>
                $
                {cart.cartItems
                  .reduce((total, item) => total + item.totalPrice, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Delivery Fee:</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>GST and Restaurant Charges:</span>
              <span>$33.00</span>
            </div>
            <Divider className="my-2" />
            <div className="flex justify-between font-bold text-lg py-2">
              <span>Total Pay:</span>
              <span>
                $
                {(
                  cart.cartItems.reduce(
                    (total, item) => total + item.totalPrice,
                    0
                  ) +
                  shippingFee +
                  33
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[50%] flex px-5 pb-10 lg:pb-0">
          <Box
            sx={{
              maxWidth: "500px", // Maximum width for the form
              width: "100%",
              margin: "0", // Remove margin to align left
              display: "flex", // Use flexbox for alignment
              flexDirection: "column", // Arrange children vertically
              borderRadius: "8px", // Optional: Rounded corners
              padding: "16px", // Optional: Inner padding
              boxShadow: 2, // Optional: Add a shadow for better visibility
              height: "550px",
              maxHeight: "100%",
            }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <FormControl
                    fullWidth
                    margin="normal"
                    style={{ minWidth: 120 }}
                  >
                    <InputLabel>Province</InputLabel>
                    <Field
                      label="Province"
                      name="stateProvince"
                      as={Select}
                      fullWidth
                      onChange={(e) => handleProvinceChange(e, setFieldValue)}
                      required
                    >
                      {provinces.map((province) => (
                        <MenuItem
                          key={province.ProvinceID}
                          value={province.ProvinceID}
                        >
                          {province.ProvinceName}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="stateProvince"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="normal"
                    style={{ minWidth: 120 }}
                  >
                    <InputLabel>District</InputLabel>
                    <Field
                    label="District"
                      name="district"
                      as={Select}
                      fullWidth
                      onChange={(e) => handleDistrictChange(e, setFieldValue)}
                      disabled={!districts.length}
                      required
                    >
                      {districts.map((district) => (
                        <MenuItem
                          key={district.DistrictID}
                          value={district.DistrictID}
                        >
                          {district.DistrictName}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="district"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="normal"
                    style={{ minWidth: 120 }}
                  >
                    <InputLabel>Ward</InputLabel>
                    <Field
                    label="Ward"
                      name="ward"
                      as={Select}
                      fullWidth
                      onChange={(e) => handleWardChange(e, setFieldValue)}
                      disabled={!wards.length}
                      required
                    >
                      {wards.map((ward) => (
                        <MenuItem key={ward.WardCode} value={ward.WardCode}>
                          {ward.WardName}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="ward"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="normal"
                    style={{ minWidth: 120 }}
                  >
                    <InputLabel >Payment Method</InputLabel>
                    <Field name="paymentMethod" 
                    as={Select} fullWidth required
                      label="Payment Method"
                    >
                      <MenuItem value="cod">Thanh toán khi nhận hàng</MenuItem>
                      <MenuItem value="online">Thanh toán trực tuyến</MenuItem>
                    </Field>
                    <ErrorMessage
                      name="paymentMethod"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  <Field
                    as={TextField}
                    name="postalCode"
                    label="Postal Code"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <ErrorMessage
                    name="postalCode"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Checkout"}
                  </Button>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                </Form>
              )}
            </Formik>

            
          </Box>
        </section>
      </main>
    </div>
  );
};

export default Cart;
