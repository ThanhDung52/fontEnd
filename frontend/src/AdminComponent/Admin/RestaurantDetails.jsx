import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  useTheme,
} from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../component/State/Restaurant/Action";
import UpdateRestaurantForm from "../CreateRestaurantForm/UpdateRestaurantForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Chiều rộng modal sẽ chiếm 90% chiều rộng màn hình
  maxWidth: "1000px", // Tối đa chiều rộng của modal
  bgcolor: "background.paper",
  height:"99%",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const RestaurantDetails = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.userRestaurant.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };
  // console.log("restaurant_detail", restaurant);

  return (
    <Box>
      <div
        className="lg:px-20 px-5 pb-10"
        style={{ color: theme.palette.text.secondary }}
      >
        <div className="py-5 flex justify-center items-center gap-5">
          <h1
            className="text-2xl lg:text-7xl text-center font-bold p-5"
            style={{ color: theme.palette.text.secondary }}
          >
            {restaurant.userRestaurant?.name}
          </h1>
          <div>
            <Button
              color={!restaurant.userRestaurant?.open ? "primary" : "error"}
              className="py-[1rem] px-[2rem]"
              variant="contained"
              onClick={handleRestaurantStatus}
              size="large"
            >
              {restaurant.userRestaurant?.open ? "Đóng cửa" : "Mở cửa"}
            </Button>
          </div>
          <div>
            <Button
              onClick={handleOpen}
              color="primary"
              className="py-[1rem] px-[2rem]"
              variant="contained"
              size="large"
            >
              Cập nhật
            </Button>
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <span
                    className="text-gray-300"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    Nhà hàng
                  </span>
                }
              />
              <CardContent>
                <div className="space-y-4 text-gray-200">
                  <div className="flex">
                    <p
                      className="w-48"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      Họ và tên
                    </p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span
                        className="pr-5"
                        style={{ color: theme.palette.text.secondary }}
                      >
                        -
                      </span>
                      {restaurant.userRestaurant?.owner?.fullname}
                    </p>
                  </div>
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Tên Nhà hàng</p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.name}
                    </p>
                  </div>
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Liên lạc</p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.cuisineType}
                    </p>
                  </div>
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Giờ hoạt động</p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.openingHours}
                    </p>
                  </div>
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Trạng thái</p>
                    <p className="text-gray-400">
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.open ? (
                        <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                          Mở của
                        </span>
                      ) : (
                        <span className="px-5 py-2 rounded-full bg-red-400 text-gray-950">
                          Đóng cửa
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader
                title={
                  <span
                    className="text-gray-300"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    Địa chỉ
                  </span>
                }
              />
              <CardContent>
                <div
                  className="space-y-4 text-gray-200"
                  style={{ color: theme.palette.text.secondary }}
                >
                  <div className="flex">
                    <p className="w-48">Quốc gia</p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.address?.country}
                    </p>
                  </div>
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Thành phố</p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.address?.city}
                    </p>
                  </div>
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Đường</p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.address?.streetAddress}
                    </p>
                  </div>
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Mã bưu điện</p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.address?.postalCode}
                    </p>
                  </div>
                 
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader
                title={
                  <span
                    className="text-gray-300"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    Liên hệ
                  </span>
                }
              />
              <CardContent>
                <div className="space-y-4 text-gray-200">
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Email</p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.contactInformation?.email}
                    </p>
                  </div>
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Số điện thoại</p>
                    <p
                      className="text-gray-400"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      {restaurant.userRestaurant?.contactInformation?.mobile}
                    </p>
                  </div>
                  <div
                    className="flex"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <p className="w-48">Truyền thông</p>
                    <div
                      className="flex text-gray-400 items-center pb-3 gap-5"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      <span className="pr-5">-</span>
                      <a
                        href={
                          restaurant.userRestaurant?.contactInformation
                            ?.facebook
                        }
                      >
                        {" "}
                        <FacebookIcon sx={{ fontSize: "3rem" }} />
                      </a>
                      <a
                        href={
                          restaurant.userRestaurant?.contactInformation
                            ?.instagram
                        }
                      >
                        <InstagramIcon sx={{ fontSize: "3rem" }} />
                      </a>
                      <a href="">
                        <TwitterIcon sx={{ fontSize: "3rem" }} />
                      </a>
                      <a href="">
                        {" "}
                        <LinkedInIcon sx={{ fontSize: "3rem" }} />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UpdateRestaurantForm restaurantData={restaurant.userRestaurant} onUpdateSuccess={handleClose}/>
                </Box>
            </Modal> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateRestaurantForm
            restaurantData={restaurant.userRestaurant}
            onUpdateSuccess={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};
