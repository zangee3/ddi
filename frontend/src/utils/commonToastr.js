import { toastr } from "react-redux-toastr";

/**
 *
 * @param data
 * @param dispatch
 * @param name
 */
export const commonErrorOrSuccess = ({
  data,
  dispatch,
  message,
  refreshFunction,
  type,
}) => {
  if (data.Error !== undefined) {
    toastr.error("Oops!", data.Error);
  } else {

    if (type === "success") {
      toastr.success("Great!", `${message} `);
      dispatch(refreshFunction());
    } else if (type === "error") {
      toastr.error("Bammer!", `${message} `);
      dispatch(refreshFunction());
    }
  }
};
