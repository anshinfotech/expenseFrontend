import {
  ADD_STAFF_FAILURE,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  ADMIN_AUTH_FAILURE,
  ADMIN_AUTH_SUCCESS,
  FETCH_STAFF_FAILURE,
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGOUT_ADMIN_FAILURE,
  LOGOUT_ADMIN_SUCCESS,
  REGISTER_STUDENT_FAILURE,
  REGISTER_STUDENT_REQUEST,
  REGISTER_STUDENT_SUCCESS,
} from "../constants/admin";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const loginAdminAction = (userData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_ADMIN_REQUEST });
  try {
    const response = await axios.post("/admin/login_admin", userData);

    if (response.data.success) {
      dispatch({
        type: LOGIN_ADMIN_SUCCESS,
        payload: { Data: response.data.Data, message: response.data.message },
      });
      navigate("/admin/dashboard");
    } else {
      dispatch({
        type: LOGIN_ADMIN_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: LOGIN_ADMIN_FAILURE,
      payload: message,
    });
  }
};

const adminAuthenticationAction = () => async (dispatch) => {
  try {
    const response = await axios.get("/admin/admin_auth");

    if (response.data.success) {
      dispatch({
        type: ADMIN_AUTH_SUCCESS,
        payload: response.data.Data,
      });
    } else {
      dispatch({
        type: ADMIN_AUTH_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ADMIN_AUTH_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const logoutAdminAction = (navigate) => async (dispatch) => {
  try {
    const response = await axios.get("/admin/admin_logout");

    if (response.data.success) {
      dispatch({
        type: LOGOUT_ADMIN_SUCCESS,
        payload: response.data.message,
      });
      navigate("/admin/login");
    } else {
      dispatch({
        type: LOGOUT_ADMIN_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_ADMIN_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const addStaffMembersAction = (formData) => async (dispatch) => {
  dispatch({ type: ADD_STAFF_REQUEST });
  try {
    const response = await axios.post("/admin/add_staff", formData);

    if (response.data.success) {
      dispatch({
        type: ADD_STAFF_SUCCESS,
        payload: response.data.message,
      });
    } else {
      dispatch({ type: ADD_STAFF_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: ADD_STAFF_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const fetchAllStaffMembersAction = () => async (dispatch) => {
  dispatch({ type: FETCH_STAFF_REQUEST });
  try {
    const response = await axios.get("/admin/get_staff_members");

    if (response.data.success) {
      dispatch({
        type: FETCH_STAFF_SUCCESS,
        payload: {
          Data: response.data.Data,
          message: response.data.message,
        },
      });
    } else {
      dispatch({
        type: FETCH_STAFF_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_STAFF_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const registerStudentAction = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_STUDENT_REQUEST });
  try {
    const response = await axios.post("/admin/new_registration", formData);

    if (response.data.success) {
      dispatch({
        type: REGISTER_STUDENT_SUCCESS,
        payload: response.data.message,
      });
    } else {
      dispatch({
        type: REGISTER_STUDENT_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: REGISTER_STUDENT_FAILURE,
      payload: message,
    });
  }
};

export {
  loginAdminAction,
  adminAuthenticationAction,
  logoutAdminAction,
  addStaffMembersAction,
  fetchAllStaffMembersAction,
  registerStudentAction,
};
