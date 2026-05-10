import axios from "axios";

const API = "https://localhost:7107/api/task";

const token = localStorage.getItem("token");

export function getTasks(page, pageSize) {

  return axios.get(
    `${API}?page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        Authorization: "Bearer " + token
      }
    }
  );
}

export function addTask(task) {

  return axios.post(API, task, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
}