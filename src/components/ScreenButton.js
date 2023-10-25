import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ScreenButton = ({ index, buttonName }) => {
    const getIcon = (index) => {
    switch (index) {
        case 0:
            return require('../navbarIcons/bardIcon.png');
        case 1:
            return require('../navbarIcons/clericIcon.png');
        case 3:
            return require('../navbarIcons/WeaponCatalog.png');
        case 4:
            return require('../navbarIcons/MonsterCatalog.png')
        default:
            return require('../navbarIcons/wizardIcon.png');
    }
  };

  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <View style={styles.button}>
        <Image source={getIcon(index)} style={styles.icon} />
        <Text style={styles.textStyles}>{buttonName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height:'20%',
        margin: 15,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#724D9D',
        borderRadius: 70,
        height: '100%',
    },
    icon: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    textStyles:{
        color: '#DBCBE8',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default ScreenButton;