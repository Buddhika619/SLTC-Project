import axios from "axios";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userLogout,
} from "../reducers/authSlice";

export const login = (loginState, role) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());

    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/users/login/${role}`,
      loginState,
      config
    );

    dispatch(userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userLoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const logout = () => (dispatch) => {
  //   dispatch(userDetailsReset())

  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

export const register = (signupState) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest());

    console.log(signupState);
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/api/users", signupState, config);

    dispatch(userRegisterSuccess());
  } catch (error) {
    dispatch(
      userRegisterFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
