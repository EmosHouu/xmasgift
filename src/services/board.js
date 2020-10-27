import axios from 'axios';
const url = process.env.NODE_ENV === 'production' ? process.env.GATSBY_API_URL : '';

export async function createBoard(name) {
  return axios.post(url + '/api/createBoard', { name })
    .then(response => {
      return response.data;
    });
}

export async function getBoardName(id) {
  return axios.get(url + '/api/getBoardName?lid=' + id)
    .then(response => {
      return response.data;
    });
}

export async function getBoardDetails(id) {
  return axios.get(url + '/api/getBoardDetails?lid=' + id)
    .then(response => {
      return response.data;
    });
}

export async function addUser(id, name) {
  return axios.put(url + '/api/addUser?lid=' + id, {name})
    .then(response => {
      return response.data;
    });
}

export async function getList(id) {
  return axios.get(url + '/api/getList?lid=' + id)
    .then(response => {
      return response.data;
    });
}

export async function removeUser(lid, userId) {
  return axios.delete(url + '/api/deleteUser?lid=' + lid + '&uid='+ userId)
    .then(response => {
      return response.data;
    });
}

export async function draw(lid) {
  return axios.get(url + '/api/draw?lid=' + lid)
    .then(response => {
      return;
    });
}

export async function undraw(lid) {
  return axios.get(url + '/api/undraw?lid=' + lid)
    .then(response => {
      return;
    });
}

export async function getUser(lid, uid) {
  return axios.get(url + '/api/getUser?lid=' + lid + '&uid='+ uid)
    .then(response => {
      return response.data;
    });
}
