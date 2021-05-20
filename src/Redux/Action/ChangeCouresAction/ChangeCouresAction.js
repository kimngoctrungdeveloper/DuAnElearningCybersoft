import axios from "axios";
import { history } from "../../../App";

export const changeCouresAction = (value, token, hinhAnh) => {
  return async () => {
    try {
      const result = await axios({
        url: "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/CapNhatKhoaHoc",
        method: "PUT",
        data: value,
        headers: {
          Authorization: "Bearer  " + token,
        },
      });
      let frm = new FormData();
      frm.append("file", hinhAnh);
      frm.append("tenKhoaHoc", value.tenKhoaHoc);

      const promise = axios({
        url: "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
        method: "POST",
        data: frm,
      });
      promise.then((res) => {});
      promise.catch((err) => {
        console.log(err.response?.data);
      });
      alert("Sửa Đổi Thành Công");
    } catch (err) {
      console.log(err.response?.data);
    }
  };
};
