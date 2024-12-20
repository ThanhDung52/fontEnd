
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import axios from "axios";
import { api, API_URL } from "../../Config/api";


export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })

    try {
        const { data } = await axios.post(`${API_URL}auth/signup`, reqData.useData)
        console.log(data);

        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })
        // console.log("register success", data);
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error })
        console.log("error", error);

    }
}

export const LoginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post(`${API_URL}auth/signin`, reqData.useData);
        console.log("Response data:", data); // Kiểm tra phản hồi từ server

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            // console.log("JWT lưu thành công:", data.jwt);
        } else {
            throw new Error("No JWT received");
        }
        
        // Điều hướng dựa trên vai trò
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants");
        } else if (data.role === "ROLE_ADMIN") {
            reqData.navigate("/admins");
        } else {
            reqData.navigate("/");
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        // console.log("Login success", data);
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
        dispatch({ type: LOGIN_FAILURE, payload: error.response ? error.response.data : error.message });
    }
}




export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })

    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        dispatch({ type: GET_USER_SUCCESS, payload: data })
        // console.log("user profile", data);

    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error })
        console.log("error", error);

    }
}

export const GetALLUser = (jwt) => async (dispatch) =>{
    dispatch({type:GET_ALL_USER_REQUEST})
    try {
        const {data} = await api.get(`/api/admin/user`,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({type:GET_ALL_USER_SUCCESS,payload:data})
        // console.log("data all user", data);
    } catch (error) {
        console.log("Error all users",error);
        dispatch({type:GET_ALL_USER_FAILURE, payload: error})
    }
}

export const addToFavorite = ({ jwt, restaurantId }) => async (dispatch) => {
   
    try {
        dispatch({ type: ADD_TO_FAVORITE_REQUEST })
        const { data } = await api.put(`/api/restaurants/${restaurantId}
            /add-favorites`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data })
        // console.log("Add to favorite", data);

    } catch (error) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error })
        console.log("error", error);

    }
}


export const logout = () => async (dispatch) => {
    try {
        // Xóa token và thông tin người dùng từ localStorage
        localStorage.removeItem('jwt');
        localStorage.removeItem('user'); // Nếu bạn lưu thông tin người dùng

        // Dispatch action LOGOUT để reset Redux store
        dispatch({ type: LOGOUT });

        // Nếu bạn cần điều hướng người dùng sau khi đăng xuất
        // Ví dụ: điều hướng đến trang đăng nhập
        // navigate('/login'); // Đảm bảo `navigate` có thể được sử dụng tại đây

        console.log("Logout successful");
    } catch (error) {
        console.log("Logout error:", error);
    }
};

export const DeleteUser = ({userId,jwt}) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST});

        const res = await api.delete(`/api/admin/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        // console.log("User deleted:", res.data);

        // Giả định rằng res.data chứa thông tin bạn cần cho payload
        dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
        
    } catch (error) {
        console.error("Delete user error:", error);

        // Dispatch một action để thông báo lỗi
        dispatch({ type: DELETE_USER_FAILURE, payload: error.response?.data || error.message });
    }
}

export const setUser = (userData) => ({
    type: 'SET_USER',
    payload: userData,
});