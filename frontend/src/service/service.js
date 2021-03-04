import axios from "axios";
import { getHostRecords } from "../redux/dns/host/action";
import { toastr } from "react-redux-toastr";
const config = require("../env.json");

export const service = axios.create({
  baseURL: config.baseURL
});

service.interceptors.response.use(
  (response) => response,
  (error) => {
    // whatever you want to do with the error
    console.log(error.response);
    commonErrorOrSuccess({
      message: JSON.stringify(error.response.data),
    });
    // throw error;
  }
);

const commonErrorOrSuccess = ({ message }) => {
  toastr.error("Bammer!", `${message} `);
};

export default service;
