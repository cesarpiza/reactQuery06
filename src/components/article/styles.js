import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'rgb(140,140,140)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    titleAndContentContainer: {

    },
    title: {
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        width: 170,
    },
    content: {
        textTransform: 'capitalize',
        fontSize: 16,
        color: 'black',
        width: 170,
    },
    buttonsContainer: {
        rowGap: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: 'rgb(140,140,140)',
        width: 70,
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