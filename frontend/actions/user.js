import fetch from "isomorphic-unfetch";
import queryString from "query-string";
import { API } from "../config";

export const userPublicProfile = (username) => {
  console.log("uname", username);
  return fetch(`${API}/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
