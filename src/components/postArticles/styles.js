import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'rgb(140,140,140)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    textInputContainer: {
        rowGap: 10,
    },
    textInput: {
        width: 170,
        borderWidth: 1,
        borderColor: 'rgb(140,140,140)',
        padding: 5,
        fontSize: 16,
    },
    buttonsContainer: {
        rowGap: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: 'rgb(140,140,140)',
        width: 80,
        height: 35,
        justifyContent: 'center',
        backgroundColor: 'rgb(220,220,220)',
    },
    buttonText: {
        fontSize: 16,
        alignSelf: 'center',
        textTransform: 'capitalize',
    }
});