import * as api from "@/api/profile";
import * as actionType from "@/store/actionsTypes/profile";
// 获取页面初始化数据
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
//修改个人资料
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
// 获取我的tweets
export const fetchMyTweets = (uid, callback) => {
  return (dispatch) => {
    api.fetchMyTweetsApi({ uid }).then((res) => {
      callback(res.data);
      dispatch({
        type: actionType.LOADING_PAGE_DATA,
      });
    });
  };
};
// 获取我的照片
export const fetchMyLikes = (uid, callback) => {
  return (dispatch) => {
    api.fetchMyLikesApi({ uid }).then((res) => {
      callback(res.data);
      dispatch({
        type: actionType.LOADING_PAGE_DATA,
      });
    });
  };
};
// 获取我的喜欢
export const fetchMyPictures = (uid, callback) => {
  return (dispatch) => {
    api.fetchMyPicturesApi({ uid }).then((res) => {
      callback(res.data);
      dispatch({
        type: actionType.LOADING_PAGE_DATA,
      });
    });
  };
};
