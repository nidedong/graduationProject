import ajax from "./ajax";

export const fetchInitDataApi = (params) => ajax("/users/getProfile", params);
export const putDataApi = (params) => ajax("/users/setProfile", params, "post");
