import ajax from "./ajax";

export const fetchInitDataApi = (params) => ajax("/users/getProfile", params);
export const fetchMyTweetsApi = (params) => ajax("/users/getMyTweets", params);
export const fetchAllTweetsApi = (params) =>
  ajax("/users/getAllTweets", params);
export const fetchMyLikesApi = (params) => ajax("/users/getMyLikes", params);
export const fetchMyPicturesApi = (params) =>
  ajax("/users/getMyPictures", params);
export const putDataApi = (params) => ajax("/users/setProfile", params, "post");
