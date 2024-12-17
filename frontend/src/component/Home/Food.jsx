import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { addItemToCart } from "../State/Cart/Action";
import { CheckCircle } from "@mui/icons-material";

const Food = ({ food }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { foods } = useSelector((store) => store);
  const theme = useTheme();
  const [selectedIngredients, setselectrdIngredients] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {}, [dispatch]);

  const renderStars = (rating) => {
    return (
      <Box display="flex" alignItems="center">
        {Array.from({ length: 4 }, (_, i) => (
          <StarIcon key={i} color="primary" />
        ))}
        <StarIcon key={5} color="disabled" />
        <Typography
          variant="body2"
          sx={{ marginLeft: 1, color: theme.palette.text.secondary }}
        >
          {rating} {food.reviewCount}
        </Typography>
      </Box>
    );
  };

  const login = localStorage.getItem("jwt")

  const handleAddItemToCart = (e) => {
    
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: food.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    // console.log("reqData", reqData);
    setOpenSnackbar(true)
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Đóng Snackbar khi người dùng đóng
};
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
        onMouseEnter={handleExpandClick}
        onMouseLeave={handleExpandClick}
      >
        {/* Giảm giá nổi trên góc phải */}
        {food.discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: theme.palette.error.main,
              color: "white",
              padding: "5px 10px",
              borderRadius: "20px",
              fontWeight: "bold",
              fontSize: "0.8rem",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            -{food.discount}%
          </Box>
        )}

        <CardMedia
          component="img"
          image={food.images[0]}
          alt="Food dish"
          sx={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
            >
              {food.name}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              {food.description}
            </Typography>
            {renderStars(food.rating)} {/* Hiển thị đánh giá sao */}
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: "bold",
              marginLeft: "16px",
              textDecoration: food.discount > 0 ? "line-through" : "none",
              color: "red",
            }}
          >
            {food.price} VNĐ
          </Typography>

          {food.discount > 0 && (
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.success.main,
                fontWeight: "bold",
                marginLeft: "16px",
              }}
            >
              ${(food.price - (food.price * food.discount) / 100).toFixed(2)}
            </Typography>
          )}
        </CardContent>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            textTransform: "none",
            fontWeight: "bold",
            marginTop: "auto", // This pushes the button to the bottom
          }}
          onClick={handleAddItemToCart}
        >
          Thêm vào giỏ hàng
        </Button>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
            marginTop: "43px",         
        }}
      >
         {login ? (
        // Hiển thị thông báo khi đã đăng nhập
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '19px',
            '& .MuiAlert-icon': {
              fontSize: '20px', // Kích thước icon bằng chữ
            },
          }}
          icon={<CheckCircle />} // Thêm icon vào Alert
        >
          Đã thêm món ăn vào giỏ hàng!
        </Alert>
      ) : (
        // Hiển thị thông báo khi chưa đăng nhập
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{
            width: '100%',
            fontSize: '19px',
            '& .MuiAlert-icon': {
              fontSize: '20px', // Kích thước icon bằng chữ
            },
          }}
        >
          Bạn chưa đăng nhập!
        </Alert>
      )}
      </Snackbar>
    </>
  );
};

export default Food;
