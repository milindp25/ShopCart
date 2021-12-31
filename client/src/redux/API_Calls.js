import { loginFailure, loginStart, loginSuccess } from "./reduxUser";
import { publicRequest } from "../API_Request_Call";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};