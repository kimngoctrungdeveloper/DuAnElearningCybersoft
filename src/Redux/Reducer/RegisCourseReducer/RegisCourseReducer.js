import {
  CANCELPOFCOURSEUPDATE,
  getAPICourseAction,
  IDGOURPOFCOURSE,
  IDOFREGISCOURSE,
  LISTCOURSEREGISTED,
} from "../../Constant/RegisCouresConstant";
let listCourse = [];
if (localStorage.getItem(LISTCOURSEREGISTED)) {
  let listCouresLocal = JSON.parse(localStorage.getItem(LISTCOURSEREGISTED));
  listCourse = listCouresLocal;
}
const initialState = {
  arrCourseRegis: [],
  idOfCourseRegis: "GP01",
  arrCuorseJustRegis: listCourse,
};

export const regisCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case IDGOURPOFCOURSE: {
      return { ...state, idOfCourseRegis: action.value };
    }
    case getAPICourseAction: {
      return { ...state, arrCourseRegis: action.coures };
    }
    case IDOFREGISCOURSE: {
      let update = [...state.arrCuorseJustRegis];
      let arrCourseRegisUpdate = [...state.arrCourseRegis];
      let index = arrCourseRegisUpdate.findIndex(
        (item) => item.maKhoaHoc === action.data.maKhoaHoc
      );

      if (index !== -1) {
        arrCourseRegisUpdate.splice(index, 1);
        update.push(action.data);
      }
      state.arrCuorseJustRegis = update;
      state.arrCourseRegis = arrCourseRegisUpdate;
      localStorage.setItem(
        LISTCOURSEREGISTED,
        JSON.stringify(state.arrCuorseJustRegis)
      );
      return { ...state };
    }
    case CANCELPOFCOURSEUPDATE: {
      let arrCuorseJustRegisUpdate = [...state.arrCuorseJustRegis];
      let index = arrCuorseJustRegisUpdate.findIndex(
        (item) => item.maKhoaHoc === action.data
      );
      if (index !== -1) {
        arrCuorseJustRegisUpdate.splice(index, 1);
        state.arrCuorseJustRegis = arrCuorseJustRegisUpdate;
        localStorage.setItem(
          LISTCOURSEREGISTED,
          JSON.stringify(state.arrCuorseJustRegis)
        );
        return { ...state };
      }
    }
    case "IVALIAD_COURSE": {
      let updateState = [...state?.arrCuorseJustRegis];
      let indexOfCourse = updateState?.findIndex(
        (item) => item?.maKhoaHoc === action.data
      );
      if (indexOfCourse !== -1) {
        updateState.splice(indexOfCourse, 1);
        state.arrCuorseJustRegis = updateState;
      }
      return { ...state };
    }
    default:
      return state;
  }
};
