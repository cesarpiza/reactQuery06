import React, { useState } from 'react';
import {
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import ArticlesTotal from './components/articlesTotal';
import ArticlesList from './components/articlesList';
import PostArticles from './components/postArticles';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {

    const [openCreateBox, setOpenCreateBox] = useState(false);
    const [openArticlesListBox, setOpenArticlesListBox] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <QueryClientProvider client={queryClient}>
                <ArticlesTotal />
                <TouchableOpacity
                    style={[styles.createButton, {
                        marginBottom: !openCreateBox ? 0 : 5,
                    }]}
                    onPress={() => {
                        setOpenCreateBox(!openCreateBox);
                    }}
                >
                    <Text style={styles.createButtonText}>{!openCreateBox ? 'criar' : 'fechar'}</Text>
                </TouchableOpacity>
                {openCreateBox && <PostArticles />}
                <TouchableOpacity
                    style={[styles.openButton, {
                        marginTop: !openCreateBox ? 5 : 25,
                    }]}
                    onPress={() => {
                        setOpenArticlesListBox(!openArticlesListBox)
                    }}
                >
                    <Text style={styles.openButtonText}>{!openArticlesListBox ? 'abrir' : 'fechar'}</Text>
                </TouchableOpacity>
                {openArticlesListBox && <ArticlesList />}
            </QueryClientProvider>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    createButton: {
        height: 35,
        marginTop: 25,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgb(140,140,140)',
        backgroundColor: 'rgb(220,220,220)',
    },
    createButtonText: {
        alignSelf: 'center',
        fontSize: 16,
        textTransform: 'capitalize',
    },
    openButton: {
        height: 35,
        marginBottom: 5,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgb(140,140,140)',
        backgroundColor: 'rgb(220,220,220)',
    },
    openButtonText: {
        alignSelf: 'center',
        fontSize: 16,
        textTransform: 'capitalize',
    }
});