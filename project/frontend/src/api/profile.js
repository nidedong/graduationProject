import ajax from "./ajax";

export const fetchInitDataApi = (params) => ajax("/users/getProfile", params);
