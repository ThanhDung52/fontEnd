import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from "../../component/State/Restaurant Order/Action";

const orderStatus = [
  { label: "Đang chờ", value: "PENDING" },
  { label: "Hoàn thành", value: "COMPLETED" },
  { label: "Đang giao hàng", value: "OUT_FOR_DELIVERY" },
  { label: "Đã giao", value: "DELIVERED" },
];

const colors = [
  { background: "#ffeb3b", color: "#000" },
  { background: "#4caf50", color: "#fff" },
  { background: "#2196f3", color: "#fff" },
  { background: "#f44336", color: "#fff" },
];

export default function OrderTable() {
  const dispatch = useDispatch();
  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const CustomChip = ({ label, color }) => (
    <Chip
      label={label}
      style={{
        backgroundColor: color.background,
        color: color.color,
        margin: "2px",
      }}
    />
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  useEffect(() => {
    if (restaurant.userRestaurant?.id && jwt) {
      dispatch(
        fetchRestaurantsOrder({
          jwt,
          restaurantId: restaurant.userRestaurant.id,
        })
      );
    }
  }, [restaurant.userRestaurant?.id, jwt, dispatch]);

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
    handleClose();
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={"Tất cả đơn hàng"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Hình ảnh</TableCell>
                <TableCell align="right">Khách hàng</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Tên</TableCell>
                <TableCell align="right">Nguyên liệu</TableCell>
                <TableCell align="right">Địa chỉ</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Cập nhật</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders && restaurantOrder.orders.length > 0 ? (
                restaurantOrder.orders
                  .slice() // Tạo bản sao để tránh thay đổi trực tiếp trong Redux store
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sắp xếp theo `orderDate` giảm dần
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell align="right">
                        {item.items && item.items.length > 0 ? (
                          <AvatarGroup>
                            {item.items.map((orderItem) => (
                              <Avatar
                                key={orderItem.food?.id}
                                src={orderItem.food?.images}
                              />
                            ))}
                          </AvatarGroup>
                        ) : (
                          <p>Không có sản phẩm nào</p>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {item.customer?.fullname}
                      </TableCell>
                      <TableCell align="right">${item.totalPrice}</TableCell>
                      <TableCell align="right">
                        {item.items && item.items.length > 0 ? (
                          item.items.map((orderItem) => (
                            <p key={orderItem.food?.id}>
                              {orderItem.food?.name}
                            </p>
                          ))
                        ) : (
                          <p>Không có sản phẩm nào</p>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {item.items && item.items.length > 0 ? (
                          item.items.map((orderItem, itemIndex) => (
                            <div className="mt-2" key={itemIndex}>
                              {orderItem.ingredients &&
                              orderItem.ingredients.length > 0 ? (
                                orderItem.ingredients.map(
                                  (ingredient, index) => (
                                    <CustomChip
                                      key={ingredient}
                                      label={ingredient}
                                      color={colors[index % colors.length]}
                                    />
                                  )
                                )
                              ) : (
                                <p>Không có nguyên liệu nào</p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p>Không có sản phẩm nào</p>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {item.deliveryAddress
                          ? [
                              item.deliveryAddress.streetAddress,
                              item.deliveryAddress.wardName,
                              item.deliveryAddress.districtName,
                              item.deliveryAddress.provinceName,
                              item.deliveryAddress.country,
                              item.deliveryAddress.postalCode,
                            ]
                              .filter(Boolean) // Loại bỏ các phần tử null hoặc undefined
                              .join(", ") // Ghép các phần tử với dấu phẩy
                          : "Không có địa chỉ nào"}
                      </TableCell>
                      <TableCell align="right">{item.orderStatus}</TableCell>
                      <TableCell align="right">
                        <Button
                          id="basic-button"
                          aria-controls={
                            open && selectedOrderId === item.id
                              ? "basic-menu"
                              : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={
                            open && selectedOrderId === item.id
                              ? "true"
                              : undefined
                          }
                          onClick={(event) => handleClick(event, item.id)}
                        >
                          Cập nhật
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open && selectedOrderId === item.id}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          {orderStatus.map((status) => (
                            <MenuItem
                              key={status.value}
                              onClick={() =>
                                handleUpdateOrder(item.id, status.value)
                              }
                            >
                              {status.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Không có đơn hàng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
