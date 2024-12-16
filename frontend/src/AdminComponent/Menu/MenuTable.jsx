import { Create, Delete } from "@mui/icons-material";
import { Avatar, Box, Card, CardActions, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodAction, getMenuItemsByRestaurantId } from "../../component/State/Menu/Action";



export default function MenuTable() {
  const dispatch = useDispatch()
  const { restaurant, ingredients, menu } = useSelector((store) => store)
  const jwt = localStorage.getItem("jwt")

  const navigate = useNavigate()

  useEffect(() => {
    if (restaurant.userRestaurant?.id && jwt) {
      dispatch(getMenuItemsByRestaurantId({
        jwt,
        restaurantId: restaurant.userRestaurant.id,
        vegetarian: false,
        nonveg: false,
        seasonal: false,
        foodCategory: ""
      }));
    }
  }, [restaurant.userRestaurant?.id, jwt, dispatch]);

  // console.log("menu", menu);
  const handleDeleteFood = (foodId) => {

    dispatch(deleteFoodAction({ foodId, jwt }))

  }

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader action={
          <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">
            <CreateIcon />
          </IconButton>
        } title={"Menu"} sx={{ pt: 2, alignItems: "center" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">ingredients</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">Avaibilty</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Avatar src={item.images[0]}></Avatar>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">
                    {item.ingredientsItems?.map((ingredient) => <Chip key={ingredient.name} label={ingredient.name} />)}
                  </TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                  <TableCell align="right">{item.available ? "in_stock" : "out_of_stock"}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => {
                      // console.log("Deleting food ID:", item.id); // Thêm log để kiểm tra giá trị
                      handleDeleteFood(item.id);
                    }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}