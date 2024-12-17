import { Alert, Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from "../util/UploadToCloud";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../component/State/Menu/Action";
import { getIngredientOfRestaurant } from "../../component/State/Ingredients/Action";
import Notification from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../../component/State/Category/Action";
import * as Yup from 'yup';

const initialValues = {
    name: "",
    description: "",
    price: "",
    categoryId: "",
    restaurantId: "",
    vegetarian: true,
    seasonal: false,
    ingredients: [],
    images: []
};

// Xác thực dữ liệu trong form
const validationSchema = Yup.object({
    name: Yup.string()
        .required("Tên món ăn là bắt buộc."),
    price: Yup.number()
        .typeError("Giá tiền phải là số hợp lệ.")
        .positive("Giá tiền không thể là số âm.")
        .required("Giá tiền là bắt buộc.")
});

const CreateMenuForm = () => {
    const dispatch = useDispatch();
    const { restaurant, ingredients, loading, error, categorys } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");
    const [uploadImage, setUploadImage] = useState(false);
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();
    const [notificationType, setNotificationType] = useState("success");

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            // Đảm bảo rằng restaurantId đã được thiết lập
            if (!restaurant.userRestaurant?.id) {
                setMessage("Thiếu ID nhà hàng.");
                setNotificationType("error");
                setShowNotification(true);
                return;
            }
            values.restaurantId = restaurant.userRestaurant.id;

            // Đảm bảo rằng categoryId được thiết lập đúng
            if (!values.categoryId) {
                setMessage("Danh mục là bắt buộc.");
                setNotificationType("error");
                setShowNotification(true);
                return;
            }

            // Gửi yêu cầu tạo menu
            console.log("Đang gửi giá trị:", values); // Log giá trị để kiểm tra

            // Dispatch action để tạo menu item
            dispatch(createMenuItem({ menu: values, jwt }));

            // Notification
            if (!error) {
                setMessage("Thêm menu thành công");
                setNotificationType("success");
                setShowNotification(true);
                formik.resetForm(); // Reset form khi thành công
            } else {
                setMessage("Thêm menu không thành công. Vui lòng thử lại.");
                setNotificationType("error");
                setShowNotification(true);
            }
        }
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setUploadImage(true);
        const image = await uploadImageToCloudinary(file);
        formik.setFieldValue("images", [...formik.values.images, image]);
        setUploadImage(false);
    };

    const handleRemoveImage = (index) => {
        const updateImages = [...formik.values.images];
        updateImages.splice(index, 1);
        formik.setFieldValue("images", updateImages);
    };

    useEffect(() => {
        dispatch(getIngredientOfRestaurant({ jwt, id: restaurant.userRestaurant?.id }));
    }, []);

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    return (
        <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
            <div className="lg:max-w-4xl">
                <h1 className="font-bold text-2xl text-center py-2">
                    Thêm món ăn mới
                </h1>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <Grid container spacing={2} >
                        <Grid className="flex flex-wrap gap-5" item xs={12}>
                            <input
                                accept="images/*"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                type="file" />
                            <label className="relative" htmlFor="fileInput">
                                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                                    <AddPhotoAlternateIcon className="text-white" />
                                </span>
                                {uploadImage && (
                                    <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                                        <CircularProgress />
                                    </div>
                                )}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {formik.values.images.map((image, index) => (
                                    <div className="relative">
                                        <img
                                            className="w-24 h-24 object-cover"
                                            key={index}
                                            src={image}
                                            alt="" />
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                outline: "none"
                                            }}
                                            onClick={() => handleRemoveImage(index)}>
                                            <CloseIcon sx={{ fontSize: "1rem" }} />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth
                                id="name"
                                name="name"
                                label="Tên món ăn"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth
                                id="description"
                                name="description"
                                label="Mô tả"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <TextField fullWidth
                                id="price"
                                name="price"
                                label="Giá tiền"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.price}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Danh mục</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="categoryId"
                                    value={formik.values.categoryId}
                                    label="Danh mục"
                                    onChange={e => formik.setFieldValue('categoryId', e.target.value)}
                                >
                                    {categorys.categorys.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-chip-label">Thành phần</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    name="ingredients"
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={formik.handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Thành phần" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value.id} label={value.name} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {ingredients.ingredients?.map((item, index) => (
                                        <MenuItem key={item.id} value={item}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Món chay</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="vegetarian"
                                    value={formik.values.vegetarian}
                                    label="Is Vegetarian"
                                    onChange={formik.handleChange}
                                    name="vegetarian"
                                >
                                    <MenuItem value={true}>Có</MenuItem>
                                    <MenuItem value={false}>Không</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Theo mùa</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="seasonal"
                                    value={formik.values.seasonal}
                                    label="Is Seasonal"
                                    onChange={formik.handleChange}
                                    name="seasonal"
                                >
                                    <MenuItem value={true}>Có</MenuItem>
                                    <MenuItem value={false}>Không</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button variant="contained" color="primary" type="submit">
                        Tạo menu
                    </Button>

                    <Snackbar
                        open={showNotification}
                        autoHideDuration={6000}
                        onClose={() => setShowNotification(false)}
                    >
                        <Alert
                            onClose={() => setShowNotification(false)}
                            severity={notificationType}
                            sx={{ width: '100%', 
                                position:"top-center" }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </div>
    );
};

export default CreateMenuForm;
