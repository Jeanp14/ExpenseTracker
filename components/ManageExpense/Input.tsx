import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Input = ({label, style, textInputConfig}: any) => {

    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline as any)
    }

    return(
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...textInputConfig} style={inputStyles}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
        color: GlobalStyles.colors.primary100
    },
    input: {
        fontSize: 18,
        padding: 6,
        borderRadius: 6,
        color: GlobalStyles.colors.primary700,
        backgroundColor: GlobalStyles.colors.primary100
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    }
})

export default Input;