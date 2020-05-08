import * as api from "@/api/message";
import * as actionType from "@/store/actionsTypes/message";
export const fetchMessageList = (uid, ws, callback) => {
  return (dispatch) => {
    api.fetchMessageList({ uid }).then((res) => {
      callback && callback();
      dispatch({
        type: actionType.FETCH_MESSAGE_LIST,
        info: { ws, messageList: res },
      });
    });
  };
};
