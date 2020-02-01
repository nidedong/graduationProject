import ajax from "./ajax";

export const loginApi = params => ajax("/users/login", params, "post");

export const registerApi = params => ajax("/users/register", params, "post");
