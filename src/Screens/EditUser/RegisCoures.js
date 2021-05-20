import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import CouresItem from "../../Component/CouresItem/CouresItem";
import {
  getListCourseRegistedFormAPI,
  getRegisCouresAPI,
} from "../../Redux/Action/RegisCourseAction/RegisCourseAction";
import {
  cancelCouresAPI,
  registionCoures,
} from "../../Redux/Action/RegistionCoures/RegistionCoures";
import {
  IDGOURPOFCOURSE,
  IDOFREGISCOURSE,
  CANCELPOFCOURSEUPDATE,
  IVALIAD_COURSE,
} from "../../Redux/Constant/RegisCouresConstant";
import { ACCESS_TOKEN } from "../../Redux/Constant/UserEducation";
export default function RegisCoures(props) {
  let tokenLocal = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
  const { userLogin } = useSelector((state) => state.UserLoginReducer);
  const { arrCourseRegis, idOfCourseRegis, arrCuorseJustRegis } = useSelector(
    (state) => state.regisCourseReducer
  );

  const renderArrCuorseJustRegis = () => {
    return arrCuorseJustRegis?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.maKhoaHoc}</td>
          <td>
            <button
              onClick={() => {
                dispatch(
                  cancelCouresAPI(
                    item.maKhoaHoc,
                    userLogin.taiKhoan,
                    tokenLocal
                  )
                );
                dispatch({
                  type: CANCELPOFCOURSEUPDATE,
                  data: item.maKhoaHoc,
                });
              }}
              className="btn btn-danger"
            >
              Hủy Khóa Hoc
            </button>
          </td>
        </tr>
      );
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegisCouresAPI(idOfCourseRegis));
  }, [idOfCourseRegis]);
  const renderTableCourse = () => {
    return arrCourseRegis?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.maKhoaHoc}</td>
          <td>{item.tenKhoaHoc}</td>
          <td>{item.maNhom}</td>
          <td>{item?.nguoiTao?.hoTen}</td>
          <td>
            <button
              type="button"
              onClick={() => {
                dispatch({
                  type: "IVALIAD_COURSE",
                  data: item.maKhoaHoc,
                });
                dispatch(
                  registionCoures(
                    item.maKhoaHoc,
                    userLogin.taiKhoan,
                    tokenLocal
                  )
                );
                dispatch({ type: IDOFREGISCOURSE, data: item });
              }}
              className="btn btn-info"
            >
              Đăng Kí
            </button>
          </td>
        </tr>
      );
    });
  };
  if (userLogin.maLoaiNguoiDung === "HV") {
    return (
      <div className="container-fluid textTitleOfHome">
        <h3 className="text-center mt-3 mb-3">Đăng Kí Khóa Học</h3>
        <select
          style={{ width: "50%" }}
          onChange={(e) => {
            let { value } = e.target;
            dispatch({ type: IDGOURPOFCOURSE, value: value });
          }}
          id="textTitleInput"
          className="form-control"
          as="select"
          name="maNhom"
        >
          <option>GP01</option>
          <option>GP02</option>
          <option>GP03</option>
          <option>GP04</option>
          <option>GP05</option>
          <option>GP06</option>
          <option>GP07</option>
          <option>GP08</option>
          <option>GP09</option>
          <option>GP10</option>
          <option>GP11</option>
          <option>GP12</option>
          <option>GP13</option>
          <option>GP14</option>
          <option>GP15</option>
        </select>
        <div className="row">
          <div className="col-12 col-sm-7">
            <h5 className="text-center mt-3">Danh Sách Khóa Học</h5>
            <table class="table table-hover mt-5 table-responsive-sm table-responsive-md table-responsive-lg">
              <thead class="thead-inverse">
                <tr className="table-success">
                  <th>Mã Khóa Học</th>
                  <th>Tên Khóa Học</th>
                  <th>Mã Nhóm</th>
                  <th>Giáo Viên</th>
                  <th>Đăng Kí</th>
                </tr>
              </thead>
              <tbody>{renderTableCourse()}</tbody>
            </table>
          </div>
          <div className="col-12 col-sm-5">
            <h5 className="mt-3">Danh Sách Đã Đăng Ký</h5>
            <table class="table mt-5">
              <thead>
                <tr>
                  <th>Mã Khóa Học</th>
                </tr>
              </thead>
              <tbody>{renderArrCuorseJustRegis()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    alert("Bạn Phải Đăng Nhập Và Là Học Viên Mới Có Thể Truy Cập Trang Này");
    return <Redirect to="/login" />;
  }
}
