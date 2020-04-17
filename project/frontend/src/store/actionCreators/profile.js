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

export const putData = (uid, others) => {
  return (dispatch) => {
    api.putDataApi({ uid, ...others }).then((res) => {
      dispatch({
        type: actionType.PUT_DATA,
        info: others,
      });
    });
  };
};
