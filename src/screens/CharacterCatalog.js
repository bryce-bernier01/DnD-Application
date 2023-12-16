import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CharacterSheet from '../components/CharacterSheet'
import CharacterCreation from './CharacterCreation';
import * as SQLite from 'expo-sqlite';

const CharacterCatalog = () => {
    const [characterCount, setCharacterCount] = useState(0);
    const resultArray = []
    const [characterArray, setCharacterArray] = useState([]);
    const [renderSheets, setRenderSheets] = useState([]);
    const [names, setNames] = useState([]);
    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);
    const [experience, setExperience] = useState([]);
    const [strength, setStrength] = useState([]);
    const [dex, setDex] = useState([]);
    const [constitution, setConstitution] = useState([]);
    const [intelligence, setIntelligence] = useState([]);
    const [wisdom, setWisdom] = useState([]);
    const [charisma, setCharisma] = useState([]);

    useEffect(()=> {
        const db = SQLite.openDatabase('dndDatabase.db');
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM PlayerCharacters;', [], (_, result) =>{
                const rowCount = result.rows.length;
                //console.log("row count from character catalog: " + rowCount);
                setCharacterCount(rowCount);
                const tempCharacterArray = [];
                const tempNames = [];
                const tempClasses = [];
                const tempRaces = [];
                const tempExperience = [];
                const tempStrength = [];
                const tempDex = [];
                const tempConst = [];
                const tempIntell = [];
                const tempWisdom = [];
                const tempCharisma = [];

                for (let i = 0; i < result.rows.length; i++) {
                    const characterData = result.rows.item(i);
                    //console.log(result.rows.item(i));
                    //setCharacterArray(result.rows.item(i));
                    console.log(i);
                    tempCharacterArray.push({
                        name: characterData.name,
                        class: characterData.class,
                        race: characterData.race,
                        experience: characterData.experience,
                        strength: characterData.strength,
                        dexterity: characterData.dexterity,
                        constitution: characterData.constitution,
                        intelligence: characterData.intelligence,
                        wisdom: characterData.wisdom,
                        charisma: characterData.charisma,
                    });
                    //compile arrays
                    tempNames.push(tempCharacterArray[i].name);
                    tempClasses.push(tempCharacterArray[i].class);
                    tempRaces.push(tempCharacterArray[i].race);
                    tempExperience.push(tempCharacterArray[i].experience);
                    tempStrength.push(tempCharacterArray[i].strength);
                    tempDex.push(tempCharacterArray[i].dexterity);
                    tempConst.push(tempCharacterArray[i].constitution);
                    tempIntell.push(tempCharacterArray[i].intelligence);
                    tempWisdom.push(tempCharacterArray[i].wisdom);
                    tempCharisma.push(tempCharacterArray[i].charisma);
                }
                    // set arrays
                    setNames(tempNames);
                    setClasses(tempClasses);
                    setRaces(tempRaces);
                    setExperience(tempExperience);
                    setStrength(tempStrength);
                    setDex(tempDex);
                    setConstitution(tempConst);
                    setIntelligence(tempIntell);
                    setWisdom(tempWisdom);
                    setCharisma(tempCharisma);

                    console.log(tempCharacterArray.length);
                    setCharacterArray(tempCharacterArray);
                    
            })
        });
    }, []);
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            });
    }, [navigation]);
    useEffect(() => {
        console.log("Character count: " + characterCount);
        const tempRenderSheets = [];
        const renderCharacterSheets = () => {
            //console.log("Character array 1: " + JSON.stringify(character[0]) + " Character array 2: " + JSON.stringify(character[1]));
            for(let i = 0; i < characterCount; i++){
                console.log("Characters name: " + names[i]);
                
                tempRenderSheets.push(
                        <CharacterSheet 
                            key={i}
                            characterName={names[i]}
                            characterClass={classes[i]}
                            characterRace={races[i]}
                            experience={experience[i]}
                            strength={strength[i]}
                            dexterity={dex[i]}
                            constitution={constitution[i]}
                            intelligence={intelligence[i]}
                            wisdom={wisdom[i]}
                            charisma={charisma[i]}
                        />
                );
            }
            setRenderSheets(tempRenderSheets);
        }
        renderCharacterSheets();
    },[characterArray]);
    
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