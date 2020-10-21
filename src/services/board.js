import axios from 'axios';
const url = process.env.NODE_ENV === 'production' ? process.env.GATSBY_API_URL : '';

export async function createBoard() {
  return axios.get(url + '/api/createBoard')
    .then(response => {
      return response.data;
    });
  // console.log(newBoardRef);
}
