import { Create, Delete } from "@mui/icons-material";
import { Box, Card, CardActions, Modal, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import React, { useEffect } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { CreateIngredientForm } from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientOfRestaurant, updateStockOfIngredient } from "../../component/State/Ingredients/Action";

const orders=[1,1,1,1,1,1,1]
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

export default function IngredientTable() {
  const dispatch = useDispatch()
  const {restaurant, ingredients,loading, error} = useSelector((store )=>store)
  const jwt = localStorage.getItem("jwt")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(()=>{
    dispatch(getIngredientOfRestaurant({jwt, id:restaurant.userRestaurant.id}))
  },[ingredients])

  const handleUpdateStoke = (id) =>{
    dispatch(updateStockOfIngredient({id, jwt}))
  }
  // console.log(ingredients);
  
    return(
        <Box>
         <Card className="mt-1">
            <CardHeader   action={
          <IconButton onClick={handleOpen} aria-label="settings">
            <CreateIcon />
          </IconButton>
        } title={"Thành phần"}sx={{pt:2, alignItems:"center"}}/>

              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="right">Tên thành phần</TableCell>
            <TableCell align="right">Danh mục</TableCell>
            <TableCell align="right">Tình trạng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.ingredients.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">{item.category?.name}</TableCell>
              <TableCell align="right">
                <Button onClick={()=>handleUpdateStoke(item.id)}>
                  {item.inStoke?"Còn hàng":"Hết hàng"}
                </Button>
              </TableCell>
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
        <CreateIngredientForm />
        </Box>
      </Modal>
        </Box>
    )
}