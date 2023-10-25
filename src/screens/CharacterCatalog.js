import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CharacterSheet from '../components/CharacterSheet'
import { ScrollView } from 'react-native-gesture-handler';
import characters from '../json/characters.json'

const CharacterCatalog = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            });
    }, [navigation]);

    const renderSheets = [];

    for(let i = 0; i < characters.length; i++){
        renderSheets.push(
            <CharacterSheet 
                key={i}
                characterIndex={i}
            />
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.sheets}>
                {renderSheets}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: '10%',
        paddingHorizontal: '3%',
        backgroundColor: '#DBCBE8',
        flex: 1,
    },
    sheets: {
        height: '100%',
        marginTop: 10,
    }
})

export default CharacterCatalog;