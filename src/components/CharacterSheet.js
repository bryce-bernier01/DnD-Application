import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import characters from '../json/characters.json'

const CharacterSheet = ({ characterIndex }) => {

    const characterClassIcon = [];
    //for demo purposes only, need better solution for class icons
    if(characters[characterIndex].class === "Bard"){
        characterClassIcon.push( 
            <Image key={0} style={[styles.characterInsignia]} source={require('../navbarIcons/bardIcon.png')} />
        );
    }else{
        characterClassIcon.push( 
            <Image key={0} style={[styles.characterInsignia]} source={require('../navbarIcons/clericIcon.png')} />
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{characters[characterIndex].name}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.iconHolder}>
                    {characterClassIcon}
                </View>
                <View style={styles.characterTraits}>
                    <Text style={styles.textStyling}>Race: {characters[characterIndex].race}</Text>
                    <Text style={styles.textStyling}>Class: {characters[characterIndex].class}</Text>
                    <Text style={styles.textStyling}>Level: {characters[characterIndex].level}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.attributesBoxes}>
                    <Text style={styles.attributes}>Strength</Text>
                    <Text style={[styles.textStyling, styles.textBottom]}>{characters[characterIndex].stats.strength}</Text>
                </View>
                <View style={styles.attributesBoxes}>
                    <Text style={styles.attributes}>Dexterity</Text>
                    <Text style={[styles.textStyling, styles.textBottom]}>{characters[characterIndex].stats.dexterity}</Text>
                </View>
                <View style={styles.attributesBoxes}>
                    <Text style={styles.attributes}>Constit.</Text>
                    <Text style={[styles.textStyling, styles.textBottom]}>{characters[characterIndex].stats.constitution}</Text>
                </View>
                <View style={styles.attributesBoxes}>
                    <Text style={styles.attributes}>Intellig.</Text>
                    <Text style={[styles.textStyling, styles.textBottom]}>{characters[characterIndex].stats.intelligence}</Text>
                </View>
                <View style={styles.attributesBoxes}>
                    <Text style={styles.attributes}>Wisdom</Text>
                    <Text style={[styles.textStyling, styles.textBottom]}>{characters[characterIndex].stats.wisdom}</Text>
                </View>
                <View style={styles.attributesBoxes}>
                    <Text style={styles.attributes}>Charisma</Text>
                    <Text style={[styles.textStyling, styles.textBottom]}>{characters[characterIndex].stats.charisma}</Text>
                </View>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#724D9D',
    borderRadius: 10,
    flex: 1,
    maxHeight: '35%',
    marginBottom: 15,
    },
    header: {
        backgroundColor: '#2C1B47',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        height: '45%',
        marginTop: 10,
        marginBottom: 10,
        //paddingHorizontal: 10,
        flexDirection: 'row',
    },
    characterInsignia: {
        paddingLeft: 25,
        marginLeft: 25,
        //maxWidth: '50%',
        width: '60%',
        height: '100%',
    },
    iconHolder: {
        width: '50%',
    },
    characterTraits: {
        //paddingLeft: '50%',
        width: '50%',
    },
    textStyling: {
        color: 'white',
        paddingBottom: 22,
    },
    textBottom: {
        paddingTop: 5,
        textAlign: 'center',
        color: '#2C1B47',
    },
    attributesBoxes:{
        marginLeft: 1,
        marginHorizontal: 4,
        width: '15.3%',
        backgroundColor: '#DBCBE8',
        borderRadius: 4,
    },
    attributes:{
        fontSize: 10,
        fontWeight: '800',
        textAlign: 'center',
        color: '#2C1B47',
    },
    bottom: {
        borderTopWidth: 1,
        padding: 10,
        flex: 1,
        flexDirection: 'row'
    },
})

export default CharacterSheet;