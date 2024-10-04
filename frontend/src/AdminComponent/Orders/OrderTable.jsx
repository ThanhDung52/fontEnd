import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder, updateOrderStatus } from "../../component/State/Restaurant Order/Action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Deleivered", value: "DELIVERED" }
]
const colors = [
  { background: '#ffeb3b', color: '#000' }, // Màu nền vàng, chữ đen
  { background: '#4caf50', color: '#fff' }, // Màu nền xanh lá cây, chữ trắng
  { background: '#2196f3', color: '#fff' }, // Màu nền xanh dương, chữ trắng
  { background: '#f44336', color: '#fff' }  // Màu nền đỏ, chữ trắng
];

export default function OrderTable() {
  const dispatch = useDispatch();
  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");


  // CustomChip được định nghĩa ở đây, trước phần return
  const CustomChip = ({ label, color }) => (
    <Chip
      label={label}
      style={{
        backgroundColor: color.background, // Đặt màu nền cho Chip
        color: color.color, // Đặt màu chữ cho Chip
        margin: '2px', // Đặt khoảng cách giữa các Chip
      }}
    />
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null); // Lưu trữ ID của đơn hàng được chọn

  const open = Boolean(anchorEl);
  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId); // Cập nhật ID của đơn hàng được chọn
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null); // Đặt lại khi đóng menu
  };

  useEffect(() => {
    if (restaurant.userRestaurant?.id && jwt) {
      dispatch(fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.userRestaurant.id,
      }));
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
          title={"All Orders"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">ingredients</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders?.map((item) => (
                <TableRow
                  key={item.id} // Sử dụng ID làm key cho TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) => (
                        <Avatar key={orderItem.food?.id} src={orderItem.food?.images} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullname}</TableCell>
                  <TableCell align="right">${item.totalPrice}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <p key={orderItem.food?.id}>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem, itemIndex) => (
                      <div className="mt-2" key={itemIndex}>
                        {orderItem.ingredients.map((ingredient, index) => (
                          <CustomChip
                            key={ingredient}
                            label={ingredient}
                            color={colors[index % colors.length]}
                          />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.deliveryAddress?.streetAddress || item.deliveryAddress?.city
                      ? [item.deliveryAddress.streetAddress, item.deliveryAddress.city].filter(Boolean).join(', ')
                      : 'No address available'}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open && selectedOrderId === item.id ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open && selectedOrderId === item.id ? 'true' : undefined}
                      onClick={(event) => handleClick(event, item.id)} // Gửi ID của đơn hàng
                    >
                      Update
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open && selectedOrderId === item.id} // Kiểm tra đúng với ID của đơn hàng được chọn
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem key={status.value} onClick={() => handleUpdateOrder(item.id, status.value)}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
