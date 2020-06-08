import fetch from "isomorphic-unfetch";
import { API } from "../config";

export const create = (category, token) => {
  console.log(category);
  console.log(token);
  return fetch(`${API}/category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
