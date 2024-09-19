import {
  ADD_EXPENSE_FAILURE,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAILURE,
  DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_SUCCESS,
  EMPTY_FAILURE_MESSAGE,
  EMPTY_SUCCESS_MESSAGE,
  GET_EXPENSE_FAILURE,
  GET_EXPENSE_REQUEST,
  GET_EXPENSE_SUCCESS,
} from "../constants/expense";

const expenseInitialState = {
  expenses: [],
  isLoading: false,
  success: "",
  failure: "",
};

const expenseReducer = (state = expenseInitialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
      };
    case ADD_EXPENSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload,
      };

    case GET_EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        expenses: action.payload.Data,
      };

    case GET_EXPENSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload,
      };

    case DELETE_EXPENSE_REQUEST:
      return {
        ...state,
        isLoading : true,
      }

    case DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading : false,
        success : action.payload.message,
        expenses : action.payload.Data,
      }

    case DELETE_EXPENSE_FAILURE:
      return {
        ...state,
        isLoading : false,
        failure : action.payload,
      }

    case EMPTY_SUCCESS_MESSAGE:
      return {
        ...state,
        success: "",
      };

    case EMPTY_FAILURE_MESSAGE:
      return {
        ...state,
        failure: "",
      };

    default:
      return state;
  }
};

export { expenseReducer };
