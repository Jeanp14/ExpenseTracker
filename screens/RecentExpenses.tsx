import { StyleSheet, Text, View } from 'react-native';
import { useContext, useEffect } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpenses = () => {
    
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        const getExpenses = async() => {
            const expenses = await fetchExpenses();
            expensesCtx.setExpenses(expenses);
        }
        getExpenses();
    }, []);

    const recentExpenses = expensesCtx.expenses.filter((expense: any) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    })

    return(
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod="Last 7 days" 
            fallbackText="No expenses for the last 7 days!"
        />
    )
}

const styles = StyleSheet.create({
    
})

export default RecentExpenses;