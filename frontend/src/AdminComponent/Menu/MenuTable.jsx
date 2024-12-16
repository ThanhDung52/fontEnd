// import { Create, Delete } from "@mui/icons-material";
// import { Avatar, Box, Button, Card, CardActions, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import CreateIcon from '@mui/icons-material/Create';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteFoodAction, getMenuItemsByRestaurantId } from "../../component/State/Menu/Action";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// export default function MenuTable() {
//   const dispatch = useDispatch()
//   const { restaurant, ingredients, menu } = useSelector((store) => store)
//   const jwt = localStorage.getItem("jwt")
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [foodToDelete, setFoodToDelete] = useState(null);
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (restaurant.userRestaurant?.id && jwt) {
//       dispatch(getMenuItemsByRestaurantId({
//         jwt,
//         restaurantId: restaurant.userRestaurant.id,
//         vegetarian: false,
//         nonveg: false,
//         seasonal: false,
//         foodCategory: ""
//       }));
//     }
//   }, [restaurant.userRestaurant?.id, jwt, dispatch]);

//   // console.log("menu", menu);
//   const handleDeleteFood = (foodId) => {

//     dispatch(deleteFoodAction({ foodId, jwt }))
//     .then(() => {
//       toast.success("Xóa món ăn thành công!");
//       setFoodToDelete(null);
//       setOpenDeleteDialog(false);
//     })
//     .catch(() => {
//       toast.error("Xóa món ăn không thành công!");
//     });

//   }

//   const handleCloseDialog = () => {
//     setOpenDeleteDialog(false);
//     setFoodToDelete(null);
//   };

//   const handleOpenDialog = (foodId) => {
//     setFoodToDelete(foodId);
//     setOpenDeleteDialog(true);
//   };

//   return (
//     <Box>
//       <Card className="mt-1">
//         <CardHeader action={
//           <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">
//             <CreateIcon />
//           </IconButton>
//         } title={"Thực đơn của bạn"} sx={{ pt: 2, alignItems: "center" }} />

//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="left">Hình ảnh</TableCell>
//                 <TableCell align="right">Tên món</TableCell>
//                 <TableCell align="right">Nguyên liệu</TableCell>
//                 <TableCell align="right">Giá</TableCell>
//                 <TableCell align="right">Tình trạng</TableCell>
//                 <TableCell align="right">Xóa</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {menu.menuItems.map((item) => (
//                 <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                   <TableCell component="th" scope="row">
//                     <Avatar src={item.images[0]}></Avatar>
//                   </TableCell>
//                   <TableCell align="right">{item.name}</TableCell>
//                   <TableCell align="right">
//                     {item.ingredientsItems?.map((ingredient) => <Chip key={ingredient.name} label={ingredient.name} />)}
//                   </TableCell>
//                   <TableCell align="right">${item.price}</TableCell>
//                   <TableCell align="right">{item.available ? "Có sẵn" : "Hết hàng"}</TableCell>
//                   <TableCell align="right">
//                     <IconButton color="primary" onClick={() => handleOpenDialog(item.id)}>
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>

//       {/* Hộp thoại xác nhận xóa */}
//       <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Xác nhận xóa</DialogTitle>
//         <DialogContent>
//           Bạn có chắc chắn muốn xóa món ăn này?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Hủy
//           </Button>
//           <Button onClick={handleDeleteFood} color="secondary">
//             Xóa
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Toastify */}
//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
        
//       />
//     </Box>
//   )
// }


import { Create, Delete } from "@mui/icons-material";
import { Avatar, Box, Card, CardActions, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodAction, getMenuItemsByRestaurantId } from "../../component/State/Menu/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MenuTable() {
  const dispatch = useDispatch();
  const { restaurant, menu } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);

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

  const handleDeleteFood = () => {
    dispatch(deleteFoodAction({ foodId: foodToDelete, jwt }))
      .then(() => {
        toast.success("Xóa món ăn thành công!");
        setFoodToDelete(null);
        setOpenDeleteDialog(false);
      })
      .catch(() => {
        toast.error("Xóa món ăn không thành công!");
      });
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
    setFoodToDelete(null);
  };

  const handleOpenDialog = (foodId) => {
    setFoodToDelete(foodId);
    setOpenDeleteDialog(true);
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader action={
          <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">
            <CreateIcon />
          </IconButton>
        } title={"Thực đơn của bạn"} sx={{ pt: 2, alignItems: "center" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Hình ảnh</TableCell>
                <TableCell align="right">Tên món</TableCell>
                <TableCell align="right">Nguyên liệu</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Tình trạng</TableCell>
                <TableCell align="right">Xóa</TableCell>
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
                  <TableCell align="right">{item.available ? "Hết hàng" : "Có sẵn" }</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenDialog(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Hộp thoại xác nhận xóa */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa món ăn này?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteFood} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toastify */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        
      />
    </Box>
  );
}