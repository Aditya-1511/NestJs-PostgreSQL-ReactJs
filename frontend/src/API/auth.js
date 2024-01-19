import axios from 'axios';
import { PROJECT_API } from '../constant';

export const loginUser = async (body) => {
  return await axios
    .post(PROJECT_API.LOGIN_USER, body)
    .then((res) => {
      console.log(res, '======res');
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteUser = async (id) => {
  return await axios
    .post(PROJECT_API.DELETE_USER + `/${id}`)
    .then((res) => {
      console.log(res, '======res');
      return res;
    })
    .catch((error) => {
      return error;
    });
};
