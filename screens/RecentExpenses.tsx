import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
    
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense: any) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    })

    return(
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days"/>
    )
}

const styles = StyleSheet.create({
    
})

export default RecentExpenses;