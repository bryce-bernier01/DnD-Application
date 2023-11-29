import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CharacterSheet from '../components/CharacterSheet'
import CharacterCreation from './CharacterCreation';
import * as SQLite from 'expo-sqlite';

const CharacterCatalog = () => {
    const [characterCount, setCharacterCount] = useState(0);
    useEffect(()=> {
        const db = SQLite.openDatabase('dndDatabase.db');
        db.transaction(tx => {
            tx.executeSql('SELECT COUNT(name) as count FROM PlayerCharacters;', [], (_, result) =>{
                const rowCount = result.rows.item(0).count;
                console.log("row count from character catalog: " + rowCount);
                setCharacterCount(rowCount);
                // if(rowCount < sqlRacesStatements.length){
                //     sqlRacesStatements.forEach(async (sqlStatement) => {
                //         try {
                //             await tx.executeSql(sqlStatement);
                //             console.log("Executed Races Statement");
                //         } catch (error) {
                //             console.error('Error executing SQL statement:', error);
                //         }
                //     });
                // }
            })
        });
    }, []);
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            });
    }, [navigation]);

    const renderSheets = [];

    for(let i = 0; i < characterCount; i++){
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