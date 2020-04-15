import userData from "./datas/user";
import * as profileType from "./actionsTypes/profile";

const defaultState = {
  ...userData,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    //我的模块
    case profileType.FETCH_INIT_DATA:
      newState.profileInfo = action.info;
      return newState;
    default:
      break;
  }
  return state;
};
