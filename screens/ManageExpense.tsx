import { useLayoutEffect, useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const ManageExpense = ({route, navigation}: any) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId; //!! to convert to boolean

    const selectedExpense = expensesCtx.expenses.find((expense: any) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
         navigation.setOptions({
            title: isEditing ? 'Edit' : 'Add'
         });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = async() => {
        setIsSubmitting(true);
        await deleteExpense(editedExpenseId);
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = async(expenseData: any) => {
        setIsSubmitting(true);
        if(isEditing){
            expensesCtx.updateExpense(editedExpenseId, expenseData);
            await updateExpense(editedExpenseId, expenseData);
        }else{
            const id = await storeExpense(expenseData);
            expensesCtx.addExpense({...expenseData, id: id});
        }
        navigation.goBack();
    }

    if(isSubmitting){
        return <LoadingOverlay/>
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