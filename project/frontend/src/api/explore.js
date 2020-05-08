import ajax from "./ajax";

export const likeItApi = (params) => ajax("/explore/likeApi", params, "post");
export const comment = (params) => ajax("/explore/comment", params, "post");
export const getRecommend = (params) => ajax("/explore/recommend", params);
export const deleteTweet = (params) =>
  ajax("/explore/deleteTweet", params, "post");
