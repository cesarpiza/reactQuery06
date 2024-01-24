import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from './styles';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export default function PostArticles() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const queryClient = useQueryClient();

    const createNewArticleMutation = useMutation({
        mutationFn: () => {
            const lastId = queryClient.getQueryData('articles');

            const resultLastId = Number(lastId[lastId.length - 1].id) + 1

            const newArticle = {
                userId: 1,
                id: String(resultLastId),
                title: title,
                content: content,
            }
            const getNewArticle = axios.post('http://192.168.0.103:8080/articles', newArticle).then((response) => response.data);

            return getNewArticle;
        },
        onSuccess: (data) => {
            queryClient.setQueryData('articles', (currentData) => {
                return [...currentData, data];
            });

            const dataLength = queryClient.getQueryData('articles');

            queryClient.setQueryData('totalArticles', () => {
                return dataLength.length;
            })
        },
        onError: () => {

        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    value={title}
                    onChangeText={text => setTitle(text)}
                    placeholder='your title'
                />
                <TextInput
                    style={styles.textInput}
                    value={content}
                    onChangeText={text => setContent(text)}
                    placeholder='your content'
                />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        createNewArticleMutation.mutate();
                    }}
                >
                    <Text style={styles.buttonText}>salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setTitle('');
                        setContent('');
                    }}
                >
                    <Text style={styles.buttonText}>cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}