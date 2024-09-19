import {configureStore} from '@reduxjs/toolkit';
import { adminReducer } from './reducers/admin';
import { expenseReducer } from './reducers/expense';
import { incomeReducer } from './reducers/income';

const myStore = new configureStore({
    reducer : {
        AdminGS : adminReducer,
        ExpenseGS : expenseReducer,
        IncomeGS : incomeReducer,
    }
})

export default myStore;