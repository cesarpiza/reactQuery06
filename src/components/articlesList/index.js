import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from './styles';
import Article from '../article';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function ArticlesList() {

    const { data, isLoading, error } = useQuery('articles', () => {
        return axios.get('http://192.168.0.103:8080/articles').then((response) => response.data);
    });

    return (
        <View style={styles.container}>
            {isLoading ?
                <ActivityIndicator size={'large'} />
                :
                <FlatList
                    style={{
                        flex: 1,
                    }}
                    data={data}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item, index }) => {
                        const lastIndex = data.length - 1;
                        return <Article {...item} lastIndex={lastIndex} index={index} />
                    }}
                />
            }
        </View>
    );
}