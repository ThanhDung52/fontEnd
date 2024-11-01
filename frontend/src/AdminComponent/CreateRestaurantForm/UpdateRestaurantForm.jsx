import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudinary } from "../util/UploadToCloud";
import { useDispatch, useSelector } from "react-redux";
import {
  createRestaurant,
  getRestaurantByUserId,
  updateRestaurant,
} from "../../component/State/Restaurant/Action";
import Notification from "../Notification/Notification";
import "../Notification/Notification.css";

const UpdateRestaurantForm = ({ restaurantData, onUpdateSuccess }) => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispacth = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, loading, error } = useSelector((store) => store);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const initialValues = {
    name: restaurantData?.name || "",
    description: restaurantData?.description || "",
    cuisineType: restaurantData?.cuisineType || "",
    streetAddress: restaurantData?.address?.streetAddress || "",
    city: restaurantData?.address?.city || "",
    stateProvince: restaurantData?.address?.stateProvince || "",
    postalCode: restaurantData?.address?.postalCode || "",
    country: restaurantData?.address?.country || "",
    email: restaurantData?.contactInformation?.email || "",
    mobile: restaurantData?.contactInformation?.mobile || "",
    twitter: restaurantData?.contactInformation?.twitter || "",
    instagram: restaurantData?.contactInformation?.instagram || "",
    openingHours: restaurantData?.openingHours || "",
    images: restaurantData?.images || [],
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          postalCode: values.postalCode,
          country: values.country,
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images, // Nếu values.images là một mảng
      };

      console.log("data_update", data);
      dispacth(
        updateRestaurant({
          restaurantId: restaurant.userRestaurant.id,
          data,
          jwt,
        })
      );

      if (!error) {
        setMessage("Update thành công");
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
          onUpdateSuccess();
        }, 2000);
      } else {
        setMessage("Cập nhật không thành công. Vui lòng thử lại.");
        setShowNotification(true);
      }
    },
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
    dispacth(getRestaurantByUserId(jwt));
  }, []);

  return (
    <div>
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">
          Update Restaurant
        </h1>
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            outline: "none",
            margin: "40px",
          }}
          onClick={() => onUpdateSuccess()}
        >
          <CloseIcon sx={{ fontSize: "3rem" }} />
        </IconButton>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                accept="images/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file"
              />

              <label className="relative" htmlFor="fileInput">
                <span
                  className="w-24 h-24 cursor-pointer flex items-center justify-center
                    p-3 border rounded-md border-gray-600"
                >
                  <AddPhotoAlternateIcon className="text-white" />
                </span>
                {uploadImage && (
                  <div
                    className="absolute left-0 right-0 top-0
                    bottom-0 w-24 h-24 flex justify-center items-center
                    "
                  >
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
                      alt=""
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cusine Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id="stateProvince"
                name="stateProvince"
                label="StateProvince"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Postatl Code"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              ></TextField>
            </Grid>
          </Grid>
          {/* <Button variant="contained" color="primary" type="submit">Update Restaurant</Button> */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update Restaurant"}
          </Button>
          {showNotification && (
            <Notification
              message={message}
              type={error ? "error" : "success"}
              onClose={() => setShowNotification(false)}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateRestaurantForm;
