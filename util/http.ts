import axios from "axios";

const BACKEND_URL = 'https://expensetracker-2c96f-default-rtdb.firebaseio.com';

export const storeExpense = (expenseData: any) => {
    axios.post(BACKEND_URL + '/expenses.json',
    expenseData
    );
}

export const fetchExpenses = async() => {

    const response = await axios.get(BACKEND_URL + '/expenses.json');

    const expenses = [];
    //console.log(response.data);
    for(const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj);
    }
    return expenses;
}