import * as api from "@/api/profile";
import * as actionType from "@/store/actionsTypes/profile";
export const fetchInitData = (uid) => {
  return (dispatch) => {
    api.fetchInitDataApi({ uid }).then((res) => {
      dispatch({
        type: actionType.FETCH_INIT_DATA,
        info: res.data,
      });
    });
  };
};
