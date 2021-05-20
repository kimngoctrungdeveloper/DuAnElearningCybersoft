import axios from "axios";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { getAPIAction, searchCoures } from "../../Constant/getAPI";
import { getAPICourseAction } from "../../Constant/RegisCouresConstant";
export const getRegisCouresAPI = (maNhom) => {
  return async (dispatch) => {
    try {
      const result = await Axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${maNhom}`,
        method: "GET",
      });
      dispatch({
        type: getAPICourseAction,
        coures: result.data,
      });
    } catch (err) {
      alert(err.response?.data);
    }
  };
};
export const getListCourseRegistedFormAPI = (couresIDYet, token) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`,
        method: "POST",
        data: couresIDYet,
        headers: {
          Authorization: "Bearer  " + token,
        },
      });
      dispatch({ type: "DANH_SACH_DA_DANG_KY", data: result.data });
    } catch (err) {
      console.log(err.response?.data);
    }
  };
};
