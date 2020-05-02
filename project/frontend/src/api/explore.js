import ajax from "./ajax";

export const likeItApi = (params) => ajax("/explore/likeApi", params, "post");
