import ajax from "./ajax";

export const getFriendsList = (params) =>
  ajax("/message/getFriends", params, "post");
export const fetchMessageList = (params) =>
  ajax("/message/MessageList", params);
