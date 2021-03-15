import axios from "axios";
import { getHostRecords } from "../redux/dns/host/action";
import { toastr } from "react-redux-toastr";

const envData = require("../env.json");
const config = envData[process.env.REACT_APP_NODE_ENV];
console.log(config);
export const service = axios.create({
  baseURL: config.baseURL,
});

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response === undefined) {
      commonErrorOrSuccess({
        message: JSON.stringify("Seems like server is not working..."),
      });
      return;
    }

    commonErrorOrSuccess({
      message: JSON.stringify(error.response.data),
    });
  }
);

const commonErrorOrSuccess = ({ message }) => {
  toastr.error("Bammer!", `${message} `);
};

export default service;
