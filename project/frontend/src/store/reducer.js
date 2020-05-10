import userData from "./datas/user";
import mainData from "./datas/main";
import messageData from "./datas/message";
import * as profileType from "./actionsTypes/profile";
import * as mainType from "./actionsTypes/main";
import * as messageType from "./actionsTypes/message";

const defaultState = {
  ...userData,
  ...mainData,
  ...messageData,
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
    case messageType.FETCH_MESSAGE_LIST:
      newState.messageList = action.info.messageList;
      newState.ws = action.info.ws;
      return newState;
    default:
      break;
  }
  return state;
};
