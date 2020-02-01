import userData from "./datas/user";

const defaultState = {
  ...userData
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    default:
      break;
  }
  return state;
};
