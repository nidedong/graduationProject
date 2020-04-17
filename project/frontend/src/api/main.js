import ajax from "./ajax";

export const shareMyMoodApi = (params) => ajax("/users/tweet", params, "post");
