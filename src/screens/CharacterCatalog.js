import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CharacterSheet from '../components/CharacterSheet'
import { ScrollView } from 'react-native-gesture-handler';
import characters from '../json/characters.json'
import CharacterCreation from './CharacterCreation';

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
            <View>
                <TouchableOpacity style={styles.add} onPress={() => navigation.navigate(CharacterCreation)}>
                    <Image 
                        style={styles.icons}
                        source={require('../../assets/plus-solid.png')}
                    />
                </TouchableOpacity>
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
        zIndex: 1,
    },
    add:{
        position: 'absolute',
        bottom: 30,
        right: 10,
        backgroundColor: '#724D9D',
        height: 50,
        width: 50,
        borderRadius: 30,
        zIndex: 99,
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
    },
    icons:{
        height: 'auto',
        width: 45,
        flex: 1,
    }
})

export default CharacterCatalog;