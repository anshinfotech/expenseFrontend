import axios from "axios";
import {
  ADD_EXPENSE_FAILURE,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAILURE,
  DELETE_EXPENSE_SUCCESS,
  GET_EXPENSE_FAILURE,
  GET_EXPENSE_REQUEST,
  GET_EXPENSE_SUCCESS,
} from "../constants/expense";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const addExpenseAction = (formData) => async (dispatch) => {
  dispatch({ type: ADD_EXPENSE_REQUEST });
  try {
    const response = await axios.post("/expenses/add_expense", formData);
    console.log(response);
    if (response.data.success) {
      dispatch({
        type: ADD_EXPENSE_SUCCESS,
        payload: response.data.message,
      });
    } else {
      dispatch({
        type: ADD_EXPENSE_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: ADD_EXPENSE_FAILURE,
      payload: message,
    });
  }
};

const getAllExpenseAction = () => async (dispatch) => {
  dispatch({ type: GET_EXPENSE_REQUEST });
  try {
    const response = await axios.get("/expenses/all_expenses");

    if (response.data.success) {
      dispatch({
        type: GET_EXPENSE_SUCCESS,
        payload: {
          Data: response.data.Data,
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: GET_EXPENSE_FAILURE,
      payload: message,
    });
  }
};

const removeExpenseAction = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/expenses/delete_expense/${id}`);

    if (response.data.success) {
      dispatch({
        type: DELETE_EXPENSE_SUCCESS,
        payload: {
          Data: response.data.Data,
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: DELETE_EXPENSE_FAILURE,
      payload: message,
    });
  }
};

export { addExpenseAction, getAllExpenseAction , removeExpenseAction };
