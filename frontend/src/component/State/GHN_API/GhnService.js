import axios from "axios";

const GHN_API_URL_PROVINCE = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province";
const GHN_API_URL_DISTRICT = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district";
const GHN_API_URL_WARD = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
const GHN_API_URL_FEE = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
const GHN_TOKEN = "90aee48f-984d-11ef-8e53-0a00184fe694"; // Thay thế bằng token của bạn

const createHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
    "Token": GHN_TOKEN,
  },
});

export const getProvinces = () => {
  return axios.get(GHN_API_URL_PROVINCE, createHeaders());
};

export const getDistricts = (provinceId) => {
  const body = { province_id: provinceId };
  return axios.post(GHN_API_URL_DISTRICT, body, createHeaders());
};

export const getWards = (districtId) => {
  const body = { district_id: districtId };
  return axios.post(GHN_API_URL_WARD, body, createHeaders());
};

export const calculateShippingFee = async (data) => {
    const response = await axios.post(GHN_API_URL_FEE, data, createHeaders());
    return response.data;
  };
