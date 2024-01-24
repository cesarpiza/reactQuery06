import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';
import { styles } from './styles';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function ArticlesTotal() {

    const { data: totalArticles, isLoading } = useQuery('totalArticles', () => {
        return axios.get('http://192.168.0.103:8080/articles').then((response) => response.data.length);
    });

    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <ActivityIndicator size={'large'} />
                    :
                    <Text style={styles.text}>artigos {totalArticles}</Text>
            }
        </View>
    );
}