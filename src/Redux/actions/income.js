import axios from "axios";
import {
  ADD_INCOME_FAILURE,
  ADD_INCOME_REQUEST,
  ADD_INCOME_SUCCESS,
  ADD_INSTALLMENT_FAILURE,
  ADD_INSTALLMENT_REQUEST,
  DELETE_INCOME_FAILURE,
  DELETE_INCOME_SUCCESS,
  GET_INCOME_FAILURE,
  GET_INCOME_REQUEST,
  GET_INCOME_SUCCESS,
} from "../constants/income";
axios.defaults.baseURL = "https://expensebackend-e88m.onrender.com";
axios.defaults.withCredentials = true;

const addIncomeAction = (formData) => async (dispatch) => {
  dispatch({ type: ADD_INCOME_REQUEST });
  try {
    const response = await axios.post("/incomes/add_income", formData);
    if (response.data.success) {
      dispatch({
        type: ADD_INCOME_SUCCESS,
        payload: response.data.message,
      });
    } else {
      dispatch({
        type: ADD_INCOME_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: ADD_INCOME_FAILURE,
      payload: message,
    });
  }
};

const getAllIncomeAction = () => async (dispatch) => {
  dispatch({ type: GET_INCOME_REQUEST });
  try {
    const response = await axios.get("/incomes/get_all_income");

    if (response.data.success) {
      dispatch({
        type: GET_INCOME_SUCCESS,
        payload: {
          Data: response.data.Data,
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: GET_INCOME_FAILURE,
      payload: message,
    });
  }
};

const removeIncomeAction = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/incomes/delete_income/${id}`);

    if (response.data.success) {
      dispatch({
        type: DELETE_INCOME_SUCCESS,
        payload: {
          Data: response.data.Data,
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({
      type: DELETE_INCOME_FAILURE,
      payload: message,
    });
  }
};

const addInstallmentAction = (formdata) => async (dispatch) => {
  dispatch({type : ADD_INSTALLMENT_REQUEST});
  try {

    const response = await axios.post('/incomes/update_installment' , formdata);

    if(response.data.success){
      dispatch({
        type : ADD_INCOME_SUCCESS,
        payload : response.data.message,
      })
    }

  } catch (error) {
    const message = error.response.data.message;
    dispatch({type : ADD_INSTALLMENT_FAILURE , payload : message})
  }
};

export { addIncomeAction, getAllIncomeAction, removeIncomeAction , addInstallmentAction };
