import { useLayoutEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense } from '../util/http';

const ManageExpense = ({route, navigation}: any) => {

    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId; //!! to convert to boolean

    const selectedExpense = expensesCtx.expenses.find((expense: any) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
         navigation.setOptions({
            title: isEditing ? 'Edit' : 'Add'
         });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = (expenseData: any) => {
        if(isEditing){
            expensesCtx.updateExpense(editedExpenseId, expenseData);
        }else{
            storeExpense(expenseData);
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ExpenseForm 
                    submitButtonLabel={isEditing ? 'Update' : 'Add'}
                    onCancel={cancelHandler}
                    onSubmit={confirmHandler}
                    defaultValues={selectedExpense}
                />
                
                {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
                </View>)}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})

export default ManageExpense;