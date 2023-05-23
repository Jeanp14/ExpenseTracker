import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);
    return(
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No expenses found!"/>
    )
}

const styles = StyleSheet.create({
    
})

export default AllExpenses;