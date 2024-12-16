import {
    Button,
    CircularProgress,
    IconButton,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
  import CloseIcon from "@mui/icons-material/Close";
  import { useDispatch, useSelector } from "react-redux";
  import { createCategoryAction } from "../../component/State/Restaurant/Action";
  import { uploadImageToCloudinary } from "../util/UploadToCloud";
  import Notification from "../Notification/Notification";
  
  const CreateFoodCategoryForm = ( { onCategoryAdded }) => {
    const { error } = useSelector((store) => store);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [uploadImage, setUploadImage] = useState(false);
  
    const [formData, setFormData] = useState({
      categoryName: "",
      restaurantId: "1", // Default ID, có thể thay đổi
      images: [],
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        name: formData.categoryName,
        restaurantId: { id: formData.restaurantId },
        images: formData.images,
      };
    
      dispatch(
        createCategoryAction({
          reqData: data,
          jwt: localStorage.getItem("jwt"),
        })
      )
      .then(() => {
        setMessage("Tạo thành công");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
        onCategoryAdded(); // Callback để reload category list
      })
      .catch(() => {
        setMessage("Tạo không thành công. Vui lòng thử lại.");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      });
    };
    
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      setUploadImage(true);
      const image = await uploadImageToCloudinary(file);
      setFormData({
        ...formData,
        images: [...formData.images, image],
      });
      setUploadImage(false);
    };
  
    const handleRemoveImage = (index) => {
      const updatedImages = [...formData.images];
      updatedImages.splice(index, 1);
      setFormData({
        ...formData,
        images: updatedImages,
      });
    };
  
    return (
      <div className="py-10 px-5 lg:flex items-center justify-center">
        <div className="lg:max-w-4xl">
          <h1 className="font-bold text-2xl text-center py-2">
            Create Food Category
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-5">
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
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      src={image}
                      alt={`Uploaded ${index}`}
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
            </div>
            <TextField
              fullWidth
              id="categoryName"
              name="categoryName"
              label="Food Category"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.categoryName}
            />
            <Button variant="contained" type="submit">
              Create Food Category
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
  
  export default CreateFoodCategoryForm;
  