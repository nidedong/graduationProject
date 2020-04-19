import userData from "./datas/user";
import mainData from "./datas/main";
import * as profileType from "./actionsTypes/profile";
import * as mainType from "./actionsTypes/main";

const defaultState = {
  ...userData,
  ...mainData,
  loadingInfo: [],
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    //我的模块
    case profileType.FETCH_INIT_DATA:
      action.info.birthday = action.info.birthday.slice(0, 10);
      newState.profileInfo = action.info;
      return newState;
    case profileType.PUT_DATA:
      newState.profileInfo = action.info;
      return newState;
    case mainType.SHARE_MY_MOOD:
      let mainData = JSON.parse(JSON.stringify(newState.tweetList));
      mainData.unshift(action.info);
      newState.mainData = mainData;
      return newState;
    case profileType.LOADING_PAGE_DATA:
      newState.loadingInfo = action.loadingInfo;
      return newState;
    default:
      break;
  }
  return state;
};
