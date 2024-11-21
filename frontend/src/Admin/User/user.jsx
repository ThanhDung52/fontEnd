import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUser,
  GetALLUser,
} from "../../component/State/Authentition/Action";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const User = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(GetALLUser(jwt));
  }, [dispatch, jwt]);

  useEffect(() => {
    console.log("users", auth.users); // Kiểm tra người dùng
  }, [auth.users]);

  const handleDeleteUser = (userId) => {
    dispatch(DeleteUser({ userId, jwt }));
    // Cập nhật danh sách người dùng ngay lập tức sau khi xóa
    dispatch({
      type: "DELETE_USER_SUCCESS", // Gọi hành động thành công
      payload: { userId }, // Thông tin người dùng bị xóa
    });
  };

  const currentUserId = auth?.user?.id;
  console.log(currentUserId);

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <TableContainer
        sx={{ boxShadow: 3, borderRadius: "10px", overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">MaKH</TableCell>
              <TableCell align="right">Họ và tên</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auth.users?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="right">{item.fullname}</TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">********</TableCell>{" "}
                {/* Hide password */}
                <TableCell align="right">{item.role}</TableCell>
                <TableCell align="right">
                  {item.id !== currentUserId && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteUser(item.id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
