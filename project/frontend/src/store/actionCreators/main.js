import * as api from "@/api/main";
import * as actionType from "@/store/actionsTypes/main";
export const shareMyMood = (uid, payload, callback) => {
  return (dispatch) => {
    api.shareMyMoodApi({ uid, ...payload }).then((res) => {
      callback();
      dispatch({
        type: actionType.SHARE_MY_MOOD,
        info: payload,
      });
    });
  };
};
