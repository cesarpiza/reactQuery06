import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export default function Article({ id, title, content, lastIndex, index }) {

    const queryClient = useQueryClient();

    const saveNewArticle = useMutation({
        mutationFn: ({ id, titleValue, contentValue }) => {
            return axios.patch(`http://192.168.0.103:8080/articles/${id}`, {
                title: titleValue,
                content: contentValue,
            }).then((response) => response.data);
        },
        onSuccess: (data) => {
            queryClient.setQueryData('articles', (currentData) => {
                return [...currentData.map(article => {
                    if (article.id === data.id) {
                        return data;
                    }
                    return article;
                })]
            });
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const removeArticleMutation = useMutation({
        mutationFn: async (id) => {
            const data = await axios.delete(`http://192.168.0.103:8080/articles/${id}`).then((response) => response.data);

            return data;
        },
        onSuccess: (data) => {
            // Primeira opção:
            queryClient.setQueryData('articles', (currentData) => {
                const removeArticleInTheList = currentData.filter(article => article.id !== data.id);

                return removeArticleInTheList;
            })

            // Atualiza o length do array do cache "articles".
            queryClient.setQueryData('totalArticles', () => {
                const data = queryClient.getQueryData('articles');

                return data.length;
            })

            // Segunda opção:
            // É como se fosse o refetch()
            //queryClient.invalidateQueries('articles');
        },
        onError: (error) => {
            console.log(error?.message);
        }
    });

    const [titleValue, setTitleValue] = useState(title);
    const [contentValue, setContentValue] = useState(content);
    const [edit, setEdit] = useState(false);

    return (
        <View style={[styles.container, {
            borderBottomWidth: index === lastIndex ? 2 : 0,
        }]}>
            <View style={styles.titleAndContentContainer}>
                <TextInput
                    editable={edit}
                    style={[styles.title, {
                        borderWidth: 1,
                        borderColor: edit ? 'rgb(140,140,140)' : 'transparent',
                        padding: 5,
                        marginBottom: 5,
                    }]}
                    value={titleValue}
                    onChangeText={text => setTitleValue(text)}
                />
                <TextInput
                    editable={edit}
                    style={[styles.content, {
                        borderWidth: 1,
                        borderColor: edit ? 'rgb(140,140,140)' : 'transparent',
                        padding: 5,
                    }]}
                    value={contentValue}
                    onChangeText={text => setContentValue(text)}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setEdit(!edit);
                        if (edit) {
                            saveNewArticle.mutate({ id, titleValue, contentValue });
                        }
                    }}
                >
                    <Text style={styles.buttonText}>{edit ? 'salvar' : 'editar'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        removeArticleMutation.mutate(id);
                    }}
                >
                    <Text style={styles.buttonText}>excluir</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}