
import { Box, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import CreateIcon from '@mui/icons-material/Create';
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsCategory } from "../../component/State/Restaurant/Action";
import { Create, Delete } from "@mui/icons-material";

const orders = [1, 1, 1, 1, 1, 1, 1]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FoodCategoryTable() {
  const { restaurant, restaurants} = useSelector((store) => store);
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log("restaurant", restaurant);

  useEffect(() => {
        
    dispatch(getRestaurantsCategory({
        jwt,
        restaurantId:restaurant.userRestaurant?.id
    }))
}, [restaurants]);

const handleDeleteCategoryFood=()=>{

}

  
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader action={
          <IconButton  onClick={handleOpen} aria-label="settings">
            <CreateIcon />
          </IconButton>
        } title={"FoodCategory"} sx={{ pt: 2, alignItems: "center" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
          
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  {/* <TableCell align="left">
                    <IconButton
                    color="primary" onClick={() => {
                      console.log("Deleting food ID:", item.id); // Thêm log để kiểm tra giá trị
                      handleDeleteCategoryFood(item.id);
                    }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm/>
        </Box>
      </Modal>

    </Box>
  )
}