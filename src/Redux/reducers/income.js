import {
    ADD_INCOME_FAILURE,
    ADD_INCOME_REQUEST,
    ADD_INCOME_SUCCESS,
    DELETE_INCOME_FAILURE,
    DELETE_INCOME_REQUEST,
    DELETE_INCOME_SUCCESS,
    GET_INCOME_FAILURE,
    GET_INCOME_REQUEST,
    GET_INCOME_SUCCESS,
    EMPTY_INCOME_SUCCESS_MESSAGE,
    EMPTY_INCOME_FAILURE_MESSAGE,
    ADD_INSTALLMENT_REQUEST,
    ADD_INSTALLMENT_SUCCESS,
    ADD_INSTALLMENT_FAILURE,
  } from "../constants/income";
  
  const incomeInitialState = {
    incomes: [],
    isLoading: false,
    success: "",
    failure: "",
  };
  
  const incomeReducer = (state = incomeInitialState, action) => {
    switch (action.type) {
      case ADD_INCOME_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case ADD_INCOME_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: action.payload,
        };
      case ADD_INCOME_FAILURE:
        return {
          ...state,
          isLoading: false,
          failure: action.payload,
        };
  
      case GET_INCOME_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
  
      case GET_INCOME_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: action.payload.message,
          incomes: action.payload.Data,
        };
  
      case GET_INCOME_FAILURE:
        return {
          ...state,
          isLoading: false,
          failure: action.payload,
        };
  
      case DELETE_INCOME_REQUEST:
        return {
          ...state,
          isLoading : true,
        }
  
      case DELETE_INCOME_SUCCESS:
        return {
          ...state,
          isLoading : false,
          success : action.payload.message,
          incomes : action.payload.Data,
        }
  
      case DELETE_INCOME_FAILURE:
        return {
          ...state,
          isLoading : false,
          failure : action.payload,
        }
  
      case EMPTY_INCOME_SUCCESS_MESSAGE:
        return {
          ...state,
          success: "",
        };
  
      case EMPTY_INCOME_FAILURE_MESSAGE:
        return {
          ...state,
          failure: "",
        };

      case ADD_INSTALLMENT_REQUEST:
        return {
          ...state ,
          isLoading : true,
        }

      case ADD_INSTALLMENT_SUCCESS:
        return {
          ...state,
          isLoading : false,
          success : action.payload,
        }

      case ADD_INSTALLMENT_FAILURE:
        return {
          ...state ,
          isLoading : false,
          failure : action.payload,
        }
  
      default:
        return state;
    }
  };
  
  export { incomeReducer };
  