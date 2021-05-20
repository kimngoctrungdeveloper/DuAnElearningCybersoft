import {
  getAPIAction,
  getDeatilAction,
  maKhoaHoc,
  searchCoures,
} from "../../Constant/getAPI";
import { IDOFREGISCOURSE } from "../../Constant/RegisCouresConstant";

const initialState = {
  defaultID: "GP01",
  arrCoures: [],
  maKhocHoc: "",
  detailCoures: {},
  idOfCourse: "",
};

export const CouresReducer = (state = initialState, action) => {
  switch (action.type) {
    case getAPIAction: {
      return { ...state, arrCoures: action.coures };
    }
    case maKhoaHoc: {
      return { ...state, maKhoaHoc: action.couresMKH };
    }
    case getDeatilAction: {
      state.detailCoures = action.couresDetail;
      return { ...state };
    }
    case "ID_COURES_ITEM": {
      return { ...state, defaultID: action.value };
    }

    default:
      return state;
  }
};
