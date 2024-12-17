import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAllCategory } from "../../component/State/Category/Action"; // Đảm bảo action này được gọi sau khi thêm mới category
import { Delete } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FoodCategoryTable() {
  const { categorys } = useSelector((store) => store.categorys);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const jwt = localStorage.getItem("jwt");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);

  useEffect(() => {
    // Lấy danh sách category khi component được mount
    dispatch(getAllCategory());
  }, [dispatch]);
  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
    setFoodToDelete(null);
  };

  const handleOpenDialog = (foodId) => {
    setFoodToDelete(foodId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteFood = () => {
      dispatch(deleteCategory({ id: foodToDelete, jwt }))
        .then(() => {
          toast.success("Xóa món ăn thành công!");
          setFoodToDelete(null);
          setOpenDeleteDialog(false);
        })
        .catch(() => {
          toast.error("Xóa món ăn không thành công!");
        });
    };
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"FoodCategory"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Sự kiện</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorys.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm
            onCategoryAdded={() => dispatch(getAllCategory())}
          />
        </Box>
      </Modal>
    </Box>
  );
}
