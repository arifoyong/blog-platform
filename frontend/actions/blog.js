import fetch from "isomorphic-unfetch";
import { API } from "../config";

export const createBlog = (blog, token) => {
  console.log(blog);
  return fetch(`${API}/blog`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
