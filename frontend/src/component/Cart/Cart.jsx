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
  Grid,
  Paper,
  Typography,
  Snackbar,
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

 
  const login = localStorage.getItem("jwt")

  const handleSubmit = async (values) => {
    if (login == null) {
      alert("Bạn chưa đăng nhập"); 
      return;
    }
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
  
        // if (values.paymentMethod === "online" && data.payment_url) {
        //   window.location.href = data.payment_url; // Chuyển hướng thanh toán online
        // } else {
        //   alert("Đơn hàng đã được tạo thành công.");
        // }
        
        if (values.paymentMethod === "cod") {
          alert("Đơn hàng được tạo thành công")
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
    <div style={{ padding: "20px", backgroundColor: "#f8f8f8" }}>
      <main>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, boxShadow: 3, backgroundColor: "#fff" }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "#333",
                  fontWeight: "bold",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                Chi tiết giỏ hàng
              </Typography>
              {cart.cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <Divider sx={{ marginY: 2 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tổng tiền sản phẩm:</span>
                <span>
                  {cart.cartItems
                    .reduce((total, item) => total + item.totalPrice, 0)
                    .toLocaleString()} VND
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Phí vận chuyển:</span>
                <span>{shippingFee.toLocaleString()} VND</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Thuế và phụ phí nhà hàng:</span>
                <span>{(33000).toLocaleString()} VND</span>
              </div>
              <Divider sx={{ marginY: 2 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  color: "#ff5722",
                }}
              >
                <span>Tổng thanh toán:</span>
                <span>
                  {(
                    cart.cartItems.reduce((total, item) => total + item.totalPrice, 0) +
                    shippingFee +
                    33000
                  ).toLocaleString()} VND
                </span>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, boxShadow: 3, backgroundColor: "#fff" }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "#333",
                  fontWeight: "bold",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                Thông tin giao hàng
              </Typography>
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
                      label="Địa chỉ"
                      fullWidth
                      margin="normal"
                      required
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: "#f1f1f1",
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                    <ErrorMessage
                      name="streetAddress"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <FormControl fullWidth margin="normal" required>
                      <InputLabel>Thành phố/Tỉnh</InputLabel>
                      <Field
                        label="Thành phố/Tỉnh"
                        name="stateProvince"
                        as={Select}
                        onChange={(e) => handleProvinceChange(e, setFieldValue)}
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: "#f1f1f1",
                        }}
                      >
                        {provinces.map((province) => (
                          <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                            {province.ProvinceName}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>

                    <FormControl fullWidth margin="normal" required>
                      <InputLabel>Quận/Huyện</InputLabel>
                      <Field
                        label="Quận/Huyện"
                        name="district"
                        as={Select}
                        onChange={(e) => handleDistrictChange(e, setFieldValue)}
                        disabled={!districts.length}
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: "#f1f1f1",
                        }}
                      >
                        {districts.map((district) => (
                          <MenuItem key={district.DistrictID} value={district.DistrictID}>
                            {district.DistrictName}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>

                    <FormControl fullWidth margin="normal" required>
                      <InputLabel>Phường/Xã</InputLabel>
                      <Field
                        label="Phường/Xã"
                        name="ward"
                        as={Select}
                        onChange={(e) => handleWardChange(e, setFieldValue)}
                        disabled={!wards.length}
                        sx={{
                          borderRadius: "8px",
backgroundColor: "#f1f1f1",
                        }}
                      >
                        {wards.map((ward) => (
                          <MenuItem key={ward.WardCode} value={ward.WardCode}>
                            {ward.WardName}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>

                    <FormControl fullWidth margin="normal" required>
                      <InputLabel>Phương thức thanh toán</InputLabel>
                      <Field as={Select} name="paymentMethod" fullWidth required label="phuong thuc thanh toan" sx={{ borderRadius: "8px", backgroundColor: "#f1f1f1" }}>
                        <MenuItem value="cod">Thanh toán khi nhận hàng</MenuItem>
                        <MenuItem value="online">Thanh toán trực tuyến</MenuItem>
                      </Field>
                    </FormControl>

                    <Field
                      as={TextField}
                      name="postalCode"
                      label="Số điện thoại"
                      fullWidth
                      margin="normal"
                      required
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: "#f1f1f1",
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                    <ErrorMessage
                      name="postalCode"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isSubmitting || isLoading}
                      sx={{
                        marginTop: 2,
                        backgroundColor: "#ff5722",
                        "&:hover": {
                          backgroundColor: "#e64a19",
                        },
                      }}
                    >
                      {isLoading ? <CircularProgress size={24} /> : "Thanh toán"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </main>
      
      <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={() => setSnackbarOpen(false)}
  message="Đơn hàng đã được tạo thành công!"
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
/>

    </div>
  );
};

export default Cart;
